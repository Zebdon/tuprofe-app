// src/pages/RecuperarPassword.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import { api } from "../lib/api";

export default function RecuperarPassword() {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setError("");
    try {
      await api.solicitarReset({ email });
      setEnviado(true);
    } catch (err) {
      setError(err.message || "Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <Seo title="Recuperar contraseña" description="Restablece tu contraseña de Tu Profe en Casa." path="/recuperar-password" />
      <Navbar />
      <div style={{ maxWidth: 420, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.5rem" }}>¿Olvidaste tu contraseña?</h1>

        {enviado ? (
          <div>
            <p style={{ color: "var(--gris-texto)", marginBottom: "1.5rem" }}>
              Si ese correo está registrado, te hemos enviado un enlace para elegir una contraseña nueva.
              Revisa tu bandeja de entrada (y la carpeta de spam).
            </p>
            <NavLink to="/auth" className="btn btn-primary">Volver al inicio de sesión</NavLink>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ color: "var(--gris-texto)", marginBottom: "1.5rem" }}>
              Escribe el correo del tutor/a con el que te registraste, y te enviaremos un enlace para restablecerla.
            </p>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            {error && <p style={{ color: "var(--naranja)", marginBottom: "1rem", fontWeight: 600 }}>{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={enviando} style={{ width: "100%", justifyContent: "center" }}>
              {enviando ? "Enviando..." : "Enviar enlace de recuperación"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
