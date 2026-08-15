// src/pages/ConsentimientoOk.jsx
import { useSearchParams, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

export default function ConsentimientoOk() {
  const [params] = useSearchParams();
  const yaEstaba = params.get("ya_estaba") === "true";

  return (
    <>
      <Seo title="Cuenta confirmada" description="Consentimiento parental confirmado." path="/consentimiento-ok" />
      <Navbar />
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <div style={{ maxWidth: 480 }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.8rem" }}>¡Cuenta confirmada!</h1>
          <p style={{ color: "var(--gris-texto)", marginBottom: "2rem" }}>
            {yaEstaba
              ? "Esta cuenta ya estaba confirmada anteriormente. Puedes iniciar sesión con normalidad."
              : "Gracias por confirmar el permiso. La cuenta ya está activa y tu hijo/a puede empezar a usar Tu Profe en Casa."}
          </p>
          <NavLink to="/auth" className="btn btn-primary">Iniciar sesión ahora</NavLink>
        </div>
      </div>
    </>
  );
}
