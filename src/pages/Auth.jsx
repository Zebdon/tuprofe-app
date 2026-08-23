// src/pages/Auth.jsx
// Migración de pages/registro.html a React. Misma identidad visual
// (clases de style.css), pero con estado real y llamadas a la API.

import { useState } from "react";
import { useNavigate, useSearchParams, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

export default function Auth() {
  const [tab, setTab] = useState("registro");
  const [params] = useSearchParams();
  // Si se llega desde el Temario público (sin cuenta) con un tema elegido,
  // lo mostramos aquí como contexto y lo reenviamos al chat tras entrar.
  const temaPendiente = params.get("tema");

  return (
    <>
      <Seo
        title="Crear cuenta o iniciar sesión"
        description="Regístrate gratis en Tu Profe en Casa. 7 días de prueba sin tarjeta de crédito. Currículo oficial LOMLOE de Primaria, ESO y Bachillerato en Asturias."
        path="/auth"
      />
      <Navbar />
      <div className="registro-container">
      <div className="registro-left">
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📚</div>
        <h2>Empieza a aprender hoy</h2>
        <p>Únete a más de 12.000 alumnos que ya mejoran sus notas con Tu Profe en Casa.</p>
        <div className="registro-benefit"><span>✓</span> 7 días de prueba completamente gratis</div>
        <div className="registro-benefit"><span>✓</span> Sin tarjeta de crédito</div>
        <div className="registro-benefit"><span>✓</span> Todas las materias LOMLOE</div>
        <div className="registro-benefit"><span>✓</span> Profe IA con método guía</div>
      </div>

      <div className="registro-right">
        <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.3rem" }}>
          {tab === "registro" ? "Crear cuenta gratis" : "Iniciar sesión"}
        </h2>
        <p style={{ color: "var(--gris-texto)", marginBottom: "1.5rem" }}>
          {tab === "registro" ? "7 días sin coste. Sin compromiso." : "Accede a tu cuenta"}
        </p>

        {temaPendiente && (
          <div
            style={{
              background: "rgba(52,168,83,0.1)",
              border: "1px solid rgba(52,168,83,0.3)",
              borderRadius: "var(--radio-sm)",
              padding: "0.7rem 0.9rem",
              marginBottom: "1.2rem",
              fontSize: "0.85rem",
              color: "var(--texto-oscuro)",
            }}
          >
            📘 Vas a continuar con: <strong>{temaPendiente}</strong>
          </div>
        )}

        <div className="form-tabs">
          <button className={`form-tab ${tab === "registro" ? "active" : ""}`} onClick={() => setTab("registro")}>
            Registrarse
          </button>
          <button className={`form-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>
            Iniciar sesión
          </button>
        </div>

        {tab === "registro" ? <FormularioRegistro /> : <FormularioLogin />}
      </div>
      </div>
    </>
  );
}

function FormularioRegistro() {
  const [params] = useSearchParams();
  const etapaPreseleccionada = params.get("etapa") || "";
  const [enviado, setEnviado] = useState(null); // null | { requiereConsentimiento }
  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setErrorMsg("");

    const form = e.target;
    try {
      const datos = await api.registro({
        nombreAlumno: form.nombre.value,
        fechaNacimiento: form.fechaNacimiento.value,
        emailTutor: form.emailTutor.value,
        etapa: form.etapa.value,
        password: form.password.value,
      });
      setEnviado(datos);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>¡Bienvenido/a!</h3>
        <p style={{ color: "var(--gris-texto)", marginBottom: "1.5rem" }}>
          {enviado.requiereConsentimiento
            ? "Como el alumno es menor de 14 años, hemos enviado un correo al tutor/a para confirmar el permiso. La cuenta se activará en cuanto lo confirme."
            : "Tu cuenta ha sido creada y ya está activa. ¡Puedes iniciar sesión!"}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre del alumno</label>
        <input name="nombre" type="text" placeholder="Ej: Carla García" required />
      </div>
      <div className="form-group">
        <label>Fecha de nacimiento del alumno</label>
        <input name="fechaNacimiento" type="date" required />
        <p style={{ fontSize: "0.78rem", color: "var(--gris-texto)", marginTop: "0.3rem" }}>
          La usamos solo para saber si necesitamos el permiso de un adulto responsable (obligatorio por ley para menores de 14 años).
        </p>
      </div>
      <div className="form-group">
        <label>Correo del tutor o padre/madre</label>
        <input name="emailTutor" type="email" placeholder="correo@ejemplo.com" required />
      </div>
      <div className="form-group">
        <label>Etapa educativa</label>
        <select name="etapa" required defaultValue={etapaPreseleccionada}>
          <option value="" disabled>Selecciona una etapa...</option>
          <option value="primaria">Educación Primaria (1.º a 6.º)</option>
          <option value="eso">ESO — Secundaria (1.º a 4.º)</option>
          <option value="bachillerato">Bachillerato (1.º o 2.º)</option>
        </select>
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input name="password" type="password" placeholder="Mínimo 8 caracteres" required minLength={8} />
      </div>

      {errorMsg && <p style={{ color: "var(--naranja)", marginBottom: "1rem", fontWeight: 600 }}>{errorMsg}</p>}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={enviando}
        style={{ width: "100%", justifyContent: "center", fontSize: "1.05rem", padding: "0.9rem" }}
      >
        {enviando ? "Creando cuenta..." : "🚀 Empezar prueba gratis — 7 días"}
      </button>
      <p style={{ fontSize: "0.82rem", color: "var(--gris-texto)", textAlign: "center", marginTop: "0.8rem" }}>
        Al registrarte aceptas nuestros{" "}
        <NavLink to="/legal/terminos" style={{ color: "var(--azul-principal)" }}>Términos de uso</NavLink> y{" "}
        <NavLink to="/legal/privacidad" style={{ color: "var(--azul-principal)" }}>Política de privacidad</NavLink>.
      </p>
    </form>
  );
}

function FormularioLogin() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setErrorMsg("");
    const form = e.target;
    try {
      const usuario = await iniciarSesion(form.email.value, form.password.value);
      if (usuario.requiereConsentimientoParental && usuario.estadoConsentimiento !== "confirmado") {
        navigate("/consentimiento-pendiente");
      } else {
        // Si venía del temario público con materia/curso/tema elegidos,
        // los reenviamos al chat para no perder esa elección al entrar.
        const materia = params.get("materia");
        const curso = params.get("curso");
        const tema = params.get("tema");
        if (materia && curso && tema) {
          navigate(`/app?${new URLSearchParams({ materia, curso, tema }).toString()}`);
        } else {
          navigate("/app");
        }
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Correo electrónico</label>
        <input name="email" type="email" placeholder="correo@ejemplo.com" required />
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input name="password" type="password" placeholder="Tu contraseña" required />
        <p style={{ fontSize: "0.85rem", marginTop: "0.4rem", textAlign: "right" }}>
          <NavLink to="/recuperar-password" style={{ color: "var(--azul-principal)", fontWeight: 600 }}>
            ¿Olvidaste tu contraseña?
          </NavLink>
        </p>
      </div>

      {errorMsg && <p style={{ color: "var(--naranja)", marginBottom: "1rem", fontWeight: 600 }}>{errorMsg}</p>}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={enviando}
        style={{ width: "100%", justifyContent: "center", fontSize: "1.05rem", padding: "0.9rem" }}
      >
        {enviando ? "Entrando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
