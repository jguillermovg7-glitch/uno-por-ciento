import Link from "next/link";
import "../home.css";
import "./marketing.css";
import { PlanCards, Chips, FlotanteWA } from "./_bloques";
import { URL_BASE, DEMO, wa, planes } from "./_datos";

const th = { textAlign: "left", padding: "12px 14px", borderBottom: "2px solid #016062" };
const td = { padding: "12px 14px", borderBottom: "1px solid #e3e8ea", verticalAlign: "top" };

export default function Plantilla({ cfg }) {
  const url = URL_BASE + "/marketing-para/" + cfg.slug;
  const WA = wa(cfg.esp);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Marketing para " + cfg.nombre + " por suscripción",
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
        mainEntity: cfg.faqs.map((f) => ({
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
          { "@type": "ListItem", position: 3, name: "Marketing para " + cfg.nombre, item: url },
        ],
      },
    ],
  };

  return (
    <div className="mk">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header>
        <div className="nav">
          <Link href="/"><img className="logo" src="/logo-uno.png" alt="Uno por Ciento" /></Link>
          <nav className="nav-links">
            <Link href="/marketing-para-doctores">Marketing para doctores</Link>
            <a href="#planes">Planes</a>
            <a href="#faq">Preguntas</a>
          </nav>
          <a className="nav-cta" href={DEMO}>Agendar demo gratis</a>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="section-eyebrow">Marketing para {cfg.nombre} en México</div>
          <h1>{cfg.h1}</h1>
          <p className="hero-sub">{cfg.directa}</p>
          <div className="hero-ctas">
            <a className="btn-primary" href={WA}>Escribir por WhatsApp →</a>
            <a className="btn-secondary" href="/planes-b">Ver planes →</a>
          </div>
          <Chips />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">{cfg.tema.eyebrow}</div>
            <h2 className="section-title">{cfg.tema.titulo}</h2>
            <p className="section-sub">{cfg.tema.intro}</p>
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
          <PlanCards planes={planes} href="/planes-b" />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head mk-cuenta">
            <div className="section-eyebrow">La cuenta</div>
            <h2 className="section-title">¿Cuántos pacientes necesitas para cubrirlo?</h2>
            <p className="section-sub">{cfg.cuenta}</p>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">Preguntas frecuentes</div>
            <h2 className="section-title">Lo que más preguntan los {cfg.nombre}</h2>
          </div>
          <div className="faq-list">
            {cfg.faqs.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary className="faq-q">{f.q} <span className="plus">+</span></summary>
                <p className="faq-a">{f.a}</p>
              </details>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }} className="hero-ctas">
            <a className="btn-primary" href={WA}>Escribir por WhatsApp →</a>
            <a className="btn-secondary" href={DEMO}>Agendar demo gratis →</a>
          </div>
          <p style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/marketing-para-doctores">Ver marketing para doctores de todas las especialidades</Link>
          </p>
        </div>
      </section>

      <FlotanteWA href={WA} />

      <footer style={{ textAlign: "center", padding: "32px 16px", fontSize: 14 }}>
        <p>Uno por Ciento · Marketing para doctores en México</p>
        <p><a href="/privacidad">Privacidad</a> · <a href="/terminos">Términos</a></p>
      </footer>
    </div>
  );
}
