// api/tutor.js
// Proxy serverless para "Tu Profe en Casa" — Vercel Function
// Implementa el método de tutoría guiada (socrático), NUNCA da la respuesta directa.

import { createClient } from "@supabase/supabase-js";
import { obtenerContextoCurricular } from "../data/curriculo-index.js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const {
      usuarioId,      // id del alumno (viene de la sesión/login, no del frontend a ciegas)
      mensaje,       // pregunta o mensaje del alumno
      historial = [], // array de mensajes previos [{role, content}]
      etapa,          // "primaria" | "eso" | "bachillerato"
      curso,          // Primaria: "1".."6" · ESO: "1".."4" · Bachillerato: "1"/"2" (o "matematicas_I"/"matematicas_II")
      materia,        // clave tal como en los archivos de currículo, ej. "matematicas", "lengua_castellana"
      temaId,         // solo necesario en Primaria (organizada por temas discretos)
    } = req.body;

    if (!usuarioId) {
      return res.status(401).json({ error: "Falta identificar al usuario" });
    }
    if (!mensaje) {
      return res.status(400).json({ error: "Falta el campo 'mensaje'" });
    }

    // CANDADO DE CONSENTIMIENTO PARENTAL — no se llama a la IA si la cuenta
    // de un menor de 14 años no tiene el consentimiento del tutor confirmado.
    const { data: usuario, error: errorUsuario } = await supabase
      .from("usuarios")
      .select("estado_consentimiento, requiere_consentimiento_parental")
      .eq("id", usuarioId)
      .single();

    if (errorUsuario || !usuario) {
      return res.status(404).json({ error: "Cuenta no encontrada" });
    }

    if (usuario.estado_consentimiento === "revocado") {
      return res.status(403).json({
        error: "cuenta_revocada",
        mensaje: "El tutor/a ha revocado el permiso para usar esta cuenta. Contacta con la familia.",
      });
    }

    if (usuario.requiere_consentimiento_parental && usuario.estado_consentimiento !== "confirmado") {
      return res.status(403).json({
        error: "consentimiento_pendiente",
        mensaje: "Todavía falta que tu tutor/a confirme el permiso por email antes de poder usar la Profe. Revisa su bandeja de entrada.",
      });
    }

    // Busca el contenido curricular real (saberes + criterios oficiales) para
    // anclar la respuesta de la IA al currículo, en vez de a su conocimiento genérico.
    const contextoCurricular = obtenerContextoCurricular({ etapa, curso, materia, temaId });

    const systemPrompt = construirSystemPrompt({ etapa, curso, materia, contextoCurricular });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 500,
        system: systemPrompt,
        messages: [
          ...historial,
          { role: "user", content: mensaje },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Error Anthropic API:", errText);
      return res.status(502).json({ error: "Error al contactar con la IA" });
    }

    const data = await response.json();
    const textoRespuesta = data.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    // Guardamos la conversación para dar continuidad pedagógica y para poder
    // exportar/borrar el historial si el tutor o el alumno ejercen sus
    // derechos RGPD. Si falla el guardado, no bloqueamos la respuesta al alumno.
    const { error: errorGuardado } = await supabase.from("conversaciones").insert({
      usuario_id: usuarioId,
      etapa,
      curso,
      materia,
      mensaje_alumno: mensaje,
      respuesta_profe: textoRespuesta,
    });
    if (errorGuardado) {
      console.error("No se pudo guardar la conversación:", errorGuardado);
    }

    return res.status(200).json({ respuesta: textoRespuesta });
  } catch (err) {
    console.error("Error en /api/tutor:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

function construirSystemPrompt({ etapa, curso, materia, contextoCurricular }) {
  const nivelLenguaje = {
    primaria: `Usa frases cortas, vocabulario sencillo, ejemplos con objetos cotidianos (juguetes, comida, animales) y un tono cercano y alegre. Usa emojis ocasionalmente para motivar.
PISTAS PARA PRIMARIA — deben ser concretas y manipulativas, no abstractas:
- Si el alumno falla un paso, no repitas la misma pregunta de forma más abstracta. Bájalo a algo que pueda contar, dibujar o agrupar con los dedos, objetos o dibujos ("imagina que tienes 7 bolsas con 8 caramelos cada una...").
- Evita reformular el mismo razonamiento con otras palabras si ya falló una vez — cambia de representación (de números a dibujos, de dibujos a contar con los dedos).
- Si tras 2 intentos con apoyo visual sigue sin lograrlo, ofrece descomponer el problema en partes aún más pequeñas antes de pasar al último recurso de explicar el paso completo.`,
    eso: "Usa un lenguaje claro y cercano, sin infantilizar. Puedes usar ejemplos de la vida real de un adolescente. Tono motivador pero directo.",
    bachillerato: "Usa lenguaje académico preciso, propio del nivel de EBAU/Selectividad. Tono de acompañamiento serio, sin perder cercanía.",
  };

  // Construye el bloque de anclaje curricular: si hay contenido oficial real
  // disponible, se lo damos a la IA para que explique DENTRO de esos límites
  // exactos, en vez de usar conocimiento genérico que podría no coincidir
  // con lo que el alumno está estudiando en clase.
  let bloqueCurricular;
  if (contextoCurricular) {
    const saberesTexto = (contextoCurricular.saberes_basicos || [])
      .map((b) => `  · ${b.bloque || ""}: ${(b.saberes || []).join("; ")}`)
      .join("\n");
    const criteriosTexto = (contextoCurricular.competencias_y_criterios || [])
      .map((c) => `  · ${c.competencia}: ${c.criterios.join("; ")}`)
      .join("\n");

    bloqueCurricular = `
CONTENIDO CURRICULAR OFICIAL PARA ESTE TEMA (fuente: ${contextoCurricular.fuente_legal}):
Tu explicación debe ceñirse a estos saberes y criterios oficiales de Asturias. No introduzcas
contenido de otros cursos ni te salgas de este alcance, salvo que el alumno lo pida explícitamente.

Saberes básicos:
${saberesTexto || "  (no especificados para este curso/materia)"}

Criterios de evaluación (lo que se espera que el alumno sea capaz de hacer):
${criteriosTexto || "  (no especificados para este curso/materia)"}`;
  } else {
    bloqueCurricular = `
AVISO: No se encontró contenido curricular digitalizado para esta combinación exacta de
etapa/curso/materia. Explica igualmente siguiendo el método guía y el nivel de la etapa,
pero sé prudente: menciona que conviene contrastar con el libro de texto o el profesor/a
del centro para cualquier detalle muy específico del temario oficial.`;
  }

  return `Eres "Profe", una tutora virtual paciente, cálida y motivadora de la plataforma "Tu Profe en Casa".

CONTEXTO DEL ALUMNO:
- Etapa: ${etapa || "no especificada"}
- Curso: ${curso || "no especificado"}
- Materia: ${materia || "no especificada"}
${bloqueCurricular}

REGLA MÁS IMPORTANTE — MÉTODO GUÍA (NUNCA la rompas):
Tu trabajo NO es dar respuestas. Tu trabajo es guiar al alumno para que LLEGUE a la respuesta por sí mismo.
- Si el alumno pregunta "¿cuál es la respuesta?" o pide que resuelvas algo, NO lo resuelvas. En su lugar, haz una pregunta que lo acerque al primer paso.
- Da pistas de forma progresiva: la primera pista es general, la segunda más concreta, la tercera casi señala el camino — pero SIEMPRE deja que sea el alumno quien dé el paso final.
- Si el alumno ya lo intentó y se equivocó, no digas solo "incorrecto". Señala QUÉ parte del razonamiento se desvió y pregunta cómo podría corregirlo.
- Si el alumno lo logra, celebra el proceso de pensar, no solo el resultado.
- Solo si el alumno lleva 3-4 intentos genuinos y sigue sin poder, puedes mostrar el razonamiento completo paso a paso como último recurso — explicando el porqué de cada paso, no solo el resultado.
- Si detectas frustración (mensajes cortos, "no entiendo nada", "esto es imposible"), cambia de estrategia: usa una analogía distinta o baja la dificultad del ejemplo, y anima con calidez.

ESTILO SEGÚN ETAPA:
${nivelLenguaje[etapa] || nivelLenguaje.eso}

LÍMITES:
- Solo hablas de contenido educativo alineado con el currículo LOMLOE. Si preguntan algo fuera de lugar, redirige con amabilidad hacia el tema de estudio.
- Nunca uses lenguaje inapropiado para menores ni temas ajenos a la educación.
- Sé siempre respetuosa, paciente y positiva, incluso si el alumno se frustra o comete muchos errores.`;
}