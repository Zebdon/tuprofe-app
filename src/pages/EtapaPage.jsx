// src/pages/EtapaPage.jsx
// Página DINÁMICA: una sola plantilla que renderiza contenido distinto
// según el parámetro de la URL (/etapa/primaria, /etapa/secundaria, ...).
// Esto evita triplicar código para Primaria/ESO/Bachillerato: el contenido
// vive en un solo objeto de datos y la ruta decide qué mostrar.

import { useState } from "react";
import { useParams, Navigate, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

const DATOS_ETAPA = {
  primaria: {
    titulo: "Educación Primaria",
    cursos: "1.º a 6.º de Primaria",
    descripcion: "Acompañamos los primeros pasos del aprendizaje con pistas visuales y manipulativas, adaptadas a cómo aprenden los niños y niñas de esta edad.",
    img: "/images/ninos_primaria.jpg",
    color: "#34a853",
    materias: [
      {
        nombre: "Matemáticas",
        info: "Números, operaciones básicas, medidas y resolución de problemas, explicados paso a paso con ejemplos visuales adaptados a cada curso de Primaria.",
      },
      {
        nombre: "Lengua Castellana",
        info: "Lectura, escritura, gramática y comprensión, con ejercicios cercanos a lo que se trabaja en clase cada trimestre.",
      },
    ],
  },
  secundaria: {
    titulo: "ESO — Secundaria",
    cursos: "1.º a 4.º de la ESO",
    descripcion: "Todas las materias troncales de la ESO, con un tono cercano y directo, ideal para reforzar deberes y preparar exámenes.",
    img: "/images/profe_eso.jpg",
    color: "#1a73e8",
    materias: [
      {
        nombre: "Matemáticas",
        info: "Álgebra, geometría, funciones y estadística siguiendo el currículo oficial de cada curso de la ESO, con explicación paso a paso de cada ejercicio.",
      },
      {
        nombre: "Lengua",
        info: "Gramática, literatura, comprensión lectora y expresión escrita, con apoyo para trabajos y análisis de textos.",
      },
      {
        nombre: "Física y Química",
        info: "Desde los conceptos básicos de materia y energía hasta reacciones químicas y cinemática, con fórmulas explicadas de forma clara (¡y puedes mandar una foto de tu libreta si te atascas con una fórmula!).",
      },
      {
        nombre: "Biología y Geología",
        info: "Célula, ecosistemas, geología y cuerpo humano, con esquemas y explicaciones adaptadas a cada curso.",
      },
      {
        nombre: "Geografía e Historia",
        info: "Desde la Prehistoria hasta la historia contemporánea, y geografía física y humana, con contexto y mapas mentales.",
      },
      {
        nombre: "Inglés",
        info: "Gramática, vocabulario y comprensión, con práctica conversacional guiada por la Profe.",
      },
    ],
  },
  bachillerato: {
    titulo: "Bachillerato",
    cursos: "1.º y 2.º de Bachillerato",
    descripcion: "Preparación de nivel EBAU/Selectividad en las materias clave, con el rigor académico que necesita esta etapa.",
    img: "/images/profe_alumno.jpg",
    color: "#7c4dff",
    materias: [
      { nombre: "Matemáticas I y II", info: "Análisis, álgebra y probabilidad al nivel exigido en la EBAU, con ejercicios tipo examen." },
      { nombre: "Física", info: "Mecánica, ondas, electromagnetismo y física moderna, con resolución detallada de problemas tipo EBAU." },
      { nombre: "Química", info: "Estructura atómica, enlace, termoquímica y química orgánica, con nomenclatura y ejercicios de examen." },
      { nombre: "Historia de España", info: "Del siglo XIX a la actualidad, con el enfoque y los bloques temáticos que pide la EBAU." },
      { nombre: "Filosofía", info: "Autores y corrientes del temario oficial, con ayuda para estructurar comentarios de texto." },
      { nombre: "Biología", info: "Bioquímica, genética, fisiología y microbiología a nivel de Bachillerato, con esquemas claros." },
      { nombre: "Lengua y Literatura", info: "Comentario de texto, gramática avanzada y movimientos literarios, con práctica guiada." },
      { nombre: "Economía", info: "Macro y microeconomía, con explicación de conceptos y práctica de ejercicios tipo examen." },
    ],
  },
};

export default function EtapaPage() {
  const { slug } = useParams();
  const etapa = DATOS_ETAPA[slug];
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  if (!etapa) return <Navigate to="/" replace />;

  return (
    <>
      <Seo
        title={etapa.titulo}
        description={`${etapa.descripcion} Materias disponibles: ${etapa.materias.map((m) => m.nombre).join(", ")}.`}
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
        <p style={{ color: "var(--gris-texto)", fontSize: "0.95rem", marginTop: "-0.7rem", marginBottom: "1.2rem" }}>
          Pulsa una materia para ver qué se trabaja en ella.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
          {etapa.materias.map((m) => {
            const seleccionada = materiaSeleccionada?.nombre === m.nombre;
            return (
              <button
                key={m.nombre}
                type="button"
                onClick={() => setMateriaSeleccionada(seleccionada ? null : m)}
                style={{
                  background: seleccionada ? etapa.color : "var(--gris-claro)",
                  color: seleccionada ? "#fff" : "inherit",
                  padding: "0.6rem 1.1rem",
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {m.nombre}
              </button>
            );
          })}
        </div>

        {materiaSeleccionada && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1.5rem",
              borderRadius: "var(--radio)",
              background: "var(--gris-claro)",
              borderLeft: `4px solid ${etapa.color}`,
            }}
          >
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.6rem" }}>
              {materiaSeleccionada.nombre}
            </h3>
            <p style={{ color: "var(--gris-texto)", fontSize: "1rem", marginBottom: "1.2rem" }}>
              {materiaSeleccionada.info}
            </p>
            <NavLink to="/auth" className="btn btn-primary">
              🚀 Empezar con {materiaSeleccionada.nombre}
            </NavLink>
          </div>
        )}
      </section>
    </>
  );
}
