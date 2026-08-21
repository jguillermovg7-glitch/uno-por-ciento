"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [campanaMetricas, setCampanaMetricas] = useState(null);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [upgradeMsg, setUpgradeMsg] = useState("");
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.push("/login");
        return;
      }
      const { data } = await supabase
        .from("doctores")
        .select("*")
        .eq("user_id", userData.user.id)
        .single();

      if (!data) {
        router.push("/planes");
        return;
      }

      if (data.estado !== "activo") {
        router.push("/preview");
        return;
      }

      setDoctor(data);
      setLoading(false);

      if ((data.plan === "sitio" || data.plan === "completo") && data.ga4_property_id) {
        setAnalyticsLoading(true);
        try {
          const res = await fetch(`/api/analytics?propertyId=${data.ga4_property_id}`);
          const analyticsData = await res.json();
          if (!analyticsData.error) {
            setAnalytics(analyticsData);
          }
        } catch (err) {
          console.error("Error cargando analytics:", err);
        }
        setAnalyticsLoading(false);
      }

      if (data.plan === "campana" || data.plan === "completo") {
        const { data: metricas } = await supabase
          .from("metricas_campana")
          .select("*")
          .eq("doctor_id", data.id)
          .order("fecha", { ascending: false });

        if (metricas && metricas.length > 0) {
          const totales = metricas.reduce(
            (acc, m) => ({
              alcance: acc.alcance + (m.alcance || 0),
              mensajes: acc.mensajes + (m.mensajes || 0),
              gasto: acc.gasto + (parseFloat(m.gasto) || 0),
            }),
            { alcance: 0, mensajes: 0, gasto: 0 }
          );
          setCampanaMetricas(totales);
        }
      }
    }
    load();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleUpgrade() {
    setUpgradeLoading(true);
    setUpgradeMsg("");
    try {
      const res = await fetch("/api/upgrade-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: doctor.id,
          stripeCustomerId: doctor.stripe_customer_id,
          planActual: doctor.plan,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setUpgradeMsg("Listo. Tu plan fue actualizado a Plan Completo.");
        setDoctor((prev) => ({ ...prev, plan: "completo" }));
      } else {
        setUpgradeMsg("Ocurrio un error: " + (data.error || "intenta de nuevo"));
      }
    } catch (err) {
      setUpgradeMsg("Error de conexion. Intenta de nuevo.");
    }
    setUpgradeLoading(false);
  }

  async function handleManageSubscription() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: doctor.stripe_customer_id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("No se pudo abrir el portal: " + (data.error || "error desconocido"));
        setPortalLoading(false);
      }
    } catch (err) {
      alert("Error de conexion");
      setPortalLoading(false);
    }
  }

  const ink = "#0B1418";
  const teal = "#0E7C7B";
  const live = "#3DDC84";
  const border = "#D8E3E1";
  const surface = "#EDF2F1";

  if (loading) {
    return (
      <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: ink }}>Cargando tu panel...</p>
      </main>
    );
  }

  const planLabel =
    doctor.plan === "sitio" ? "Sitio web profesional" :
    doctor.plan === "campana" ? "Campana de captacion" :
    "Plan Completo";

  const planComplementario =
    doctor.plan === "sitio" ? "Campana de captacion" :
    doctor.plan === "campana" ? "Sitio web profesional" : null;

  const precioUpgrade =
    doctor.plan === "sitio" ? "+$600/mes" :
    doctor.plan === "campana" ? "+$900 unico + $600/mes" : null;

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen">
      <nav style={{ borderColor: border }} className="flex justify-between items-center px-4 md:px-12 py-4 border-b">
        <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "26px", width: "auto" }} />
        <button onClick={handleLogout} style={{ color: ink, opacity: 0.6 }} className="text-sm">
          Cerrar sesion
        </button>
      </nav>

      <div className="max-w-[900px] mx-auto px-4 md:px-12 py-10">
        <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Tu panel</p>
        <h1 style={{ color: ink }} className="font-display font-bold text-2xl md:text-[28px] mb-1">
          Hola, {doctor.nombre}
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-10">
          Plan: {planLabel}
        </p>

        <div style={{ backgroundColor: surface, borderColor: border }} className="border rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: live }}></span>
            <p style={{ color: ink }} className="font-display font-bold text-sm">
              Estamos construyendo tu {doctor.plan === "sitio" ? "sitio" : "campana"}
            </p>
          </div>
          <p style={{ color: ink, opacity: 0.6 }} className="text-sm">
            Te avisaremos por WhatsApp al {doctor.whatsapp} en cuanto este listo. Normalmente toma menos de 48 horas.
          </p>
        </div>

        {doctor.google_calendar_connected && (
          <div style={{ borderColor: teal, backgroundColor: "#F4FAF9" }} className="border-2 rounded-2xl p-6 mb-8">
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">Tu enlace para agendar citas</p>
            <p style={{ color: ink, opacity: 0.6 }} className="text-[13px] mb-4">
              Comparte este enlace con tus pacientes para que agenden cita solos.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                readOnly
                value={"https://uno-por-ciento.vercel.app/agendar?doctor=" + doctor.id}
                onClick={(e) => e.target.select()}
                style={{ borderColor: border, color: ink, backgroundColor: "#fff" }}
                className="border rounded-lg px-3 py-2.5 text-xs flex-1 outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText("https://uno-por-ciento.vercel.app/agendar?doctor=" + doctor.id);
                  setLinkCopiado(true);
                  setTimeout(() => setLinkCopiado(false), 2000);
                }}
                style={{ backgroundColor: teal, color: "#fff" }}
                className="rounded-lg px-5 py-2.5 text-xs font-medium whitespace-nowrap"
              >
                {linkCopiado ? "Copiado" : "Copiar enlace"}
              </button>
              
                <a href={"https://wa.me/52" + (doctor.whatsapp ? doctor.whatsapp.replace(/\D/g, "") : "") + "?text=" + encodeURIComponent("Aqui puedes agendar tu cita: https://uno-por-ciento.vercel.app/agendar?doctor=" + doctor.id)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#25D366", color: "#fff" }}
                className="rounded-lg px-5 py-2.5 text-xs font-medium whitespace-nowrap text-center no-underline"
              >
                Compartir por WhatsApp
              </a>
            </div>
          </div>
        )}

        {(doctor.plan === "sitio" || doctor.plan === "completo") && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-2">Visitas (30 dias)</p>
              <p style={{ color: ink }} className="font-mono text-2xl font-bold">
                {analyticsLoading ? "..." : analytics ? analytics.pageViews : "-"}
              </p>
            </div>
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-2">Visitantes unicos</p>
              <p style={{ color: ink }} className="font-mono text-2xl font-bold">
                {analyticsLoading ? "..." : analytics ? analytics.activeUsers : "-"}
              </p>
            </div>
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-2">Estado sitio</p>
              <p style={{ color: teal }} className="font-mono text-sm font-bold">
                {doctor.ga4_property_id ? "Activo" : "En construccion"}
              </p>
            </div>
          </div>
        )}

        {(doctor.plan === "campana" || doctor.plan === "completo") && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-2">Alcance total</p>
              <p style={{ color: ink }} className="font-mono text-2xl font-bold">
                {campanaMetricas ? campanaMetricas.alcance.toLocaleString() : "-"}
              </p>
            </div>
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-2">Mensajes recibidos</p>
              <p style={{ color: teal }} className="font-mono text-2xl font-bold">
                {campanaMetricas ? campanaMetricas.mensajes : "-"}
              </p>
            </div>
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-2">Invertido</p>
              <p style={{ color: ink }} className="font-mono text-2xl font-bold">
                {campanaMetricas ? "$" + campanaMetricas.gasto.toFixed(0) : "-"}
              </p>
            </div>
          </div>
        )}

        {planComplementario && (
          <div style={{ borderColor: teal, backgroundColor: "#F4FAF9" }} className="border rounded-2xl p-6 mt-2 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p style={{ color: teal }} className="font-mono text-[11px] mb-1">MEJORA TU PLAN</p>
              <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">
                Agrega {planComplementario}
              </p>
              <p style={{ color: ink, opacity: 0.6 }} className="text-[13px]">
                {precioUpgrade} — se cobra la diferencia proporcional del mes en curso.
              </p>
              {upgradeMsg && (
                <p style={{ color: upgradeMsg.includes("error") || upgradeMsg.includes("Error") ? "#D85A30" : "#1D9E75" }} className="text-[13px] mt-2">
                  {upgradeMsg}
                </p>
              )}
            </div>
            <button
              onClick={handleUpgrade}
              disabled={upgradeLoading}
              style={{ backgroundColor: teal, color: "#fff" }}
              className="rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap disabled:opacity-50"
            >
              {upgradeLoading ? "Procesando..." : "Agregar " + planComplementario}
            </button>
          </div>
        )}
{/* Kit de contenido */}
<div style={{ borderColor: border }} className="border rounded-2xl p-6 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  <div>
    <p style={{ color: teal }} className="font-mono text-[11px] mb-1">NUEVO</p>
    <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">Kit de contenido</p>
    <p style={{ color: ink, opacity: 0.6 }} className="text-[13px]">
      Sube tu logo, colores y foto para generar posts personalizados con tu marca.
    </p>
  </div>
  
    href="/dashboard/marca"
    style={{ backgroundColor: teal, color: "#fff" }}
    className="rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap no-underline"
  >
    Configurar marca
  </a>
</div>
        <div style={{ borderColor: border }} className="border rounded-2xl p-6 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Kit de contenido */}
<div style={{ borderColor: border }} className="border rounded-2xl p-6 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  <div>
    <p style={{ color: teal }} className="font-mono text-[11px] mb-1">NUEVO</p>
    <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">Kit de contenido</p>
    <p style={{ color: ink, opacity: 0.6 }} className="text-[13px]">
      Sube tu logo, colores y foto para generar posts personalizados con tu marca.
    </p>
  </div>
  
    href="/dashboard/marca"
    style={{ backgroundColor: teal, color: "#fff" }}
    className="rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap no-underline"
  >
    Configurar marca
  </a>
</div>
          <div>
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">Tus servicios</p>
            <p style={{ color: ink, opacity: 0.6 }} className="text-[13px]">
              Agrega los servicios que ofreces para que tus pacientes puedan agendar.
            </p>
          </div>
          
            <a href="/dashboard/servicios"
            style={{ backgroundColor: teal, color: "#fff" }}
            className="rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap no-underline"
          >
            Gestionar servicios
          </a>
        </div>

        {doctor.google_calendar_connected && (
          <div style={{ borderColor: border }} className="border rounded-2xl p-6 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">Tus citas</p>
              <p style={{ color: ink, opacity: 0.6 }} className="text-[13px]">
                Revisa y contacta a los pacientes que agendaron contigo.
              </p>
            </div>
            
              <a href="/dashboard/citas"
              style={{ borderColor: border, color: ink }}
              className="border rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap no-underline"
            >
              Ver citas
            </a>
          </div>
        )}

        <div style={{ borderColor: border }} className="border rounded-2xl p-6 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">Tu suscripcion</p>
            <p style={{ color: ink, opacity: 0.6 }} className="text-[13px]">
              Administra tu plan, actualiza tu tarjeta o cancela cuando quieras.
            </p>
          </div>
          <button
            onClick={handleManageSubscription}
            disabled={portalLoading}
            style={{ borderColor: border, color: ink }}
            className="border rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap disabled:opacity-50"
          >
            {portalLoading ? "Abriendo..." : "Gestionar suscripcion"}
          </button>
        </div>
      </div>
    </main>
  );
}