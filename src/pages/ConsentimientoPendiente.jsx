// src/pages/ConsentimientoPendiente.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ConsentimientoPendiente() {
  const { usuario, cerrarSesion } = useAuth();
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <div style={{ maxWidth: 480 }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📩</div>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.8rem" }}>
          Falta un paso, {usuario?.nombreAlumno}
        </h1>
        <p style={{ color: "var(--gris-texto)", marginBottom: "2rem" }}>
          Como eres menor de 14 años, necesitamos que tu padre, madre o tutor/a confirme el
          permiso desde el correo que le enviamos al registrarte. En cuanto lo confirme, ya
          podrás hablar con la Profe.
        </p>
        <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
          {/* Vuelve a la portada SIN cerrar sesión — para poder volver a comprobar más tarde */}
          <NavLink to="/" className="btn btn-primary">← Volver a la portada</NavLink>
          {/* Cierre de sesión explícito, separado y claramente etiquetado */}
          <button onClick={cerrarSesion} className="btn btn-outline">Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}
