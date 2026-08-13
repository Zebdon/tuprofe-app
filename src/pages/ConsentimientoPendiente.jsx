// src/pages/ConsentimientoPendiente.jsx
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
        <button onClick={cerrarSesion} className="btn btn-outline">Volver al inicio</button>
      </div>
    </div>
  );
}
