export const URL_BASE = "https://www.unorporciento.com";
export const DEMO = "/agendar?doctor=33698a5d-d6bb-4700-8bb1-3fbac802c987";
export const wa = (esp) =>
  "https://wa.me/524441905298?text=" +
  encodeURIComponent("Hola, soy " + esp + " y quiero información de los planes de Uno por Ciento. Estoy en ___");

export const planes = [
  { nombre: "Starter", precio: 699, incluye: "Anuncios en Facebook e Instagram." },
  { nombre: "Pro", precio: 999, incluye: "Anuncios en Google y Facebook, y una página con botón de WhatsApp. Si no tienes cuenta de Google Ads, la creamos nosotros." },
  { nombre: "Superior", precio: 1499, incluye: "Facebook, Google y tu sitio completo." },
];

const comunes = [
  {
    q: "¿Me aseguran cuántos pacientes van a llegar?",
    a: "No. Nadie puede prometer un número de pacientes. Lo que sí hacemos es ajustar tus anuncios todos los días y mostrarte cuánto se gasta, cuántos mensajes llegan y cuántas citas se agendan.",
  },
  {
    q: "¿Uno por Ciento es una agencia?",
    a: "No. Es un sistema por suscripción para consultorios de salud, de San Luis Potosí, que trabaja con doctores de toda la república. No hay juntas, estrategas ni reportes largos: eliges el plan, nos das tus datos en 5 minutos y armamos tu campaña.",
  },
];

export const dentistas = {
  slug: "dentistas",
  nombre: "dentistas",
  esp: "dentista",
  title: "Marketing para dentistas en México · Uno por Ciento",
  description:
    "Anuncios en Facebook y Google y una página con WhatsApp para tu consultorio dental, por suscripción desde $699 al mes, sin contratos ni agencia.",
  h1: "Marketing para dentistas: pacientes nuevos por WhatsApp",
  directa:
    "Uno por Ciento es una suscripción de marketing para dentistas en México. Armamos y ajustamos tus anuncios en Facebook, Instagram y Google, y una página con botón de WhatsApp para que los pacientes pidan su cita. Desde $699 al mes, sin contratos; la inversión en anuncios se paga aparte.",
  cuenta:
    "Haz la cuenta con tus tratamientos. Ejemplo: si una corona cuesta $5,000, con el plan Pro ($999) más $3,000 de anuncios al mes la inversión es de unos $4,000, y un paciente de corona al mes ya la cubre. Es un ejemplo, no una promesa: no podemos asegurar cuántos pacientes llegarán.",
  tema: {
    eyebrow: "Qué anunciar",
    titulo: "Los tratamientos que más conviene anunciar",
    intro:
      "Se empieza por lo que más buscan los pacientes y lo que más deja: limpiezas para llenar la agenda, y ortodoncia, carillas, coronas y prótesis para los tratamientos de mayor valor. En la demo definimos el orden según tu consultorio y tu ciudad.",
  },
  faqs: [
    {
      q: "¿Cuánto cuesta el marketing para dentistas?",
      a: "La suscripción va de $699 a $1,499 al mes según el plan. La inversión en anuncios se paga aparte, directo a Facebook o Google, y recomendamos desde $100 al día, unos $3,000 al mes.",
    },
    {
      q: "¿Facebook o Google para un consultorio dental?",
      a: "Google llega a quien ya busca un dentista, por ejemplo con una urgencia o un tratamiento en mente. Facebook e Instagram dan a conocer tu consultorio a quien todavía no te busca. Hay un plan de cada uno y uno que los junta.",
    },
    {
      q: "Ya probé anuncios y solo tuve visualizaciones. ¿Qué cambia?",
      a: "Cuando hay visualizaciones pero no mensajes, suele faltar un anuncio con botón de WhatsApp o un objetivo de mensajes. Revisamos tu inversión, los días que corrió y si el anuncio llevaba el botón.",
    },
    {
      q: "Me escriben pero no agendan, ¿es culpa del anuncio?",
      a: "No siempre. El anuncio trae el mensaje; agendar depende de responder pronto y de explicar el precio y el siguiente paso. Te ayudamos a ajustar el mensaje inicial para que la conversación avance.",
    },
    ...comunes,
  ],
};

export const psicologos = {
  slug: "psicologos",
  nombre: "psicólogos",
  esp: "psicólogo(a)",
  title: "Marketing para psicólogos en México · Uno por Ciento",
  description:
    "Anuncios en Facebook y Google y una página con WhatsApp para psicólogos, en línea y presencial, por suscripción desde $699 al mes, sin contratos.",
  h1: "Marketing para psicólogos: pacientes en línea y presencial por WhatsApp",
  directa:
    "Uno por Ciento es una suscripción de marketing para psicólogos en México. Armamos y ajustamos tus anuncios en Facebook, Instagram y Google, y una página con botón de WhatsApp para que los pacientes te escriban, ya sea para terapia en línea o presencial. Desde $699 al mes, sin contratos; la inversión en anuncios se paga aparte.",
  cuenta:
    "Haz la cuenta con tus sesiones. Ejemplo: con una sesión de $400 y un paciente nuevo que promedia 8 sesiones, cada paciente nuevo deja $3,200. Con el plan Pro ($999) más $3,000 de anuncios al mes la inversión es de unos $4,000: poco más de un paciente nuevo al mes la cubre. Es un ejemplo, no una promesa: no podemos asegurar cuántos pacientes llegarán.",
  tema: {
    eyebrow: "En línea y presencial",
    titulo: "Terapia en línea o presencial: dos públicos distintos",
    intro:
      "Quien busca terapia presencial busca cerca de su casa o trabajo, así que el anuncio se enfoca en tu ciudad y zona. La terapia en línea puede llegar a pacientes de otras ciudades. Definimos con cuál empezar, o si conviene llevar ambos, según tu agenda y tu modalidad de trabajo.",
  },
  faqs: [
    {
      q: "¿Cuánto cuesta el marketing para psicólogos?",
      a: "La suscripción va de $699 a $1,499 al mes según el plan. La inversión en anuncios se paga aparte, directo a Facebook o Google, y recomendamos desde $100 al día, unos $3,000 al mes.",
    },
    {
      q: "¿Facebook o Google para un psicólogo?",
      a: "Google llega a quien ya busca un psicólogo; Facebook e Instagram dan a conocer tu consultorio a quien todavía no te busca. Hay un plan de cada uno y uno que los junta; en la demo vemos cuál conviene a tu modalidad y ciudad.",
    },
    {
      q: "¿Los anuncios de psicología tienen reglas especiales?",
      a: "Sí. Meta y Google limitan los anuncios que señalan condiciones personales de quien los ve, así que escribimos mensajes que invitan a pedir una cita sin etiquetar a la persona. Cuidamos el texto para que no te lo rechacen.",
    },
    {
      q: "Probé anuncios y no me llegaron mensajes, ¿qué cambia?",
      a: "Antes de opinar revisamos cuánto invertiste, cuántos días corrió y si el anuncio tenía botón de WhatsApp. Con frecuencia el problema es el objetivo de la campaña o que falta el botón.",
    },
    ...comunes,
  ],
};

export const metaDe = (c) => ({
  title: c.title,
  description: c.description,
  alternates: { canonical: URL_BASE + "/marketing-para/" + c.slug },
  openGraph: {
    title: c.title,
    description: c.description,
    url: URL_BASE + "/marketing-para/" + c.slug,
    type: "website",
    locale: "es_MX",
  },
});
