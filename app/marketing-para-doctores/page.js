import Link from "next/link";
import "../home.css";

const URL_BASE = "https://www.unorporciento.com";
const WA = "https://wa.me/524441905298?text=Hola%2C%20soy%20doctor(a)%20y%20quiero%20informaci%C3%B3n%20de%20los%20planes%20de%20Uno%20por%20Ciento.%20Mi%20especialidad%20es%20___%20y%20estoy%20en%20___";
const DEMO = "/agendar?doctor=33698a5d-d6bb-4700-8bb1-3fbac802c987";

export const metadata = {
  title: "Marketing para doctores en México · Uno por Ciento",
  description:
    "Suscripción de marketing médico para consultorios: anuncios en Google y Facebook, página con WhatsApp y precios claros desde $699 al mes, sin contratos.",
  alternates: { canonical: URL_BASE + "/marketing-para-doctores" },
  openGraph: {
    title: "Marketing para doctores en México · Uno por Ciento",
    description:
      "Anuncios, página y WhatsApp por suscripción. Planes desde $699 al mes, sin contratos.",
    url: URL_BASE + "/marketing-para-doctores",
    type: "website",
    locale: "es_MX",
  },
};

const planes = [
  { nombre: "Starter", precio: 699, incluye: "Anuncios en Facebook e Instagram." },
  { nombre: "Pro", precio: 999, incluye: "Anuncios en Google y Facebook, y una página con botón de WhatsApp. Si no tienes cuenta de Google Ads, la creamos nosotros." },
  { nombre: "Superior", precio: 1499, incluye: "Facebook, Google y tu sitio completo." },
];

const faqs = [
  {
    q: "¿Cuánto cuesta el marketing para doctores?",
    a: "La suscripción de Uno por Ciento va de $699 a $1,499 al mes según el plan. A eso se suma la inversión en anuncios, que se paga aparte y que recomendamos desde $100 al día, unos $3,000 al mes.",
  },
  {
    q: "¿Qué incluye la suscripción y qué se paga aparte?",
    a: "Incluye armar y ajustar tus campañas todos los días, la página con botón de WhatsApp en los planes que la traen y un panel con gasto, mensajes y citas. El dinero que se gasta en Facebook, Instagram o Google se paga aparte, directo a la plataforma.",
  },
  {
    q: "¿Facebook o Google para mi consultorio?",
    a: "Google llega a quien ya está buscando un doctor como tú, y suele convenir cuando el paciente tiene una necesidad concreta. Facebook e Instagram dan a conocer tu consultorio a quien aún no te busca. Por eso hay un plan de cada uno y uno que los junta; en la demo te decimos cuál conviene a tu especialidad y ciudad.",
  },
  {
    q: "¿Uno por Ciento es una agencia?",
    a: "No. Es un sistema por suscripción para consultorios de salud, de San Luis Potosí, que trabaja con doctores de toda la república. No hay juntas, estrategas ni reportes largos: eliges el plan, nos das tus datos en 5 minutos y armamos tu campaña.",
  },
  {
    q: "¿Me aseguran cuántos pacientes van a llegar?",
    a: "No. Nadie puede prometer un número de pacientes. Lo que sí hacemos es ajustar tus anuncios todos los días y mostrarte cuánto se gasta, cuántos mensajes llegan y cuántas citas se agendan.",
  },
  {
    q: "¿Qué pasa con mi página si cancelo?",
    a: "La página va incluida en la suscripción. Si cancelas, deja de funcionar, y si quieres quedarte con ella hay un pago único; pregúntanos por WhatsApp antes de contratar.",
  },
  {
    q: "¿Puedo anunciar cualquier tratamiento?",
    a: "Google y Meta tienen reglas estrictas para anuncios de salud, y algunos tratamientos tienen restricciones. Nosotros cuidamos el texto y los permisos de tus anuncios para que no te los rechacen.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": URL_BASE + "/#organization",
      name: "Uno por Ciento",
      url: URL_BASE,
      logo: URL_BASE + "/logo-uno.png",
      description:
        "Uno por Ciento es una suscripción de marketing para doctores en México: anuncios, contenido y sitio web desde $699 al mes.",
    },
    {
      "@type": "Service",
      name: "Marketing para doctores por suscripción",
      serviceType: "Marketing médico",
      areaServed: { "@type": "Country", name: "México" },
      provider: { "@id": URL_BASE + "/#organization" },
      offers: planes.map((p) => ({
        "@type": "Offer",
        name: "Plan " + p.nombre,
        price: String(p.precio),
        priceCurrency: "MXN",
        description: p.incluye,
        url: URL_BASE + "/planes-b",
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: URL_BASE + "/" },
        { "@type": "ListItem", position: 2, name: "Marketing para doctores", item: URL_BASE + "/marketing-para-doctores" },
      ],
    },
  ],
};

const th = { textAlign: "left", padding: "12px 14px", borderBottom: "2px solid #0E7C7B" };
const td = { padding: "12px 14px", borderBottom: "1px solid #e3e8ea", verticalAlign: "top" };

export default function MarketingParaDoctores() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header>
        <div className="nav">
          <Link href="/"><img className="logo" src="/logo-uno.png" alt="Uno por Ciento" /></Link>
          <nav className="nav-links">
            <a href="#planes">Planes</a>
            <a href="#agencia">Suscripción o agencia</a>
            <a href="#faq">Preguntas</a>
          </nav>
          <a className="nav-cta" href={DEMO}>Agendar demo gratis</a>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="section-eyebrow">Marketing para doctores en México</div>
          <h1>Marketing para doctores: anuncios, página y WhatsApp por suscripción</h1>
          <p className="hero-sub">
            Uno por Ciento es una suscripción de marketing para doctores en México. Creamos y ajustamos tus anuncios en Facebook, Instagram y Google, y una página con botón de WhatsApp para que los pacientes te escriban. Los planes van desde $699 al mes, sin contratos; la inversión en anuncios se paga aparte.
          </p>
          <div className="hero-ctas">
            <a className="btn-primary" href={WA}>Escribir por WhatsApp →</a>
            <a className="btn-secondary" href="/planes-b">Ver planes →</a>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">Qué es</div>
            <h2 className="section-title">¿Qué es el marketing para doctores?</h2>
            <p className="section-sub">Es el conjunto de acciones para que un paciente que necesita un doctor te encuentre, confíe en ti y te escriba. En la práctica son tres piezas: anuncios que lleguen a la gente correcta, una página clara donde el paciente entienda qué haces, y un botón de WhatsApp para agendar sin fricción.</p>
          </div>
        </div>
      </section>

      <section id="planes">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">Planes y precios</div>
            <h2 className="section-title">Cuánto cuesta: precios a la vista</h2>
            <p className="section-sub">Pagas la suscripción cada mes. La inversión en anuncios se paga aparte, directo a Facebook o Google; recomendamos desde $100 al día, unos $3,000 al mes.</p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
              <thead>
                <tr><th style={th}>Plan</th><th style={th}>Al mes</th><th style={th}>Qué incluye</th></tr>
              </thead>
              <tbody>
                {planes.map((p) => (
                  <tr key={p.nombre}>
                    <td style={{ ...td, fontWeight: 700 }}>{p.nombre}</td>
                    <td style={td}>{"$" + p.precio.toLocaleString("en-US")}</td>
                    <td style={td}>{p.incluye}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }} className="hero-ctas">
            <a className="btn-primary" href="/planes-b">Elegir mi plan →</a>
            <a className="btn-secondary" href={DEMO}>Agendar demo gratis →</a>
          </div>
        </div>
      </section>

      <section id="agencia">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">Suscripción o agencia</div>
            <h2 className="section-title">Suscripción frente a agencia de marketing médico</h2>
            <p className="section-sub">Una agencia suele cotizar a la medida y trabaja con juntas y reportes. Una suscripción tiene un precio fijo y un proceso corto.</p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
              <thead>
                <tr><th style={th}></th><th style={th}>Uno por Ciento</th><th style={th}>Agencia típica</th></tr>
              </thead>
              <tbody>
                <tr><td style={{ ...td, fontWeight: 700 }}>Precio</td><td style={td}>Visible: $699, $999 o $1,499 al mes</td><td style={td}>Cotización a la medida</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Arranque</td><td style={td}>Eliges el plan y nos das tus datos en 5 minutos</td><td style={td}>Juntas y propuesta antes de empezar</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Seguimiento</td><td style={td}>Ajuste diario de anuncios y panel con gasto, mensajes y citas</td><td style={td}>Reportes periódicos</td></tr>
                <tr><td style={{ ...td, fontWeight: 700 }}>Contrato</td><td style={td}>Sin contratos</td><td style={td}>Depende de la agencia</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">La cuenta</div>
            <h2 className="section-title">¿Cuántos pacientes necesitas para cubrir el marketing?</h2>
            <p className="section-sub">Haz la cuenta con tus números. Ejemplo con un psicólogo que cobra $400 por sesión y un paciente nuevo promedia 8 sesiones: cada paciente nuevo deja $3,200. Con el plan Pro ($999) más $3,000 de anuncios al mes, la inversión es de unos $4,000: poco más de un paciente nuevo al mes la cubre. Es un ejemplo, no una promesa: no podemos asegurar cuántos pacientes llegarán.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">Especialidades</div>
            <h2 className="section-title">Marketing médico para cada especialidad</h2>
            <p className="section-sub">Trabajamos con psicólogos, dentistas, cirujanos, ginecólogos, médicos estéticos, fisioterapeutas y gastroenterólogos, con sitios publicados en Ciudad de México, Guadalajara, Querétaro, Mérida y Tijuana. Cada especialidad tiene un mensaje distinto: lo ajustamos a lo que tus pacientes buscan.</p>
            <p className="section-sub"><Link href="/marketing-para/dentistas">Marketing para dentistas</Link> · <Link href="/marketing-para/psicologos">Marketing para psicólogos</Link></p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">Cómo empezar</div>
            <h2 className="section-title">Tres pasos</h2>
          </div>
          <div className="steps-grid">
            <div className="step-card"><div className="step-num">01</div><h3>Eliges tu plan</h3><p>Starter, Pro o Superior, según si quieres Facebook, Google o ambos.</p></div>
            <div className="step-card"><div className="step-num">02</div><h3>Nos das tus datos</h3><p>En 5 minutos: tu especialidad, servicios, ciudad y WhatsApp.</p></div>
            <div className="step-card"><div className="step-num">03</div><h3>Te escriben por WhatsApp</h3><p>Armamos tu campaña y tu página, y los pacientes te escriben directo.</p></div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">Preguntas frecuentes</div>
            <h2 className="section-title">Lo que más preguntan los doctores</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary className="faq-q">{f.q} <span className="plus">+</span></summary>
                <p className="faq-a">{f.a}</p>
              </details>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }} className="hero-ctas">
            <a className="btn-primary" href={WA}>Escribir por WhatsApp →</a>
            <a className="btn-secondary" href="/planes-b">Ver planes →</a>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "32px 16px", fontSize: 14 }}>
        <p>Uno por Ciento · Marketing para doctores en México</p>
        <p><a href="/privacidad">Privacidad</a> · <a href="/terminos">Términos</a></p>
      </footer>
    </>
  );
}
