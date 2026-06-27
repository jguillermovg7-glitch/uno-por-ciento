"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

export default function DashboardPage() {
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
    }
    load();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
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

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen">
      <nav style={{ borderColor: border }} className="flex justify-between items-center px-4 md:px-12 py-4 border-b">
        <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "26px", width: "auto" }} />
        <button onClick={handleLogout} style={{ color: ink, opacity: 0.6 }} className="text-sm">
          Cerrar sesión
        </button>
      </nav>

      <div className="max-w-[900px] mx-auto px-4 md:px-12 py-10">
        <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Tu panel</p>
        <h1 style={{ color: ink }} className="font-display font-bold text-2xl md:text-[28px] mb-1">
          Hola, {doctor.nombre}
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-10">
          Plan: {doctor.plan === "sitio" ? "Sitio web profesional" : "Campaña de captación"}
        </p>

        <div style={{ backgroundColor: surface, borderColor: border }} className="border rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: live }}></span>
            <p style={{ color: ink }} className="font-display font-bold text-sm">Estamos construyendo tu {doctor.plan === "sitio" ? "sitio" : "campaña"}</p>
          </div>
          <p style={{ color: ink, opacity: 0.6 }} className="text-sm">
            Te avisaremos por WhatsApp al {doctor.whatsapp} en cuanto esté listo. Normalmente toma menos de 48 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div style={{ borderColor: border }} className="border rounded-2xl p-5">
            <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-2">Visitas este mes</p>
            <p style={{ color: ink }} className="font-mono text-2xl font-bold">—</p>
          </div>
          <div style={{ borderColor: border }} className="border rounded-2xl p-5">
            <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-2">Mensajes WhatsApp</p>
            <p style={{ color: ink }} className="font-mono text-2xl font-bold">—</p>
          </div>
          <div style={{ borderColor: border }} className="border rounded-2xl p-5">
            <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-2">Estado</p>
            <p style={{ color: teal }} className="font-mono text-sm font-bold">En construcción</p>
          </div>
        </div>
      </div>
    </main>
  );
}
