// src/components/MasQueEstudiarSection.jsx
// Sección para insertar en Home.jsx: juegos, vídeos y orientación, visibles
// sin necesidad de iniciar sesión. Uso: importa y coloca donde quieras.
import { NavLink } from "react-router-dom";

const JUEGOS = [
  { emoji: "🤖", titulo: "Scratch", texto: "Programación visual para todas las edades", href: "https://scratch.mit.edu" },
  { emoji: "🧩", titulo: "Code.org", texto: "Retos de código paso a paso", href: "https://code.org" },
  { emoji: "🔧", titulo: "Tinkercad", texto: "Diseño 3D y robótica desde cero", href: "https://www.tinkercad.com" },
  { emoji: "🎨", titulo: "Manualidades", texto: "Ideas fáciles para hacer en casa", href: "https://www.youtube.com/results?search_query=manualidades+faciles+casa" },
  { emoji: "🔬", titulo: "Experimentos de ciencia", texto: "Vídeos de experimentos caseros y seguros", href: "https://www.youtube.com/results?search_query=experimentos+ciencia+caseros" },
];

export default function MasQueEstudiarSection() {
  return (
    <section className="seccion-tinta" style={{ padding: "4rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem" }}>
          Más que estudiar
        </h2>
        <p style={{ textAlign: "center", color: "var(--gris-texto)", marginBottom: "2.5rem" }}>
          Programación, robótica, ciencia y manualidades para tus ratos de descanso.
        </p>
        <div className="features-grid">
          {JUEGOS.map((j) => (
            <a
              key={j.titulo}
              href={j.href}
              target="_blank"
              rel="noreferrer"
              className="feature-card"
              style={{ textDecoration: "none" }}
            >
              <div className="feature-icon">{j.emoji}</div>
              <h3>{j.titulo}</h3>
              <p>{j.texto}</p>
            </a>
          ))}

          <NavLink to="/blog/orientacion-universitaria" className="feature-card" style={{ textDecoration: "none" }}>
            <div className="feature-icon">🎓</div>
            <h3>Orientación</h3>
            <p>Ideas para empezar a pensar en tu futuro, sin agobios</p>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
