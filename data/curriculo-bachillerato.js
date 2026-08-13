// data/curriculo-bachillerato.js
// Currículo oficial LOMLOE de Bachillerato — Principado de Asturias
// Fuente: Decreto 60/2022, de 30 de agosto (BOPA núm. 169, 1-ix-2022)
// Contenido reestructurado y resumido a partir del decreto oficial (no copia literal).

export const curriculoBachillerato = {
  fuente: "Decreto 60/2022, de 30 de agosto (BOPA)",
  modalidades: ["Artes", "Ciencias y Tecnología", "General", "Humanidades y Ciencias Sociales"],

  matematicas: {
    // Matemáticas I (1º Bach, modalidad Ciencias/General) y Matemáticas II (2º Bach)
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Modelización y resolución de problemas",
        descripcion: "Modelizar y resolver problemas de la vida cotidiana, la ciencia y la tecnología.",
        criterios_por_curso: {
          "matematicas_I": ["Maneja estrategias y herramientas digitales para modelizar y resolver problemas, evaluando su eficiencia", "Obtiene todas las soluciones posibles describiendo el procedimiento"],
          "matematicas_II": ["Maneja diferentes estrategias seleccionando la más adecuada según su eficiencia", "Obtiene todas las soluciones posibles describiendo el procedimiento"],
        },
      },
      {
        id: "CE2",
        nombre: "Validación de soluciones",
        descripcion: "Verificar la validez de las soluciones mediante razonamiento y argumentación.",
        criterios_por_curso: {
          "matematicas_I": ["Comprueba la validez matemática de las soluciones considerando distintas perspectivas (sostenibilidad, etc.)"],
          "matematicas_II": ["Argumenta la idoneidad de las soluciones desde distintas perspectivas"],
        },
      },
      // CE3-CE9 (formulación de conjeturas, pensamiento computacional, conexiones,
      // comunicación matemática, destrezas socioafectivas) disponibles en el decreto,
      // páginas 349-372.
    ],

    saberes_basicos: {
      matematicas_I: {
        sentido_numerico: ["Adición y producto escalar de vectores", "Números complejos como soluciones de ecuaciones polinómicas sin raíces reales"],
        sentido_medida: ["Trigonometría: longitudes y medidas angulares", "Límites: estimación y cálculo", "Continuidad y derivada de una función"],
        sentido_espacial: ["Objetos geométricos en el plano con coordenadas cartesianas", "Modelización de posición y movimiento con vectores"],
        sentido_algebraico: ["Ecuaciones, inecuaciones y sistemas no lineales", "Funciones: polinómicas, exponenciales, logarítmicas, trigonométricas, a trozos", "Pensamiento computacional aplicado a problemas científicos"],
        sentido_estocastico: ["Variables bidimensionales: regresión lineal y cuadrática, correlación vs causalidad", "Probabilidad: regla de Laplace y frecuencia relativa"],
        sentido_socioafectivo: ["Gestión de la ansiedad ante las matemáticas", "Tratamiento del error como oportunidad de aprendizaje"],
      },
      matematicas_II: {
        sentido_numerico: ["Adición y producto de vectores y matrices", "Estructura y propiedades de conjuntos de vectores/matrices"],
        sentido_medida: ["Integral definida como área bajo una curva", "Cálculo de primitivas y aplicación a superficies/volúmenes de revolución", "Probabilidad: interpretación subjetiva, clásica y frecuentista"],
        sentido_espacial: ["Objetos geométricos en el espacio (3D) con coordenadas cartesianas", "Modelización de posición y movimiento en el espacio con vectores"],
        sentido_algebraico: ["Derivadas: interpretación y aplicación al cálculo de límites", "Optimización mediante la derivada como razón de cambio"],
        // Sentido estocástico y socioafectivo siguen el mismo patrón que Matemáticas I,
        // con mayor profundidad — disponible en el decreto, páginas 375-390.
      },
    },
  },

  fisica: {
    // Física de 2º Bachillerato (modalidad Ciencias y Tecnología)
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Fundamentos teóricos y resolución de problemas",
        descripcion: "Utilizar teorías, principios y leyes de la física en la resolución de problemas.",
        criterios: ["Reconoce la relevancia de la física en ciencia, tecnología, economía y sostenibilidad", "Resuelve problemas de manera experimental y analítica usando principios y leyes"],
      },
      {
        id: "CE2",
        nombre: "Modelos predictivos",
        descripcion: "Adoptar modelos, teorías y leyes de la física para predecir la evolución de sistemas naturales.",
        criterios: ["Analiza la evolución de sistemas naturales con modelos y leyes de la física", "Infiere soluciones a problemas generales a partir de casos particulares", "Conoce aplicaciones prácticas en tecnología, industria y biosanitario"],
      },
      {
        id: "CE3",
        nombre: "Lenguaje matemático de la física",
        descripcion: "Utilizar la formulación matemática de principios, magnitudes y ecuaciones físicas.",
        criterios: ["Usa formalismos matemáticos con base científica para plantear y resolver problemas de física"],
      },
      // CE4-CE6 (recursos digitales, trabajo experimental, multidisciplinariedad)
      // disponibles en el decreto, páginas 183-190.
    ],

    saberes_basicos: {
      bloque_A_campo_gravitatorio: ["Campo gravitatorio: cálculo vectorial y efectos cinemáticos/dinámicos", "Momento angular y conservación en campos centrales", "Energía mecánica en campo gravitatorio", "Leyes del movimiento planetario y satélites"],
      bloque_B_campo_electromagnetico: ["Campos eléctrico y magnético: tratamiento vectorial", "Intensidad de campo eléctrico y flujo", "Campos magnéticos generados por corrientes eléctricas", "Fuerza electromotriz: motores, generadores, transformadores"],
      bloque_C_vibraciones_ondas: ["Movimiento oscilatorio y ondulatorio: ecuación de onda", "Ondas sonoras y efecto Doppler", "Naturaleza de la luz: espectro electromagnético", "Sistemas ópticos: lentes y espejos"],
      bloque_D_fisica_moderna: ["Relatividad especial: contracción de longitud, dilatación del tiempo", "Dualidad onda-corpúsculo: hipótesis de De Broglie, efecto fotoeléctrico", "Modelo estándar de partículas", "Radiactividad y aplicaciones nucleares"],
    },
  },

  quimica: {
    // Química de 2º Bachillerato (modalidad Ciencias y Tecnología)
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Fundamentos de procesos químicos",
        descripcion: "Comprender y aplicar los fundamentos de los procesos químicos más importantes.",
        criterios: ["Reconoce la importancia de la química en el desarrollo de la sociedad y la sostenibilidad", "Describe procesos químicos y propiedades de sistemas materiales", "Reconoce la naturaleza experimental e interdisciplinar de la química"],
      },
      {
        id: "CE2",
        nombre: "Modelos y leyes químicas",
        descripcion: "Adoptar modelos y leyes de la química para inferir soluciones a problemas cotidianos.",
        criterios: ["Relaciona los principios de la química con problemas actuales de ciencia y tecnología"],
      },
      // CE3-CE6 (lenguaje químico/nomenclatura, uso responsable de productos,
      // técnicas experimentales, multidisciplinariedad) disponibles en el decreto,
      // páginas 404-420.
    ],

    saberes_basicos: {
      bloque_A_enlace_estructura: ["Espectros atómicos y modelo mecano-cuántico", "Números cuánticos y principio de exclusión de Pauli", "Configuración electrónica y tabla periódica: tendencias", "Tipos de enlace químico: Lewis, TRPECV, hibridación", "Ciclo de Born-Haber y fuerzas intermoleculares"],
      bloque_B_reacciones_quimicas: ["Termodinámica: entalpía, ley de Hess, energía de Gibbs", "Cinética química: velocidad de reacción, energía de activación", "Equilibrio químico: Kc, Kp, principio de Le Châtelier", "Ácido-base: teorías de Arrhenius y Brønsted-Lowry, pH, volumetrías", "Redox: ajuste por ion-electrón, leyes de Faraday, pilas y corrosión"],
      bloque_C_quimica_organica: ["Isomería estructural y espacial", "Reactividad orgánica: funciones orgánicas y tipos de reacciones", "Polímeros: formación, clasificación y aplicaciones"],
    },
  },

  historia_espana: {
    // Materia común de 2º Bachillerato, todas las modalidades
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Legado democrático",
        descripcion: "Valorar los movimientos que han promovido las libertades en la historia de España.",
        criterios: ["Reconoce el legado democrático comparando regímenes políticos desde el absolutismo hasta hoy", "Identifica el papel de la Transición y la Constitución de 1978 como fundamento democrático"],
      },
      {
        id: "CE2",
        nombre: "Diversidad identitaria",
        descripcion: "Reconocer la diversidad identitaria de España mediante el contraste de fuentes.",
        criterios: ["Respeta los sentimientos de pertenencia e identidades múltiples del estado español"],
      },
      // CE3-CE8 (idea de progreso, diversidad social, creencias e ideologías, valor
      // geoestratégico, perspectiva de género, patrimonio histórico) disponibles
      // en el decreto, páginas 236-244.
    ],

    saberes_basicos: {
      bloque_A_sociedades_en_el_tiempo: [
        "Metodología histórica y usos públicos de la Historia",
        "Construcción nacional: del liberalismo al estado contemporáneo",
        "Constitucionalismo: de la Constitución de 1812 a la de 1931",
        "Movimiento obrero en Asturias e industrialización",
        "II República, Guerra Civil y Franquismo",
        "Roles de género y movimientos feministas en la historia de España",
      ],
      bloque_B_retos_mundo_actual: [
        "Memoria democrática y ley de memoria democrática de Asturias",
        "La cuestión nacional: nacionalismos y regionalismo asturiano",
        "Transición y Constitución de 1978: el Estatuto de Autonomía de Asturias",
        "España en la Unión Europea",
      ],
      bloque_C_compromiso_civico: ["Conciencia democrática y participación ciudadana", "Comportamiento ecosocial y Objetivos de Desarrollo Sostenible"],
    },
  },

  filosofia: {
    // Materia común de 1º Bachillerato, todas las modalidades
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Cuestionamiento filosófico",
        descripcion: "Identificar problemas y formular preguntas sobre el fundamento de la realidad y la existencia.",
        criterios: ["Formula preguntas filosóficas sobre el fundamento de la realidad, el conocimiento y la existencia"],
      },
      {
        id: "CE2",
        nombre: "Gestión de la información filosófica",
        descripcion: "Buscar, interpretar y transmitir correctamente información filosófica.",
        criterios: ["Interpreta y produce textos filosóficos con rigor"],
      },
      {
        id: "CE3",
        nombre: "Argumentación filosófica",
        descripcion: "Usar y valorar argumentos y estructuras argumentativas.",
        criterios: ["Detecta falacias y sesgos cognitivos en argumentos", "Construye argumentaciones filosóficas coherentes"],
      },
      // CE4-CE9 (diálogo filosófico, pluralismo, historia de la filosofía, perspectiva
      // transdisciplinar, ética y política, estética) disponibles en el decreto,
      // páginas 161-180.
    ],

    saberes_basicos: {
      bloque_A_filosofia_ser_humano: ["Características del saber filosófico y sus divisiones tradicionales", "Concepciones filosóficas del ser humano", "Estructura psicosomática: sensibilidad, deseo, cognición", "Identidad personal y transhumanismo"],
      bloque_B_conocimiento_realidad: ["El conocimiento: posibilidad, límites y teorías de la verdad", "Racionalismo, empirismo y otras teorías del conocimiento", "Lógica formal, argumentación y falacias", "Filosofía de la ciencia: demarcación y metodologías", "Posverdad y desinformación"],
      // Bloques C (Ética y política), D (Estética) disponibles en el decreto.
    },
  },

  biologia: {
    // Biología de 2º Bachillerato (modalidad Ciencias y Tecnología)
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Comunicación científica",
        descripcion: "Interpretar y transmitir información y datos científicos de procesos biológicos.",
        criterios: ["Analiza procesos, métodos y resultados de las ciencias biológicas argumentando con precisión"],
      },
      {
        id: "CE2",
        nombre: "Evaluación crítica de fuentes",
        descripcion: "Localizar y utilizar fuentes fiables sobre biología.",
        criterios: ["Selecciona y evalúa críticamente fuentes de información científica"],
      },
      // CE3-CE6 (proyectos de investigación, resolución de problemas, salud y
      // sostenibilidad, biomoléculas) disponibles en el decreto, páginas 37-56.
    ],

    saberes_basicos: {
      bloque_A_biomoleculas: ["Agua, sales minerales, glúcidos, lípidos: características y funciones", "Proteínas: estructura y función biocatalizadora", "Ácidos nucleicos: tipos y estructura"],
      bloque_B_genetica_molecular: ["Replicación del ADN: modelo procariota y eucariota", "Expresión génica y código genético", "Mutaciones y su relación con la evolución", "Regulación de la expresión génica"],
      bloque_C_biologia_celular: ["Teoría celular y microscopía", "Membrana plasmática y transporte celular", "Ciclo celular: mitosis y meiosis", "Cáncer: relación con mutaciones y ciclo celular"],
      bloque_D_metabolismo: ["Anabolismo y catabolismo", "Respiración celular: glucólisis, ciclo de Krebs, cadena de electrones", "Fotosíntesis y quimiosíntesis"],
      bloque_E_biotecnologia: ["Microorganismos y su papel en biotecnología", "Ingeniería genética: PCR, CRISPR-Cas9", "Aplicaciones en salud, agricultura y medio ambiente"],
      bloque_F_inmunologia: ["Inmunidad innata y específica", "Inmunidad humoral y celular", "Enfermedades infecciosas y patologías del sistema inmunitario"],
    },
  },

  lengua_literatura: {
    // Materia común de 1º y 2º Bachillerato
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Comprensión oral y multimodal",
        descripcion: "Comprender e interpretar textos orales y multimodales complejos.",
        criterios: ["Interpreta textos orales/multimodales identificando intención y fiabilidad del emisor"],
      },
      {
        id: "CE4",
        nombre: "Comprensión lectora crítica",
        descripcion: "Comprender, interpretar y valorar textos escritos con sentido crítico.",
        criterios: ["Evalúa críticamente la fiabilidad y calidad de textos escritos complejos"],
      },
      {
        id: "CE8",
        nombre: "Educación literaria",
        descripcion: "Leer, interpretar y valorar obras relevantes de la literatura española e hispanoamericana.",
        criterios: ["Interpreta obras de la Edad de Plata (1875-1936), guerra civil/exilio/dictadura y literatura contemporánea", "Analiza el papel de las escritoras del siglo XX-XXI y la invisibilización de la autoría femenina"],
      },
      // CE2-CE3, CE5-CE7, CE9-CE10 (producción oral/escrita, alfabetización
      // informacional, reflexión lingüística, uso ético del lenguaje) disponibles
      // en el decreto, páginas 290-315.
    ],

    saberes_basicos: {
      bloque_B_comunicacion: ["Subjetividad y objetividad en los textos", "Conectores y marcadores discursivos", "Corrección lingüística y ortográfica avanzada"],
      bloque_C_educacion_literaria: [
        "Lectura guiada: Edad de Plata de la cultura española (1875-1936)",
        "Guerra civil, exilio y dictadura en la literatura española",
        "Literatura española e hispanoamericana contemporánea (siglos XX-XXI)",
        "Análisis de elementos del género literario y su relación con el sentido de la obra",
        "Perspectiva de género: papel de las escritoras y su invisibilización histórica",
      ],
      bloque_D_reflexion_lengua: ["Diferencias entre lengua oral y escrita", "Metalenguaje específico para el análisis lingüístico"],
    },
  },

  economia: {
    // Economía de 1º Bachillerato (modalidad General/Humanidades y Ciencias Sociales)
    competencias_especificas: [
      {
        id: "CE1",
        nombre: "Escasez y toma de decisiones",
        descripcion: "Valorar el problema de la escasez y la importancia de tomar decisiones económicas racionales.",
        criterios: ["Analiza el coste de oportunidad y el análisis marginal en decisiones económicas"],
      },
      {
        id: "CE2",
        nombre: "Funcionamiento del mercado",
        descripcion: "Reconocer y comprender el funcionamiento del mercado.",
        criterios: ["Analiza tipos de mercado, elasticidad y fallos de mercado"],
      },
      // CE3-CE6 (agentes económicos, sistema financiero, retos globales,
      // problemas económicos actuales) disponibles en el decreto, páginas 124-145.
    ],

    saberes_basicos: {
      bloque_A_decisiones_economicas: ["Escasez, coste de oportunidad y análisis marginal", "Teoría de juegos, eficiencia, riesgo e incertidumbre", "Funciones del dinero y productos financieros (préstamos, hipotecas, seguros)"],
      bloque_B_microeconomia: ["Tipos y funcionamiento de mercados", "Elasticidad y análisis coste-beneficio", "Fallos de mercado"],
      bloque_C_macroeconomia: ["Flujo circular de la renta, demanda y oferta agregada", "Crecimiento económico y desarrollo", "Economía laboral: desempleo, brecha salarial, mercado de trabajo en Asturias", "Comercio internacional y Unión Europea"],
      bloque_D_politicas_economicas: ["Política fiscal: estado del bienestar, déficit y deuda pública", "Política monetaria e inflación"],
      bloque_E_economia_espanola_global: ["Globalización: oportunidades, riesgos y desigualdades"],
    },
  },
};
