"use client";
import { useRouter } from "next/navigation";

export default function PlanesPage() {
  const router = useRouter();

  function selectPlan(plan) {
    localStorage.setItem("plan_seleccionado", plan);
    router.push("/login?next=/onboarding");
  }

  const ink = "#0B1418";
  const teal = "#0E7C7B";
  const live = "#3DDC84";

  return (
    <main style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }} className="px-4 md:px-12 py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-center justify-center mb-10">
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "32px", width: "auto" }} />
        </div>

        <h1 style={{ color: ink }} className="font-display font-bold text-[28px] md:text-[36px] text-center mb-3">
          ¿Qué necesitas?
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-center text-base mb-12">
          Elige el plan que mejor se ajuste a lo que buscas hoy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <button
            onClick={() => selectPlan("sitio")}
            style={{ borderColor: "#D8E3E1", backgroundColor: "#FFFFFF" }}
            className="border rounded-2xl p-7 text-left hover:shadow-md transition cursor-pointer"
          >
            <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Para empezar</p>
            <h2 style={{ color: ink }} className="font-display font-bold text-xl mb-3">Sitio web profesional</h2>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span style={{ color: ink }} className="font-mono text-3xl font-bold">$300</span>
              <span style={{ color: ink, opacity: 0.5 }} className="text-[13px]">dominio (único pago)</span>
            </div>
            <p style={{ color: ink, opacity: 0.6 }} className="text-[13px] mb-6">+ $600/mes mantenimiento</p>
            <ul className="list-none p-0 flex flex-col gap-2.5 mb-6">
              {["Sitio profesional con tu información", "Optimizado para Google e IA", "Botón de WhatsApp directo", "1 actualización mensual", "Reporte mensual de visitas"].map(f => (
                <li key={f} style={{ color: ink }} className="flex gap-2.5 text-[13px] opacity-80">
                  <span style={{ color: teal }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <span style={{ backgroundColor: ink, color: "#fff" }} className="block text-center rounded-lg py-3 text-sm font-medium">
              Elegir este plan
            </span>
          </button>

          <button
            onClick={() => selectPlan("campana")}
            style={{ borderColor: live, backgroundColor: "#FFFFFF", borderWidth: "2px" }}
            className="border rounded-2xl p-7 text-left hover:shadow-md transition cursor-pointer relative"
          >
            <span style={{ backgroundColor: live, color: ink }} className="absolute -top-3 left-7 text-[11px] px-2.5 py-1 rounded-full font-bold">
              Más completo
            </span>
            <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Para crecer</p>
            <h2 style={{ color: ink }} className="font-display font-bold text-xl mb-3">Campaña de captación</h2>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span style={{ color: ink }} className="font-mono text-3xl font-bold">$600</span>
              <span style={{ color: ink, opacity: 0.5 }} className="text-[13px]">/mes</span>
            </div>
            <p style={{ color: ink, opacity: 0.6 }} className="text-[13px] mb-6">+ inversión en publicidad (tú la manejas)</p>
            <ul className="list-none p-0 flex flex-col gap-2.5 mb-6">
              {["Campaña en Google/Facebook Ads", "Diseño de anuncios incluido", "Reportes de rendimiento en vivo", "Optimización continua de anuncios", "Soporte directo por WhatsApp"].map(f => (
                <li key={f} style={{ color: ink }} className="flex gap-2.5 text-[13px] opacity-80">
                  <span style={{ color: teal }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <span style={{ backgroundColor: ink, color: "#fff" }} className="block text-center rounded-lg py-3 text-sm font-medium">
              Elegir este plan
            </span>
          </button>

          <button
            onClick={() => selectPlan("combo")}
            style={{ borderColor: teal, backgroundColor: "#FFFFFF", borderWidth: "2px" }}
            className="border rounded-2xl p-7 text-left hover:shadow-md transition cursor-pointer relative"
          >
            <span style={{ backgroundColor: teal, color: "#fff" }} className="absolute -top-3 left-7 text-[11px] px-2.5 py-1 rounded-full font-bold">
              Todo incluido
            </span>
            <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Para escalar</p>
            <h2 style={{ color: ink }} className="font-display font-bold text-xl mb-3">Sitio + Campaña</h2>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span style={{ color: ink }} className="font-mono text-3xl font-bold">$1,200</span>
              <span style={{ color: ink, opacity: 0.5 }} className="text-[13px]">/mes</span>
            </div>
            <p style={{ color: ink, opacity: 0.6 }} className="text-[13px] mb-6">Primer mes $1,500 (incluye dominio) + inversión en publicidad</p>
            <ul className="list-none p-0 flex flex-col gap-2.5 mb-6">
              {["Sitio profesional + mantenimiento", "Campaña en Google/Facebook Ads", "Reportes de sitio y campaña en vivo", "Optimización continua", "Soporte directo por WhatsApp"].map(f => (
                <li key={f} style={{ color: ink }} className="flex gap-2.5 text-[13px] opacity-80">
                  <span style={{ color: teal }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <span style={{ backgroundColor: ink, color: "#fff" }} className="block text-center rounded-lg py-3 text-sm font-medium">
              Elegir este plan
            </span>
          </button>
        </div>

        <p style={{ color: ink, opacity: 0.4 }} className="text-center text-xs mt-8">
          Sin contratos largos. Cancela cuando quieras.
        </p>
      </div>
    </main>
  );
}
