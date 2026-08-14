// src/components/BlogPreviewSection.jsx
// Sección para insertar en Home.jsx: muestra 3 artículos del blog.
// Uso: importa <BlogPreviewSection /> y colócalo donde quieras en tu Home.jsx.
import { NavLink } from "react-router-dom";
import { ARTICULOS } from "../data/articulos-blog";

export default function BlogPreviewSection() {
  const destacados = ARTICULOS.slice(0, 3);

  return (
    <section style={{ padding: "4rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem" }}>
        Del blog
      </h2>
      <p style={{ textAlign: "center", color: "var(--gris-texto)", marginBottom: "2.5rem" }}>
        Artículos para acompañarte más allá de las asignaturas.
      </p>
      <div className="blog-grid">
        {destacados.map((a) => (
          <NavLink to={`/blog/${a.slug}`} key={a.slug} className="feature-card" style={{ textDecoration: "none", textAlign: "left" }}>
            <span className="blog-categoria-badge">{a.categoria}</span>
            <h3 style={{ marginBottom: "0.4rem" }}>{a.titulo}</h3>
            <p>{a.resumen}</p>
          </NavLink>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <NavLink to="/blog" className="btn btn-outline">Ver todos los artículos</NavLink>
      </div>
    </section>
  );
}
