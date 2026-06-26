"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const target = 100;
    const duration = 2200;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, []);

  const ink = "#0B1418";
  const teal = "#0E7C7B";
  const live = "#3DDC84";
  const surface = "#EDF2F1";
  const border = "#D8E3E1";

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: ink, minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", borderBottom: `0.5px solid ${border}`, position: "sticky", top: 0, background: "#FFFFFF", zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: live, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "13px" }}>1%</span>
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "17px" }}>Uno por Ciento</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a href="#como-funciona" style={{ fontSize: "14px", color: ink, textDecoration: "none", opacity: 0.7 }}>Cómo funciona</a>
          <a href="#precios" style={{ fontSize: "14px", color: ink, textDecoration: "none", opacity: 0.7 }}>Precios</a>
          <a href="#faq" style={{ fontSize: "14px", color: ink, textDecoration: "none", opacity: 0.7 }}>FAQ</a>
          <a href="/login" style={{ fontSize: "14px", color: ink, textDecoration: "none", opacity: 0.7 }}>Iniciar sesión</a>
          <a href="#demo" style={{ background: ink, color: "#fff", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
            Ver demo gratis
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 48px 60px", display: "flex", gap: "64px", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ flex: "1 1 460px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: surface, padding: "6px 14px", borderRadius: "100px", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: live }}></span>
            <span style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: teal }}>Solo el 1% de doctores aparece bien en Google</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "48px", fontWeight: 700, lineHeight: 1.1, marginBottom: "20px" }}>
            Sé parte del<br />
            <span style={{ color: teal }}>1% de doctores</span><br />
            que sí aparece.
          </h1>
          <p style={{ fontSize: "17px", color: ink, opacity: 0.65, lineHeight: 1.6, marginBottom: "36px", maxWidth: "420px" }}>
            Tu sitio web profesional, optimizado para Google y búsquedas con IA. Configurado una vez, funcionando para siempre.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <a href="#demo" style={{ background: ink, color: "#fff", padding: "14px 28px", borderRadius: "8px", fontSize: "15px", textDecoration: "none", fontWeight: 500 }}>
              Ver mi sitio gratis →
            </a>
            <a href="#precios" style={{ border: `1px solid ${border}`, color: ink, padding: "14px 28px", borderRadius: "8px", fontSize: "15px", textDecoration: "none", fontWeight: 500 }}>
              Ver precios
            </a>
          </div>
        </div>

        {/* MINI DASHBOARD LIVE */}
        <div style={{ flex: "1 1 420px", background: "#fff", border: `0.5px solid ${border}`, borderRadius: "16px", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "13px", fontWeight: 500, opacity: 0.6 }}>Visibilidad en Google</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: live, fontFamily: "'JetBrains Mono', monospace" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: live }}></span> en vivo
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "44px", fontWeight: 700, color: ink }}>{pct}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", color: teal }}>%</span>
          </div>
          <div style={{ width: "100%", height: "8px", background: surface, borderRadius: "100px", overflow: "hidden", marginBottom: "24px" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: teal, borderRadius: "100px", transition: "width 0.1s linear" }}></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ background: surface, borderRadius: "10px", padding: "14px" }}>
              <p style={{ fontSize: "11px", opacity: 0.55, marginBottom: "6px" }}>Visitas este mes</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700 }}>342</p>
            </div>
            <div style={{ background: surface, borderRadius: "10px", padding: "14px" }}>
              <p style={{ fontSize: "11px", opacity: 0.55, marginBottom: "6px" }}>Mensajes WhatsApp</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700, color: teal }}>27</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS / TRUST */}
      <section style={{ padding: "32px 48px", borderTop: `0.5px solid ${border}`, borderBottom: `0.5px solid ${border}`, background: surface }}>
        <p style={{ textAlign: "center", fontSize: "12px", opacity: 0.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>
          NEURÓLOGOS · DENTISTAS · PODÓLOGOS · PSICÓLOGOS · DERMATÓLOGOS · PEDIATRAS
        </p>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: "80px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: teal, marginBottom: "12px" }}>Cómo funciona</p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "32px", fontWeight: 700, marginBottom: "48px", maxWidth: "560px" }}>
          De cero a publicado en una sola sesión
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            { n: "1", t: "Agenda tu demo", d: "Una sesión de 30 minutos donde armamos tu sitio frente a tus ojos, con tu nombre, tu foto y tu especialidad." },
            { n: "2", t: "Lo ves nacer en vivo", d: "Sin plantillas genéricas. Tu sitio, tus colores, tus palabras clave, optimizado para tu ciudad." },
            { n: "3", t: "Publicado y funcionando", d: "Tu sitio queda en línea con tu dominio propio, listo para que te encuentren en Google." },
          ].map((s) => (
            <div key={s.n} style={{ background: "#fff", border: `0.5px solid ${border}`, borderRadius: "16px", padding: "28px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: teal, display: "block", marginBottom: "16px" }}>0{s.n}</span>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>{s.t}</h3>
              <p style={{ fontSize: "14px", opacity: 0.65, lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" style={{ padding: "80px 48px", background: ink }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: live, marginBottom: "12px", textAlign: "center" }}>Precios</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "32px", fontWeight: 700, color: "#fff", marginBottom: "48px", textAlign: "center" }}>
            Simple, sin sorpresas
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            <div style={{ background: "#16201F", border: `0.5px solid #2A3837`, borderRadius: "16px", padding: "32px" }}>
              <p style={{ color: "#fff", opacity: 0.6, fontSize: "13px", marginBottom: "8px" }}>Sitio web</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "36px", color: "#fff", fontWeight: 700 }}>$300</span>
                <span style={{ color: "#fff", opacity: 0.5, fontSize: "13px" }}>dominio (pago único)</span>
              </div>
              <p style={{ color: "#fff", opacity: 0.6, fontSize: "13px", marginBottom: "24px" }}>+ $600/mes mantenimiento</p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Sitio profesional con tu información", "Optimizado para Google e IA", "Botón de WhatsApp directo", "1 actualización mensual", "Reporte mensual de visitas"].map(f => (
                  <li key={f} style={{ display: "flex", gap: "10px", color: "#fff", opacity: 0.85, fontSize: "13px" }}>
                    <span style={{ color: live }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#16201F", border: `2px solid ${live}`, borderRadius: "16px", padding: "32px", position: "relative" }}>
              <span style={{ position: "absolute", top: "-12px", left: "32px", background: live, color: ink, fontSize: "11px", padding: "3px 10px", borderRadius: "100px", fontWeight: 700 }}>Más completo</span>
              <p style={{ color: "#fff", opacity: 0.6, fontSize: "13px", marginBottom: "8px" }}>Campaña de captación</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "36px", color: "#fff", fontWeight: 700 }}>$600</span>
                <span style={{ color: "#fff", opacity: 0.5, fontSize: "13px" }}>/mes</span>
              </div>
              <p style={{ color: "#fff", opacity: 0.6, fontSize: "13px", marginBottom: "24px" }}>+ inversión en publicidad (tú la manejas)</p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Campaña en Google/Facebook Ads", "Diseño de anuncios incluido", "Reportes de rendimiento en vivo", "Optimización continua de anuncios", "Soporte directo por WhatsApp"].map(f => (
                  <li key={f} style={{ display: "flex", gap: "10px", color: "#fff", opacity: 0.85, fontSize: "13px" }}>
                    <span style={{ color: live }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p style={{ textAlign: "center", color: "#fff", opacity: 0.4, fontSize: "12px", marginTop: "24px" }}>
            Sin contratos largos. Cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 48px", maxWidth: "720px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: teal, marginBottom: "12px" }}>Preguntas frecuentes</p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "32px", fontWeight: 700, marginBottom: "40px" }}>
          Todo lo que necesitas saber
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: `0.5px solid ${border}`, borderRadius: "16px", overflow: "hidden" }}>
          {[
            { q: "¿Cuánto tarda en estar listo mi sitio?", a: "En una sola sesión de 30 minutos armamos tu sitio. Queda publicado en menos de 48 horas." },
            { q: "¿Necesito saber de tecnología?", a: "No. Tú solo respondes preguntas en la videollamada, nosotros nos encargamos de todo lo técnico." },
            { q: "¿Puedo cancelar cuando quiera?", a: "Sí, no hay contratos largos. Cancela cuando quieras sin penalización." },
            { q: "¿El dominio es mío?", a: "Sí, el dominio se registra a tu nombre y es completamente tuyo." },
          ].map(item => (
            <div key={item.q} style={{ background: "#fff", padding: "20px 24px" }}>
              <p style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>{item.q}</p>
              <p style={{ fontSize: "14px", opacity: 0.6, lineHeight: 1.6 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="demo" style={{ padding: "80px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: surface, padding: "6px 14px", borderRadius: "100px", marginBottom: "24px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: live }}></span>
          <span style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: teal }}>Cupo limitado esta semana</span>
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 700, marginBottom: "16px" }}>
          Agenda tu demo gratis
        </h2>
        <p style={{ fontSize: "16px", opacity: 0.6, marginBottom: "32px" }}>
          30 minutos. Sin compromiso. Ves tu sitio nacer en vivo.
        </p>
        <a href="https://wa.me/524778024500" target="_blank" rel="noopener noreferrer" style={{ background: ink, color: "#fff", padding: "16px 36px", borderRadius: "8px", fontSize: "16px", textDecoration: "none", fontWeight: 500, display: "inline-block" }}>
          Agendar por WhatsApp →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 48px", borderTop: `0.5px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px" }}>Uno por Ciento</span>
        <span style={{ fontSize: "12px", opacity: 0.4 }}>© 2026 · Sitios web para doctores</span>
      </footer>

    </main>
  );
}