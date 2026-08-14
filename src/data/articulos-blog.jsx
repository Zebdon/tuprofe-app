// src/data/articulos-blog.js
// Contenido editorial del blog: adolescencia, autocuidado, vida en familia
// y orientación. Todo redactado con tono cálido pero SIN posicionarse como
// apoyo psicológico — si un artículo toca temas emocionales, siempre remite
// a hablar con un adulto de confianza, nunca sustituye ese acompañamiento.

export const ARTICULOS = [
  {
    slug: "gestionar-estres-examenes",
    categoria: "Autocuidado",
    titulo: "Cómo gestionar el estrés antes de un examen",
    resumen: "Técnicas sencillas para llegar más tranquilo/a el día del examen, sin agobios de última hora.",
    contenido: (
      <>
        <p>Es normal sentir nervios antes de un examen — le pasa a la mayoría de la gente, incluidos los adultos.
        Lo importante es que esos nervios no te bloqueen.</p>
        <h2>Antes del examen</h2>
        <p>Planifica el estudio en bloques de 25-30 minutos con descansos cortos entre medias, en vez de maratones
        de horas seguidas. Duerme bien la noche anterior: el cansancio afecta más a tu memoria que repasar una
        hora extra a las tantas.</p>
        <h2>El mismo día</h2>
        <p>Si notas que te falta el aire o el corazón se acelera, prueba a respirar contando: 4 segundos
        inhalando, 4 reteniendo, 4 exhalando. Repítelo unas cuantas veces antes de entrar al examen.</p>
        <h2>Si el estrés se hace muy grande</h2>
        <p>Si sientes que la ansiedad por los exámenes te supera de forma frecuente, no es algo que tengas que
        llevar solo/a — cuéntaselo a tus padres, a un profesor de confianza o al orientador/a de tu centro.
        Ellos pueden ayudarte de verdad con eso.</p>
      </>
    ),
  },
  {
    slug: "organizar-tiempo-estudio",
    categoria: "Autocuidado",
    titulo: "Organizar tu tiempo entre estudiar y descansar",
    resumen: "Ideas prácticas para no quemarte estudiando y aun así rendir mejor.",
    contenido: (
      <>
        <p>Estudiar muchas horas seguidas no es lo mismo que estudiar bien. El cerebro necesita descansos para
        consolidar lo aprendido.</p>
        <h2>La técnica Pomodoro</h2>
        <p>25 minutos de estudio concentrado, 5 minutos de descanso real (levántate, estira, bebe agua — nada de
        móvil, que "engancha" más de lo que descansa). Cada 4 bloques, un descanso más largo de 15-20 minutos.</p>
        <h2>El descanso también cuenta</h2>
        <p>Jugar, salir, hacer deporte o quedar con amigos no es "perder el tiempo" — es lo que hace que al volver
        a estudiar rindas mejor. Un cerebro descansado aprende más rápido que uno agotado.</p>
      </>
    ),
  },
  {
    slug: "ayudar-en-casa",
    categoria: "Vida en familia",
    titulo: "Por qué ayudar en casa no es un castigo",
    resumen: "Colaborar en las tareas domésticas tiene beneficios que van más allá de tener la habitación ordenada.",
    contenido: (
      <>
        <p>Puede que a veces sientas que ayudar en casa (poner la mesa, recoger tu cuarto, sacar la basura) es
        una obligación aburrida. Pero hay algo detrás de eso que merece la pena entender.</p>
        <h2>Una casa se cuida entre todos</h2>
        <p>Vivir en familia significa que las tareas de mantener la casa no le tocan a una sola persona.
        Cuando cada uno aporta su parte, todos tienen más tiempo libre — incluidos tus padres.</p>
        <h2>Aprendes habilidades que usarás siempre</h2>
        <p>Saber organizar tu espacio, cocinar algo sencillo o gestionar tu ropa son habilidades que necesitarás
        el resto de tu vida, y cuanto antes empieces a practicarlas, más fácil te resultará cuando vivas solo/a.</p>
        <h2>Una idea para empezar</h2>
        <p>Habla con tu familia y proponed repartir tareas de forma clara — a veces ayuda tener una tarea "fija"
        tuya (como poner/quitar la mesa) en vez de que todo se decida sobre la marcha.</p>
      </>
    ),
  },
  {
    slug: "orientacion-universitaria",
    categoria: "Orientación",
    titulo: "Cómo empezar a pensar en tu futuro (sin agobiarte)",
    resumen: "No hace falta tenerlo todo decidido a los 15 años — algunas ideas para ir explorando con calma.",
    contenido: (
      <>
        <p>Si estás en ESO o Bachillerato, es probable que te pregunten constantemente "¿qué quieres estudiar?".
        La verdad es que está bien no saberlo todavía.</p>
        <h2>Explora antes de decidir</h2>
        <p>Prueba actividades distintas: un club de robótica, un taller de escritura, ayudar en una asociación,
        ver documentales sobre profesiones que te llamen la atención. Cuantas más cosas pruebes, más información
        tendrás sobre lo que realmente te gusta.</p>
        <h2>El Bachillerato no cierra puertas para siempre</h2>
        <p>Elegir una modalidad de Bachillerato (Ciencias, Humanidades...) no significa que tu futuro quede fijado
        para siempre. Hay muchos caminos, y cambiar de idea más adelante es más habitual de lo que parece.</p>
        <h2>Habla con tu orientador/a</h2>
        <p>Los departamentos de orientación de los institutos existen justo para esto — pueden ayudarte a conocer
        opciones que quizá ni sabías que existían.</p>
      </>
    ),
  },
  {
    slug: "cambios-adolescencia",
    categoria: "Adolescencia",
    titulo: "Los cambios de la adolescencia: qué es normal sentir",
    resumen: "Cambios de humor, más necesidad de intimidad, discusiones en casa... una guía para entender qué está pasando.",
    contenido: (
      <>
        <p>Durante la adolescencia el cerebro y el cuerpo cambian mucho, y es totalmente normal notar cosas
        distintas: más cambios de humor, ganas de pasar más tiempo a solas o con amigos que con la familia,
        más discusiones en casa de las que solía haber.</p>
        <h2>No estás "raro/a"</h2>
        <p>Todo esto forma parte del proceso de hacerte mayor y descubrir quién eres. No significa que algo vaya
        mal contigo.</p>
        <h2>Cuándo conviene hablar con un adulto</h2>
        <p>Si notas que te sientes triste, angustiado/a o desconectado/a durante mucho tiempo seguido, o si algo
        te preocupa y no sabes cómo manejarlo, es buena idea contárselo a un adulto de confianza — tus padres,
        un profesor, o el orientador/a del centro. No tienes que llevarlo solo/a, y hablarlo con alguien que
        pueda ayudarte de verdad es un signo de madurez, no de debilidad.</p>
      </>
    ),
  },
];
