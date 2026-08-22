// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import RutaProtegida from "./components/RutaProtegida";
import Home from "./pages/Home";
import EtapaPage from "./pages/EtapaPage";
import Temario from "./pages/Temario";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import ConsentimientoPendiente from "./pages/ConsentimientoPendiente";
import ConsentimientoOk from "./pages/ConsentimientoOk";
import ConsentimientoError from "./pages/ConsentimientoError";
import Legal from "./pages/Legal";
import Blog from "./pages/Blog";
import BlogArticulo from "./pages/BlogArticulo";
import Progreso from "./pages/Progreso";
import RecuperarPassword from "./pages/RecuperarPassword";
import RestablecerPassword from "./pages/RestablecerPassword";
import "./style.css";

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/etapa/:slug" element={<EtapaPage />} />
            <Route path="/temario" element={<Temario />} />
            <Route path="/legal/:tipo" element={<Legal />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticulo />} />
            <Route path="/progreso" element={<Progreso />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/recuperar-password" element={<RecuperarPassword />} />
            <Route path="/restablecer-password" element={<RestablecerPassword />} />
            <Route path="/consentimiento-pendiente" element={<ConsentimientoPendiente />} />
            <Route path="/consentimiento-ok" element={<ConsentimientoOk />} />
            <Route path="/consentimiento-error" element={<ConsentimientoError />} />
            <Route
              path="/app"
              element={
                <RutaProtegida>
                  <Chat />
                </RutaProtegida>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
