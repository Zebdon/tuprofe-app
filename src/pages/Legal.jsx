// src/pages/Legal.jsx
// Renderiza los Términos de uso y la Política de privacidad.
// El contenido completo y editable vive en /legal/politica-privacidad-terminos.md
// — este componente es la versión resumida y visible dentro de la app.
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

export default function Legal() {
  const { tipo } = useParams(); // "terminos" | "privacidad"
  if (tipo !== "terminos" && tipo !== "privacidad") return <Navigate to="/" replace />;

  const titulo = tipo === "terminos" ? "Términos de uso" : "Política de privacidad";

  return (
    <>
      <Seo title={titulo} description={`${titulo} de Tu Profe en Casa.`} path={`/legal/${tipo}`} />
      <Navbar />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "3rem 1.5rem", lineHeight: 1.7 }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1.5rem" }}>{titulo}</h1>

        {tipo === "privacidad" ? <ContenidoPrivacidad /> : <ContenidoTerminos />}

        <p style={{ marginTop: "2.5rem", fontSize: "0.85rem", color: "var(--gris-texto)" }}>
          Para el documento legal completo y actualizado, contacta con nosotros en{" "}
          <a href="mailto:cyntiazebaze@gmail.com" style={{ color: "var(--azul-principal)" }}>
            cyntiazebaze@gmail.com
          </a>.
        </p>
      </div>
    </>
  );
}

function ContenidoPrivacidad() {
  return (
    <>
      <h2>Menores de edad y consentimiento parental</h2>
      <p>
        Tu Profe en Casa está pensada para estudiantes de entre 6 y 18 años. Si el alumno/a es
        menor de 14 años, el registro y uso de la app requiere el consentimiento previo y
        verificable de su padre, madre o tutor/a legal, conforme a la LOPDGDD.
      </p>

      <h2>Qué datos recogemos</h2>
      <p>
        Nombre del alumno, curso, email de contacto del adulto responsable, e historial de
        conversaciones con la Profe IA para dar continuidad pedagógica. No recogemos datos de
        salud, biométricos ni de geolocalización, y no hacemos perfilado publicitario.
      </p>

      <h2>Uso de inteligencia artificial</h2>
      <p>
        Las respuestas de la Profe se generan mediante la API de Anthropic (Claude). Los mensajes
        se transmiten cifrados y se conservan el tiempo mínimo necesario.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión,
        limitación, oposición y portabilidad escribiéndonos por correo.
      </p>
    </>
  );
}

function ContenidoTerminos() {
  return (
    <>
      <h2>Naturaleza del servicio</h2>
      <p>
        Tu Profe en Casa es una herramienta de apoyo educativo complementario. No sustituye la
        enseñanza reglada ni la supervisión de un docente o tutor legal.
      </p>

      <h2>Uso apropiado</h2>
      <p>
        El alumno se compromete a usar la app únicamente con fines educativos, dentro del alcance
        del currículo oficial LOMLOE.
      </p>

      <h2>Limitación de responsabilidad</h2>
      <p>
        Aunque el contenido está basado en el currículo oficial de Asturias, la app no garantiza
        resultados académicos específicos.
      </p>
    </>
  );
}
