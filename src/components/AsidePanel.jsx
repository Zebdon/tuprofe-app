// src/components/AsidePanel.jsx
// Panel lateral presente en la app: acceso a blog, juegos educativos,
// vídeos y progreso para padres. Todo contenido seguro y sin riesgo —
// nada de espacios de apoyo emocional tipo "terapia" (eso se diseñará
// aparte, con las salvaguardas necesarias).

import { useState } from "react";
import { NavLink } from "react-router-dom";

const JUEGOS = [
  { emoji: "🤖", label: "Scratch — programación visual", href: "https://scratch.mit.edu" },
  { emoji: "🧩", label: "Code.org — retos de código", href: "https://code.org" },
  { emoji: "🔧", label: "Tinkercad — diseño 3D y robótica", href: "https://www.tinkercad.com" },
];

const VIDEOS = [
  { emoji: "🎨", label: "Manualidades fáciles en casa", href: "https://www.youtube.com/results?search_query=manualidades+faciles+casa" },
  { emoji: "🎬", label: "Experimentos de ciencia caseros", href: "https://www.youtube.com/results?search_query=experimentos+ciencia+caseros" },
];

export default function AsidePanel() {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <aside className={`aside-panel ${abierto ? "abierto" : ""}`}>
        <p className="aside-titulo">📖 Blog</p>
        <NavLink to="/blog" className="aside-link" onClick={() => setAbierto(false)}>
          <span className="emoji">📝</span> Artículos para ti
        </NavLink>

        <p className="aside-titulo">🎮 Después de estudiar</p>
        {JUEGOS.map((j) => (
          <a key={j.label} href={j.href} target="_blank" rel="noreferrer" className="aside-link">
            <span className="emoji">{j.emoji}</span> {j.label}
          </a>
        ))}

        <p className="aside-titulo">🎥 Vídeos e ideas</p>
        {VIDEOS.map((v) => (
          <a key={v.label} href={v.href} target="_blank" rel="noreferrer" className="aside-link">
            <span className="emoji">{v.emoji}</span> {v.label}
          </a>
        ))}

        <p className="aside-titulo">👪 Para la familia</p>
        <NavLink to="/progreso" className="aside-link" onClick={() => setAbierto(false)}>
          <span className="emoji">📊</span> Ver progreso
        </NavLink>

        <div className="aside-cta">
          <p>¿15 minutos de descanso? Te lo has ganado 🎉</p>
        </div>
      </aside>

      <button
        className="aside-toggle-movil"
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? "Cerrar panel" : "Abrir panel"}
      >
        {abierto ? "✕" : "☰"}
      </button>
    </>
  );
}
