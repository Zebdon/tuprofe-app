// src/pages/RestablecerPassword.jsx
import { useState } from "react";
import { useSearchParams, NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import { api } from "../lib/api";

export default function RestablecerPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [listo, setListo] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setError("");
    try {
      await api.restablecerPassword({ token, password });
      setListo(true);
      setTimeout(() => navigate("/auth"), 2500);
    } catch (err) {
      setError(err.message || "No se pudo actualizar la contraseña.");
    } finally {
      setEnviando(false);
    }
  }

  if (!token) {
    return (
      <>
        <Navbar />
        <div style={{ maxWidth: 420, margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
          <p style={{ color: "var(--gris-texto)", marginBottom: "1.5rem" }}>
            Este enlace no es válido. Usa el botón del email que recibiste.
          </p>
          <NavLink to="/recuperar-password" className="btn btn-primary">Solicitar un nuevo enlace</NavLink>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title="Elegir nueva contraseña" description="Establece tu nueva contraseña." path="/restablecer-password" />
      <Navbar />
      <div style={{ maxWidth: 420, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "1.5rem" }}>Elige tu nueva contraseña</h1>

        {listo ? (
          <p style={{ color: "var(--gris-texto)" }}>
            ¡Contraseña actualizada! Te llevamos al inicio de sesión...
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nueva contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
              />
            </div>
            {error && <p style={{ color: "var(--naranja)", marginBottom: "1rem", fontWeight: 600 }}>{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={enviando} style={{ width: "100%", justifyContent: "center" }}>
              {enviando ? "Guardando..." : "Guardar nueva contraseña"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
