"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabaseClient";

export default function ServiciosPage() {
  const router = useRouter();
  const supabase = createClient();
  const [doctor, setDoctor] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ nombre: "", duracion_minutos: "30", precio: "" });

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

      setDoctor(data);
      await loadServicios(data.id);
      setLoading(false);
    }
    load();
  }, []);

  async function loadServicios(doctorId) {
    const { data } = await supabase
      .from("servicios")
      .select("*")
      .eq("doctor_id", doctorId)
      .order("created_at", { ascending: true });
    setServicios(data || []);
  }

  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from("servicios").insert({
      doctor_id: doctor.id,
      nombre: form.nombre,
      duracion_minutos: parseInt(form.duracion_minutos) || 30,
      precio: parseFloat(form.precio) || 0,
    });

    setSaving(false);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    setForm({ nombre: "", duracion_minutos: "30", precio: "" });
    loadServicios(doctor.id);
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este servicio?")) return;
    await supabase.from("servicios").delete().eq("id", id);
    loadServicios(doctor.id);
  }

  async function handleToggleActivo(servicio) {
    await supabase
      .from("servicios")
      .update({ activo: !servicio.activo })
      .eq("id", servicio.id);
    loadServicios(doctor.id);
  }

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
        <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Tus servicios</p>
        <h1 style={{ color: ink }} className="font-display font-bold text-2xl mb-1">
          Gestiona tus servicios
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-8">
          Estos servicios aparecerán en tu sitio para que los pacientes agenden cita.
        </p>

        <div style={{ borderColor: doctor.google_calendar_connected ? "#3DDC84" : border }} className="border-2 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">
              {doctor.google_calendar_connected ? "✓ Google Calendar conectado" : "Conecta tu Google Calendar"}
            </p>
            <p style={{ color: ink, opacity: 0.6 }} className="text-[13px]">
              {doctor.google_calendar_connected
                ? "Las citas que agenden tus pacientes se crearán automáticamente en tu calendario."
                : "Necesario para que tus pacientes puedan agendar citas directamente en tu sitio."}
            </p>
          </div>
          {!doctor.google_calendar_connected && (
            <a
              href={`/api/connect-calendar?doctorId=${doctor.id}`}
              style={{ backgroundColor: teal, color: "#fff" }}
              className="rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap no-underline"
            >
              Conectar Calendar →
            </a>
          )}
        </div>

        <form onSubmit={handleAdd} style={{ borderColor: border }} className="border rounded-2xl p-5 mb-8">
          <p style={{ color: ink }} className="font-display font-bold text-sm mb-4">Agregar nuevo servicio</p>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px] gap-3 mb-3">
            <input
              placeholder="Nombre del servicio (ej. Consulta general)"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
              style={{ borderColor: border, color: ink }}
              className="border rounded-lg px-3 py-2.5 text-sm outline-none"
            />
            <input
              type="number"
              placeholder="Minutos"
              value={form.duracion_minutos}
              onChange={(e) => setForm({ ...form, duracion_minutos: e.target.value })}
              required
              style={{ borderColor: border, color: ink }}
              className="border rounded-lg px-3 py-2.5 text-sm outline-none"
            />
            <input
              type="number"
              placeholder="Precio MXN"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
              required
              style={{ borderColor: border, color: ink }}
              className="border rounded-lg px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            style={{ backgroundColor: ink, color: "#fff" }}
            className="w-full rounded-lg py-2.5 text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Guardando..." : "+ Agregar servicio"}
          </button>
        </form>

        <div style={{ borderColor: border }} className="border rounded-2xl overflow-hidden">
          <div style={{ backgroundColor: surface }} className="px-4 py-3">
            <p style={{ color: ink }} className="text-xs font-bold uppercase tracking-wide">
              Tus servicios ({servicios.length})
            </p>
          </div>
          {servicios.length === 0 ? (
            <p style={{ color: ink, opacity: 0.5 }} className="text-sm p-5">
              Aún no has agregado ningún servicio.
            </p>
          ) : (
            servicios.map(s => (
              <div key={s.id} style={{ borderColor: border }} className="flex items-center justify-between px-4 py-3.5 border-b last:border-b-0">
                <div>
                  <p style={{ color: ink, opacity: s.activo ? 1 : 0.4 }} className="text-sm font-medium">{s.nombre}</p>
                  <p style={{ color: ink, opacity: 0.5 }} className="text-xs">{s.duracion_minutos} min · ${s.precio} MXN</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleActivo(s)}
                    style={{ color: s.activo ? teal : ink, opacity: s.activo ? 1 : 0.4 }}
                    className="text-xs font-medium"
                  >
                    {s.activo ? "Activo" : "Inactivo"}
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    style={{ color: "#D85A30" }}
                    className="text-xs font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
