// src/pages/Temario.jsx
// Mapa de temario navegable, al estilo Khan Academy: el alumno elige
// materia, ve la lista real de temas del currículo oficial, y al hacer
// clic entra directo al chat centrado en ese tema exacto.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import RutaProtegida from "../components/RutaProtegida";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

const MATERIAS_POR_ETAPA = {
  primaria: [{ valor: "matematicas", etiqueta: "Matemáticas" }, { valor: "lengua", etiqueta: "Lengua" }],
  eso: [
    { valor: "matematicas", etiqueta: "Matemáticas" },
    { valor: "lengua_castellana", etiqueta: "Lengua Castellana y Literatura" },
    { valor: "fisica_quimica", etiqueta: "Física y Química" },
    { valor: "biologia_geologia", etiqueta: "Biología y Geología" },
    { valor: "geografia_historia", etiqueta: "Geografía e Historia" },
    { valor: "lengua_extranjera", etiqueta: "Inglés" },
  ],
  bachillerato: [
    { valor: "matematicas", etiqueta: "Matemáticas" },
    { valor: "fisica", etiqueta: "Física" },
    { valor: "quimica", etiqueta: "Química" },
    { valor: "historia_espana", etiqueta: "Historia de España" },
    { valor: "filosofia", etiqueta: "Filosofía" },
    { valor: "biologia", etiqueta: "Biología" },
    { valor: "lengua_literatura", etiqueta: "Lengua y Literatura" },
    { valor: "economia", etiqueta: "Economía" },
  ],
};

const CURSOS_POR_ETAPA = {
  primaria: ["1", "2", "3", "4", "5", "6"],
  eso: ["1", "2", "3", "4"],
  bachillerato: ["1", "2"],
};

const NOMBRE_ETAPA = {
  primaria: "Primaria",
  eso: "ESO",
  bachillerato: "Bachillerato",
};

// Construye un enlace de búsqueda de YouTube ya filtrado por tema, materia
// y curso — mismo patrón que el usado para "manualidades". No usa la API
// de YouTube, así que no necesita clave ni cuota: solo abre resultados de
// búsqueda normales en una pestaña nueva.
function enlaceYoutube({ tema, materiaEtiqueta, curso, etapa }) {
  const etiquetaCurso = etapa === "eso" ? `${curso}º ESO` : etapa === "bachillerato" ? `${curso}º Bachillerato` : `${curso}º Primaria`;
  // Los "saberes" de ESO/Bachillerato pueden ser frases largas del currículo
  // (no títulos cortos como en Primaria), así que recortamos a las primeras
  // palabras clave para que la búsqueda en YouTube tenga sentido.
  const nombreCorto = tema.nombre.split(" ").slice(0, 8).join(" ");
  const query = `${nombreCorto} ${materiaEtiqueta} ${etiquetaCurso} explicación`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function TemarioContenido() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const etapa = usuario?.etapa || "eso";

  const [materia, setMateria] = useState(MATERIAS_POR_ETAPA[etapa][0].valor);
  const [curso, setCurso] = useState(CURSOS_POR_ETAPA[etapa][0]);
  const [temas, setTemas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const materiaEtiqueta = MATERIAS_POR_ETAPA[etapa].find((m) => m.valor === materia)?.etiqueta || "";

  useEffect(() => {
    setCargando(true);
    setError("");
    api
      .temario({ etapa, curso, materia })
      .then((datos) => setTemas(datos.temas || []))
      .catch(() => setError("No se pudo cargar el temario ahora mismo."))
      .finally(() => setCargando(false));
  }, [etapa, curso, materia]);

  function abrirTema(tema) {
    const params = new URLSearchParams({ materia, curso, tema: tema.nombre });
    navigate(`/app?${params.toString()}`);
  }

  // Agrupa por bloque (ESO/Bachillerato) para mostrar subtítulos tipo unidad.
  // En Primaria no hay "bloque", así que se muestran todos bajo un único grupo.
  const grupos = agruparPorBloque(temas);

  return (
    <>
      <Seo title="Temario" description="Mapa de temario del currículo oficial." path="/temario" />
      <Navbar />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 900, marginBottom: "0.4rem" }}>Temario</h1>
        <p style={{ color: "var(--gris-texto)", marginBottom: "1.5rem" }}>
          Elige un tema y la Profe te ayudará directamente con él.
        </p>

        <div style={{ display: "flex", gap: "0.6rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <select value={curso} onChange={(e) => setCurso(e.target.value)} style={selectStyle}>
            {CURSOS_POR_ETAPA[etapa].map((c) => (
              <option key={c} value={c}>{c}.º</option>
            ))}
          </select>
          <select value={materia} onChange={(e) => setMateria(e.target.value)} style={selectStyle}>
            {MATERIAS_POR_ETAPA[etapa].map((m) => (
              <option key={m.valor} value={m.valor}>{m.etiqueta}</option>
            ))}
          </select>
        </div>

        {cargando && <p style={{ color: "var(--gris-texto)" }}>Cargando temario...</p>}
        {error && <p style={{ color: "var(--naranja)" }}>{error}</p>}
        {!cargando && !error && temas.length === 0 && (
          <p style={{ color: "var(--gris-texto)" }}>
            Todavía no tenemos el temario detallado de esta combinación — puedes preguntarle
            directamente a la Profe en el chat.
          </p>
        )}

        {grupos.map((grupo) => (
          <div key={grupo.nombre} style={{ marginBottom: "2rem" }}>
            {grupo.nombre && (
              <h2 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "0.7rem", color: "var(--azul-principal)" }}>
                {grupo.nombre}
              </h2>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {grupo.items.map((tema) => (
                <div
                  key={tema.id}
                  className="feature-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.4rem 0.6rem 0.4rem 1.2rem",
                  }}
                >
                  <button
                    onClick={() => abrirTema(tema)}
                    style={{
                      flex: 1,
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      padding: "0.6rem 0",
                      cursor: "pointer",
                      border: "none",
                      background: "none",
                      fontFamily: "inherit",
                      fontSize: "0.95rem",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>📘</span>
                    <span>{tema.nombre}</span>
                  </button>
                  <a
                    href={enlaceYoutube({ tema, materiaEtiqueta, curso, etapa })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.5rem 0.8rem",
                      borderRadius: "50px",
                      background: "var(--gris-claro)",
                      color: "var(--gris-texto)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                    }}
                    title={`Buscar vídeos sobre ${tema.nombre} en YouTube`}
                  >
                    ▶ Vídeos
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function agruparPorBloque(temas) {
  const conBloque = temas.some((t) => t.bloque);
  if (!conBloque) return [{ nombre: null, items: temas }];

  const mapa = {};
  temas.forEach((t) => {
    const clave = t.bloque || "Otros";
    if (!mapa[clave]) mapa[clave] = [];
    mapa[clave].push(t);
  });
  return Object.entries(mapa).map(([nombre, items]) => ({ nombre, items }));
}

const selectStyle = {
  padding: "0.6rem 0.9rem",
  borderRadius: "var(--radio-sm)",
  border: "2px solid #e0e0e0",
  fontFamily: "inherit",
  fontWeight: 600,
};

export default function Temario() {
  return (
    <RutaProtegida>
      <TemarioContenido />
    </RutaProtegida>
  );
}
