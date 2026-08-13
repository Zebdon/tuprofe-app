// src/context/AuthContext.jsx
// Gestiona la sesión del alumno en memoria durante el uso de la app.
// No usamos localStorage para datos sensibles del menor; el token de sesión
// se maneja vía cookie httpOnly emitida por el backend (a implementar en
// api/login.js — este contexto ya está listo para conectarse a él).

import { createContext, useContext, useState, useCallback } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // { id, nombreAlumno, etapa, estadoConsentimiento }
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = useCallback(async (email, password) => {
    setCargando(true);
    try {
      const datos = await api.login({ email, password });
      setUsuario(datos.usuario);
      return datos.usuario;
    } finally {
      setCargando(false);
    }
  }, []);

  const cerrarSesion = useCallback(() => {
    setUsuario(null);
  }, []);

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
