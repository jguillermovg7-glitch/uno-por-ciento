"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

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

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen px-4 md:px-12 py-12">
      <div className="max-w-[700px] mx-auto">
        <div className="flex items-center justify-center mb-8">
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "28px", width: "auto" }} />
        </div>

        <div className="inline-flex items-center gap-2 mb-6" style={{ backgroundColor: surface, padding: "6px 14px", borderRadius: "100px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: live }}></span>
          <span style={{ color: teal }} className="text-xs font-mono">Vista previa generada</span>
        </div>

        <h1 style={{ color: ink }} className="font-display font-bold text-2xl md:text-[28px] mb-2">
          Así se vería tu {doctor.plan === "sitio" ? "sitio" : "campaña"}
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-8">
          Revisa que todo esté correcto antes de activarlo.
        </p>

        {/* MOCKUP CARD */}
        <div style={{ borderColor: border }} className="border rounded-2xl overflow-hidden mb-8">
          <div style={{ backgroundColor: "#FAF7F2" }} className="p-8 text-center">
            <p style={{ color: "#C4622D" }} className="text-xs uppercase tracking-wide mb-2">{doctor.especialidad}</p>
            <h2 style={{ color: "#2C1A0E" }} className="font-display font-bold text-2xl mb-3">{doctor.nombre}</h2>
            {doctor.frase && (
              <p style={{ color: "#5C3D2E" }} className="text-base italic mb-4">"{doctor.frase}"</p>
            )}
            <p style={{ color: "#7A5C4A" }} className="text-sm mb-6 max-w-md mx-auto">{doctor.servicios}</p>
            <span style={{ backgroundColor: "#C4622D", color: "#fff" }} className="inline-block px-6 py-3 rounded-full text-sm font-medium">
              Agendar consulta
            </span>
          </div>
        </div>

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
            {doctor.plan === "campana" && (
              <div>
                <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-1">Presupuesto diario</p>
                <p style={{ color: ink }} className="text-sm">${doctor.presupuesto_ads} MXN/día</p>
              </div>
            )}
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
