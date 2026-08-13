// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import RutaProtegida from "./components/RutaProtegida";
import Home from "./pages/Home";
import EtapaPage from "./pages/EtapaPage";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import ConsentimientoPendiente from "./pages/ConsentimientoPendiente";
import Legal from "./pages/Legal";
import "./style.css";

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/etapa/:slug" element={<EtapaPage />} />
            <Route path="/legal/:tipo" element={<Legal />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/consentimiento-pendiente" element={<ConsentimientoPendiente />} />
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
