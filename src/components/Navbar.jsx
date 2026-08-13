// src/components/Navbar.jsx
// Navbar responsive con menú hamburguesa para móvil.
import { useState } from "react";
import { NavLink } from "react-router-dom";

const ENLACES = [
  { to: "/etapa/primaria", label: "Primaria", clase: "nav-primaria" },
  { to: "/etapa/secundaria", label: "Secundaria", clase: "nav-secundaria" },
  { to: "/etapa/bachillerato", label: "Bachillerato", clase: "nav-bachillerato" },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand" onClick={() => setAbierto(false)}>
        <div className="logo-icon">TP</div>
        Tu Profe en Casa
      </NavLink>

      <ul className="navbar-nav">
        {ENLACES.map((e) => (
          <li key={e.to}>
            <NavLink to={e.to} className={({ isActive }) => `${e.clase} ${isActive ? "active" : ""}`}>
              {e.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar-actions">
        <NavLink to="/auth" className="btn btn-outline">Iniciar sesión</NavLink>
        <NavLink to="/auth" className="btn btn-primary">Prueba gratis</NavLink>
      </div>

      <button
        className={`hamburguesa ${abierto ? "abierta" : ""}`}
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={abierto}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navbar-nav-movil ${abierto ? "abierta" : ""}`}>
        {ENLACES.map((e) => (
          <li key={e.to}>
            <NavLink to={e.to} className={e.clase} onClick={() => setAbierto(false)}>{e.label}</NavLink>
          </li>
        ))}
        <li><NavLink to="/auth" onClick={() => setAbierto(false)}>Iniciar sesión</NavLink></li>
        <li><NavLink to="/auth" onClick={() => setAbierto(false)}>🚀 Prueba gratis</NavLink></li>
      </ul>
    </nav>
  );
}
