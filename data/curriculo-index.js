// data/curriculo-index.js
// Punto único de acceso al currículo oficial de Asturias, sea cual sea la etapa.
// api/tutor.js llama SIEMPRE a obtenerContextoCurricular() en vez de importar
// directamente curriculo-asturias.js / curriculo-eso.js / curriculo-bachillerato.js,
// porque cada uno tiene una forma interna distinta y aquí se homogeneizan.

import { curriculo as curriculoPrimaria } from "./curriculo-asturias.js";
import { curriculoESO } from "./curriculo-eso.js";
import { curriculoBachillerato } from "./curriculo-bachillerato.js";

/**
 * @param {Object} params
 * @param {"primaria"|"eso"|"bachillerato"} params.etapa
 * @param {string} params.curso - Primaria: "1".."6" · ESO: "1".."4" (o "4A"/"4B" en Matemáticas)
 *                                 · Bachillerato: "1" o "2" (Matemáticas usa "matematicas_I"/"matematicas_II" internamente)
 * @param {string} params.materia - clave tal como aparece en el archivo de origen
 *                                   (ej. "matematicas", "lengua_castellana", "fisica")
 * @param {string} [params.temaId] - solo necesario en Primaria, que está organizada por temas discretos
 *
 * @returns {Object|null} contexto normalizado para inyectar en el system prompt de la profe IA
 */
export function obtenerContextoCurricular({ etapa, curso, materia, temaId }) {
  if (etapa === "primaria") return contextoPrimaria({ curso, materia, temaId });
  if (etapa === "eso") return contextoESO({ curso, materia });
  if (etapa === "bachillerato") return contextoBachillerato({ curso, materia });
  return null;
}

function contextoPrimaria({ curso, materia, temaId }) {
  const temas = curriculoPrimaria.primaria?.cursos?.[curso]?.materias?.[materia]?.temas || [];
  const tema = temas.find((t) => t.id === temaId);
  if (!tema) return null;

  return {
    etapa: "primaria",
    fuente_legal: curriculoPrimaria.primaria.fuente,
    materia,
    curso,
    tema: tema.nombre,
    saberes_basicos: tema.saberes,
    criterios_evaluacion: tema.criterios_evaluacion,
    nivel: tema.nivel_dificultad,
  };
}

function contextoESO({ curso, materia }) {
  const datosMateria = curriculoESO[materia];
  if (!datosMateria) return null;

  // Recoge, de cada competencia específica, solo los criterios del curso pedido
  const criterios = (datosMateria.competencias_especificas || [])
    .map((ce) => ({
      competencia: ce.nombre,
      criterios: ce.criterios_por_curso?.[curso] || [],
    }))
    .filter((c) => c.criterios.length > 0);

  // Recoge, de cada bloque de saberes básicos, solo los saberes del curso pedido
  const saberes = Object.entries(datosMateria.saberes_basicos || {})
    .map(([bloque, contenido]) => ({
      bloque,
      saberes: contenido.por_curso?.[curso] || [],
    }))
    .filter((b) => b.saberes.length > 0);

  if (criterios.length === 0 && saberes.length === 0) return null;

  return {
    etapa: "eso",
    fuente_legal: curriculoESO.fuente,
    materia,
    curso,
    competencias_y_criterios: criterios,
    saberes_basicos: saberes,
  };
}

function contextoBachillerato({ curso, materia }) {
  const datosMateria = curriculoBachillerato[materia];
  if (!datosMateria) return null;

  // Matemáticas I/II usa una subdivisión especial (curso = "matematicas_I" | "matematicas_II")
  if (materia === "matematicas") {
    const clave = curso; // "matematicas_I" o "matematicas_II"
    const criterios = (datosMateria.competencias_especificas || [])
      .map((ce) => ({ competencia: ce.nombre, criterios: ce.criterios_por_curso?.[clave] || [] }))
      .filter((c) => c.criterios.length > 0);
    const saberes = datosMateria.saberes_basicos?.[clave] || {};

    return {
      etapa: "bachillerato",
      fuente_legal: curriculoBachillerato.fuente,
      materia,
      curso: clave,
      competencias_y_criterios: criterios,
      saberes_basicos: Object.entries(saberes).map(([bloque, contenido]) => ({ bloque, saberes: contenido })),
    };
  }

  // El resto de materias de Bachillerato están organizadas en un único curso
  // (2º Bach para las de ciencias, 1º Bach para Filosofía/Economía)
  const criterios = (datosMateria.competencias_especificas || []).map((ce) => ({
    competencia: ce.nombre,
    criterios: ce.criterios || [],
  }));
  const saberes = Object.entries(datosMateria.saberes_basicos || {}).map(([bloque, contenido]) => ({
    bloque,
    saberes: contenido,
  }));

  return {
    etapa: "bachillerato",
    fuente_legal: curriculoBachillerato.fuente,
    materia,
    curso,
    competencias_y_criterios: criterios,
    saberes_basicos: saberes,
  };
}

/**
 * NUEVO: devuelve la lista de temas "clicables" de una materia/curso, para
 * pintar el mapa de temario navegable (como las lecciones de Khan Academy).
 * Cada elemento es { id, nombre, bloque? } — "bloque" agrupa visualmente
 * (ej. "Sentido numérico") cuando aplica; en Primaria no hay bloques, cada
 * tema ya es una unidad completa por sí sola.
 *
 * @returns {Array<{id: string, nombre: string, bloque?: string}>}
 */
export function listarTemario({ etapa, curso, materia }) {
  if (etapa === "primaria") return listarTemasPrimaria({ curso, materia });
  if (etapa === "eso") return listarTemasESO({ curso, materia });
  if (etapa === "bachillerato") return listarTemasBachillerato({ curso, materia });
  return [];
}

function listarTemasPrimaria({ curso, materia }) {
  const temas = curriculoPrimaria.primaria?.cursos?.[curso]?.materias?.[materia]?.temas || [];
  return temas.map((t) => ({ id: t.id, nombre: t.nombre }));
}

function listarTemasESO({ curso, materia }) {
  const datosMateria = curriculoESO[materia];
  if (!datosMateria) return [];
  const items = [];
  Object.entries(datosMateria.saberes_basicos || {}).forEach(([bloque, contenido]) => {
    const saberes = contenido.por_curso?.[curso] || [];
    saberes.forEach((saber, i) => {
      items.push({ id: `${bloque}-${i}`, nombre: saber, bloque: formatearNombreBloque(bloque) });
    });
  });
  return items;
}

function listarTemasBachillerato({ curso, materia }) {
  const datosMateria = curriculoBachillerato[materia];
  if (!datosMateria) return [];
  const items = [];

  if (materia === "matematicas") {
    const clave = curso; // "matematicas_I" | "matematicas_II"
    const saberes = datosMateria.saberes_basicos?.[clave] || {};
    Object.entries(saberes).forEach(([bloque, lista]) => {
      (lista || []).forEach((saber, i) => {
        items.push({ id: `${clave}-${bloque}-${i}`, nombre: saber, bloque: formatearNombreBloque(bloque) });
      });
    });
    return items;
  }

  Object.entries(datosMateria.saberes_basicos || {}).forEach(([bloque, lista]) => {
    const arr = Array.isArray(lista) ? lista : [];
    arr.forEach((saber, i) => {
      items.push({ id: `${bloque}-${i}`, nombre: saber, bloque: formatearNombreBloque(bloque) });
    });
  });
  return items;
}

// "bloque_A_lenguas_hablantes" -> "Lenguas hablantes" · "sentido_numerico" -> "Sentido numerico"
function formatearNombreBloque(claveBloque) {
  const limpio = claveBloque.replace(/^bloque_[A-Za-z]_/, "").replace(/_/g, " ");
  return limpio.charAt(0).toUpperCase() + limpio.slice(1);
}