// api/_cors.js
// Ayudante compartido para permitir llamadas cross-origin a las Vercel
// Functions. Es necesario porque la app empaquetada con Capacitor para
// Android/iOS carga el frontend desde el origen "https://localhost" (no
// desde tuprofe-app.vercel.app / loentiendes.com), así que toda petición
// fetch() a la API es "cross-origin" desde el punto de vista del WebView.
// Sin estas cabeceras, el navegador bloquea la respuesta antes de que el
// código JS la vea, y aparece como "Failed to fetch" — aunque la petición
// SÍ llega al servidor y se ejecuta correctamente.
//
// Devuelve true si la petición era un preflight OPTIONS ya respondido
// (en ese caso el handler debe devolver inmediatamente sin hacer más).
export function aplicarCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}
