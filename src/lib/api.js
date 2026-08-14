// src/lib/api.js
// Cliente centralizado de llamadas al backend.
//
// LECCIÓN DE ZEBCYTEC: las rutas relativas ("/api/tutor") funcionan en el
// navegador porque el origen es el mismo dominio, pero DENTRO de un WebView
// nativo (Capacitor en Android/iOS) el origen es "capacitor://localhost" o
// "file://", así que una ruta relativa nunca llega al backend real.
//
// La solución es la misma que en Zebcytec: una variable de entorno
// VITE_API_URL que apunta siempre al dominio real de producción, y todas
// las llamadas pasan por este único cliente en vez de usar fetch('/api/...')
// sueltos por los componentes.

const BASE_URL = import.meta.env.VITE_API_URL || "";
// En desarrollo web normal (npm run dev), BASE_URL vacío + rutas relativas
// funciona igual que antes gracias al proxy de Vite. En build para Capacitor,
// VITE_API_URL SIEMPRE debe estar definida apuntando a tu dominio de Vercel
// (ej. "https://tuprofeencasa.com"), nunca dejarla vacía.

async function peticion(ruta, opciones = {}) {
  const res = await fetch(`${BASE_URL}${ruta}`, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });
  const datos = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(datos.error || "Error de red");
    error.codigo = datos.error;
    error.detalle = datos;
    error.status = res.status;
    throw error;
  }
  return datos;
}

export const api = {
  registro: (body) => peticion("/api/registro", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => peticion("/api/login", { method: "POST", body: JSON.stringify(body) }),
  tutor: (body) => peticion("/api/tutor", { method: "POST", body: JSON.stringify(body) }),
  progreso: (body) => peticion("/api/progreso", { method: "POST", body: JSON.stringify(body) }),
};