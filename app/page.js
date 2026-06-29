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
    <main className="font-sans bg-white text-[#0B1418] min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="flex justify-between items-center px-4 md:px-12 py-4 border-b border-[#D8E3E1] sticky top-0 bg-white z-50">
        <div className="flex items-center">
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "34px", width: "auto" }} />
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#ventajas" className="text-sm text-[#0B1418]/70 no-underline">Qué incluye</a>
          <a href="#precios" className="text-sm text-[#0B1418]/70 no-underline">Precios</a>
          <a href="#faq" className="text-sm text-[#0B1418]/70 no-underline">FAQ</a>
          <a href="/login" className="text-sm text-[#0B1418]/70 no-underline">Iniciar sesión</a>
          <a href="/planes" className="bg-[#0B1418] text-white px-5 py-2.5 rounded-lg text-sm no-underline font-medium">Ver demo gratis</a>
        </div>
        <a href="/planes" className="md:hidden bg-[#0B1418] text-white px-4 py-2 rounded-lg text-[13px] no-underline font-medium whitespace-nowrap">Ver demo</a>
      </nav>

      {/* HERO */}
      <section className="px-4 md:px-12 py-12 md:py-20 flex flex-col md:flex-row gap-10 md:gap-16 items-center max-w-[1200px] mx-auto">
        <div className="flex-1 w-full">
          <div className="inline-flex items-center gap-2 bg-[#EDF2F1] px-3.5 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC84] shrink-0"></span>
            <span className="text-[11px] md:text-xs font-mono text-[#0E7C7B]">Solo el 1% de doctores aparece bien en Google</span>
          </div>
          <h1 className="font-display font-bold text-[34px] md:text-[48px] leading-[1.1] mb-5">
            Sé parte del<br />
            <span className="text-[#0E7C7B]">1% de doctores</span><br />
            que sí aparece.
          </h1>
          <p className="text-base md:text-[17px] text-[#0B1418]/65 leading-relaxed mb-8 max-w-[420px]">
            Tu sitio profesional, optimizado para que te encuentren en Google y en buscadores con IA. Lo configuramos una vez, y trabaja para ti todos los días.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/planes" className="bg-[#0B1418] text-white px-6 py-3.5 rounded-lg text-[15px] no-underline font-medium">Ver mi sitio gratis →</a>
            <a href="#precios" className="border border-[#D8E3E1] text-[#0B1418] px-6 py-3.5 rounded-lg text-[15px] no-underline font-medium">Ver precios</a>
          </div>
        </div>

        <div className="flex-1 w-full max-w-full bg-white border border-[#D8E3E1] rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <span className="text-[13px] font-medium text-[#0B1418]/60">Visibilidad en Google</span>
            <span className="flex items-center gap-1.5 text-xs text-[#3DDC84] font-mono whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC84] shrink-0"></span> en vivo
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-mono text-[40px] md:text-[44px] font-bold text-[#0B1418]">{pct}</span>
            <span className="font-mono text-xl text-[#0E7C7B]">%</span>
          </div>
          <div className="w-full h-2 bg-[#EDF2F1] rounded-full overflow-hidden mb-6">
            <div className="h-full bg-[#0E7C7B] rounded-full transition-all duration-100" style={{ width: `${pct}%` }}></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#EDF2F1] rounded-[10px] p-3.5">
              <p className="text-[11px] text-[#0B1418]/55 mb-1.5">Visitas este mes</p>
              <p className="font-mono text-xl font-bold">342</p>
            </div>
            <div className="bg-[#EDF2F1] rounded-[10px] p-3.5">
              <p className="text-[11px] text-[#0B1418]/55 mb-1.5">Mensajes WhatsApp</p>
              <p className="font-mono text-xl font-bold text-[#0E7C7B]">27</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS / TRUST */}
      <section className="px-4 md:px-12 py-7 border-t border-b border-[#D8E3E1] bg-[#EDF2F1]">
        <p className="text-center text-[10px] md:text-xs text-[#0B1418]/50 font-mono tracking-wide leading-relaxed">
          NEURÓLOGOS · DENTISTAS · PODÓLOGOS · PSICÓLOGOS · DERMATÓLOGOS · PEDIATRAS
        </p>
      </section>

      {/* VENTAJAS - explicado simple, sin tecnicismos */}
      <section id="ventajas" className="px-4 md:px-12 py-16 md:py-24 max-w-[1100px] mx-auto">
        <p className="font-mono text-[13px] text-[#0E7C7B] mb-3 text-center">Qué incluye</p>
        <h2 className="font-display font-bold text-[26px] md:text-[36px] mb-4 text-center max-w-[600px] mx-auto">
          Todo lo que necesitas para llenar tu agenda
        </h2>
        <p className="text-center text-[#0B1418]/60 text-base mb-14 max-w-[520px] mx-auto">
          Sin complicaciones técnicas. Tú atiendes pacientes, nosotros nos encargamos del resto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Ventaja 1: SEO / aparecer en buscadores */}
          <div className="bg-white border border-[#D8E3E1] rounded-2xl p-7">
            <div className="w-11 h-11 rounded-xl bg-[#EDF2F1] flex items-center justify-center text-xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-lg mb-2">Que te encuentren en Google</h3>
            <p className="text-sm text-[#0B1418]/65 leading-relaxed">
              Cuando alguien busca un doctor como tú —en Google o preguntándole a una IA como ChatGPT— tu nombre aparece primero. Tu sitio está hecho para eso desde el día uno.
            </p>
          </div>

          {/* Ventaja 2: Reportes en tiempo real */}
          <div className="bg-white border border-[#D8E3E1] rounded-2xl p-7">
            <div className="w-11 h-11 rounded-xl bg-[#EDF2F1] flex items-center justify-center text-xl mb-4">📊</div>
            <h3 className="font-display font-bold text-lg mb-2">Ve quién visita tu sitio</h3>
            <p className="text-sm text-[#0B1418]/65 leading-relaxed">
              Entra a tu panel y mira en tiempo real cuántas personas vieron tu sitio y cuántos te escribieron. Sin esperar reportes, sin complicaciones.
            </p>
          </div>

          {/* Ventaja 3: Alcance de campañas */}
          <div className="bg-white border border-[#D8E3E1] rounded-2xl p-7">
            <div className="w-11 h-11 rounded-xl bg-[#EDF2F1] flex items-center justify-center text-xl mb-4">📣</div>
            <h3 className="font-display font-bold text-lg mb-2">Anuncios que sí funcionan</h3>
            <p className="text-sm text-[#0B1418]/65 leading-relaxed">
              Si quieres más pacientes ya, activamos anuncios en Facebook e Instagram diseñados para tu especialidad. Tú ves cuánta gente vio tu anuncio y cuántos te escribieron.
            </p>
          </div>

          {/* Ventaja 4: Agendamiento */}
          <div className="bg-white border border-[#D8E3E1] rounded-2xl p-7">
            <div className="w-11 h-11 rounded-xl bg-[#EDF2F1] flex items-center justify-center text-xl mb-4">📅</div>
            <h3 className="font-display font-bold text-lg mb-2">Tus pacientes agendan solos</h3>
            <p className="text-sm text-[#0B1418]/65 leading-relaxed">
              Tu sitio tiene un enlace para agendar cita. Tus pacientes elijen el servicio, ven tus horarios libres y agendan solos — directo en tu Google Calendar.
            </p>
          </div>

        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ backgroundColor: surface }} className="px-4 md:px-12 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[13px] text-[#0E7C7B] mb-3 text-center">Cómo funciona</p>
          <h2 className="font-display font-bold text-[26px] md:text-[32px] mb-12 text-center max-w-[560px] mx-auto">
            De cero a publicado en una sola sesión
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: "1", t: "Agenda tu demo", d: "Una sesión de 30 minutos donde armamos tu sitio frente a tus ojos, con tu nombre, tu foto y tu especialidad." },
              { n: "2", t: "Lo ves nacer en vivo", d: "Sin plantillas genéricas. Tu sitio, tus colores, tus palabras clave, optimizado para tu ciudad." },
              { n: "3", t: "Publicado y funcionando", d: "Tu sitio queda en línea con tu dominio propio, listo para que te encuentren en Google." },
            ].map((s) => (
              <div key={s.n} className="bg-white border border-[#D8E3E1] rounded-2xl p-7">
                <span className="font-mono text-[13px] text-[#0E7C7B] block mb-4">0{s.n}</span>
                <h3 className="font-display font-bold text-lg mb-2.5">{s.t}</h3>
                <p className="text-sm text-[#0B1418]/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="px-4 md:px-12 py-16 md:py-20 bg-[#0B1418]">
        <div className="max-w-[1000px] mx-auto">
          <p className="font-mono text-[13px] text-[#3DDC84] mb-3 text-center">Precios</p>
          <h2 className="font-display font-bold text-[26px] md:text-[32px] text-white mb-12 text-center">
            Simple, sin sorpresas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#16201F] border border-[#2A3837] rounded-2xl p-7">
              <p className="text-white/60 text-[13px] mb-2">Sitio web</p>
              <div className="flex items-baseline gap-1.5 mb-1 flex-wrap">
                <span className="font-mono text-4xl text-white font-bold">$300</span>
                <span className="text-white/50 text-[13px]">dominio (pago único)</span>
              </div>
              <p className="text-white/60 text-[13px] mb-6">+ $600/mes mantenimiento</p>
              <ul className="list-none p-0 flex flex-col gap-2.5">
                {["Sitio profesional con tu información", "Optimizado para Google e IA", "Botón de WhatsApp directo", "Agenda de citas automática", "Reporte en tiempo real de visitas"].map(f => (
                  <li key={f} className="flex gap-2.5 text-white/85 text-[13px]">
                    <span className="text-[#3DDC84] shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="/planes" className="block text-center bg-white text-[#0B1418] rounded-lg py-3 text-sm font-medium no-underline mt-6">
                Elegir este plan
              </a>
            </div>
            <div className="bg-[#16201F] border-2 border-[#3DDC84] rounded-2xl p-7 relative mt-3 md:mt-0">
              <span className="absolute -top-3 left-7 bg-[#3DDC84] text-[#0B1418] text-[11px] px-2.5 py-1 rounded-full font-bold">Más completo</span>
              <p className="text-white/60 text-[13px] mb-2">Campaña de captación</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-mono text-4xl text-white font-bold">$600</span>
                <span className="text-white/50 text-[13px]">/mes</span>
              </div>
              <p className="text-white/60 text-[13px] mb-6">+ inversión en publicidad (tú la manejas)</p>
              <ul className="list-none p-0 flex flex-col gap-2.5">
                {["Campaña en Google/Facebook Ads", "Diseño de anuncios incluido", "Reportes de alcance en vivo", "Optimización continua de anuncios", "Soporte directo por WhatsApp"].map(f => (
                  <li key={f} className="flex gap-2.5 text-white/85 text-[13px]">
                    <span className="text-[#3DDC84] shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="/planes" className="block text-center bg-[#3DDC84] text-[#0B1418] rounded-lg py-3 text-sm font-medium no-underline mt-6">
                Elegir este plan
              </a>
            </div>
          </div>
          <p className="text-center text-white/40 text-xs mt-6">
            Sin contratos largos. Cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 md:px-12 py-16 md:py-20 max-w-[720px] mx-auto">
        <p className="font-mono text-[13px] text-[#0E7C7B] mb-3">Preguntas frecuentes</p>
        <h2 className="font-display font-bold text-[26px] md:text-[32px] mb-9">
          Todo lo que necesitas saber
        </h2>
        <div className="flex flex-col gap-px border border-[#D8E3E1] rounded-2xl overflow-hidden">
          {[
            { q: "¿Cuánto tarda en estar listo mi sitio?", a: "En una sola sesión de 30 minutos armamos tu sitio. Queda publicado en menos de 48 horas." },
            { q: "¿Necesito saber de tecnología?", a: "No. Tú solo respondes preguntas en la videollamada, nosotros nos encargamos de todo lo técnico." },
            { q: "¿Cómo agendan mis pacientes?", a: "Tu sitio incluye un enlace para agendar. Tus pacientes elijen el servicio y horario, y la cita se agrega sola a tu Google Calendar." },
            { q: "¿Puedo cancelar cuando quiera?", a: "Sí, no hay contratos largos. Cancela cuando quieras sin penalización." },
            { q: "¿El dominio es mío?", a: "Sí, el dominio se registra a tu nombre y es completamente tuyo." },
          ].map(item => (
            <div key={item.q} className="bg-white p-5">
              <p className="font-semibold text-[15px] mb-1.5">{item.q}</p>
              <p className="text-sm text-[#0B1418]/60 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="demo" className="px-4 md:px-12 py-16 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-[#EDF2F1] px-3.5 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC84] shrink-0"></span>
          <span className="text-xs font-mono text-[#0E7C7B]">Cupo limitado esta semana</span>
        </div>
        <h2 className="font-display font-bold text-[28px] md:text-[36px] mb-4">
          Agenda tu demo gratis
        </h2>
        <p className="text-base text-[#0B1418]/60 mb-8">
          30 minutos. Sin compromiso. Ves tu sitio nacer en vivo.
        </p>
        <a href="/planes" className="bg-[#0B1418] text-white px-9 py-4 rounded-lg text-base no-underline font-medium inline-block">
          Comenzar ahora →
        </a>
      </section>

      {/* FOOTER */}
      <footer className="px-4 md:px-12 py-8 border-t border-[#D8E3E1] flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
        <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "22px", width: "auto" }} />
        <span className="text-xs text-[#0B1418]/40">© 2026 · Sitios web para doctores</span>
      </footer>

    </main>
  );
}