// api/progreso.js
// Vercel Function: devuelve un resumen de la actividad del alumno para que
// el padre/madre/tutor pueda ver en qué ha estado trabajando, sin exponer
// el contenido literal de las conversaciones (solo agregados).
//
// Incluye desglose por TEMA dentro de cada materia (no solo conteo por
// materia), para poder mostrar un panel tipo "Multiplicación: practicado ✓
// · Fracciones: en progreso" en vez de solo "Matemáticas: 12 preguntas".

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const ETIQUETAS_MATERIA = {
  matematicas: "Matemáticas",
  lengua: "Lengua",
  lengua_castellana: "Lengua Castellana y Literatura",
  fisica_quimica: "Física y Química",
  biologia_geologia: "Biología y Geología",
  geografia_historia: "Geografía e Historia",
  lengua_extranjera: "Inglés",
  fisica: "Física",
  quimica: "Química",
  historia_espana: "Historia de España",
  filosofia: "Filosofía",
  biologia: "Biología",
  lengua_literatura: "Lengua y Literatura",
  economia: "Economía",
};

// A partir de cuántas preguntas sobre el mismo tema consideramos que el
// alumno lo ha "practicado" de verdad, en vez de haberlo solo rozado.
const UMBRAL_PRACTICADO = 3;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { usuarioId } = req.body;
    if (!usuarioId) {
      return res.status(400).json({ error: "Falta usuarioId" });
    }

    const { data: conversaciones, error } = await supabase
      .from("conversaciones")
      .select("materia, tema, created_at")
      .eq("usuario_id", usuarioId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al leer conversaciones:", error);
      return res.status(500).json({ error: "No se pudo leer el progreso" });
    }

    const porMateriaMapa = {};
    for (const c of conversaciones) {
      const claveMateria = c.materia || "otra";
      if (!porMateriaMapa[claveMateria]) {
        porMateriaMapa[claveMateria] = {
          materia: ETIQUETAS_MATERIA[claveMateria] || claveMateria,
          conteo: 0,
          ultimaVez: c.created_at,
          temasMapa: {},
        };
      }
      const entradaMateria = porMateriaMapa[claveMateria];
      entradaMateria.conteo += 1;

      // Solo se contabilizan como "tema" las conversaciones que llegaron con
      // un tema concreto elegido (desde el mapa de temario). Las preguntas
      // sueltas sin tema elegido siguen contando en el total de la materia,
      // pero no aparecen en el desglose por tema.
      if (c.tema) {
        if (!entradaMateria.temasMapa[c.tema]) {
          entradaMateria.temasMapa[c.tema] = { tema: c.tema, conteo: 0, ultimaVez: c.created_at };
        }
        entradaMateria.temasMapa[c.tema].conteo += 1;
      }
    }

    const porMateria = Object.values(porMateriaMapa)
      .sort((a, b) => b.conteo - a.conteo)
      .map((m) => ({
        materia: m.materia,
        conteo: m.conteo,
        ultimaVez: formatearFecha(m.ultimaVez),
        temas: Object.values(m.temasMapa)
          .sort((a, b) => b.conteo - a.conteo)
          .map((t) => ({
            tema: t.tema,
            conteo: t.conteo,
            ultimaVez: formatearFecha(t.ultimaVez),
            estado: t.conteo >= UMBRAL_PRACTICADO ? "practicado" : "en_progreso",
          })),
      }));

    return res.status(200).json({
      totalSesiones: conversaciones.length,
      materiasDistintas: Object.keys(porMateriaMapa).length,
      ultimaActividad: conversaciones[0] ? formatearFecha(conversaciones[0].created_at) : null,
      porMateria,
    });
  } catch (err) {
    console.error("Error en /api/progreso:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

function formatearFecha(iso) {
  if (!iso) return "—";
  const fecha = new Date(iso);
  return fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}