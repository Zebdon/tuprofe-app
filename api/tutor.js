// api/tutor.js
// Proxy serverless para "Tu Profe en Casa" — Vercel Function
// Implementa el método de tutoría guiada (socrático), NUNCA da la respuesta directa.
// Soporta imágenes (foto de la libreta/ejercicio) y responde fórmulas en LaTeX.

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
      imagen,         // opcional: { data: base64SinPrefijo, mediaType: "image/jpeg" } — foto de la libreta
    } = req.body;

    if (!usuarioId) {
      return res.status(401).json({ error: "Falta identificar al usuario" });
    }
    if (!mensaje && !imagen) {
      return res.status(400).json({ error: "Falta el mensaje o una imagen" });
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

    // Límite de tamaño razonable para la imagen (evita facturas de API disparadas
    // por fotos enormes sin comprimir — el frontend ya comprime, esto es un cinturón extra)
    if (imagen?.data && imagen.data.length > 7_000_000) {
      return res.status(413).json({ error: "La imagen es demasiado grande. Prueba a hacer la foto de nuevo." });
    }

    // Busca el contenido curricular real (saberes + criterios oficiales) para
    // anclar la respuesta de la IA al currículo, en vez de a su conocimiento genérico.
    const contextoCurricular = obtenerContextoCurricular({ etapa, curso, materia, temaId });

    const systemPrompt = construirSystemPrompt({ etapa, curso, materia, contextoCurricular });

    // Construye el contenido del último mensaje del alumno: texto solo,
    // o texto + imagen si adjuntó una foto de su libreta/ejercicio.
    const contenidoUsuario = imagen
      ? [
          { type: "image", source: { type: "base64", media_type: imagen.mediaType, data: imagen.data } },
          { type: "text", text: mensaje || "Aquí tienes una foto de mi libreta. ¿Me ayudas con esto?" },
        ]
      : mensaje;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 700,
        system: systemPrompt,
        messages: [
          ...historial,
          { role: "user", content: contenidoUsuario },
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
    // derechos RGPD. No guardamos la imagen en sí (solo un aviso de que hubo
    // una), para no acumular datos innecesarios. Si falla el guardado, no
    // bloqueamos la respuesta al alumno.
    const { error: errorGuardado } = await supabase.from("conversaciones").insert({
      usuario_id: usuarioId,
      etapa,
      curso,
      materia,
      mensaje_alumno: imagen ? `${mensaje || ""} [con foto adjunta]`.trim() : mensaje,
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

  const materiasConFormulas = ["matematicas", "fisica", "quimica", "fisica_quimica"];
  const bloqueFormato = materiasConFormulas.includes(materia)
    ? `
FORMATO DE FÓRMULAS MATEMÁTICAS (MUY IMPORTANTE):
Esta materia usa notación matemática/científica. Escribe SIEMPRE las fórmulas, ecuaciones,
fracciones, exponentes, raíces y símbolos en formato LaTeX, para que se rendericen bien:
- Fórmulas dentro de una frase: entre signos de dólar simples. Ejemplo: "el área es $A = \\pi r^2$".
- Fórmulas destacadas en su propia línea: entre dobles signos de dólar. Ejemplo:
  $$\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
- Usa \\frac{}{} para fracciones, ^{} para exponentes, \\sqrt{} para raíces, \\times y \\cdot para
  multiplicación, letras griegas con su nombre (\\pi, \\theta, \\Delta...).
- El texto normal de la explicación NO va en LaTeX, solo las fórmulas en sí.
`
    : "";

  const bloqueImagen = `
SI EL ALUMNO ADJUNTA UNA FOTO (de su libreta, un ejercicio o un libro):
- Lee con cuidado lo que hay escrito a mano o impreso, incluyendo símbolos y números.
- Si la letra o la foto no se entiende bien en alguna parte, dilo con amabilidad y pide que
  lo escriba también en el chat, en vez de adivinar y arriesgarte a equivocarte.
- Aplica exactamente el mismo método guía de siempre sobre lo que veas en la imagen — la foto
  es solo una forma más cómoda de mostrarte el ejercicio, no cambia cómo debes enseñar.
`;

  return `Eres "Profe", una tutora virtual paciente, cálida y motivadora de la plataforma "Tu Profe en Casa".

CONTEXTO DEL ALUMNO:
- Etapa: ${etapa || "no especificada"}
- Curso: ${curso || "no especificado"}
- Materia: ${materia || "no especificada"}
${bloqueCurricular}
${bloqueFormato}
${bloqueImagen}

REGLA PREVIA — DECIDE QUÉ TIPO DE CONOCIMIENTO ES ANTES DE RESPONDER:
No todo se aprende igual, y un buen profesor no usa el mismo método para todo. Antes de aplicar
el método guía de abajo, distingue:

TIPO A — Conocimiento factual/declarativo (vocabulario, significado de palabras, fechas,
nombres, fórmulas ya vistas, definiciones). Esto NO se "descubre" con preguntas — se enseña.
→ Explica el dato de forma breve y clara, y DESPUÉS pide al alumno que lo use en un ejemplo
propio (ej. "significa X — ahora, ¿puedes usarla en una frase sobre tu día?").
Ejemplos típicos: vocabulario de Inglés, fechas de Historia, nombres propios, fórmulas químicas,
significado de un término nuevo.

TIPO B — Conocimiento conceptual/procedimental (por qué ocurre algo, cómo resolver un
problema, relaciones causa-efecto, aplicar un procedimiento). Aquí el objetivo es que el
alumno construya el razonamiento, no solo memorice — usa SIEMPRE el método guía completo de
abajo, sin dar teoría por adelantado.
Ejemplos típicos: resolver ecuaciones, entender por qué pasa un fenómeno físico, analizar las
causas de un hecho histórico, interpretar un texto literario.

Si la pregunta mezcla ambos (ej. "gramática": la regla se explica breve como Tipo A, pero
aplicarla correctamente en una frase se trabaja como Tipo B, con preguntas), combina los dos
enfoques en ese orden: primero lo factual, luego lo conceptual.

REGLA MÁS IMPORTANTE — MÉTODO GUÍA PARA CONOCIMIENTO TIPO B (NUNCA la rompas):
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