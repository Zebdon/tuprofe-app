// src/pages/Home.jsx
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

const CARACTERISTICAS = [
  {
    icono: "🎯",
    titulo: "Método guía, no respuestas",
    texto: "La Profe IA hace preguntas y da pistas progresivas para que tu hijo/a llegue a la solución por sí mismo — como una profesora de verdad, no un buscador.",
  },
  {
    icono: "📘",
    titulo: "Currículo oficial de Asturias",
    texto: "Todo el contenido está anclado a los Decretos LOMLOE del Principado: nada de temario genérico que no coincide con lo que se estudia en clase.",
  },
  {
    icono: "🔒",
    titulo: "Pensada para familias",
    texto: "Cuentas de menores protegidas con consentimiento parental verificado, cumpliendo la normativa española de protección de datos.",
  },
  {
    icono: "🕐",
    titulo: "Disponible cuando la necesites",
    texto: "Dudas a las 8 de la tarde con los deberes, repaso antes de un examen, o para reforzar un tema que no quedó claro en clase.",
  },
];

const ETAPAS = [
  { to: "/etapa/primaria", titulo: "Primaria", texto: "1.º a 6.º curso", img: "/images/nino_estudiando.jpg" },
  { to: "/etapa/secundaria", titulo: "ESO", texto: "1.º a 4.º curso", img: "/images/profe_clase.jpg" },
  { to: "/etapa/bachillerato", titulo: "Bachillerato", texto: "1.º y 2.º curso, EBAU", img: "/images/profe_alumno.jpg" },
];

const PASOS = [
  { num: "1", titulo: "Elige curso y materia", texto: "Selecciona la etapa, el curso y la asignatura en la que necesitas ayuda ahora mismo." },
  { num: "2", titulo: "Pregunta lo que no entiendes", texto: "Escribe tu duda con tus propias palabras, igual que se lo dirías a un profesor particular." },
  { num: "3", titulo: "La Profe te guía paso a paso", texto: "Recibes preguntas y pistas hasta que llegas tú mismo/a a la respuesta correcta." },
];

export default function Home() {
  return (
    <>
      <Seo
        title="Tutor de IA con el currículo oficial de Asturias"
        description="App educativa para Primaria, ESO y Bachillerato con un tutor de IA que guía en vez de dar respuestas, alineado con el currículo LOMLOE del Principado de Asturias."
        path="/"
      />
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">✨ Currículo oficial LOMLOE de Asturias</span>
          <h1>
            Una profe que <span>guía</span>, no una IA que solo <span>responde</span>
          </h1>
          <p>
            Tu Profe en Casa acompaña a tu hijo/a con preguntas y pistas progresivas,
            igual que haría un buen profesor particular — con el temario real de su curso.
          </p>
          <div className="hero-buttons">
            <NavLink to="/auth" className="btn btn-primary">🚀 Empezar prueba gratis</NavLink>
            <NavLink to="/etapa/secundaria" className="btn btn-outline">Ver materias</NavLink>
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stat-item"><div className="stat-num">12.000+</div><div className="stat-label">Alumnos</div></div>
        <div className="stat-item"><div className="stat-num">3</div><div className="stat-label">Etapas educativas</div></div>
        <div className="stat-item"><div className="stat-num">100%</div><div className="stat-label">Currículo oficial</div></div>
        <div className="stat-item"><div className="stat-num">24/7</div><div className="stat-label">Disponibilidad</div></div>
      </div>

      {/* VISTA PREVIA DE LA APP — deja claro que esto es una app real, no solo una web informativa */}
      <section className="seccion-clara" style={{ padding: "4.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", maxWidth: 1100, margin: "0 auto" }} className="etapa-grid">
          <div>
            <span className="hero-badge">💬 Así es la app por dentro</span>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, margin: "1rem 0" }}>
              Habla con la Profe como si estuviera a tu lado
            </h2>
            <p style={{ color: "var(--gris-texto)", fontSize: "1.05rem", marginBottom: "1.5rem" }}>
              Nunca te da la respuesta directa. Te hace preguntas, te da pistas cada vez más
              concretas, y celebra contigo cuando llegas a la solución por tu cuenta.
            </p>
            <NavLink to="/auth" className="btn btn-primary">Probarlo ahora</NavLink>
          </div>

          <div className="chat-preview">
            <div className="chat-preview-header">
              <span>📚</span> Profe · Matemáticas 3º ESO
            </div>
            <div className="chat-preview-body">
              <div className="chat-burbuja alumno">¿Cuánto es 7 x 8? Dime la respuesta</div>
              <div className="chat-burbuja profe">¡Vamos a descubrirlo! 🧮 ¿Sabes cuánto es 7 x 5?</div>
              <div className="chat-burbuja alumno">35</div>
              <div className="chat-burbuja profe">¡Perfecto! Ahora suma 7 x 3. ¿Cuánto te da?</div>
              <div className="chat-burbuja alumno">56</div>
              <div className="chat-burbuja profe">¡Exacto! 🎉 Lo has calculado tú solito/a</div>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="seccion-tinta" style={{ padding: "4.5rem 2rem" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 900, marginBottom: "3rem" }}>
          Cómo funciona
        </h2>
        <div className="pasos-grid">
          {PASOS.map((p) => (
            <div className="paso-item" key={p.num}>
              <div className="paso-num">{p.num}</div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.5rem" }}>{p.titulo}</h3>
              <p style={{ color: "var(--gris-texto)" }}>{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ETAPAS */}
      <section className="seccion-clara" style={{ padding: "4.5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem" }}>
            Elige la etapa educativa
          </h2>
          <p style={{ textAlign: "center", color: "var(--gris-texto)", marginBottom: "2.5rem" }}>
            Contenido adaptado a cada curso, siguiendo el currículo oficial de Asturias.
          </p>
          <div className="features-grid">
            {ETAPAS.map((e) => (
              <NavLink to={e.to} key={e.to} className="feature-card" style={{ textDecoration: "none", padding: 0, overflow: "hidden" }}>
                <img src={e.img} alt={e.titulo} loading="lazy" style={{ width: "100%", height: 180, objectFit: "cover" }} />
                <div style={{ padding: "1.4rem" }}>
                  <h3>{e.titulo}</h3>
                  <p>{e.texto}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ CONFIAR */}
      <section className="seccion-tinta" style={{ padding: "4.5rem 2rem" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 900, marginBottom: "2.5rem" }}>
          Por qué las familias confían en nosotros
        </h2>
        <div className="features-grid-2col">
          {CARACTERISTICAS.map((c) => (
            <div className="feature-card" key={c.titulo}>
              <div className="feature-icon">{c.icono}</div>
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LLAMADA FINAL */}
      <section className="hero" style={{ padding: "4rem 2rem" }}>
        <div className="hero-content">
          <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1rem" }}>
            ¿Empezamos hoy?
          </h2>
          <p style={{ marginBottom: "1.5rem" }}>7 días de prueba gratis, sin tarjeta de crédito.</p>
          <NavLink to="/auth" className="btn btn-primary">🚀 Crear cuenta gratis</NavLink>
        </div>
      </section>

      <footer style={{ background: "var(--texto-oscuro)", color: "white", padding: "3rem 2rem 1.5rem", textAlign: "center" }}>
        <div className="footer-brand" style={{ justifyContent: "center", marginBottom: "1rem" }}>
          <div className="logo-icon">📚</div>
          <strong>Tu Profe en Casa</strong>
        </div>
        <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
          © {new Date().getFullYear()} Tu Profe en Casa — Currículo oficial LOMLOE del Principado de Asturias
        </p>
      </footer>
    </>
  );
}
