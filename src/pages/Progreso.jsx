// src/pages/Progreso.jsx
// Vista para que los padres/tutores vean la actividad de su hijo/a:
// cuántas sesiones ha tenido, en qué materias, cuándo fue la última vez.
// Usa la misma cuenta/login que el alumno (el email del tutor es el que
// ya identifica la cuenta), así que no hace falta un sistema de login aparte.

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
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.4rem" }}>
          Progreso de {usuario.nombreAlumno}
        </h1>
        <p style={{ color: "var(--gris-texto)", marginBottom: "2rem" }}>
          Un resumen de la actividad reciente en Tu Profe en Casa.
        </p>

        {cargando && <p>Cargando...</p>}
        {error && <p style={{ color: "var(--naranja)" }}>{error}</p>}

        {datos && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              <div className="progreso-stat-card">
                <div className="progreso-stat-num">{datos.totalSesiones}</div>
                <div>Preguntas totales</div>
              </div>
              <div className="progreso-stat-card">
                <div className="progreso-stat-num">{datos.materiasDistintas}</div>
                <div>Materias trabajadas</div>
              </div>
              <div className="progreso-stat-card">
                <div className="progreso-stat-num">{datos.ultimaActividad || "—"}</div>
                <div>Última actividad</div>
              </div>
            </div>

            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.6rem" }}>Actividad por materia</h2>
            <table className="progreso-tabla">
              <thead>
                <tr>
                  <th>Materia</th>
                  <th>Preguntas</th>
                  <th>Última vez</th>
                </tr>
              </thead>
              <tbody>
                {datos.porMateria.map((m) => (
                  <tr key={m.materia}>
                    <td>{m.materia}</td>
                    <td>{m.conteo}</td>
                    <td>{m.ultimaVez}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default function Progreso() {
  return (
    <RutaProtegida>
      <ProgresoContenido />
    </RutaProtegida>
  );
}
