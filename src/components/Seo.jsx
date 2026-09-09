// src/components/Seo.jsx
// Gestiona título, meta descripción y Open Graph por página.
// Cada página usa <Seo title="..." description="..." /> para tener
// sus propios metadatos, en vez de un único <title> fijo para toda la app.
import { Helmet } from "react-helmet-async";

export default function Seo({ title, description, path = "/" }) {
  const tituloCompleto = title
    ? `${title} | Tu Profe en Casa`
    : "Tu Profe en Casa — Tutor de IA con el currículo oficial de Asturias";
  const url = `https://loentiendes.com${path}`;

  return (
    <Helmet>
      <title>{tituloCompleto}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="https://loentiendes.com/images/profe_alumno.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tituloCompleto} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
