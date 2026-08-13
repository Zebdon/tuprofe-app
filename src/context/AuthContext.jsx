// src/context/AuthContext.jsx
// Gestiona la sesión del alumno. Se persiste en localStorage bajo la clave
// "tuprofe_sesion" para que no se pierda al cambiar de pestaña, recargar la
// página o volver a abrir el navegador — solo guarda el id del alumno y
// datos no sensibles (nombre, etapa, estado de consentimiento), nunca la
// contraseña ni ningún dato delicado.

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);
const CLAVE_SESION = "tuprofe_sesion";

export function AuthProvider({ children }) {
  const [usuario, setUsuarioState] = useState(null); // { id, nombreAlumno, etapa, estadoConsentimiento }
  const [cargando, setCargando] = useState(true);

  // Al montar la app, recupera la sesión guardada (si existe)
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_SESION);
      if (guardado) setUsuarioState(JSON.parse(guardado));
    } catch {
      localStorage.removeItem(CLAVE_SESION);
    }
    setCargando(false);
  }, []);

  const setUsuario = useCallback((datosUsuario) => {
    setUsuarioState(datosUsuario);
    if (datosUsuario) {
      localStorage.setItem(CLAVE_SESION, JSON.stringify(datosUsuario));
    } else {
      localStorage.removeItem(CLAVE_SESION);
    }
  }, []);

  const iniciarSesion = useCallback(async (email, password) => {
    setCargando(true);
    try {
      const datos = await api.login({ email, password });
      setUsuario(datos.usuario);
      return datos.usuario;
    } finally {
      setCargando(false);
    }
  }, [setUsuario]);

  const cerrarSesion = useCallback(() => {
    setUsuario(null);
  }, [setUsuario]);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, iniciarSesion, cerrarSesion, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
