import './home.css';

export const metadata = {
  title: 'Uno por Ciento — Sitios web para doctores',
  description: 'SEO Autopilot y campañas de captación para doctores en México.',
};

export default function Home() {
  return (
    <>
<header>
  <div className="nav">
    <img className="logo" src="/logo-uno.png" alt="Uno por Ciento" />
    <nav className="nav-links">
      <a href="#pasos">Cómo funciona</a>
      <a href="#planes-compare">SEO vs Campañas</a>
      <a href="#precios">Precios</a>
      <a href="#faq">FAQ</a>
    </nav>
    <a className="nav-cta-secondary" href="/login">Iniciar sesión</a>
    <a className="nav-cta" href="/agendar?doctor=33698a5d-d6bb-4700-8bb1-3fbac802c987">Agendar demo gratis</a>
  </div>
</header>

<section className="hero">
  <div className="container">
    <div className="eyebrow-pair">
      <span className="badge seo">SEO Autopilot</span>
      <span className="badge ads">Campañas activas</span>
    </div>
    <h1>Sé parte del 1% de doctores que llena su agenda sola.</h1>
    <p className="hero-sub">Un sitio que Google encuentra solo, día tras día — o una campaña activa que trae pacientes desde ya. Ambos con la misma agenda automática detrás.</p>
    <div className="hero-ctas">
      <a className="btn-primary" href="/agendar?doctor=33698a5d-d6bb-4700-8bb1-3fbac802c987">Agendar demo gratis →</a>
      <a className="btn-secondary" href="/planes">Elegir mi plan →</a>
    </div>

    <div className="stats-panel">
      <div className="stat">
        <div className="stat-label">Visibilidad en Google</div>
        <div className="stat-value seo-c" data-suffix="%">87</div>
      </div>
      <div className="stat">
        <div className="stat-label">Visitas este mes</div>
        <div className="stat-value">342</div>
      </div>
      <div className="stat">
        <div className="stat-label">Leads por campaña</div>
        <div className="stat-value ads-c">54</div>
      </div>
    </div>

    <div className="logos-strip">Neurólogos · Dentistas · Podólogos · Psicólogos · Dermatólogos · Pediatras</div>
  </div>
</section>

<section className="steps" id="pasos">
  <div className="container">
    <div className="section-head">
      <div className="section-eyebrow">Cómo funciona</div>
      <h2 className="section-title">De cero a publicado en una sola sesión</h2>
      <p className="section-sub">Sin complicaciones técnicas, sin importar el plan que elijas.</p>
    </div>
    <div className="steps-grid">
      <div className="step-card">
        <div className="step-num">01 — 30 min</div>
        <h3>Agenda tu demo</h3>
        <p>Una videollamada donde armamos tu sitio frente a tus ojos, con tu nombre, tu foto y tu especialidad.</p>
      </div>
      <div className="step-card">
        <div className="step-num">02 — En vivo</div>
        <h3>Eliges tu ritmo</h3>
        <p>SEO Autopilot para crecer orgánico, Campañas si quieres pacientes desde la primera semana — o ambos.</p>
      </div>
      <div className="step-card">
        <div className="step-num">03 — 48 hrs</div>
        <h3>Publicado y buscándote pacientes</h3>
        <p>Tu sitio queda en línea con dominio propio, agenda conectada a tu Google Calendar.</p>
      </div>
    </div>
    <div style={{textAlign:"center", marginTop:"40px"}} className="hero-ctas">
      <a className="btn-primary" href="/agendar?doctor=33698a5d-d6bb-4700-8bb1-3fbac802c987">Agendar demo gratis →</a>
      <a className="btn-secondary" href="/planes">Elegir mi plan →</a>
    </div>
  </div>
</section>

<section id="incluye">
  <div className="container">
    <div className="section-head">
      <div className="section-eyebrow">Qué incluye cada plan</div>
      <h2 className="section-title">Dos caminos, mismo destino: tu agenda llena</h2>
    </div>
    <div className="features-split">
      <div className="feature-col seo-col">
        <div className="feature-col-head"><span className="ic">🔍</span><h3>Plan Sitio Web — SEO Autopilot</h3></div>
        <ul>
          <li>Sitio profesional optimizado para que Google te posicione en tu ciudad</li>
          <li>Se optimiza solo, todos los días, sin que tú hagas nada</li>
          <li>Botón de WhatsApp directo</li>
          <li>Agenda de citas automática a tu Calendar</li>
          <li>Reporte de visitas en tiempo real</li>
          <li>Crecimiento orgánico y sostenido mes a mes</li>
        </ul>
      </div>
      <div className="feature-col ads-col">
        <div className="feature-col-head"><span className="ic">📣</span><h3>Plan Campaña — Captación activa</h3></div>
        <ul>
          <li>Anuncios en Facebook e Instagram diseñados para tu especialidad</li>
          <li>Pacientes nuevos desde la primera semana</li>
          <li>Diseño de anuncios y segmentación incluidos</li>
          <li>Agenda de citas automática a tu Calendar</li>
          <li>Reporte de alcance y leads en tiempo real</li>
          <li>Soporte directo por WhatsApp para ajustar la campaña</li>
        </ul>
      </div>
    </div>
    <div style={{textAlign:"center", marginTop:"40px"}} className="hero-ctas">
      <a className="btn-primary" href="/agendar?doctor=33698a5d-d6bb-4700-8bb1-3fbac802c987">Agendar demo gratis →</a>
      <a className="btn-secondary" href="/planes">Elegir mi plan →</a>
    </div>
  </div>
</section>

<section className="proof">
  <div className="container">
    <div className="dynamic-line">
      <span className="fade1">Eso aparece en Google y en ChatGPT. Ese tráfico ya es de alguien.</span>
      <span className="type-line">Ellos consiguen las citas.</span>
      <span className="q">¿Y tú?</span>
    </div>

    <div className="proof-mockups">
      <div className="mockup-card">
        <div className="mockup-label g">🔍 Búsqueda en Google</div>
        <div className="g-search">
          <div className="g-bar"><span className="g-icon">🔎</span><span className="g-type">neurólogo en silao</span></div>
          <div className="g-result winner">
            <span className="g-tag">Tu sitio</span>
            <div className="g-title">Dra. Nancy Moreno — Neuróloga en Silao</div>
            <div className="g-url">dranancymoreno.com</div>
            <div className="g-desc">Agenda tu cita en línea · Atención especializada en Silao, Guanajuato</div>
          </div>
          <div className="g-result">
            <div className="g-title" style={{color: 'var(--ink-soft)'}}>Otra clínica en Silao</div>
            <div className="g-url">otraclinica.mx</div>
            <div className="g-desc">Sin agenda en línea · Solo teléfono</div>
          </div>
        </div>
      </div>

      <div className="mockup-card">
        <div className="mockup-label f">📣 Anuncio en Facebook</div>
        <div className="fb-card">
          <div className="fb-head">
            <div className="fb-avatar"></div>
            <div>
              <div className="fb-name">Dra. Nancy Moreno</div>
              <div className="fb-sponsor">Patrocinado · Silao, Gto.</div>
            </div>
          </div>
          <div className="fb-copy">¿Migrañas frecuentes? Agenda tu valoración esta semana. Cupo limitado.</div>
          <div className="fb-image"></div>
          <div className="fb-cta"><span>dranancymoreno.com</span><span>Agendar cita →</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="planes-compare">
  <div className="container">
    <div className="section-head">
      <div className="section-eyebrow">¿Cuál plan es para ti?</div>
      <h2 className="section-title">Sitio Web (SEO) vs. Campaña</h2>
      <p className="section-sub">Ninguno es "mejor" — dependen de qué tan rápido quieres ver resultados y cuánto quieres invertir cada mes.</p>
    </div>
    <table className="plan-compare-table">
      <thead>
        <tr>
          <th></th>
          <th className="col-seo">Sitio Web · SEO Autopilot</th>
          <th className="col-ads">Campaña</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Costo</td>
          <td className="c-seo">$300 único + $600/mes</td>
          <td className="c-ads">$600/mes + inversión en ads</td>
        </tr>
        <tr>
          <td>Cuándo ves resultados</td>
          <td className="c-seo">Crecimiento gradual, semanas</td>
          <td className="c-ads">Primeros leads, días</td>
        </tr>
        <tr>
          <td>Tipo de crecimiento</td>
          <td className="c-seo">Orgánico y permanente</td>
          <td className="c-ads">Activo mientras inviertas</td>
        </tr>
        <tr>
          <td>Ideal para</td>
          <td className="c-seo">Construir presencia a largo plazo</td>
          <td className="c-ads">Llenar agenda ya, lanzamientos</td>
        </tr>
        <tr>
          <td>Agenda automática</td>
          <td className="c-seo">Incluida</td>
          <td className="c-ads">Incluida</td>
        </tr>
        <tr>
          <td>Reportes en vivo</td>
          <td className="c-seo">Visitas al sitio</td>
          <td className="c-ads">Alcance y leads</td>
        </tr>
      </tbody>
    </table>
    <p className="compare-note">La mayoría de doctores combina ambos: SEO Autopilot como base y Campaña para acelerar en temporadas específicas.</p>
    <div style={{textAlign:"center", marginTop:"40px"}} className="hero-ctas">
      <a className="btn-primary" href="/agendar?doctor=33698a5d-d6bb-4700-8bb1-3fbac802c987">Agendar demo gratis →</a>
      <a className="btn-secondary" href="/planes">Elegir mi plan →</a>
    </div>
  </div>
</section>

<section className="compare" id="comparar">
  <div className="container">
    <div className="section-head">
      <div className="section-eyebrow">La comparación honesta</div>
      <h2 className="section-title">Agencia, hacerlo tú mismo, o Uno por Ciento</h2>
      <p className="section-sub">Sin letras chiquitas. Así se compara lo que ya intentaste con lo que ofrecemos.</p>
    </div>
    <table className="compare-table">
      <thead>
        <tr>
          <th></th>
          <th>Agencia tradicional</th>
          <th>Hacerlo tú mismo</th>
          <th className="winner">Uno por Ciento</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Costo mensual</td>
          <td>$3,000 – $8,000</td>
          <td>Tu tiempo</td>
          <td className="winner">$600</td>
        </tr>
        <tr>
          <td>SEO incluido</td>
          <td><span className="no">Casi siempre extra</span></td>
          <td><span className="no">Rara vez</span></td>
          <td className="winner"><span className="yes">✓ Siempre</span></td>
        </tr>
        <tr>
          <td>Agenda automática a Calendar</td>
          <td><span className="no">✗</span></td>
          <td><span className="no">✗</span></td>
          <td className="winner"><span className="yes">✓</span></td>
        </tr>
        <tr>
          <td>Tiempo para estar en línea</td>
          <td>2 – 6 semanas</td>
          <td>Semanas / meses</td>
          <td className="winner">48 horas</td>
        </tr>
        <tr>
          <td>Contrato forzoso</td>
          <td><span className="no">Sí, común</span></td>
          <td>—</td>
          <td className="winner"><span className="yes">No</span></td>
        </tr>
      </tbody>
    </table>
    <p className="compare-note">Precios de agencia referenciales para México, 2026. Ajusta según tu mercado.</p>
    <div style={{textAlign:"center", marginTop:"40px"}} className="hero-ctas">
      <a className="btn-primary" href="/agendar?doctor=33698a5d-d6bb-4700-8bb1-3fbac802c987">Agendar demo gratis →</a>
      <a className="btn-secondary" href="/planes">Elegir mi plan →</a>
    </div>
  </div>
</section>

<section id="precios">
  <div className="container">
    <div className="section-head">
      <div className="section-eyebrow">Precios</div>
      <h2 className="section-title">Simple, sin sorpresas</h2>
    </div>
    <div className="pricing-grid">
      <div className="price-card seo-card">
        <h3>Sitio web</h3>
        <div className="price-amount">$300</div>
        <div className="price-period">dominio (pago único) + $600/mes mantenimiento</div>
        <ul className="price-list">
          <li>Sitio profesional con tu información</li>
          <li>SEO Autopilot — optimizado para Google e IA</li>
          <li>Botón de WhatsApp directo</li>
          <li>Agenda de citas automática</li>
          <li>Reporte en tiempo real de visitas</li>
        </ul>
        <a className="price-btn" href="/planes">Elegir Sitio Web</a>
      </div>
      <div className="price-card ads-card">
        <h3>Campaña de captación</h3>
        <div className="price-amount">$600</div>
        <div className="price-period">/mes + inversión en publicidad (tú la manejas)</div>
        <ul className="price-list">
          <li>Anuncios en Facebook/Instagram diseñados para tu especialidad</li>
          <li>Segmentación por ciudad y edad</li>
          <li>Agenda de citas automática</li>
          <li>Reportes de alcance y leads en vivo</li>
          <li>Soporte directo por WhatsApp</li>
        </ul>
        <a className="price-btn" href="/planes">Elegir Campaña</a>
      </div>
    </div>
    <p className="pricing-note">Sin contratos largos. Cancela cuando quieras. ¿Quieres ambos planes? Escríbenos y armamos un paquete combinado.</p>
  </div>
</section>

<section id="faq">
  <div className="container">
    <div className="section-head">
      <div className="section-eyebrow">Preguntas frecuentes</div>
      <h2 className="section-title">Todo lo que necesitas saber</h2>
    </div>
    <div className="faq-list">
      <details className="faq-item">
        <summary className="faq-q">¿Cuál plan me conviene, Sitio Web o Campaña? <span className="plus">+</span></summary>
        <p className="faq-a">Depende de tu urgencia. Si puedes esperar unas semanas para un crecimiento orgánico y permanente, empieza con Sitio Web. Si necesitas pacientes ya, la Campaña te da resultados en días. Muchos doctores usan ambos.</p>
      </details>
      <details className="faq-item">
        <summary className="faq-q">¿Qué es el SEO Autopilot? <span className="plus">+</span></summary>
        <p className="faq-a">Es que tu sitio se optimiza solo para que Google te muestre cuando alguien busca un doctor como tú en tu ciudad — sin que tengas que aprender nada de tecnología.</p>
      </details>
      <details className="faq-item">
        <summary className="faq-q">¿Cuánto tarda en estar listo mi sitio? <span className="plus">+</span></summary>
        <p className="faq-a">En una sola sesión de 30 minutos armamos tu sitio. Queda publicado en menos de 48 horas, sin importar el plan que elijas.</p>
      </details>
      <details className="faq-item">
        <summary className="faq-q">¿Cómo agendan mis pacientes? <span className="plus">+</span></summary>
        <p className="faq-a">Tu sitio incluye un enlace para agendar. Eligen servicio y horario, y la cita se agrega sola a tu Google Calendar — igual en ambos planes.</p>
      </details>
      <details className="faq-item">
        <summary className="faq-q">¿Puedo cancelar cuando quiera? <span className="plus">+</span></summary>
        <p className="faq-a">Sí, no hay contratos largos. Cancela cuando quieras sin penalización.</p>
      </details>
      <details className="faq-item">
        <summary className="faq-q">¿El dominio es mío? <span className="plus">+</span></summary>
        <p className="faq-a">Sí, el dominio se registra a tu nombre y es completamente tuyo.</p>
      </details>
    </div>
    <div style={{textAlign:"center", marginTop:"40px"}} className="hero-ctas">
      <a className="btn-primary" href="/agendar?doctor=33698a5d-d6bb-4700-8bb1-3fbac802c987">Agendar demo gratis →</a>
      <a className="btn-secondary" href="/planes">Elegir mi plan →</a>
    </div>
  </div>
</section>

<section>
  <div className="container">
    <div className="final-cta">
      <div className="section-eyebrow" style={{color: 'rgba(255,255,255,0.5)'}}>Cupo limitado esta semana</div>
      <h2>Agenda tu demo gratis</h2>
      <p>30 minutos. Sin compromiso. Ves tu sitio nacer en vivo.</p>
      <a className="btn-primary" href="/agendar?doctor=33698a5d-d6bb-4700-8bb1-3fbac802c987">Agendar demo gratis →</a>
      <a className="btn-secondary" href="/planes" style={{marginTop:"12px", display:"inline-block"}}>Elegir mi plan →</a>
    </div>
  </div>
</section>

<footer>
  <div className="container">
    <img src="/logo-uno.png" alt="Uno por Ciento" />
    Uno por Ciento © 2026 · Sitios web para doctores
  </div>
</footer>
    </>
  );
}
