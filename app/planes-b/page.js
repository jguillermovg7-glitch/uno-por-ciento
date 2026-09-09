"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { createClient } from "../../lib/supabaseClient";

const PLANES = {
  starter: {
    nombre: "Starter",
    alcance: "Facebook",
    precio: "$699",
    ciclo: "/mes + pauta",
    descripcion: "Solo campaña, para probar sin compromiso. Automatizada de principio a fin.",
    features: [
      "Anuncios en Facebook",
      "Sin sitio ni landing",
      "Contenido generado por IA, renovado cada mes",
      "Reportes de resultados en tiempo real",
      "Soporte por correo",
    ],
  },
  pro: {
    nombre: "Pro",
    alcance: "Google Ads + landing",
    precio: "$999",
    ciclo: "/mes + pauta",
    descripcion: "Todo lo de Starter, más Google y tu landing. Si no tienes cuenta de Google Ads, te la creamos nosotros.",
    features: [
      "Anuncios en Google Ads",
      "Landing page incluida",
      "Contenido generado por IA, renovado cada mes",
      "Reportes de resultados en tiempo real",
      "Soporte por WhatsApp",
    ],
  },
  superior: {
    nombre: "Superior",
    alcance: "Google + Facebook + sitio",
    precio: "$1,499",
    ciclo: "/mes + pauta",
    descripcion: "Todo lo de Pro, más Facebook y tu sitio completo. El nivel de mayor resultado.",
    features: [
      "Anuncios en Facebook y Google",
      "Sitio web completo, no solo una landing",
      "Contenido ilimitado generado por IA",
      "Reportes de resultados en tiempo real",
      "Soporte prioritario",
    ],
    destacado: true,
  },
};

const ink = "#0B1418";
const teal = "#016062";
const tealSoft = "#e4f2f2";
const border = "#e2eaea";

function PlanesB() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [procesando, setProcesando] = useState(null); // qué plan está en proceso

  // Plan preseleccionado desde la landing
  const planParam = searchParams.get("plan"); // "starter" | "pro" | "superior"

  useEffect(() => {
    async function init() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
          const { data } = await supabase
            .from("doctores")
            .select("*")
            .eq("user_id", user.id)
            .single();
          if (data) setDoctor(data);
        }
      } catch (e) {
        console.error("Error inicializando planes-b:", e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  async function handleSelectPlan(plan) {
    if (!PLANES[plan]) return;
    setProcesando(plan);

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout", { content_name: plan });
    }

    // Pago primero, cuenta después: va directo a checkout sin requerir login.
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error al crear la sesión de pago.");
        setProcesando(null);
      }
    } catch (e) {
      alert("Error de conexión. Intenta de nuevo.");
      setProcesando(null);
    }
  }

  if (loading) {
    return (
      <main style={{ background: "#fff", minHeight: "100vh" }} className="flex items-center justify-center">
        <p style={{ color: ink }}>Cargando...</p>
      </main>
    );
  }

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ borderBottom: `1px solid ${border}`, padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "28px", width: "auto" }} />
        </a>
        {user && (
          <span style={{ fontSize: "13px", color: "#8a9a9a" }}>{user.email}</span>
        )}
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 24px" }}>

        <p style={{ textAlign: "center", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: teal, marginBottom: "14px" }}>
          Planes para doctores
        </p>
        <h1 style={{ textAlign: "center", fontFamily: "Sora, sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, letterSpacing: "-2px", color: ink, marginBottom: "12px" }}>
          Elige y activa hoy.
        </h1>
        <p style={{ textAlign: "center", fontSize: "16px", color: "#5a6a6a", marginBottom: "56px" }}>
          Sin contratos. Cancela cuando quieras.
        </p>

        {/* Botones rápidos arriba */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "48px" }}>
          {Object.entries(PLANES).map(([key, p]) => (
            <button
              key={key}
              onClick={() => handleSelectPlan(key)}
              disabled={!!procesando}
              style={{
                padding: "10px 22px",
                borderRadius: "100px",
                border: `1.5px solid ${p.destacado ? teal : border}`,
                background: p.destacado ? teal : "transparent",
                color: p.destacado ? "#fff" : teal,
                fontSize: "14px", fontWeight: 700,
                cursor: "pointer", opacity: procesando ? .6 : 1,
              }}
            >
              {procesando === key ? "Procesando..." : `Elegir ${p.nombre}`}
            </button>
          ))}
        </div>

        {/* Tarjetas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", alignItems: "stretch" }}
             className="plans-b-grid">
          {Object.entries(PLANES).map(([key, p]) => (
            <div
              key={key}
              style={{
                border: `1.5px solid ${p.destacado ? teal : border}`,
                borderRadius: "20px",
                padding: "28px 24px",
                background: p.destacado ? "#0a1414" : "#f6fafa",
                display: "flex", flexDirection: "column",
                position: "relative",
              }}
            >
              {p.destacado && (
                <span style={{
                  position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)",
                  background: teal, color: "#fff",
                  fontSize: "11px", fontWeight: 700, letterSpacing: ".3px",
                  padding: "4px 16px", borderRadius: "100px", whiteSpace: "nowrap",
                }}>
                  Mayor resultado
                </span>
              )}

              {/* Nombre y alcance */}
              <p style={{ fontFamily: "Sora,sans-serif", fontSize: "20px", fontWeight: 800, color: p.destacado ? "#e8f4f4" : ink, marginBottom: "4px" }}>
                {p.nombre}
              </p>
              <p style={{ fontSize: "12px", fontWeight: 600, color: p.destacado ? "#5cc8c8" : teal, marginBottom: "18px" }}>
                {p.alcance}
              </p>

              {/* Precio */}
              <p style={{ fontFamily: "IBM Plex Mono,monospace", fontSize: "34px", fontWeight: 700, letterSpacing: "-1px", color: p.destacado ? "#fff" : ink, marginBottom: "2px" }}>
                {p.precio}<span style={{ fontSize: "15px", fontWeight: 500, color: p.destacado ? "#90b0b0" : "#8a9a9a" }}>/mes</span>
              </p>
              <p style={{ fontSize: "12px", color: p.destacado ? "#90b0b0" : "#8a9a9a", marginBottom: "22px" }}>
                {p.ciclo} · cancela cuando quieras
              </p>

              {/* Divider */}
              <div style={{ height: "1px", background: p.destacado ? "rgba(255,255,255,.1)" : border, marginBottom: "20px" }} />

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
                <li style={{ fontSize: "14px", lineHeight: 1.5, color: p.destacado ? "#90b0b0" : "#5a6a6a", paddingBottom: "12px", marginBottom: "8px", borderBottom: `1px solid ${p.destacado ? "rgba(255,255,255,.1)" : border}` }}>
                  <strong style={{ color: p.destacado ? "#e8f4f4" : ink }}>{p.descripcion}</strong>
                </li>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", gap: "9px", alignItems: "flex-start", fontSize: "14px", lineHeight: 1.5, color: p.destacado ? "#90b0b0" : "#5a6a6a", padding: "7px 0", borderTop: `1px solid ${p.destacado ? "rgba(255,255,255,.08)" : border}` }}>
                    <span style={{ color: p.destacado ? "#5cc8c8" : teal, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleSelectPlan(key)}
                disabled={!!procesando}
                style={{
                  display: "block", width: "100%", textAlign: "center",
                  padding: "13px", borderRadius: "100px", border: "none", cursor: "pointer",
                  fontFamily: "IBM Plex Sans,sans-serif", fontSize: "14.5px", fontWeight: 700,
                  background: p.destacado ? "#fff" : "transparent",
                  color: p.destacado ? "#0a1414" : teal,
                  border: p.destacado ? "none" : `1.5px solid ${teal}`,
                  opacity: procesando ? .6 : 1,
                  transition: "opacity .15s",
                }}
              >
                {procesando === key ? "Procesando..." : `Elegir ${p.nombre}`}
              </button>
            </div>
          ))}
        </div>

        {/* Botones rápidos abajo */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginTop: "40px" }}>
          {Object.entries(PLANES).map(([key, p]) => (
            <button
              key={key}
              onClick={() => handleSelectPlan(key)}
              disabled={!!procesando}
              style={{
                padding: "10px 22px",
                borderRadius: "100px",
                border: `1.5px solid ${p.destacado ? teal : border}`,
                background: p.destacado ? teal : "transparent",
                color: p.destacado ? "#fff" : teal,
                fontSize: "14px", fontWeight: 700,
                cursor: "pointer", opacity: procesando ? .6 : 1,
              }}
            >
              {procesando === key ? "Procesando..." : `Elegir ${p.nombre}`}
            </button>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#8a9a9a", maxWidth: "560px", margin: "24px auto 0", lineHeight: 1.6 }}>
          La inversión en anuncios (pauta) va directo a Meta o Google — no a nosotros. Tú controlas cuánto gastas.
        </p>
      </div>

      <style>{`
        @media(max-width:820px){
          .plans-b-grid{ grid-template-columns:1fr!important; max-width:400px; margin:0 auto; }
        }
      `}</style>
    </main>
  );
}

export default function PlanesBPage() {
  return (
    <Suspense fallback={
      <main style={{ background: "#fff", minHeight: "100vh" }} className="flex items-center justify-center">
        <p>Cargando...</p>
      </main>
    }>
      <PlanesB />
    </Suspense>
  );
}
