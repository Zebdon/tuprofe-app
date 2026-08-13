// src/pages/EtapaPage.jsx
// Página DINÁMICA: una sola plantilla que renderiza contenido distinto
// según el parámetro de la URL (/etapa/primaria, /etapa/secundaria, ...).
// Esto evita triplicar código para Primaria/ESO/Bachillerato: el contenido
// vive en un solo objeto de datos y la ruta decide qué mostrar.

import { useParams, Navigate, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

const DATOS_ETAPA = {
  primaria: {
    titulo: "Educación Primaria",
    cursos: "1.º a 6.º de Primaria",
    descripcion: "Acompañamos los primeros pasos del aprendizaje con pistas visuales y manipulativas, adaptadas a cómo aprenden los niños y niñas de esta edad.",
    img: "/images/ninos_primaria.jpg",
    materias: ["Matemáticas", "Lengua Castellana"],
    color: "#34a853",
  },
  secundaria: {
    titulo: "ESO — Secundaria",
    cursos: "1.º a 4.º de la ESO",
    descripcion: "Todas las materias troncales de la ESO, con un tono cercano y directo, ideal para reforzar deberes y preparar exámenes.",
    img: "/images/profe_eso.jpg",
    materias: ["Matemáticas", "Lengua", "Física y Química", "Biología y Geología", "Geografía e Historia", "Inglés"],
    color: "#1a73e8",
  },
  bachillerato: {
    titulo: "Bachillerato",
    cursos: "1.º y 2.º de Bachillerato",
    descripcion: "Preparación de nivel EBAU/Selectividad en las materias clave, con el rigor académico que necesita esta etapa.",
    img: "/images/profe_alumno.jpg",
    materias: ["Matemáticas I y II", "Física", "Química", "Historia de España", "Filosofía", "Biología", "Lengua y Literatura", "Economía"],
    color: "#7c4dff",
  },
};

export default function EtapaPage() {
  const { slug } = useParams();
  const etapa = DATOS_ETAPA[slug];

  if (!etapa) return <Navigate to="/" replace />;

  return (
    <>
      <Seo
        title={etapa.titulo}
        description={`${etapa.descripcion} Materias disponibles: ${etapa.materias.join(", ")}.`}
        path={`/etapa/${slug}`}
      />
      <Navbar />

      <section style={{ padding: "3rem 2rem", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "center" }} className="etapa-grid">
          <div>
            <span className="hero-badge" style={{ background: `${etapa.color}22`, color: etapa.color, borderColor: `${etapa.color}55` }}>
              {etapa.cursos}
            </span>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 900, margin: "1rem 0" }}>{etapa.titulo}</h1>
            <p style={{ color: "var(--gris-texto)", fontSize: "1.1rem", marginBottom: "1.5rem" }}>{etapa.descripcion}</p>
            <NavLink to="/auth" className="btn btn-primary">🚀 Empezar prueba gratis</NavLink>
          </div>
          <img
            src={etapa.img}
            alt={etapa.titulo}
            loading="lazy"
            style={{ width: "100%", borderRadius: "var(--radio)", boxShadow: "var(--sombra)" }}
          />
        </div>

        <h2 style={{ fontSize: "1.5rem", fontWeight: 900, margin: "3rem 0 1.2rem" }}>Materias disponibles</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
          {etapa.materias.map((m) => (
            <span
              key={m}
              style={{
                background: "var(--gris-claro)",
                padding: "0.6rem 1.1rem",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
