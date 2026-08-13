// src/components/RutaProtegida.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RutaProtegida({ children }) {
  const { usuario, cargando } = useAuth();
  if (cargando) return null; // evita un redirect falso mientras se restaura la sesión guardada
  if (!usuario) return <Navigate to="/auth" replace />;
  if (usuario.requiereConsentimientoParental && usuario.estadoConsentimiento !== "confirmado") {
    return <Navigate to="/consentimiento-pendiente" replace />;
  }
  return children;
}
