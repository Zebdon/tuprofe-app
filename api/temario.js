// api/temario.js
// Vercel Function: devuelve la lista de temas reales (del currículo oficial)
// de una materia/curso, para pintar el mapa de temario navegable.

import { listarTemario } from "../data/curriculo-index.js";
import { aplicarCors } from "./_cors.js";

export default async function handler(req, res) {
  if (aplicarCors(req, res)) return;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { etapa, curso, materia } = req.body;
    if (!etapa || !curso || !materia) {
      return res.status(400).json({ error: "Faltan datos (etapa, curso o materia)" });
    }

    const temas = listarTemario({ etapa, curso, materia });
    return res.status(200).json({ temas });
  } catch (err) {
    console.error("Error en /api/temario:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}