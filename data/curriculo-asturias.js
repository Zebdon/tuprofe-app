// data/curriculo-asturias.js
// Estructura del currículo oficial LOMLOE del Principado de Asturias
// Fuentes legales:
//   Primaria      -> Decreto 57/2022, de 5 de agosto (BOPA)
//   ESO           -> Decreto 59/2022, de 30 de agosto (BOPA)
//   Bachillerato  -> Decreto 60/2022, de 30 de agosto (BOPA)
//
// Cada tema incluye "saberes" (contenidos oficiales) y "criterios" (criterios de
// evaluación oficiales) para que la profe IA sepa exactamente qué debe enseñar
// y cómo debe evaluar el progreso, sin salirse del currículo real.

export const curriculo = {
  primaria: {
    fuente: "Decreto 57/2022, de 5 de agosto (BOPA 12/8/2022)",
    cursos: {
      "3": {
        materias: {
          matematicas: {
            temas: [
              {
                id: "mat3-multiplicacion",
                nombre: "Multiplicación de números naturales",
                saberes: [
                  "Sentido de la multiplicación como suma repetida y como organización en filas y columnas (arrays)",
                  "Tablas de multiplicar hasta el 10",
                  "Propiedad conmutativa de la multiplicación",
                  "Multiplicación de números de dos cifras por una cifra",
                ],
                criterios_evaluacion: [
                  "Resuelve problemas de la vida cotidiana que impliquen multiplicación, explicando el proceso seguido",
                  "Utiliza las tablas de multiplicar con fluidez en cálculos y problemas",
                  "Representa multiplicaciones mediante dibujos, agrupaciones u otros modelos manipulativos",
                ],
                nivel_dificultad: "básico-intermedio",
              },
              {
                id: "mat3-fracciones-intro",
                nombre: "Introducción a las fracciones",
                saberes: [
                  "Fracciones como partes de un todo (medios, tercios, cuartos)",
                  "Representación gráfica de fracciones sencillas",
                  "Comparación de fracciones con el mismo denominador",
                ],
                criterios_evaluacion: [
                  "Identifica y representa fracciones sencillas en contextos cotidianos (repartos, medidas)",
                  "Compara fracciones con igual denominador usando material manipulativo o gráfico",
                ],
                nivel_dificultad: "básico",
              },
            ],
          },
          lengua: {
            temas: [
              {
                id: "leng3-narracion",
                nombre: "El texto narrativo",
                saberes: [
                  "Estructura del cuento: introducción, nudo y desenlace",
                  "Identificación de personajes, escenario y tiempo en una narración",
                  "Producción de textos narrativos breves con coherencia",
                ],
                criterios_evaluacion: [
                  "Reconoce la estructura narrativa en textos leídos en clase",
                  "Redacta un cuento breve respetando introducción, nudo y desenlace",
                ],
                nivel_dificultad: "básico-intermedio",
              },
            ],
          },
        },
      },
      // Los cursos "1" a "6" se completan siguiendo el mismo patrón,
      // extrayendo saberes y criterios del Anexo II del Decreto 57/2022.
    },
  },

  secundaria: {
    fuente: "Decreto 59/2022, de 30 de agosto (BOPA 1/9/2022)",
    cursos: {
      // Se completa igual: "1º ESO", "2º ESO", "3º ESO", "4º ESO"
      // Materias comunes 1º-3º: Ed. Física, Geografía e Historia, Lengua Castellana
      // y Literatura, Lengua Extranjera, Matemáticas + materias variables por curso
      // (ver artículo 8 del decreto para el detalle exacto por curso).
    },
  },

  bachillerato: {
    fuente: "Decreto 60/2022, de 30 de agosto (BOPA)",
    cursos: {
      // Se completa igual: "1º Bachillerato", "2º Bachillerato"
    },
  },
};

// Función auxiliar: obtiene el contexto curricular exacto que se le pasa
// a la profe IA (api/tutor.js) para que la explicación esté anclada al
// currículo oficial y no a conocimiento genérico de la IA.
export function obtenerContextoTema({ etapa, curso, materia, temaId }) {
  const temas = curriculo[etapa]?.cursos?.[curso]?.materias?.[materia]?.temas || [];
  const tema = temas.find((t) => t.id === temaId);
  if (!tema) return null;

  return {
    fuente_legal: curriculo[etapa].fuente,
    tema: tema.nombre,
    saberes_basicos: tema.saberes,
    criterios_evaluacion: tema.criterios_evaluacion,
    nivel: tema.nivel_dificultad,
  };
}
