import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Mientras `vercel dev` da problemas en local (incompatibilidad con
      // Vite 8), reenviamos /api/* al backend YA DESPLEGADO en producción.
      // Así `npm run dev` sigue sirviendo el frontend en localhost:5173,
      // pero las llamadas a login/tutor/progreso/etc. llegan a Vercel real.
      //
      // ⚠️ Importante: esto llama a la base de datos y a la IA REALES de
      // producción, no a datos de prueba. Ten cuidado con qué pruebas aquí
      // (ej. no lo uses para probar borrado de cuentas de verdad).
      '/api': {
        target: 'https://tuprofe-app.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})