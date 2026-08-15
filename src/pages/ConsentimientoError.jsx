// src/pages/ConsentimientoError.jsx
import { useSearchParams, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

const MENSAJES = {
  token_invalido: "Este enlace de confirmación no existe o ya se usó.",
  token_caducado: "Este enlace de confirmación caducó (los enlaces son válidos 7 días). Vuelve a registrar la cuenta.",
  falta_token: "Falta información en el enlace. Por favor, usa el botón del email original.",
  error_servidor: "Ha ocurrido un error inesperado. Inténtalo de nuevo en unos minutos.",
};

export default function ConsentimientoError() {
  const [params] = useSearchParams();
  const motivo = params.get("motivo");
  const detalle = MENSAJES[motivo] || "El enlace de confirmación ha caducado o ya no es válido. Vuelve a intentar el registro o contáctanos si el problema persiste.";

  return (
    <>
      <Seo title="Enlace no válido" description="Enlace de confirmación de consentimiento no válido." path="/consentimiento-error" />
      <Navbar />
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <div style={{ maxWidth: 480 }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.8rem" }}>Este enlace no es válido</h1>
          <p style={{ color: "var(--gris-texto)", marginBottom: "2rem" }}>{detalle}</p>
          <NavLink to="/auth" className="btn btn-primary">Volver al registro</NavLink>
        </div>
      </div>
    </>
  );
}
