// src/pages/Chat.jsx
// Pantalla principal de la app: el alumno elige curso/materia y conversa
// con la Profe IA. Consume directamente api/tutor.js, que ya trae el
// candado de consentimiento parental y el anclaje al currículo real.
// Soporta adjuntar/hacer una foto (ej. de la libreta) y renderiza fórmulas
// matemáticas en LaTeX con KaTeX.

import { useState, useRef, useEffect } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import katex from "katex";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import AsidePanel from "../components/AsidePanel";

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

// Tamaño máximo de imagen antes de comprimir (lado más largo, en píxeles).
// Fotos de móvil suelen ser enormes (4000px+) — las reducimos para que la
// subida sea rápida y no dispare el coste de la llamada a la IA.
const LADO_MAXIMO_IMAGEN = 1280;

export default function Chat() {
  const { usuario, cerrarSesion } = useAuth();
  const etapa = usuario?.etapa || "eso";
  const [params] = useSearchParams();

  // Si se llega desde el Temario (con ?materia=X&curso=Y&tema=Z en la URL),
  // arrancamos ya con esa materia/curso seleccionados y con el tema como
  // primera pregunta, en vez del saludo genérico de siempre.
  const materiaInicial = params.get("materia") || MATERIAS_POR_ETAPA[etapa][0].valor;
  const cursoInicial = params.get("curso") || CURSOS_POR_ETAPA[etapa][0];
  const temaInicial = params.get("tema");

  const [materia, setMateria] = useState(materiaInicial);
  const [curso, setCurso] = useState(cursoInicial);
  const [mensajes, setMensajes] = useState([
    { role: "assistant", content: "¡Hola! 👋 Soy tu Profe. Cuéntame, ¿en qué tema quieres que te ayude hoy?" },
  ]);
  const [entrada, setEntrada] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [avisoBloqueo, setAvisoBloqueo] = useState(null);
  const [imagenAdjunta, setImagenAdjunta] = useState(null); // { data, mediaType, previewUrl }
  const [comprimiendo, setComprimiendo] = useState(false);
  const [errorImagen, setErrorImagen] = useState("");
  const finalRef = useRef(null);
  const inputArchivoRef = useRef(null);

  useEffect(() => {
    finalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  // Al llegar desde el Temario con un tema concreto, lo enviamos como
  // primera pregunta automáticamente — así el alumno no tiene que
  // reescribir lo que ya eligió en la pantalla anterior.
  useEffect(() => {
    if (temaInicial) {
      enviarMensajeTexto(`Quiero que me ayudes con este tema: "${temaInicial}"`);
    }
    // Solo debe dispararse una vez, al montar el componente con el tema de la URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function manejarSeleccionArchivo(e) {
    const archivo = e.target.files?.[0];
    e.target.value = ""; // permite volver a elegir el mismo archivo si hace falta
    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
      setErrorImagen("Solo se pueden adjuntar imágenes.");
      return;
    }

    setErrorImagen("");
    setComprimiendo(true);
    try {
      const { data, mediaType, previewUrl } = await comprimirImagen(archivo);
      setImagenAdjunta({ data, mediaType, previewUrl });
    } catch (err) {
      console.error(err);
      setErrorImagen("No se pudo procesar la imagen. Prueba con otra foto.");
    } finally {
      setComprimiendo(false);
    }
  }

  function quitarImagen() {
    setImagenAdjunta(null);
    setErrorImagen("");
  }

  async function enviarMensajeTexto(textoForzado) {
    const texto = (textoForzado !== undefined ? textoForzado : entrada).trim();
    if ((!texto && !imagenAdjunta) || enviando) return;

    const nuevoMensajeUsuario = {
      role: "user",
      content: texto || "(foto de mi libreta)",
      imagenPreview: imagenAdjunta?.previewUrl,
    };
    const nuevosMensajes = [...mensajes, nuevoMensajeUsuario];
    setMensajes(nuevosMensajes);

    const imagenParaEnviar = imagenAdjunta
      ? { data: imagenAdjunta.data, mediaType: imagenAdjunta.mediaType }
      : undefined;

    setEntrada("");
    setImagenAdjunta(null);
    setEnviando(true);
    setAvisoBloqueo(null);

    try {
      const datos = await api.tutor({
        usuarioId: usuario.id,
        mensaje: texto,
        historial: nuevosMensajes.slice(0, -1).map(({ role, content }) => ({ role, content })), // sin campos de imagen, sin el mensaje que se acaba de enviar
        etapa,
        curso,
        materia,
        imagen: imagenParaEnviar,
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

  function enviarMensaje(e) {
    e.preventDefault();
    enviarMensajeTexto();
  }

  return (
    <div className="app-layout">
    <div className="app-main" style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--fondo)" }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <NavLink to="/temario" className="btn btn-outline">📖 Ver temario</NavLink>
          <button onClick={cerrarSesion} className="btn btn-outline">Salir</button>
        </div>
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
          <Burbuja key={i} role={m.role} content={m.content} imagenPreview={m.imagenPreview} />
        ))}
        {enviando && <Burbuja role="assistant" content="Escribiendo..." atenuado />}
        <div ref={finalRef} />
      </main>

      <form onSubmit={enviarMensaje} style={{ padding: "1rem", background: "var(--blanco)" }}>
        {errorImagen && (
          <p style={{ color: "var(--naranja)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{errorImagen}</p>
        )}

        {imagenAdjunta && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
            <img
              src={imagenAdjunta.previewUrl}
              alt="Foto adjunta"
              style={{ height: 56, width: 56, objectFit: "cover", borderRadius: "var(--radio-sm)", border: "2px solid #e0e0e0" }}
            />
            <span style={{ fontSize: "0.85rem", color: "var(--gris-texto)" }}>Foto lista para enviar</span>
            <button
              type="button"
              onClick={quitarImagen}
              aria-label="Quitar foto"
              style={{ background: "none", border: "none", color: "var(--naranja)", cursor: "pointer", fontWeight: 700 }}
            >
              ✕ Quitar
            </button>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.6rem" }}>
          {/* Botón para adjuntar/hacer una foto — capture="environment" abre
              directamente la cámara trasera en móvil, en vez del selector de archivos */}
          <input
            ref={inputArchivoRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={manejarSeleccionArchivo}
            style={{ display: "none" }}
          />
          <button
            type="button"
            onClick={() => inputArchivoRef.current?.click()}
            disabled={comprimiendo}
            title="Adjuntar foto de tu libreta o ejercicio"
            aria-label="Adjuntar foto"
            style={{
              padding: "0 0.9rem",
              border: "2px solid #e0e0e0",
              borderRadius: "var(--radio-sm)",
              background: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            {comprimiendo ? "⏳" : "📷"}
          </button>

          <input
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            placeholder="Escribe tu pregunta o adjunta una foto..."
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
          <button type="submit" className="btn btn-primary" disabled={enviando || comprimiendo}>Enviar</button>
        </div>
      </form>
    </div>
    <AsidePanel />
    </div>
  );
}

// Redimensiona y comprime la foto en el propio navegador antes de enviarla,
// para que no tarde una eternidad en subir desde un móvil con 4G.
function comprimirImagen(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onerror = () => reject(new Error("No se pudo leer el archivo"));
    lector.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("No se pudo cargar la imagen"));
      img.onload = () => {
        let { width, height } = img;
        if (width > LADO_MAXIMO_IMAGEN || height > LADO_MAXIMO_IMAGEN) {
          const escala = LADO_MAXIMO_IMAGEN / Math.max(width, height);
          width = Math.round(width * escala);
          height = Math.round(height * escala);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        const previewUrl = canvas.toDataURL("image/jpeg", 0.8);
        const data = previewUrl.split(",")[1]; // quita el prefijo "data:image/jpeg;base64,"
        resolve({ data, mediaType: "image/jpeg", previewUrl });
      };
      img.src = lector.result;
    };
    lector.readAsDataURL(archivo);
  });
}

function Burbuja({ role, content, atenuado, imagenPreview }) {
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
        }}
      >
        {imagenPreview && (
          <img
            src={imagenPreview}
            alt="Foto enviada"
            style={{ maxWidth: "100%", borderRadius: "var(--radio-sm)", marginBottom: content ? "0.5rem" : 0 }}
          />
        )}
        {content && (esAlumno ? <span style={{ whiteSpace: "pre-wrap" }}>{content}</span> : <ContenidoConFormulas texto={content} />)}
      </div>
    </div>
  );
}

// Renderiza el texto de la Profe detectando fórmulas en LaTeX: $$...$$ para
// fórmulas en su propia línea, $...$ para fórmulas dentro de una frase.
// El resto del texto se muestra normal (con saltos de línea respetados).
function ContenidoConFormulas({ texto }) {
  const partes = dividirPorFormulas(texto);
  return (
    <span style={{ whiteSpace: "pre-wrap" }}>
      {partes.map((parte, i) => {
        if (parte.tipo === "texto") return <span key={i}>{parte.valor}</span>;
        try {
          const html = katex.renderToString(parte.valor, {
            displayMode: parte.tipo === "bloque",
            throwOnError: false,
          });
          const Etiqueta = parte.tipo === "bloque" ? "div" : "span";
          return <Etiqueta key={i} dangerouslySetInnerHTML={{ __html: html }} />;
        } catch {
          return <span key={i}>{parte.valor}</span>;
        }
      })}
    </span>
  );
}

// Divide un texto en trozos de texto normal y trozos de fórmula LaTeX,
// respetando $$...$$ (bloque) antes que $...$ (en línea) para no confundirlos.
function dividirPorFormulas(texto) {
  const partes = [];
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let ultimoIndice = 0;
  let coincidencia;

  while ((coincidencia = regex.exec(texto)) !== null) {
    if (coincidencia.index > ultimoIndice) {
      partes.push({ tipo: "texto", valor: texto.slice(ultimoIndice, coincidencia.index) });
    }
    if (coincidencia[1] !== undefined) {
      partes.push({ tipo: "bloque", valor: coincidencia[1].trim() });
    } else {
      partes.push({ tipo: "linea", valor: coincidencia[2].trim() });
    }
    ultimoIndice = regex.lastIndex;
  }
  if (ultimoIndice < texto.length) {
    partes.push({ tipo: "texto", valor: texto.slice(ultimoIndice) });
  }
  return partes;
}

const selectStyle = {
  padding: "0.5rem 0.8rem",
  borderRadius: "var(--radio-sm)",
  border: "2px solid #e0e0e0",
  fontFamily: "inherit",
  fontWeight: 600,
};
