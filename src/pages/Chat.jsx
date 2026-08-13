// src/pages/Chat.jsx
// Pantalla principal de la app: el alumno elige curso/materia y conversa
// con la Profe IA. Consume directamente api/tutor.js, que ya trae el
// candado de consentimiento parental y el anclaje al currículo real.

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

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

export default function Chat() {
  const { usuario, cerrarSesion } = useAuth();
  const etapa = usuario?.etapa || "eso";

  const [materia, setMateria] = useState(MATERIAS_POR_ETAPA[etapa][0].valor);
  const [curso, setCurso] = useState(CURSOS_POR_ETAPA[etapa][0]);
  const [mensajes, setMensajes] = useState([
    { role: "assistant", content: "¡Hola! 👋 Soy tu Profe. Cuéntame, ¿en qué tema quieres que te ayude hoy?" },
  ]);
  const [entrada, setEntrada] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [avisoBloqueo, setAvisoBloqueo] = useState(null);
  const finalRef = useRef(null);

  useEffect(() => {
    finalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  async function enviarMensaje(e) {
    e.preventDefault();
    const texto = entrada.trim();
    if (!texto || enviando) return;

    const nuevosMensajes = [...mensajes, { role: "user", content: texto }];
    setMensajes(nuevosMensajes);
    setEntrada("");
    setEnviando(true);
    setAvisoBloqueo(null);

    try {
      const datos = await api.tutor({
        usuarioId: usuario.id,
        mensaje: texto,
        historial: nuevosMensajes.slice(0, -1), // sin el mensaje que se acaba de enviar
        etapa,
        curso,
        materia,
      });
      setMensajes((prev) => [...prev, { role: "assistant", content: datos.respuesta }]);
    } catch (err) {
      // Candados de consentimiento parental (403) u otros errores controlados
      if (err.codigo === "consentimiento_pendiente" || err.codigo === "cuenta_revocada") {
        setAvisoBloqueo(err.detalle.mensaje);
        setMensajes(mensajes); // deshacemos el mensaje del alumno, no se procesó
        return;
      }
      setMensajes((prev) => [
        ...prev,
        { role: "assistant", content: "Ups, algo ha fallado al procesar tu mensaje. ¿Puedes intentarlo de nuevo?" },
      ]);
      console.error(err);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--fondo)" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.8rem 1.2rem",
          background: "var(--blanco)",
          boxShadow: "var(--sombra)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontWeight: 800, color: "var(--azul-principal)" }}>
          <div className="logo-icon">📚</div>
          {usuario?.nombreAlumno || "Alumno/a"}
        </div>
        <button onClick={cerrarSesion} className="btn btn-outline">Salir</button>
      </header>

      <div style={{ display: "flex", gap: "0.6rem", padding: "0.8rem 1.2rem", background: "var(--blanco)" }}>
        <select value={etapa} disabled style={selectStyle}>
          <option value={etapa}>{etapa === "eso" ? "ESO" : etapa === "bachillerato" ? "Bachillerato" : "Primaria"}</option>
        </select>
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

      {avisoBloqueo && (
        <div style={{ background: "#fff3e0", color: "#e65100", padding: "0.9rem 1.2rem", fontWeight: 600 }}>
          ⚠️ {avisoBloqueo}
        </div>
      )}

      <main style={{ flex: 1, overflowY: "auto", padding: "1.2rem" }}>
        {mensajes.map((m, i) => (
          <Burbuja key={i} role={m.role} content={m.content} />
        ))}
        {enviando && <Burbuja role="assistant" content="Escribiendo..." atenuado />}
        <div ref={finalRef} />
      </main>

      <form onSubmit={enviarMensaje} style={{ display: "flex", gap: "0.6rem", padding: "1rem", background: "var(--blanco)" }}>
        <input
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          placeholder="Escribe tu pregunta..."
          disabled={enviando}
          style={{
            flex: 1,
            padding: "0.85rem 1.1rem",
            border: "2px solid #e0e0e0",
            borderRadius: "var(--radio-sm)",
            fontSize: "1rem",
            fontFamily: "inherit",
          }}
        />
        <button type="submit" className="btn btn-primary" disabled={enviando}>Enviar</button>
      </form>
    </div>
  );
}

function Burbuja({ role, content, atenuado }) {
  const esAlumno = role === "user";
  return (
    <div style={{ display: "flex", justifyContent: esAlumno ? "flex-end" : "flex-start", marginBottom: "0.8rem" }}>
      <div
        style={{
          maxWidth: "75%",
          padding: "0.8rem 1.1rem",
          borderRadius: "var(--radio)",
          background: esAlumno ? "var(--azul-principal)" : "var(--blanco)",
          color: esAlumno ? "white" : "var(--texto-oscuro)",
          boxShadow: "var(--sombra)",
          opacity: atenuado ? 0.6 : 1,
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </div>
    </div>
  );
}

const selectStyle = {
  padding: "0.5rem 0.8rem",
  borderRadius: "var(--radio-sm)",
  border: "2px solid #e0e0e0",
  fontFamily: "inherit",
  fontWeight: 600,
};
