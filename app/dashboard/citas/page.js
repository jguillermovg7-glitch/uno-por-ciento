"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabaseClient";

export default function CitasPage() {
  const router = useRouter();
  const supabase = createClient();
  const [doctor, setDoctor] = useState(null);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.push("/login");
        return;
      }
      const { data: doctorData } = await supabase
        .from("doctores")
        .select("*")
        .eq("user_id", userData.user.id)
        .single();

      if (!doctorData) {
        router.push("/planes");
        return;
      }

      setDoctor(doctorData);

      const { data: citasData } = await supabase
        .from("citas")
        .select("*, servicios(nombre, duracion_minutos, precio)")
        .eq("doctor_id", doctorData.id)
        .gte("fecha_hora", new Date().toISOString())
        .order("fecha_hora", { ascending: true });

      setCitas(citasData || []);
      setLoading(false);
    }
    load();
  }, []);

  const ink = "#0B1418";
  const teal = "#0E7C7B";
  const border = "#D8E3E1";
  const surface = "#EDF2F1";

  if (loading) {
    return (
      <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: ink }}>Cargando...</p>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen">
      <nav style={{ borderColor: border }} className="flex justify-between items-center px-4 md:px-12 py-4 border-b">
        <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "26px", width: "auto" }} />
        <a href="/dashboard" style={{ color: ink, opacity: 0.6 }} className="text-sm">
          ← Volver al panel
        </a>
      </nav>

      <div className="max-w-[700px] mx-auto px-4 md:px-12 py-10">
        <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Tus citas</p>
        <h1 style={{ color: ink }} className="font-display font-bold text-2xl mb-1">
          Próximas citas
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-8">
          Citas agendadas por tus pacientes a través de tu sitio.
        </p>

        {citas.length === 0 ? (
          <div style={{ borderColor: border }} className="border rounded-2xl p-8 text-center">
            <p style={{ color: ink, opacity: 0.5 }} className="text-sm">Aún no tienes citas agendadas.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {citas.map(cita => {
              const fecha = new Date(cita.fecha_hora);
              return (
                <div key={cita.id} style={{ borderColor: border }} className="border rounded-2xl p-5 flex justify-between items-center gap-4">
                  <div>
                    <p style={{ color: teal }} className="text-xs font-mono mb-1">
                      {fecha.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })} · {fecha.toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit", hour12: true })}
                    </p>
                    <p style={{ color: ink }} className="text-sm font-semibold">{cita.paciente_nombre}</p>
                    <p style={{ color: ink, opacity: 0.5 }} className="text-xs">{cita.servicios?.nombre || "Servicio"}</p>
                  </div>
                  <a
                    href={`https://wa.me/52${cita.paciente_telefono.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${cita.paciente_nombre}, te confirmo tu cita del ${fecha.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })} a las ${fecha.toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit", hour12: true })}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#25D366", color: "#fff" }}
                    className="rounded-lg px-4 py-2 text-xs font-medium no-underline whitespace-nowrap shrink-0"
                  >
                    💬 Contactar
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}