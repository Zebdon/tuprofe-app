// data/curriculo-eso.js
// Currículo oficial LOMLOE de Educación Secundaria Obligatoria — Principado de Asturias
// Fuente: Decreto 59/2022 (BOPA) + "Currículo LOMLOE de Educación Secundaria Obligatoria"
// (Consejería de Educación del Principado de Asturias, publicación oficial 2023)
// Contenido reestructurado y resumido a partir del documento oficial (no copia literal).

export const curriculoESO = {
  fuente: "Decreto 59/2022 + Currículo LOMLOE ESO (Consejería de Educación de Asturias)",

  matematicas: {
    // Estructura: 10 competencias específicas comunes a toda la etapa.
    // Cada curso tiene su propio nivel de profundidad en los criterios de evaluación.
    // En 4º ESO la materia se divide en Matemáticas A (orientada a FP/ciclos) y B (orientada a Bachillerato).
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Resolución de problemas",
        descripcion: "Interpretar, modelizar y resolver problemas cotidianos usando distintas estrategias de razonamiento.",
        criterios_por_curso: {
          "1": ["Interpreta el problema organizando los datos y entendiendo qué se pregunta", "Aplica herramientas y estrategias adecuadas para resolverlo", "Obtiene la solución activando conocimientos previos y, si procede, herramientas tecnológicas"],
          "2": ["Interpreta el problema organizando los datos y entendiendo qué se pregunta", "Aplica herramientas y estrategias adecuadas para resolverlo", "Obtiene la solución activando conocimientos previos y, si procede, herramientas tecnológicas"],
          "3": ["Interpreta el problema organizando los datos y entendiendo qué se pregunta", "Aplica herramientas y estrategias adecuadas para resolverlo", "Obtiene la solución activando conocimientos previos y, si procede, herramientas tecnológicas"],
          "4A": ["Reformula el problema de forma verbal y gráfica, relacionando datos y pregunta", "Selecciona estrategias valorando su eficacia", "Obtiene todas las soluciones posibles movilizando los conocimientos necesarios"],
          "4B": ["Reformula el problema de forma verbal y gráfica, interpretando datos y relaciones", "Analiza y selecciona distintas estrategias comparando su eficiencia", "Obtiene todas las soluciones posibles usando las herramientas tecnológicas necesarias"],
        },
      },
      {
        id: "CE2",
        nombre: "Análisis y validación de soluciones",
        descripcion: "Comprobar la corrección matemática y la coherencia de las soluciones obtenidas, valorando su repercusión (sostenibilidad, igualdad de género, consumo responsable).",
        criterios_por_curso: {
          "1": ["Comprueba la corrección matemática de las soluciones", "Evalúa la validez y coherencia de la solución desde distintas perspectivas (género, sostenibilidad, consumo responsable)"],
          "2": ["Comprueba la corrección matemática de las soluciones", "Evalúa la validez y coherencia de la solución desde distintas perspectivas"],
          "3": ["Comprueba la corrección matemática de las soluciones", "Evalúa la validez y coherencia de la solución desde distintas perspectivas"],
          "4A": ["Comprueba la corrección matemática", "Selecciona las soluciones óptimas valorando su corrección e implicaciones"],
          "4B": ["Comprueba la corrección matemática", "Justifica las soluciones óptimas desde varias perspectivas (matemática, de género, de sostenibilidad)"],
        },
      },
      {
        id: "CE3",
        nombre: "Patrones y conexiones matemáticas",
        descripcion: "Reconocer patrones y establecer conexiones entre distintas ideas matemáticas.",
        criterios_por_curso: {
          "1": ["Identifica patrones y regularidades sencillas", "Relaciona conceptos matemáticos entre distintos bloques"],
          "2": ["Identifica patrones y regularidades", "Relaciona conceptos matemáticos entre distintos bloques"],
          "3": ["Identifica patrones y los generaliza", "Establece conexiones entre distintos sentidos matemáticos"],
          "4A": ["Generaliza patrones en distintos contextos aplicados", "Conecta las matemáticas con situaciones profesionales o cotidianas"],
          "4B": ["Generaliza y demuestra patrones formalmente", "Conecta las matemáticas con otras disciplinas científicas"],
        },
      },
      // CE4-CE10 (razonamiento, prueba, comunicación, representación, tecnología,
      // destrezas socioafectivas, conexión con otras materias) se completan siguiendo
      // el mismo patrón — disponibles en el documento fuente, páginas 380-420.
    ],

    saberes_basicos: {
      sentido_numerico: {
        bloques: ["Conteo", "Cantidad", "Sentido de las operaciones", "Relaciones"],
        por_curso: {
          "1": ["Estrategias de recuento sistemático", "Números grandes y pequeños: notación exponencial y científica", "Operaciones con enteros, fraccionarios y decimales"],
          "2": ["Recuento sistemático y adaptado al tamaño de los números", "Estimaciones con precisión requerida", "Porcentajes mayores que 100 y menores que 1"],
          "3": ["Notación exponencial y científica con calculadora", "Interpretación de porcentajes complejos", "Reconocimiento de distintas formas de representar números"],
          "4A": ["Resolución de situaciones cotidianas con estrategias de recuento", "Estimaciones analizando y acotando el error cometido"],
          "4B": ["Expresión de cantidades mediante números reales con precisión", "Distintas representaciones de una misma cantidad, conjuntos numéricos"],
        },
      },
      sentido_medida: {
        bloques: ["Magnitud", "Estimación y relaciones", "Probabilidad"],
        por_curso: {
          "1": ["Unidades de medida y su elección adecuada en contextos reales", "Instrumentos de medición"],
          "2": ["Comparación de magnitudes", "Introducción a la probabilidad como medida de incertidumbre"],
          "3": ["Cálculo de probabilidades en experimentos simples", "Relación entre formas y medidas"],
          "4A": ["Estimación y medida aplicada a contextos prácticos/profesionales"],
          "4B": ["Probabilidad condicionada y cálculo de medidas en contextos científicos"],
        },
      },
      sentido_espacial: {
        bloques: ["Formas geométricas", "Movimientos y transformaciones", "Visualización"],
        por_curso: {
          "1": ["Reconocimiento y clasificación de figuras planas", "Propiedades básicas de polígonos"],
          "2": ["Movimientos en el plano (traslaciones, giros, simetrías)"],
          "3": ["Cuerpos geométricos y sus propiedades", "Teorema de Pitágoras"],
          "4A": ["Aplicaciones geométricas a la resolución de problemas cotidianos"],
          "4B": ["Geometría analítica: vectores y rectas en el plano"],
        },
      },
      sentido_algebraico: {
        bloques: ["Patrones", "Modelo matemático", "Pensamiento computacional"],
        por_curso: {
          "1": ["Expresiones algebraicas sencillas", "Ecuaciones de primer grado"],
          "2": ["Sistemas de ecuaciones sencillos", "Introducción a funciones"],
          "3": ["Funciones lineales y cuadráticas", "Programación básica orientada a resolución de problemas"],
          "4A": ["Modelización algebraica aplicada a situaciones prácticas"],
          "4B": ["Funciones, ecuaciones y sistemas de mayor complejidad orientados a Bachillerato"],
        },
      },
      sentido_estocastico: {
        bloques: ["Datos", "Incertidumbre e inferencia"],
        por_curso: {
          "1": ["Recogida y organización de datos", "Gráficos estadísticos sencillos"],
          "2": ["Medidas de centralización (media, mediana, moda)"],
          "3": ["Medidas de dispersión", "Interpretación crítica de datos estadísticos"],
          "4A": ["Análisis estadístico aplicado a contextos cotidianos/profesionales"],
          "4B": ["Distribuciones de probabilidad e inferencia estadística básica"],
        },
      },
      sentido_socioafectivo: {
        bloques: ["Creencias, actitudes y emociones", "Trabajo en equipo"],
        por_curso: {
          "1": ["Gestión de la frustración ante el error como parte del aprendizaje"],
          "2": ["Perseverancia y autoconcepto en la resolución de problemas"],
          "3": ["Colaboración activa en equipos heterogéneos"],
          "4A": ["Gestión del reparto de tareas en el trabajo en equipo"],
          "4B": ["Responsabilidad y contribución individual dentro del equipo"],
        },
      },
    },
  },

  lengua_castellana: {
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Diversidad lingüística",
        descripcion: "Reconocer y valorar la diversidad lingüística de España (con atención al asturiano), combatiendo prejuicios lingüísticos.",
        criterios_por_curso: {
          "1": ["Identifica nociones básicas de lenguas familiares, con atención a la lengua asturiana", "Adopta una actitud de respeto ante la diversidad lingüística y dialectal"],
          "2": ["Reconoce las lenguas de España y sus variedades dialectales, con atención al asturiano", "Reflexiona sobre prejuicios y estereotipos lingüísticos"],
          "3": ["Reconoce lenguas y dialectos de España identificando rasgos orales, escritos y multimodales", "Reflexiona sobre prejuicios lingüísticos desde el entorno asturiano"],
          "4": ["Explica el origen y desarrollo sociohistórico de las lenguas de España", "Cuestiona prejuicios lingüísticos analizando la diversidad del entorno social asturiano"],
        },
      },
      {
        id: "CE2",
        nombre: "Comprensión oral y multimodal",
        descripcion: "Comprender e interpretar textos orales y multimodales, identificando intención y fiabilidad del emisor.",
        criterios_por_curso: {
          "1": ["Comprende el sentido y la intención de textos orales/multimodales sencillos"],
          "2": ["Comprende el sentido global y la estructura de textos orales/multimodales sencillos de distintos ámbitos"],
          "3": ["Comprende el sentido global de textos orales/multimodales sencillos, valorando su fiabilidad"],
          "4": ["Comprende textos orales/multimodales de cierta complejidad, analizando la interacción entre códigos"],
        },
      },
      {
        id: "CE3",
        nombre: "Producción e interacción oral",
        descripcion: "Producir textos orales con coherencia y registro adecuado, participando en interacciones con actitud cooperativa.",
        criterios_por_curso: {
          "1": ["Realiza narraciones y exposiciones orales sencillas sobre temas de interés personal", "Participa en interacciones orales informales con escucha activa"],
          "2": ["Realiza narraciones/exposiciones orales con distinto grado de planificación", "Participa en interacciones informales y en trabajo en equipo"],
          "3": ["Realiza exposiciones orales ajustándose a las convenciones del género discursivo", "Participa en interacciones formales de carácter dialogado"],
          "4": ["Realiza exposiciones y argumentaciones orales de cierta extensión y complejidad", "Participa en interacciones formales con estrategias de cooperación conversacional"],
        },
      },
      {
        id: "CE4",
        nombre: "Comprensión lectora",
        descripcion: "Comprender, interpretar y valorar textos escritos con sentido crítico.",
        criterios_por_curso: {
          "1": ["Comprende el sentido global y la intención del emisor en textos escritos sencillos"],
          "2": ["Comprende e interpreta textos escritos identificando ideas principales y secundarias"],
          "3": ["Valora la forma y el contenido de textos escritos evaluando su fiabilidad"],
          "4": ["Evalúa críticamente la calidad y fiabilidad de textos de cierta complejidad"],
        },
      },
      {
        id: "CE5",
        nombre: "Producción escrita",
        descripcion: "Producir textos escritos y multimodales coherentes y correctos según el género discursivo.",
        criterios_por_curso: {
          "1": ["Planifica y redacta textos sencillos atendiendo a la situación comunicativa", "Incorpora corrección ortográfica y gramatical básica"],
          "2": ["Planifica, redacta y revisa textos en diferentes soportes con propiedad léxica"],
          "3": ["Redacta textos de cierta complejidad cuidando la cohesión y adecuación"],
          "4": ["Redacta textos complejos con coherencia, cohesión y registro adecuados al género"],
        },
      },
      {
        id: "CE6",
        nombre: "Alfabetización informacional",
        descripcion: "Seleccionar y contrastar información de fuentes diversas evitando la desinformación.",
        criterios_por_curso: {
          "1": ["Localiza y selecciona información de forma guiada, comunicándola de forma creativa"],
          "2": ["Selecciona información con criterios de fiabilidad y la transforma en conocimiento"],
          "3": ["Analiza y reorganiza información de medios digitales y convencionales con criterio crítico"],
          "4": ["Contrasta información de diversas fuentes evaluando fiabilidad y evitando manipulación"],
        },
      },
      {
        id: "CE7",
        nombre: "Hábito lector",
        descripcion: "Leer de manera autónoma como fuente de placer y conocimiento, construyendo la identidad lectora.",
        criterios_por_curso: {
          "1": ["Lee de forma progresivamente autónoma obras variadas, incluyendo autoras y autores"],
          "2": ["Selecciona lecturas de manera orientada usando la biblioteca escolar/pública"],
          "3": ["Verbaliza los propios gustos e identidad lectora"],
          "4": ["Establece vínculos argumentados entre la obra leída y aspectos de la actualidad"],
        },
      },
      {
        id: "CE8",
        nombre: "Educación literaria",
        descripcion: "Leer, interpretar y valorar obras del patrimonio literario nacional y universal.",
        criterios_por_curso: {
          "1": ["Lee obras de literatura juvenil y patrimonio literario, participando en conversaciones literarias"],
          "2": ["Relaciona los elementos del género literario con la construcción del sentido de la obra"],
          "3": ["Interpreta obras del patrimonio literario (desde la Edad Media al siglo XVIII) con perspectiva de género"],
          "4": ["Interpreta obras del patrimonio literario (siglo XIX a la actualidad) estableciendo conexiones entre textos"],
        },
      },
      {
        id: "CE9",
        nombre: "Reflexión sobre la lengua",
        descripcion: "Movilizar el conocimiento sobre la estructura de la lengua con la terminología adecuada.",
        criterios_por_curso: {
          "1": ["Observa y clasifica unidades comunicativas básicas", "Identifica categorías gramaticales elementales"],
          "2": ["Distingue lengua oral y escrita a nivel sintáctico y léxico", "Reconoce la lengua como sistema (sonido, palabra, discurso)"],
          "3": ["Distingue forma (categoría gramatical) y función sintáctica de las palabras"],
          "4": ["Relaciona los esquemas semántico y sintáctico de la oración simple con terminología adecuada"],
        },
      },
      {
        id: "CE10",
        nombre: "Uso ético del lenguaje",
        descripcion: "Usar las prácticas comunicativas al servicio de la convivencia democrática y la resolución dialogada de conflictos.",
        criterios_por_curso: {
          "1": ["Detecta usos discriminatorios del lenguaje verbal y no verbal"],
          "2": ["Reflexiona sobre el uso no discriminatorio del lenguaje en distintos contextos"],
          "3": ["Analiza el uso manipulativo del lenguaje en textos y medios"],
          "4": ["Utiliza un lenguaje no discriminatorio en la resolución dialogada de conflictos"],
        },
      },
    ],

    saberes_basicos: {
      bloque_A_lenguas_hablantes: {
        descripcion: "Diversidad lingüística de España, con atención especial a la lengua asturiana",
        por_curso: {
          "1": ["Biografía lingüística propia y diversidad del centro, con atención al contexto asturiano", "Aproximación a prejuicios y estereotipos lingüísticos"],
          "2": ["Familias lingüísticas y lenguas del mundo, la lengua asturiana", "Variedades dialectales del español"],
          "3": ["Desarrollo sociohistórico de las lenguas de España, con atención al asturiano", "Fenómenos de contacto entre lenguas: bilingüismo, préstamos"],
          "4": ["Análisis de la biografía lingüística propia y del entorno", "Derechos lingüísticos individuales y colectivos"],
        },
      },
      bloque_B_comunicacion: {
        descripcion: "Estrategias de producción, comprensión y análisis crítico de textos orales, escritos y multimodales",
        por_curso: {
          "1": ["Secuencias textuales narrativas, descriptivas y dialogadas", "Comprensión oral: sentido global e información relevante", "Signos básicos de puntuación"],
          "2": ["Secuencias textuales expositivas", "Géneros del ámbito social: redes sociales, etiqueta digital", "Cohesión textual: conectores"],
          "3": ["Secuencias textuales argumentativas", "Valoración crítica de fiabilidad de textos", "Corrección lingüística y ortográfica"],
          "4": ["Géneros del ámbito profesional: currículum vitae, carta de motivación, entrevista", "Producción escrita con corrección gramatical avanzada"],
        },
      },
      bloque_C_educacion_literaria: {
        descripcion: "Lectura autónoma y guiada del patrimonio literario",
        por_curso: {
          "1": ["Literatura juvenil contemporánea y patrimonio universal", "Lectura expresiva y dramatización"],
          "2": ["Construcción compartida de la interpretación de obras", "Relación entre género literario y sentido de la obra"],
          "3": ["Patrimonio literario nacional/universal desde la Edad Media al siglo XVIII", "Lectura con perspectiva de género"],
          "4": ["Patrimonio literario del siglo XIX a la actualidad", "Creación de textos de intención literaria"],
        },
      },
      bloque_D_reflexion_lengua: {
        descripcion: "La lengua como sistema: gramática, léxico y pragmática",
        por_curso: {
          "1": ["Observación y clasificación de unidades comunicativas", "Categorías gramaticales básicas", "Orden de palabras y concordancia"],
          "2": ["Diferencias entre lengua oral y escrita", "Formación de palabras", "Funciones sintácticas de la oración simple"],
          "3": ["Esquemas semántico y sintáctico de la oración simple", "Uso no discriminatorio del lenguaje"],
          "4": ["Procedimientos léxicos y sintácticos avanzados", "Terminología sintáctica para el análisis de la oración"],
        },
      },
    },
  },

  fisica_quimica: {
    // Se cursa en 2º, 3º y 4º ESO (no en 1º)
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Comprensión de fenómenos fisicoquímicos",
        descripcion: "Comprender y explicar fenómenos fisicoquímicos del entorno usando leyes y teorías científicas para mejorar la calidad de vida.",
        criterios_por_curso: {
          "2": ["Identifica y explica fenómenos fisicoquímicos cotidianos con principios y leyes adecuadas", "Resuelve problemas fisicoquímicos razonando el procedimiento"],
          "3": ["Explica fenómenos fisicoquímicos de forma argumentada usando diversidad de soportes", "Resuelve problemas con corrección y precisión"],
          "4": ["Comprende y explica con rigor fenómenos fisicoquímicos a partir de leyes científicas", "Analiza críticamente el impacto de la ciencia en la sociedad y el medio ambiente"],
        },
      },
      {
        id: "CE2",
        nombre: "Método científico",
        descripcion: "Formular hipótesis y comprobarlas mediante experimentación, indagación y búsqueda de evidencias.",
        criterios_por_curso: {
          "2": ["Emplea metodologías científicas para identificar fenómenos mediante indagación y trabajo experimental", "Diferencia ciencia de pseudociencia"],
          "3": ["Diseña estrategias de indagación para comprobar o refutar hipótesis", "Aplica leyes científicas al formular hipótesis"],
          "4": ["Predice respuestas comprobables con herramientas experimentales o deductivas", "Valida hipótesis de manera informada y coherente con el conocimiento científico"],
        },
      },
      {
        id: "CE3",
        nombre: "Lenguaje científico",
        descripcion: "Manejar el lenguaje de la IUPAC, unidades de medida, normas de laboratorio y distintos formatos de datos.",
        criterios_por_curso: {
          "2": ["Emplea datos en diferentes formatos para interpretar procesos fisicoquímicos", "Usa correctamente unidades de medida y reglas de nomenclatura básicas", "Aplica normas de seguridad en el laboratorio"],
          "3": ["Relaciona e interpreta datos de distintos formatos extrayendo lo relevante", "Usa herramientas matemáticas y nomenclatura con soltura"],
          "4": ["Selecciona fuentes fiables para comunicar información fisicoquímica", "Usa varios sistemas de unidades y nomenclatura avanzada con rigor"],
        },
      },
      // CE4-CE6 (trabajo colaborativo en ciencia, análisis crítico de la información
      // científica, valoración de la contribución de la ciencia a la sociedad)
      // disponibles en el documento fuente, páginas 195-218.
    ],

    saberes_basicos: {
      bloque_A_destrezas_cientificas: {
        descripcion: "Metodología científica, uso del laboratorio y lenguaje científico",
        por_curso: {
          "2": ["Formulación de cuestiones e hipótesis y comprobación experimental", "Unidades del Sistema Internacional", "Normas de seguridad en el laboratorio"],
          "3": ["Investigación mediante indagación, deducción y búsqueda de evidencias", "Herramientas matemáticas en escenarios científicos"],
          "4": ["Estrategias de resolución de problemas y tratamiento del error", "Valoración de la cultura científica y su papel en Asturias"],
        },
      },
      bloque_B_la_materia: {
        descripcion: "Teoría cinético-molecular, estructura atómica y nomenclatura química",
        por_curso: {
          "2": ["Teoría cinético-molecular: estados de agregación y cambios de estado", "Modelos atómicos de Dalton, Thomson y Rutherford", "Nomenclatura IUPAC de sustancias simples y compuestos binarios"],
          "3": ["Estudio cuantitativo de mezclas y disoluciones", "Masa atómica y masa molecular", "Isótopos y tabla periódica"],
          "4": ["Modelos atómicos clásicos y cuánticos", "Configuración electrónica y tabla periódica", "Nomenclatura inorgánica y orgánica básica (IUPAC)"],
        },
      },
      bloque_C_la_energia: {
        descripcion: "Formas de energía, transferencia y sostenibilidad",
        por_curso: {
          "2": ["La energía como causa de los procesos de cambio", "Formas de energía y transformaciones"],
          "3": ["Trabajo y calor como formas de transferencia de energía", "Fuentes de energía renovables y no renovables"],
          "4": ["Naturaleza eléctrica de la materia: circuitos y electrización", "Ahorro energético y sostenibilidad"],
        },
      },
      bloque_D_la_interaccion: {
        descripcion: "Cinemática, fuerzas y leyes de Newton",
        por_curso: {
          "2": ["Predicción de movimientos sencillos (cinemática)", "Fuerzas como agentes de cambio: efectos sobre el movimiento y deformaciones"],
          "3": ["Leyes de Newton aplicadas a situaciones cotidianas y seguridad vial", "Fenómenos gravitatorios, eléctricos y magnéticos"],
          "4": ["Carácter vectorial de las fuerzas: álgebra vectorial básica", "Ley de gravitación universal", "Fuerzas y presión en fluidos"],
        },
      },
      // Bloque E (El cambio: reacciones químicas) disponible en el documento fuente.
    },
  },

  biologia_geologia: {
    // Se cursa en 1º, 3º y 4º ESO (no en 2º, que tiene Física y Química)
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Comunicación científica",
        descripcion: "Interpretar y transmitir información y datos científicos usando diferentes formatos.",
        criterios_por_curso: {
          "1": ["Analiza conceptos biológicos/geológicos interpretando información en distintos formatos", "Transmite información con terminología adecuada y argumentos fundamentados"],
          "3": ["Analiza conceptos biológicos/geológicos con actitud crítica, obteniendo conclusiones fundamentadas"],
          "4": ["Transmite opiniones propias fundamentadas usando terminología y formatos rigurosos"],
        },
      },
      {
        id: "CE2",
        nombre: "Búsqueda y evaluación de información",
        descripcion: "Localizar y seleccionar información contrastando su veracidad frente a pseudociencias.",
        criterios_por_curso: {
          "1": ["Resuelve cuestiones localizando y citando correctamente información de distintas fuentes", "Distingue información con base científica de pseudociencias y bulos"],
          "3": ["Reconoce información con base científica manteniendo actitud escéptica ante bulos y teorías conspiratorias"],
          "4": ["Contrasta la veracidad de información con fuentes fiables y actitud crítica"],
        },
      },
      {
        id: "CE3",
        nombre: "Proyectos de investigación",
        descripcion: "Planificar y desarrollar proyectos de investigación siguiendo metodologías científicas.",
        criterios_por_curso: {
          "1": ["Plantea preguntas e hipótesis sobre fenómenos biológicos/geológicos usando métodos científicos", "Diseña experimentación y toma de datos", "Coopera en un proyecto científico asumiendo una función concreta"],
          "3": ["Diseña experimentación evitando sesgos", "Interpreta resultados usando herramientas matemáticas/tecnológicas"],
          "4": ["Interpreta y analiza resultados obteniendo conclusiones razonadas", "Colabora en las distintas fases de un proyecto científico"],
        },
      },
      // CE4-CE6 (pensamiento computacional, sostenibilidad, salud) disponibles
      // en el documento fuente, páginas 65-90.
    ],

    saberes_basicos: {
      bloque_A_proyecto_cientifico: {
        descripcion: "Metodología científica: hipótesis, búsqueda de información y análisis de resultados",
        por_curso: {
          "1": ["Planteamiento de hipótesis con perspectiva científica", "Fuentes fidedignas de información científica", "Métodos de observación y toma de datos"],
          "3": ["Diferenciación entre correlación y causalidad", "El papel de la mujer en la ciencia"],
          "4": ["Controles experimentales positivos y negativos", "Evolución histórica del saber científico como labor colectiva"],
        },
      },
      bloque_B_geologia: {
        descripcion: "Estructura de la Tierra, rocas, minerales y riesgos geológicos",
        por_curso: {
          "1": ["Rocas y minerales: características y clasificación (sedimentarias, metamórficas, ígneas)", "Rocas y minerales del Principado de Asturias"],
          "3": ["Estructura de la geosfera y tectónica de placas", "Procesos geológicos internos y externos, riesgos naturales"],
          "4": ["Relieve y paisaje de Asturias como recurso", "Interpretación de cortes geológicos e historia de la Tierra"],
        },
      },
      bloque_C_la_celula: {
        descripcion: "La célula como unidad estructural y funcional de los seres vivos",
        por_curso: {
          "1": ["La célula procariota y eucariota (animal/vegetal)", "Observación de muestras microscópicas"],
          "3": ["Fases del ciclo celular", "Mitosis, meiosis y sus fases"],
          "4": ["Morfología de orgánulos celulares y su función biológica"],
        },
      },
      bloque_D_seres_vivos_genetica: {
        descripcion: "Clasificación de seres vivos (1º); Genética y evolución (3º-4º)",
        por_curso: {
          "1": ["Clasificación de seres vivos en los principales reinos", "Principales grupos taxonómicos"],
          "3": ["Genética mendeliana básica y herencia"],
          "4": ["Estructura del ADN y ARN, relación con su función", "Estrategias de extracción de ADN de una célula eucariota"],
        },
      },
      // Bloques E (Ecología) y F (Salud) disponibles en el documento fuente.
    },
  },

  geografia_historia: {
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Búsqueda y tratamiento de la información histórica/geográfica",
        descripcion: "Buscar, seleccionar y organizar información sobre temas del presente y del pasado usando críticamente fuentes históricas y geográficas.",
        criterios_por_curso: {
          "1": ["Elabora esquemas y tablas mediante búsqueda y tratamiento de información", "Analiza fuentes primarias/secundarias sobre Prehistoria y Edad Antigua"],
          "2": ["Elabora esquemas y tablas sobre procesos relevantes del presente y del pasado", "Analiza fuentes sobre Edad Media y Edad Moderna"],
          "3": ["Elabora contenidos en formatos complejos contrastando fuentes fiables, identificando desinformación", "Establece conexiones entre conocimientos elaborando síntesis interpretativas"],
          "4": ["Elabora contenidos usando recogida de datos avanzada, identificando manipulación", "Transfiere el conocimiento mediante narraciones, pósteres y exposiciones orales"],
        },
      },
      {
        id: "CE2",
        nombre: "Pensamiento crítico sobre problemas actuales",
        descripcion: "Indagar y argumentar sobre problemas geográficos, históricos y sociales relevantes, de lo local a lo global.",
        criterios_por_curso: {
          "1": ["Identifica y valora los principales problemas que afectan a la sociedad"],
          "2": ["Identifica y valora problemas sociales adoptando una postura razonada"],
          "3": ["Genera productos originales reelaborando conocimientos previos con herramientas digitales"],
          "4": ["Genera productos creativos y argumentados sobre problemas de actualidad"],
        },
      },
      // CE3-CE9 (perspectiva de género, sostenibilidad, patrimonio, causalidad histórica,
      // ciudadanía democrática) disponibles en el documento fuente, páginas 233-275.
    ],

    saberes_basicos: {
      bloque_A_retos_mundo_actual: {
        descripcion: "Sostenibilidad, desigualdad, tecnologías de la información y geopolítica",
        por_curso: {
          "1": ["Ubicación espacial: mapas, escalas y Tecnologías de la Información Geográfica", "Emergencia climática: factores y catástrofes", "Biodiversidad y ecosistemas planetarios"],
          "2": ["Sociedad del conocimiento y objetivos de las Ciencias Sociales", "Igualdad de género: roles y situaciones discriminatorias", "Objetivos de Desarrollo Sostenible"],
          "3": ["Relación entre factores naturales y antrópicos, globalización y migraciones", "Estructuras económicas y mercados actuales", "Geopolítica y conflictos: genocidios, guerras, terrorismo"],
          "4": ["Sociedad de la información y tratamiento crítico de datos digitales", "Igualdad de género y violencia contra las mujeres", "Desigualdad e injusticia local y global"],
        },
      },
      bloque_B_sociedades_territorios: {
        descripcion: "Métodos de investigación en Geografía e Historia",
        por_curso: {
          "1": ["Métodos básicos de investigación geográfica e histórica"],
          "2": ["Metodologías del pensamiento geográfico e histórico"],
          "3": ["Métodos de investigación en Geografía: pensamiento geográfico"],
          "4": ["Métodos de investigación en Historia: pensamiento histórico"],
        },
      },
      // Bloques C (Historia: Prehistoria a mundo contemporáneo, por curso) disponibles
      // en el documento fuente — son el grueso del temario cronológico de cada curso.
    },
  },

  lengua_extranjera: {
    // Documento fuente cubre la Lengua Extranjera genérica (habitualmente Inglés)
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Comprensión de textos",
        descripcion: "Interpretar y analizar el sentido global e información específica de textos orales, escritos y multimodales.",
        criterios_por_curso: {
          "1": ["Interpreta el sentido global de textos breves y sencillos sobre temas cotidianos", "Selecciona y aplica de forma guiada estrategias básicas de comprensión"],
          "2": ["Interpreta el sentido global y la información específica de textos breves y sencillos", "Interpreta elementos no verbales y busca información"],
          "3": ["Deduce el sentido global e ideas principales de textos de extensión media", "Interpreta y valora el contenido y rasgos discursivos de forma guiada"],
          "4": ["Extrae y analiza el sentido global e ideas principales de textos sobre temas de interés público", "Interpreta y valora textos progresivamente más complejos"],
        },
      },
      {
        id: "CE2",
        nombre: "Producción de textos",
        descripcion: "Producir textos originales de extensión media con organización clara.",
        criterios_por_curso: {
          "1": ["Expresa oralmente textos breves y preparados sobre asuntos cotidianos", "Redacta textos breves siguiendo pautas establecidas"],
          "2": ["Expresa oralmente textos breves adecuados a la situación comunicativa", "Organiza y redacta textos breves sobre temas cotidianos"],
          "3": ["Expresa oralmente textos estructurados con cierto grado de autonomía", "Redacta y difunde textos sencillos respetando la propiedad intelectual"],
          "4": ["Expresa oralmente textos coherentes para describir, narrar, argumentar e informar", "Redacta y difunde textos con corrección y adecuación a la tipología textual"],
        },
      },
      // CE3-CE6 (interacción oral, mediación, plurilingüismo, actitudes interculturales)
      // disponibles en el documento fuente, páginas 340-370.
    ],

    saberes_basicos: {
      bloque_A_comunicacion: {
        descripcion: "Estrategias comunicativas, funciones del lenguaje y léxico de uso común",
        por_curso: {
          "1": ["El error como instrumento de mejora", "Funciones comunicativas básicas: saludar, presentarse, describir, situar en el tiempo/espacio", "Léxico: identificación personal, relaciones, ocio, vida cotidiana"],
          "2": ["Estrategias de planificación y reparación de la comprensión/producción", "Funciones comunicativas: pedir/dar instrucciones, expresar gustos y emociones", "Léxico: escuela, trabajo, salud, vivienda"],
          "3": ["El error como parte del proceso de aprendizaje", "Funciones: narrar eventos pasados, expresar opinión, hipótesis, argumentación sencilla", "Léxico ampliado: tecnología, entorno natural"],
          "4": ["Estrategias de mediación en situaciones cotidianas", "Funciones: reformular, resumir, expresar incertidumbre y duda", "Léxico: formación, orientación académica y profesional"],
        },
      },
      // Bloque B (Plurilingüismo) e interculturalidad disponibles en el documento fuente.
    },
  },

  tecnologia: {
    // "Tecnología y Digitalización" se cursa en 2º y 3º; "Tecnología" es optativa en 4º
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Identificación de problemas tecnológicos",
        descripcion: "Identificar y proponer problemas tecnológicos del entorno próximo, planificando soluciones eficientes y sostenibles.",
        criterios_por_curso: {
          "2": ["Aplica estrategias de gestión de proyectos y resolución de problemas tecnológicos básicos"],
          "3": ["Aplica técnicas de resolución de problemas en diferentes contextos y fases del proyecto"],
          "4_optativa": ["Idea y planifica soluciones tecnológicas emprendedoras que generen valor para la comunidad", "Aplica estrategias colaborativas de gestión de proyectos con perspectiva interdisciplinar"],
        },
      },
      {
        id: "CE2",
        nombre: "Fabricación de soluciones tecnológicas",
        descripcion: "Aplicar técnicas y recursos tecnológicos para fabricar soluciones accesibles y sostenibles.",
        criterios_por_curso: {
          "2": ["Monta estructuras y sistemas mecánicos básicos con herramientas de manipulación de materiales"],
          "3": ["Aplica fabricación digital básica (impresión 3D, corte) respetando normas de seguridad"],
          "4_optativa": ["Analiza el diseño de un producto evaluando su ciclo de vida con criterio ético", "Fabrica productos aplicando diseño asistido y técnicas manuales/digitales"],
        },
      },
      // CE3-CE6 (comunicación técnica, pensamiento computacional, herramientas digitales,
      // sostenibilidad) disponibles en el documento fuente, páginas 490-510 (2º-3º) y 479-486 (4º).
    ],

    saberes_basicos: {
      bloque_A_resolucion_problemas: {
        por_curso: {
          "2": ["Estrategias y técnicas de resolución de problemas", "Sistemas mecánicos básicos: montajes físicos o simuladores", "Electricidad básica para el montaje de circuitos"],
          "3": ["Electricidad y electrónica básica: montaje de esquemas y circuitos", "Introducción a la fabricación digital"],
          "4_optativa": ["Ciclo de vida de un producto y obsolescencia programada", "Técnicas de fabricación manual, mecánica y digital (impresión 3D)"],
        },
      },
      bloque_B_comunicacion: {
        por_curso: {
          "2": ["Vocabulario técnico y etiqueta digital", "Técnicas de representación gráfica: acotación y escalas"],
          "3": ["Aplicaciones CAD en dos y tres dimensiones para planos y objetos"],
          "4_optativa": ["Comunicación efectiva de propuestas tecnológicas: entonación, expresión, lenguaje inclusivo"],
        },
      },
      bloque_C_pensamiento_computacional: {
        por_curso: {
          "2": ["Aplicaciones informáticas sencillas e introducción a la IA", "Sistemas de control programado básicos"],
          "3": ["Algoritmia y diagramas de flujo", "Fundamentos de robótica: montaje y control programado"],
          "4_optativa": ["Sistemas de control programado: controladores, sensores, actuadores", "Robótica: diseño y construcción de robots", "Iniciación a IA y big data"],
        },
      },
      bloque_D_digitalizacion: {
        por_curso: {
          "2": ["Dispositivos digitales: hardware y software", "Seguridad en la red: amenazas y protección de datos"],
          "3": ["Herramientas de edición y creación de contenidos: propiedad intelectual", "Bienestar digital: ciberacoso, sextorsión"],
        },
      },
      bloque_E_tecnologia_sostenible: {
        por_curso: {
          "2": ["Desarrollo tecnológico e impacto ambiental en Asturias"],
          "3": ["Tecnología sostenible y Objetivos de Desarrollo Sostenible"],
          "4_optativa": ["Arquitectura bioclimática y sostenible", "Transporte y sostenibilidad", "Voluntariado tecnológico en Asturias"],
        },
      },
    },
  },

  educacion_fisica: {
    // El decreto organiza los criterios por ciclos: 1º-2º ESO y 3º-4º ESO
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Vida activa y saludable",
        descripcion: "Adoptar un estilo de vida activo y saludable, incorporando actividad física con base científica.",
        criterios_por_ciclo: {
          "1-2": ["Establece secuencias sencillas de actividad física orientadas a la salud", "Incorpora con progresiva autonomía activación corporal, alimentación saludable e higiene", "Adopta medidas generales de prevención de lesiones", "Aplica protocolos básicos de primeros auxilios"],
          "3-4": ["Planifica y autorregula la práctica física según necesidades e intereses individuales", "Incorpora de forma autónoma procesos de activación, alimentación e higiene", "Adopta actitudes que rechazan estereotipos corporales, contrastando información con criterios científicos", "Aplica protocolos de primeros auxilios ante emergencias"],
        },
      },
      {
        id: "CE2",
        nombre: "Habilidades motrices",
        descripcion: "Adaptar capacidades físicas y coordinativas para resolver situaciones motrices variadas (individuales, cooperación, oposición).",
        criterios_por_ciclo: {
          "1-2": ["Desarrolla proyectos motores individuales/cooperativos con autoevaluación y coevaluación", "Interpreta y actúa en contextos motrices variados (juegos, deportes)"],
          "3-4": ["Desarrolla proyectos motores asegurando participación equilibrada", "Muestra habilidades de adaptación ante situaciones de alta incertidumbre"],
        },
      },
      // CE3-CE5 (creación y expresión corporal, gestión de emociones en el juego,
      // relaciones sociales e inclusión) disponibles en el documento fuente, páginas 127-155.
    ],

    saberes_basicos: {
      bloque_A_vida_activa_saludable: {
        por_ciclo: {
          "1-2": ["Activación corporal y calentamiento", "Alimentación saludable y educación postural", "Primeros auxilios básicos"],
          "3-4": ["Autorregulación del esfuerzo y planificación personal", "Prevención de lesiones específicas", "Análisis crítico de estereotipos corporales"],
        },
      },
      bloque_B_organizacion_grupos: {
        por_ciclo: {
          "1-2": ["Juegos modificados y actividades deportivas de iniciación", "Deportes de invasión, red y muro, campo y bate"],
          "3-4": ["Deportes de blanco y diana, de lucha, individuales (atletismo, gimnasia)", "Manifestaciones deportivas propias de Asturias"],
        },
      },
      // Bloques C (Manifestaciones de la cultura motriz), D (Interacción social) y
      // E (Relación con el entorno) disponibles en el documento fuente.
    },
  },

  musica: {
    // Se cursa en 1º, 2º y 4º ESO (no en 3º)
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Análisis del patrimonio musical",
        descripcion: "Analizar obras de diferentes épocas y culturas, relacionándolas con su contexto histórico.",
        criterios_por_curso: {
          "1": ["Identifica rasgos estilísticos de obras musicales/dancísticas con actitud de apertura y respeto", "Explica funciones de producciones musicales relacionándolas con su contexto"],
          "2": ["Identifica rasgos estilísticos de obras de diferentes épocas y culturas", "Establece conexiones entre manifestaciones musicales de distintas épocas"],
          "4": ["Analiza obras musicales/dancísticas explicando su relación con el contexto", "Valora críticamente hábitos y gustos musicales reflexionando sobre su evolución"],
        },
      },
      {
        id: "CE2",
        nombre: "Exploración expresiva e improvisación",
        descripcion: "Explorar posibilidades expresivas de técnicas musicales y dancísticas mediante la improvisación.",
        criterios_por_curso: {
          "1": ["Explora técnicas musicales/dancísticas mediante improvisación pautada"],
          "2": ["Explora técnicas mediante improvisación libre, seleccionando las más adecuadas a la intención expresiva"],
          "4": ["Selecciona y aplica técnicas expresivas con criterio propio en composiciones personales"],
        },
      },
      // CE3-CE4 (interpretación musical, creación de proyectos artísticos con perspectiva
      // de género) disponibles en el documento fuente, páginas 426-445.
    ],

    saberes_basicos: {
      bloque_A_escucha_activa: {
        por_curso: {
          "1": ["Rasgos estilísticos de la música de diferentes épocas y culturas", "Perspectiva de género en el análisis musical"],
          "2": ["Contexto histórico y social de obras musicales", "Música y danza de otras culturas presentes en cine, videojuegos, redes"],
          "4": ["Evolución de referentes musicales y su relación con el presente", "Hábitos saludables de escucha"],
        },
      },
      bloque_B_interpretacion_creacion: {
        por_curso: {
          "1": ["Improvisación vocal, corporal e instrumental básica"],
          "2": ["Técnicas musicales y dancísticas mediante herramientas analógicas y digitales"],
          "4": ["Composición y proyectos artísticos personales"],
        },
      },
    },
  },

  educacion_plastica: {
    // "Educación Plástica, Visual y Audiovisual" se cursa en 1º y 3º ESO
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Patrimonio artístico y cultural",
        descripcion: "Comprender la importancia de manifestaciones culturales y artísticas para el desarrollo humano.",
        criterios_por_curso: {
          "1": ["Reconoce factores históricos y sociales de producciones plásticas desde una perspectiva de género", "Valora la importancia de la conservación del patrimonio cultural"],
          "3": ["Reconoce factores históricos, función y finalidad de producciones plásticas/audiovisuales", "Analiza obras de arte valorando su conservación"],
        },
      },
      {
        id: "CE2",
        nombre: "Análisis y explicación de producciones propias",
        descripcion: "Explicar producciones propias comparándolas con las de otros y con el patrimonio cultural.",
        criterios_por_curso: {
          "1": ["Explica el proceso entre la realidad, el imaginario y la producción, superando estereotipos"],
          "3": ["Analiza producciones propias y ajenas desarrollando una mirada estética respetuosa con la diversidad cultural"],
        },
      },
      // CE3-CE8 (análisis de propuestas visuales, creación de proyectos, lenguaje audiovisual,
      // herramientas digitales) disponibles en el documento fuente, páginas 151-175.
    ],

    saberes_basicos: {
      bloque_A_percepcion_cultura: {
        por_curso: {
          "1": ["Contextualización histórica y social de obras de arte", "Perspectiva de género en el análisis de producciones artísticas"],
          "3": ["Función y finalidad de producciones plásticas y audiovisuales", "Manifestaciones artísticas contemporáneas: series, videoclips, redes sociales"],
        },
      },
      bloque_B_produccion_creacion: {
        por_curso: {
          "1": ["Elementos básicos del lenguaje plástico y visual: punto, línea, forma, color"],
          "3": ["Composición y lenguaje audiovisual: encuadre, plano, montaje"],
        },
      },
    },
  },

  educacion_valores: {
    // Se cursa solo en 3º ESO
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Autoconocimiento y proyecto vital",
        descripcion: "Investigar sobre la identidad humana y cuestiones éticas del propio proyecto vital.",
        criterios_por_curso: {
          "3": ["Construye un concepto ajustado de su propia persona reconociendo su dimensión cívica y moral", "Identifica y gestiona emociones con empatía, incluyendo el ámbito afectivo-sexual", "Desarrolla autonomía moral mediante deliberación racional sobre derechos, redes y acoso escolar"],
        },
      },
      {
        id: "CE2",
        nombre: "Convivencia democrática",
        descripcion: "Actuar según normas y valores cívicos para promover una convivencia pacífica y democrática.",
        criterios_por_curso: {
          "3": ["Promueve convivencia democrática usando conceptos de ley, poder, justicia y derechos humanos", "Fomenta ciudadanía activa mediante participación en decisiones colectivas", "Analiza cuestiones éticas de actualidad: desigualdad, pobreza, derecho al trabajo", "Toma conciencia de la igualdad de género y los derechos LGTBIQ+"],
        },
      },
      // CE3-CE4 (sostenibilidad ecosocial, pensamiento crítico ante dilemas éticos)
      // disponibles en el documento fuente, páginas 171-180.
    ],

    saberes_basicos: {
      bloque_A_identidad_y_dignidad: {
        por_curso: { "3": ["Concepciones filosóficas sobre el ser humano", "Autoestima y relaciones interpersonales, incluido el ámbito afectivo-sexual"] },
      },
      bloque_B_etica_civica: {
        por_curso: { "3": ["Conceptos de ley, poder, soberanía, Estado y democracia", "Feminismo, igualdad de género y derechos LGTBIQ+", "Memoria democrática y derechos humanos"] },
      },
      bloque_C_sostenibilidad: {
        por_curso: { "3": ["Interdependencia y ecodependencia de las actividades humanas", "Objetivos de Desarrollo Sostenible"] },
      },
    },
  },

  // === Materias de menor carga horaria u optativas ===
  // Se listan con su ubicación curricular y núcleo temático principal;
  // el detalle completo de competencias/saberes sigue el mismo patrón que las anteriores
  // y está disponible en el documento fuente en las páginas indicadas.
  otras_materias_referencia: {
    latin: { curso: "4º ESO (optativa)", paginas_fuente: "276-294", nucleo: "Origen latino del español, morfología y sintaxis básica, mitología y civilización romana" },
    digitalizacion: { curso: "4º ESO (optativa)", paginas_fuente: "91-105", nucleo: "Programación, tratamiento de datos, ciudadanía digital" },
    economia_emprendimiento: { curso: "4º ESO (optativa)", paginas_fuente: "106-121", nucleo: "Finanzas personales, economía básica, proyecto emprendedor" },
    expresion_artistica: { curso: "1º-3º ESO (optativa)", paginas_fuente: "181-194", nucleo: "Integración de artes plásticas, música y artes escénicas" },
    formacion_orientacion: { curso: "3º-4º ESO", paginas_fuente: "218-231", nucleo: "Autoconocimiento, itinerarios académicos y orientación profesional" },
    segunda_lengua_extranjera: { curso: "1º-4º ESO (optativa)", paginas_fuente: "436-460", nucleo: "Mismo enfoque comunicativo que Lengua Extranjera, nivel inicial" },
  },
};
