// api/progreso.js
// Vercel Function: devuelve un resumen de la actividad del alumno para que
// el padre/madre/tutor pueda ver en qué ha estado trabajando, sin exponer
// el contenido literal de las conversaciones (solo agregados).

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
      .select("materia, created_at")
      .eq("usuario_id", usuarioId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al leer conversaciones:", error);
      return res.status(500).json({ error: "No se pudo leer el progreso" });
    }

    const porMateriaMapa = {};
    for (const c of conversaciones) {
      const clave = c.materia || "otra";
      if (!porMateriaMapa[clave]) {
        porMateriaMapa[clave] = { materia: ETIQUETAS_MATERIA[clave] || clave, conteo: 0, ultimaVez: c.created_at };
      }
      porMateriaMapa[clave].conteo += 1;
    }

    const porMateria = Object.values(porMateriaMapa)
      .sort((a, b) => b.conteo - a.conteo)
      .map((m) => ({ ...m, ultimaVez: formatearFecha(m.ultimaVez) }));

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