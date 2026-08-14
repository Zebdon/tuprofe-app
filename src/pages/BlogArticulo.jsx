// src/pages/BlogArticulo.jsx
import { useParams, Navigate, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import { ARTICULOS } from "../data/articulos-blog";

export default function BlogArticulo() {
  const { slug } = useParams();
  const articulo = ARTICULOS.find((a) => a.slug === slug);

  if (!articulo) return <Navigate to="/blog" replace />;

  return (
    <>
      <Seo title={articulo.titulo} description={articulo.resumen} path={`/blog/${slug}`} />
      <Navbar />
      <div className="blog-articulo" style={{ padding: "3rem 1.5rem" }}>
        <NavLink to="/blog" style={{ color: "var(--azul-principal)", fontWeight: 700, fontSize: "0.9rem" }}>
          ← Volver al blog
        </NavLink>
        <span className="blog-categoria-badge" style={{ marginTop: "1.2rem" }}>{articulo.categoria}</span>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 900, margin: "0.6rem 0 1.5rem" }}>{articulo.titulo}</h1>
        {articulo.contenido}
      </div>
    </>
  );
}
