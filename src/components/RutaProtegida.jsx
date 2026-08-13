// src/components/RutaProtegida.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RutaProtegida({ children }) {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/auth" replace />;
  if (usuario.requiereConsentimientoParental && usuario.estadoConsentimiento !== "confirmado") {
    return <Navigate to="/consentimiento-pendiente" replace />;
  }
  return children;
}
