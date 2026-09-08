/**
 * relationship.ts
 * -----------------------------------------------------------------------
 * Contenido real de la historia. Toda la información editable vive aquí.
 * No se debe escribir texto directamente dentro de los componentes:
 * si algún día quieres cambiar una frase, cámbiala en este archivo.
 * -----------------------------------------------------------------------
 */

export const PERSON = {
  name: "Marta",
  nickname: "cosita",
  relationshipStartISO: "2026-06-17T00:00:00+02:00", // Europe/Madrid
  relationshipStartLabel: "17 · 06 · 2026",
  specialPhrase: "Quiéreme un poco",
};

export const SONG = {
  title: "Heartbreaker",
  artist: "Dvalentino",
  src: "/audio/heartbreaker.mp3",
};

/** Pantalla de entrada */
export const INTRO = {
  date: PERSON.relationshipStartLabel,
  name: PERSON.name,
  lines: [
    "Hay historias que empiezan con una fecha.",
    "Y hay fechas que terminan significándolo todo.",
  ],
  cta: "Entrar",
  hint: "Desliza para comenzar",
};

/** Escena 01 — Casa de Candela */
export const SCENE_CANDELA = {
  id: "candela",
  index: "01",
  eyebrow: "Antes de todo...",
  title: "Casa de Candela",
  subtitle: "El lugar donde nos conocimos.",
  lines: [
    "Antes de los viajes.",
    "Antes de los recuerdos.",
    "Antes de todo lo que vendría después.",
    "Parece increíble pensar que todo empezó allí.",
  ],
};

/** Escena 02 — Jerez */
export const SCENE_JEREZ = {
  id: "jerez",
  index: "02",
  eyebrow: "Y entonces llegó Jerez",
  title: "Jerez",
  subtitle: "El momento que lo cambió todo.",
  beats: [
    ["Fuimos a Jerez.", "Con tu hermano."],
    ["Pero ese viaje acabaría significando mucho más."],
    ["Fue allí donde te pregunté...", "...si querías ser mi novia."],
    ["Y dijiste que sí."],
  ],
  dateReveal: PERSON.relationshipStartLabel,
  dateCaption: "Nuestro comienzo.",
};

/** Escena 03 — Córdoba */
export const SCENE_CORDOBA = {
  id: "cordoba",
  index: "03",
  eyebrow: "Y después llegó Córdoba",
  title: "Córdoba",
  subtitle: "Nuestro primer viaje solos.",
  lines: [
    "Por primera vez...",
    "Solo tú y yo.",
    "Otro lugar.",
    "Otro recuerdo.",
    "Y nosotros.",
  ],
  closing: "Nuestro primer viaje solos.",
};

/** Escena 04 — Contador en tiempo real */
export const COUNTER = {
  eyebrow: "Desde aquel día...",
  lines: ["Y desde entonces...", "el tiempo sigue pasando.", "Pero algunos momentos se quedan."],
  units: [
    { key: "days", label: "días" },
    { key: "hours", label: "horas" },
    { key: "minutes", label: "minutos" },
    { key: "seconds", label: "segundos" },
  ] as const,
};

/** Timeline */
export const TIMELINE = [
  { id: "candela", index: "01", title: "Casa de Candela", caption: "Donde nos conocimos." },
  { id: "jerez", index: "02", title: "Jerez", caption: "Donde te pedí ser mi novia." },
  { id: "inicio", index: "03", title: PERSON.relationshipStartLabel, caption: "El comienzo." },
  { id: "cordoba", index: "04", title: "Córdoba", caption: "Nuestro primer viaje solos." },
];

/**
 * Carta para Marta.
 * Escrita en primera persona. Editable libremente: es texto plano,
 * cada párrafo es un elemento del array para controlar el ritmo de aparición.
 */
export const LETTER = {
  heading: "Para ti, cosita",
  paragraphs: [
    "Marta, hay cosas que llevo un tiempo queriendo decirte con calma, sin prisa, sin que se las lleve el día a día. Así que te las dejo aquí, escritas, para que las tengas cuando quieras volver a leerlas.",
    "Lo primero es lo más simple: contigo soy feliz de una forma que no sé explicar del todo bien. Es esa felicidad tranquila, de las que no hacen ruido pero se notan en todo. En cómo me río más, en cómo me apetece contarte hasta las tonterías del día.",
    "Todo empezó en casa de Candela. Ni siquiera hacía falta que pasara nada especial esa noche, y sin embargo ahí empezó todo lo que ha venido después. A veces pienso en eso y me parece una locura que un sitio cualquiera se haya convertido en el principio de nuestra historia.",
    "Y luego llegó Jerez. Fuimos con tu hermano, y en medio de ese viaje pasó lo que para mí es uno de los momentos más importantes de mi vida: te pregunté si querías ser mi novia. Me acuerdo de esos segundos antes de que contestaras como si hubiera sido ayer. Dijiste que sí, y desde el 17 de junio de 2026 esa fecha significa todo para mí.",
    "Después vino Córdoba, y con ella algo distinto: fue nuestro primer viaje solos, los dos, sin nadie más. Me gustó descubrir cómo somos tú y yo cuando no hay nadie mirando, cómo viajamos, cómo nos organizamos, cómo nos reímos de las mismas tonterías en sitios nuevos.",
    "Desde el 17 de junio no ha sido solo una fecha en un calendario, ha sido el punto de partida de todo lo que hemos ido construyendo desde entonces. Cada recuerdo que hemos hecho juntos, hasta el más pequeño, se ha ido sumando a esa fecha y le ha ido dando más sentido.",
    "Y lo que más ganas me da es pensar en todo lo que queda. Quiero seguir haciendo recuerdos contigo, de los grandes y de los de un martes cualquiera. Porque esto, cosita, apenas está empezando.",
  ],
  signature: "Te quiero.",
};

/** Escena "Quiéreme un poco" */
export const QUIEREME_UN_POCO = {
  pre: "Solo te voy a pedir una cosa.",
  phrase: PERSON.specialPhrase,
  post: "Yo me encargo del resto.",
};

/** Escena final */
export const FINAL_SCENE = {
  name: PERSON.name,
  lines: ["Esta página termina aquí.", "Pero nuestra historia no."],
  question: "¿Quieres seguir escribiendo esta historia conmigo?",
  options: ["Sí ❤️", "Obviamente"],
  finalMessage: `Te quiero, ${PERSON.nickname}.`,
};

/** Orden narrativo completo de la experiencia, usado por la navegación */
export const STORY_SECTIONS = [
  { id: "intro", label: "Entrada" },
  { id: "candela", label: "Casa de Candela" },
  { id: "jerez", label: "Jerez" },
  { id: "cordoba", label: "Córdoba" },
  { id: "counter", label: "El tiempo" },
  { id: "timeline", label: "Timeline" },
  { id: "letter", label: "Carta" },
  { id: "quiereme", label: PERSON.specialPhrase },
  { id: "final", label: "Final" },
] as const;
