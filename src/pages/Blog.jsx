// src/pages/Blog.jsx
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import { ARTICULOS } from "../data/articulos-blog";

export default function Blog() {
  return (
    <>
      <Seo
        title="Blog — Adolescencia, autocuidado y orientación"
        description="Artículos para estudiantes sobre gestión de emociones, hábitos saludables, orientación universitaria y vida en familia."
        path="/blog"
      />
      <Navbar />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem" }}>Blog</h1>
        <p style={{ color: "var(--gris-texto)", marginBottom: "2.5rem" }}>
          Artículos pensados para acompañarte más allá de las asignaturas.
        </p>

        <div className="blog-grid">
          {ARTICULOS.map((a) => (
            <NavLink to={`/blog/${a.slug}`} key={a.slug} className="feature-card" style={{ textDecoration: "none", textAlign: "left" }}>
              <span className="blog-categoria-badge">{a.categoria}</span>
              <h3 style={{ marginBottom: "0.4rem" }}>{a.titulo}</h3>
              <p>{a.resumen}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
