// src/pages/Auth.jsx
// Migración de pages/registro.html a React. Misma identidad visual
// (clases de style.css), pero con estado real y llamadas a la API.

import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

export default function Auth() {
  const [tab, setTab] = useState("registro");
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
        <div className="registro-badge">⭐ 4,8/5 <span>· 12.000 familias</span></div>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📚</div>
        <h2>Empieza a aprender hoy</h2>
        <p>Únete a más de 12.000 alumnos que ya mejoran sus notas con Tu Profe en Casa.</p>
        <div className="registro-benefits">
          <div className="registro-benefit"><span>✓</span> 7 días de prueba completamente gratis</div>
          <div className="registro-benefit"><span>✓</span> Sin tarjeta de crédito</div>
          <div className="registro-benefit"><span>✓</span> Todas las materias LOMLOE</div>
          <div className="registro-benefit"><span>✓</span> Profe IA con método guía</div>
        </div>
      </div>

      <div className="registro-right">
        <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.3rem" }}>
          {tab === "registro" ? "Crear cuenta gratis" : "Iniciar sesión"}
        </h2>
        <p style={{ color: "var(--gris-texto)", marginBottom: "1.5rem" }}>
          {tab === "registro" ? "7 días sin coste. Sin compromiso." : "Accede a tu cuenta"}
        </p>

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

function calcularEdadCliente(fechaISO) {
  const hoy = new Date();
  const nacimiento = new Date(fechaISO);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const noHaCumplidoAun =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
  if (noHaCumplidoAun) edad--;
  return edad;
}

const ETAPA_OPCIONES = [
  { value: "primaria", clase: "primaria", icono: "🖍️", label: "Primaria" },
  { value: "eso", clase: "secundaria", icono: "📘", label: "ESO" },
  { value: "bachillerato", clase: "bachillerato", icono: "🎓", label: "Bachillerato" },
];

function FormularioRegistro() {
  const [enviado, setEnviado] = useState(null); // null | { requiereConsentimiento }
  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailConError, setEmailConError] = useState(false);
  const [avisoEdad, setAvisoEdad] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [etapa, setEtapa] = useState("");
  const [avisoEtapa, setAvisoEtapa] = useState(false);

  function handleFechaBlur(e) {
    const valor = e.target.value;
    if (!valor) { setAvisoEdad(""); return; }
    const edad = calcularEdadCliente(valor);
    setAvisoEdad(
      edad < 6 || edad > 20
        ? "Esta fecha no parece corresponder a un alumno de 6 a 20 años. Revísala antes de continuar."
        : ""
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setEmailConError(false);

    if (!etapa) {
      setAvisoEtapa(true);
      setErrorMsg("Selecciona una etapa educativa");
      return;
    }
    setAvisoEtapa(false);
    setEnviando(true);

    const form = e.target;
    try {
      const datos = await api.registro({
        nombreAlumno: form.nombre.value,
        fechaNacimiento: form.fechaNacimiento.value,
        emailTutor: form.emailTutor.value,
        etapa,
        password: form.password.value,
      });
      setEnviado(datos);
    } catch (err) {
      setErrorMsg(err.message);
      if (err.message?.includes("Ya existe")) setEmailConError(true);
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
        <input name="fechaNacimiento" type="date" required onBlur={handleFechaBlur} />
        <p style={{ fontSize: "0.78rem", color: "var(--gris-texto)", marginTop: "0.3rem" }}>
          La usamos solo para saber si necesitamos el permiso de un adulto responsable (obligatorio por ley para menores de 14 años).
        </p>
        {avisoEdad && (
          <p style={{ fontSize: "0.8rem", color: "var(--naranja)", marginTop: "0.3rem", fontWeight: 600 }}>
            {avisoEdad}
          </p>
        )}
      </div>
      <div className="form-group">
        <label>Correo del tutor o padre/madre</label>
        <input
          name="emailTutor"
          type="email"
          placeholder="correo@ejemplo.com"
          required
          className={emailConError ? "input-error" : ""}
          onChange={() => setEmailConError(false)}
        />
        {emailConError && (
          <p style={{ fontSize: "0.8rem", color: "var(--naranja)", marginTop: "0.3rem", fontWeight: 600 }}>
            Ya existe una cuenta con este correo. Prueba a iniciar sesión.
          </p>
        )}
      </div>
      <div className="form-group">
        <label>Etapa educativa</label>
        <div className={`etapa-options ${avisoEtapa ? "input-error" : ""}`}>
          {ETAPA_OPCIONES.map((op) => (
            <button
              type="button"
              key={op.value}
              className={`etapa-option ${op.clase} ${etapa === op.value ? "active" : ""}`}
              onClick={() => { setEtapa(op.value); setAvisoEtapa(false); }}
            >
              <span className="etapa-option-icon">{op.icono}</span>
              {op.label}
            </button>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <div className="password-wrap">
          <input
            name="password"
            type={verPassword ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
            required
            minLength={8}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setVerPassword((v) => !v)}
            aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {verPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {errorMsg && <p style={{ color: "var(--naranja)", marginBottom: "1rem", fontWeight: 600 }}>{errorMsg}</p>}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={enviando}
        style={{ width: "100%", justifyContent: "center", fontSize: "1.05rem", padding: "0.9rem" }}
      >
        {enviando ? (<><span className="spinner" />Creando cuenta...</>) : "🚀 Empezar prueba gratis — 7 días"}
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
  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [verPassword, setVerPassword] = useState(false);

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
        navigate("/app");
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
        <div className="password-wrap">
          <input
            name="password"
            type={verPassword ? "text" : "password"}
            placeholder="Tu contraseña"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setVerPassword((v) => !v)}
            aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {verPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {errorMsg && <p style={{ color: "var(--naranja)", marginBottom: "1rem", fontWeight: 600 }}>{errorMsg}</p>}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={enviando}
        style={{ width: "100%", justifyContent: "center", fontSize: "1.05rem", padding: "0.9rem" }}
      >
        {enviando ? (<><span className="spinner" />Entrando...</>) : "Iniciar sesión"}
      </button>
    </form>
  );
}
