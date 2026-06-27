"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

function DoctorAvatar({ size = 56 }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
      <circle cx="50" cy="50" r="50" fill="#E8F0EF" />
      <circle cx="50" cy="38" r="16" fill="#B8CCC9" />
      <path d="M20 95 C20 68 32 60 50 60 C68 60 80 68 80 95 Z" fill="#FFFFFF" />
      <path d="M20 95 C20 68 32 60 50 60 C68 60 80 68 80 95 Z" fill="none" stroke="#D8E3E1" strokeWidth="1" />
      <path d="M38 62 L38 74 L44 78 L50 72 L56 78 L62 74 L62 62" fill="none" stroke="#0E7C7B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="78" r="3.2" fill="#0E7C7B" />
    </svg>
  );
}

export default function PreviewPage() {
  const router = useRouter();
  const supabase = createClient();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.push("/login");
        return;
      }
      const { data, error } = await supabase
        .from("doctores")
        .select("*")
        .eq("user_id", userData.user.id)
        .single();

      if (error || !data) {
        router.push("/onboarding");
        return;
      }
      setDoctor(data);
      setLoading(false);
    }
    load();
  }, []);

  const ink = "#0B1418";
  const teal = "#0E7C7B";
  const live = "#3DDC84";
  const border = "#D8E3E1";
  const surface = "#EDF2F1";

  if (loading) {
    return (
      <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: ink }}>Generando tu vista previa...</p>
      </main>
    );
  }

  const especialidades = doctor.servicios
    ? doctor.servicios.split(/[,\n]/).map(s => s.trim()).filter(Boolean).slice(0, 4)
    : [];

  const iconos = ["🩺", "💉", "🧠", "❤️"];

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen px-4 md:px-12 py-12">
      <div className="max-w-[760px] mx-auto">
        <div className="flex items-center justify-center mb-8">
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "28px", width: "auto" }} />
        </div>

        <div className="inline-flex items-center gap-2 mb-6" style={{ backgroundColor: surface, padding: "6px 14px", borderRadius: "100px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: live }}></span>
          <span style={{ color: teal }} className="text-xs font-mono">
            {doctor.plan === "sitio" ? "Vista previa de tu sitio" : "Vista previa de tu anuncio"}
          </span>
        </div>

        <h1 style={{ color: ink }} className="font-display font-bold text-2xl md:text-[28px] mb-2">
          {doctor.plan === "sitio" ? "Así se vería tu sitio web" : "Así se vería tu campaña"}
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-8">
          Revisa que todo esté correcto antes de activarlo.
        </p>

        {doctor.plan === "campana" ? (
          /* MOCKUP DE ANUNCIO - estilo poster cuadrado */
          <div className="mb-8">
            <div
              style={{
                background: "linear-gradient(135deg, #0B1418 0%, #0E7C7B 100%)",
                aspectRatio: "1/1",
              }}
              className="rounded-2xl overflow-hidden max-w-[420px] mx-auto relative p-6 flex flex-col shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <img src="/logo-uno.png" alt="" style={{ height: "16px", filter: "brightness(0) invert(1)" }} />
                </div>
                <div className="flex gap-2 opacity-70">
                  {["f", "𝕏", "in"].map(s => (
                    <span key={s} style={{ color: "#fff" }} className="text-[11px] w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">{s}</span>
                  ))}
                </div>
              </div>

              <p style={{ color: live }} className="text-[11px] uppercase tracking-wide font-bold mb-1">{doctor.especialidad}</p>
              <h2 style={{ color: "#fff" }} className="font-display font-bold text-2xl leading-tight mb-2">
                Atención médica<br />de confianza
              </h2>
              <p style={{ color: "#fff" }} className="text-[13px] opacity-80 italic mb-4">
                "{doctor.frase || "Cuidamos tu salud"}"
              </p>

              <div className="flex gap-2.5 mb-4">
                {especialidades.slice(0, 3).map((esp, i) => (
                  <div key={esp} style={{ backgroundColor: "rgba(255,255,255,0.12)" }} className="flex-1 rounded-xl p-2.5 text-center">
                    <span className="text-lg block mb-1">{iconos[i % iconos.length]}</span>
                    <p style={{ color: "#fff" }} className="text-[9px] leading-tight">{esp.slice(0, 18)}</p>
                  </div>
                ))}
              </div>

              <div className="flex-1 flex items-end">
                <div className="w-full flex items-end justify-between gap-3">
                  <div style={{ backgroundColor: "rgba(255,255,255,0.95)" }} className="rounded-xl w-20 h-20 shrink-0 overflow-hidden">
                    <DoctorAvatar size={80} />
                  </div>
                  <div className="flex-1 text-right">
                    <p style={{ color: "#fff" }} className="font-display font-bold text-sm">{doctor.nombre}</p>
                    <p style={{ color: live }} className="text-[11px] font-mono">{doctor.whatsapp}</p>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: live }} className="mt-4 rounded-lg py-2.5 text-center">
                <span style={{ color: ink }} className="text-[12px] font-bold">Agendar cita →</span>
              </div>
            </div>

            <p style={{ color: ink, opacity: 0.5 }} className="text-xs text-center mt-5">
              Presupuesto diario: <strong>${doctor.presupuesto_ads || "100"} MXN</strong> · Plataforma: Meta Ads
            </p>
          </div>
        ) : (
        /* MOCKUP — Estilo Medicina */
        <div style={{ borderColor: border }} className="border rounded-2xl overflow-hidden mb-8 shadow-sm">

          <div style={{ backgroundColor: "#0E7C7B" }} className="flex justify-between items-center px-5 py-2.5">
            <span style={{ color: "#fff" }} className="text-[11px] flex items-center gap-1.5">
              📞 {doctor.whatsapp}
            </span>
            <span style={{ color: "#fff" }} className="text-[11px] opacity-80">{doctor.horario || "Lun - Vie 9am - 6pm"}</span>
          </div>

          <div className="flex justify-between items-center px-5 py-4 border-b" style={{ borderColor: border }}>
            <span style={{ color: ink }} className="font-display font-bold text-base">{doctor.nombre}</span>
            <div className="hidden md:flex gap-5">
              {["Inicio", "Especialidades", "Sobre mí", "Contacto"].map(item => (
                <span key={item} style={{ color: ink, opacity: 0.6 }} className="text-[13px]">{item}</span>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: "#F4FAF9" }} className="px-6 md:px-10 py-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <p style={{ color: teal }} className="text-xs uppercase tracking-wide mb-2 font-medium">{doctor.especialidad}</p>
              <h2 style={{ color: ink }} className="font-display font-bold text-2xl md:text-[28px] leading-tight mb-3">
                {doctor.frase ? doctor.frase : `Cuidado experto en ${doctor.especialidad}`}
              </h2>
              <p style={{ color: ink, opacity: 0.65 }} className="text-sm mb-5 leading-relaxed">
                {doctor.sintomas?.slice(0, 140) || "Atención médica profesional y personalizada."}
              </p>
              <span style={{ backgroundColor: teal, color: "#fff" }} className="inline-block px-6 py-3 rounded-lg text-sm font-medium">
                Agendar cita →
              </span>
            </div>
            <div style={{ backgroundColor: "#fff", borderColor: border }} className="border rounded-2xl w-full md:w-[220px] aspect-square flex items-center justify-center shrink-0 overflow-hidden p-6">
              <DoctorAvatar size={120} />
            </div>
          </div>

          <div style={{ backgroundColor: teal }} className="px-6 md:px-10 py-5 flex flex-col md:flex-row gap-3">
            <div style={{ backgroundColor: "#fff" }} className="flex-1 rounded-lg px-3 py-2.5">
              <p style={{ color: ink, opacity: 0.4 }} className="text-[10px] mb-0.5">Nombre</p>
              <p style={{ color: ink, opacity: 0.3 }} className="text-xs">Tu nombre</p>
            </div>
            <div style={{ backgroundColor: "#fff" }} className="flex-1 rounded-lg px-3 py-2.5">
              <p style={{ color: ink, opacity: 0.4 }} className="text-[10px] mb-0.5">Teléfono</p>
              <p style={{ color: ink, opacity: 0.3 }} className="text-xs">Tu número</p>
            </div>
            <span style={{ backgroundColor: ink, color: "#fff" }} className="rounded-lg px-6 py-2.5 text-xs font-medium flex items-center justify-center whitespace-nowrap">
              Agendar
            </span>
          </div>

          <div className="px-6 md:px-10 py-10">
            <p style={{ color: ink }} className="font-display font-bold text-lg text-center mb-1">Especialidades</p>
            <p style={{ color: ink, opacity: 0.5 }} className="text-xs text-center mb-8">Lo que tratamos en consulta</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {(especialidades.length > 0 ? especialidades : ["Consulta general"]).map((esp, i) => (
                <div key={esp} className="flex flex-col items-center text-center">
                  <div style={{ backgroundColor: surface }} className="w-14 h-14 rounded-full flex items-center justify-center text-xl mb-2.5">
                    {iconos[i % iconos.length]}
                  </div>
                  <p style={{ color: ink }} className="text-xs font-medium leading-snug">{esp}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: ink }} className="px-6 md:px-10 py-4 flex justify-between items-center">
            <span style={{ color: "#fff" }} className="text-[11px] opacity-70">{doctor.ciudad}</span>
            <span style={{ color: "#fff" }} className="text-[11px] opacity-70">{doctor.nombre}</span>
          </div>
        </div>
        )}

        <div style={{ borderColor: border }} className="border rounded-2xl p-6 mb-8">
          <p style={{ color: ink }} className="font-display font-bold text-sm mb-4">Resumen de tu información</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-1">Ciudad</p>
              <p style={{ color: ink }} className="text-sm">{doctor.ciudad}</p>
            </div>
            <div>
              <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-1">WhatsApp</p>
              <p style={{ color: ink }} className="text-sm">{doctor.whatsapp}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/onboarding")}
            style={{ borderColor: border, color: ink }}
            className="border rounded-lg py-3 text-sm font-medium flex-1"
          >
            ← Editar información
          </button>
          <button
            onClick={() => router.push("/pago")}
            style={{ backgroundColor: ink, color: "#fff" }}
            className="rounded-lg py-3 text-sm font-medium flex-1"
          >
            Activar y pagar →
          </button>
        </div>
      </div>
    </main>
  );
}