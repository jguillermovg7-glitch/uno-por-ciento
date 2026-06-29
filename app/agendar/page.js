"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

function generateNext14Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function AgendarForm() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctor");

  const [doctor, setDoctor] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [pacienteNombre, setPacienteNombre] = useState("");
  const [pacienteTelefono, setPacienteTelefono] = useState("");
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  const next14Days = generateNext14Days();

  useEffect(() => {
    async function load() {
      if (!doctorId) {
        setLoading(false);
        return;
      }
      const { data: doctorData } = await supabase
        .from("doctores")
        .select("*")
        .eq("id", doctorId)
        .single();

      const { data: serviciosData } = await supabase
        .from("servicios")
        .select("*")
        .eq("doctor_id", doctorId)
        .eq("activo", true);

      setDoctor(doctorData);
      setServicios(serviciosData || []);
      setLoading(false);
    }
    load();
  }, [doctorId]);

  async function handleFechaSelect(dateObj) {
    setFecha(dateObj);
    setHoraSeleccionada(null);
    setSlotsLoading(true);

    // Usar componentes locales de fecha, no toISOString() que convierte a UTC
    // y puede cambiar el día en zonas horarias negativas como México.
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const fechaStr = `${year}-${month}-${day}`;

    const res = await fetch(`/api/calendar-availability?doctorId=${doctorId}&fecha=${fechaStr}`);
    const data = await res.json();
    setSlots(data.slots || []);
    setSlotsLoading(false);
  }

  async function handleConfirmar(e) {
    e.preventDefault();
    setBooking(true);
    setError("");

    const res = await fetch("/api/calendar-book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId,
        servicioId: servicioSeleccionado.id,
        fechaHoraInicio: horaSeleccionada,
        pacienteNombre,
        pacienteTelefono,
      }),
    });

    const data = await res.json();
    setBooking(false);

    if (data.error) {
      setError(data.error);
      return;
    }

    setStep(4);
  }

  const ink = "#0B1418";
  const teal = "#0E7C7B";
  const live = "#3DDC84";
  const border = "#D8E3E1";
  const surface = "#EDF2F1";

  if (loading) {
    return (
      <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: ink }}>Cargando...</p>
      </main>
    );
  }

  if (!doctor) {
    return (
      <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen flex items-center justify-center px-4">
        <p style={{ color: ink }} className="text-center">No se encontró información del doctor.</p>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "#FAFAFA" }} className="min-h-screen px-4 py-8">
      <div className="max-w-[520px] mx-auto">

        {/* Header doctor */}
        <div style={{ backgroundColor: "#fff", borderColor: border }} className="border rounded-2xl p-5 mb-5 flex items-center gap-3">
          <div style={{ backgroundColor: teal }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
            {doctor.nombre?.charAt(0) || "D"}
          </div>
          <div>
            <p style={{ color: ink }} className="font-display font-bold text-base leading-tight">{doctor.nombre}</p>
            <p style={{ color: teal }} className="text-xs">{doctor.especialidad}</p>
          </div>
        </div>

        {/* Progress steps */}
        {step < 4 && (
          <div className="flex gap-1.5 mb-5 px-1">
            {[1, 2, 3].map(s => (
              <div key={s} style={{ backgroundColor: s <= step ? teal : border }} className="h-1 flex-1 rounded-full"></div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: "#fff", borderColor: border }} className="border rounded-2xl p-5">

          {/* PASO 1: Servicio */}
          {step === 1 && (
            <div>
              <p style={{ color: ink }} className="font-display font-bold text-base mb-4">Elige un servicio</p>
              <div className="flex flex-col gap-2.5">
                {servicios.length === 0 ? (
                  <p style={{ color: ink, opacity: 0.5 }} className="text-sm">No hay servicios disponibles.</p>
                ) : (
                  servicios.map(s => (
                    <button
                      key={s.id}
                      onClick={() => { setServicioSeleccionado(s); setStep(2); }}
                      style={{ borderColor: border }}
                      className="border rounded-xl p-4 text-left hover:border-[#0E7C7B] transition flex justify-between items-center"
                    >
                      <div>
                        <p style={{ color: ink }} className="text-sm font-medium">{s.nombre}</p>
                        <p style={{ color: ink, opacity: 0.5 }} className="text-xs flex items-center gap-1 mt-0.5">
                          <span>⏱</span> {s.duracion_minutos} min
                        </p>
                      </div>
                      <p style={{ color: teal }} className="font-mono text-base font-bold">${s.precio}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* PASO 2: Fecha y hora - estilo calendario horizontal */}
          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} style={{ color: ink, opacity: 0.5 }} className="text-xs mb-4 flex items-center gap-1">← Cambiar servicio</button>
              <p style={{ color: ink }} className="font-display font-bold text-base mb-1">Elige fecha y hora</p>
              <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-4">{servicioSeleccionado.nombre} · {servicioSeleccionado.duracion_minutos} min</p>

              {/* Selector de día horizontal scrollable */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth: "none" }}>
                {next14Days.map((d, i) => {
                  const isSelected = fecha && d.toDateString() === fecha.toDateString();
                  const dayName = d.toLocaleDateString("es-MX", { weekday: "short", timeZone: "America/Mexico_City" }).slice(0, 2);
                  const dayNum = d.toLocaleDateString("es-MX", { day: "numeric", timeZone: "America/Mexico_City" });
                  return (
                    <button
                      key={i}
                      onClick={() => handleFechaSelect(d)}
                      style={{
                        backgroundColor: isSelected ? ink : surface,
                        color: isSelected ? "#fff" : ink,
                        minWidth: "52px",
                      }}
                      className="rounded-xl py-3 px-2 flex flex-col items-center shrink-0 transition"
                    >
                      <span style={{ opacity: 0.6 }} className="text-[10px] uppercase">{dayName}</span>
                      <span className="text-base font-bold mt-0.5">{dayNum}</span>
                    </button>
                  );
                })}
              </div>

              {fecha && (
                <div>
                  <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-3 uppercase tracking-wide font-medium">
                    Horarios disponibles
                  </p>
                  {slotsLoading ? (
                    <p style={{ color: ink, opacity: 0.5 }} className="text-sm">Buscando horarios...</p>
                  ) : slots.length === 0 ? (
                    <div style={{ backgroundColor: surface }} className="rounded-xl p-4 text-center">
                      <p style={{ color: ink, opacity: 0.5 }} className="text-sm">No hay horarios disponibles este día.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map(slot => {
                        const time = new Date(slot).toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Mexico_City" });
                        return (
                          <button
                            key={slot}
                            onClick={() => { console.log("DEBUG slot:", slot); setHoraSeleccionada(slot); setStep(3); }}
                            style={{ borderColor: border, color: ink }}
                            className="border rounded-lg py-2.5 text-xs font-medium hover:border-[#0E7C7B] hover:bg-[#F4FAF9] transition"
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* PASO 3: Datos paciente */}
          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} style={{ color: ink, opacity: 0.5 }} className="text-xs mb-4">← Cambiar horario</button>
              <p style={{ color: ink }} className="font-display font-bold text-base mb-4">Tus datos</p>
              <p style={{ color: "red", fontSize: "10px" }}>DEBUG RAW: {horaSeleccionada}</p>

              <div style={{ backgroundColor: surface }} className="rounded-xl p-4 mb-5">
                <p style={{ color: ink }} className="text-sm font-semibold">{servicioSeleccionado.nombre}</p>
                <p style={{ color: teal }} className="text-xs mt-0.5">
                  {new Date(horaSeleccionada).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Mexico_City" })} · {new Date(horaSeleccionada).toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Mexico_City" })}
                </p>
              </div>

              <form onSubmit={handleConfirmar} className="flex flex-col gap-3">
                <input
                  placeholder="Tu nombre completo"
                  value={pacienteNombre}
                  onChange={(e) => setPacienteNombre(e.target.value)}
                  required
                  style={{ borderColor: border, color: ink }}
                  className="border rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0E7C7B]"
                />
                <input
                  placeholder="Tu WhatsApp"
                  value={pacienteTelefono}
                  onChange={(e) => setPacienteTelefono(e.target.value)}
                  required
                  style={{ borderColor: border, color: ink }}
                  className="border rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0E7C7B]"
                />
                {error && <p style={{ color: "#D85A30" }} className="text-xs">{error}</p>}
                <button
                  type="submit"
                  disabled={booking}
                  style={{ backgroundColor: ink, color: "#fff" }}
                  className="rounded-lg py-3.5 text-sm font-medium disabled:opacity-50 mt-1"
                >
                  {booking ? "Confirmando..." : "Confirmar cita"}
                </button>
              </form>
            </div>
          )}

          {/* PASO 4: Confirmado */}
          {step === 4 && (
            <div className="text-center py-4">
              <div style={{ backgroundColor: live }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <span style={{ color: ink }} className="text-3xl">✓</span>
              </div>
              <p style={{ color: ink }} className="font-display font-bold text-xl mb-2">¡Cita confirmada!</p>
              <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-6">
                Te esperamos el {new Date(horaSeleccionada).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Mexico_City" })} a las {new Date(horaSeleccionada).toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Mexico_City" })}.
              </p>
              {doctor.whatsapp && (
                <a
                  href={`https://wa.me/52${doctor.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola, soy ${pacienteNombre}. Acabo de agendar una cita de ${servicioSeleccionado.nombre} el ${new Date(horaSeleccionada).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Mexico_City" })} a las ${new Date(horaSeleccionada).toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Mexico_City" })}. ¡Confirmo mi asistencia!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#25D366", color: "#fff" }}
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium no-underline"
                >
                  💬 Avisar al doctor por WhatsApp
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function AgendarPage() {
  return (
    <Suspense fallback={<div />}>
      <AgendarForm />
    </Suspense>
  );
}