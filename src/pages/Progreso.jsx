// src/pages/Progreso.jsx
// Vista para que los padres/tutores vean la actividad de su hijo/a:
// cuántas sesiones ha tenido, en qué materias, y ahora también en qué
// TEMAS concretos dentro de cada materia — con un vistazo tipo "practicado
// / en progreso" en vez de solo un número total.

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import RutaProtegida from "../components/RutaProtegida";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

function ProgresoContenido() {
  const { usuario } = useAuth();
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .progreso({ usuarioId: usuario.id })
      .then(setDatos)
      .catch(() => setError("No se pudo cargar el progreso ahora mismo."))
      .finally(() => setCargando(false));
  }, [usuario.id]);

  return (
    <>
      <Seo title="Progreso" description="Progreso académico del alumno." path="/progreso" />
      <Navbar />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.4rem" }}>
          Progreso de {usuario.nombreAlumno}
        </h1>
        <p style={{ color: "var(--gris-texto)", marginBottom: "2rem" }}>
          Un resumen de la actividad reciente en Tu Profe en Casa.
        </p>

        {cargando && <p style={{ color: "var(--gris-texto)" }}>Cargando...</p>}
        {error && <p style={{ color: "var(--naranja)" }}>{error}</p>}

        {datos && (
          <>
            <div className="progreso-stats-grid">
              <div className="progreso-stat-card progreso-stat-racha">
                <div className="progreso-stat-num">🔥 {datos.rachaDias}</div>
                <div className="progreso-stat-label">{datos.rachaDias === 1 ? "día seguido" : "días seguidos"}</div>
              </div>
              <div className="progreso-stat-card">
                <div className="progreso-stat-num">{datos.totalSesiones}</div>
                <div className="progreso-stat-label">Preguntas totales</div>
              </div>
              <div className="progreso-stat-card">
                <div className="progreso-stat-num">{datos.materiasDistintas}</div>
                <div className="progreso-stat-label">Materias trabajadas</div>
              </div>
              <div className="progreso-stat-card">
                <div className="progreso-stat-num">{datos.ultimaActividad || "—"}</div>
                <div className="progreso-stat-label">Última actividad</div>
              </div>
            </div>

            {datos.porMateria.length === 0 && (
              <p style={{ color: "var(--gris-texto)", marginTop: "1rem" }}>
                Todavía no hay actividad registrada. En cuanto {usuario.nombreAlumno} empiece a
                usar la Profe, aquí aparecerá su progreso por materia y por tema.
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1rem" }}>
              {datos.porMateria.map((m) => (
                <TarjetaMateria key={m.materia} materia={m} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function TarjetaMateria({ materia }) {
  const practicados = materia.temas.filter((t) => t.estado === "practicado").length;
  const totalTemas = materia.temas.length;

  return (
    <div className="progreso-materia-card">
      <div className="progreso-materia-header">
        <div>
          <h2 className="progreso-materia-nombre">{materia.materia}</h2>
          <p className="progreso-materia-meta">
            {materia.conteo} {materia.conteo === 1 ? "pregunta" : "preguntas"} · última vez {materia.ultimaVez}
          </p>
        </div>
        {totalTemas > 0 && (
          <div className="progreso-materia-badge">
            {practicados}/{totalTemas} temas practicados
          </div>
        )}
      </div>

      {totalTemas > 0 ? (
        <div className="progreso-temas-lista">
          {materia.temas.map((t) => (
            <div key={t.tema} className="progreso-tema-fila">
              <span className={`progreso-tema-check ${t.estado === "practicado" ? "ok" : ""}`}>
                {t.estado === "practicado" ? "✓" : "●"}
              </span>
              <span className="progreso-tema-nombre" title={t.tema}>{t.tema}</span>
              <span className={`progreso-tema-estado ${t.estado === "practicado" ? "ok" : ""}`}>
                {t.estado === "practicado" ? "Practicado" : "En progreso"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="progreso-materia-sin-temas">
          Preguntas sueltas, sin pasar por el mapa de temario todavía. Anímale a entrar por
          "Ver temario" para poder ver aquí el desglose por tema.
        </p>
      )}
    </div>
  );
}

export default function Progreso() {
  return (
    <RutaProtegida>
      <ProgresoContenido />
    </RutaProtegida>
  );
}
