"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

const ADMIN_EMAIL = "j.guillermovg7@gmail.com";

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const [doctores, setDoctores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [metricas, setMetricas] = useState([]);
  const [form, setForm] = useState({ alcance: "", mensajes: "", gasto: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user || userData.user.email !== ADMIN_EMAIL) {
        router.push("/");
        return;
      }

      const { data } = await supabase
        .from("doctores")
        .select("*")
        .eq("plan", "campana")
        .eq("estado", "activo")
        .order("created_at", { ascending: false });

      setDoctores(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function selectDoctor(doc) {
    setSelectedDoctor(doc);
    const { data } = await supabase
      .from("metricas_campana")
      .select("*")
      .eq("doctor_id", doc.id)
      .order("fecha", { ascending: false })
      .limit(10);
    setMetricas(data || []);
  }

  async function handleAddMetric(e) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from("metricas_campana").insert({
      doctor_id: selectedDoctor.id,
      alcance: parseInt(form.alcance) || 0,
      mensajes: parseInt(form.mensajes) || 0,
      gasto: parseFloat(form.gasto) || 0,
    });

    setSaving(false);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    setForm({ alcance: "", mensajes: "", gasto: "" });
    selectDoctor(selectedDoctor);
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
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen px-4 md:px-12 py-10">
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "26px", width: "auto" }} />
          <span style={{ color: ink, opacity: 0.4 }} className="text-sm">/ Admin</span>
        </div>

        <h1 style={{ color: ink }} className="font-display font-bold text-2xl mb-1">
          Métricas de campañas
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-8">
          Actualiza manualmente los resultados de Facebook Ads por doctor.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">

          {/* Lista de doctores */}
          <div style={{ borderColor: border }} className="border rounded-2xl overflow-hidden h-fit">
            <div style={{ backgroundColor: surface }} className="px-4 py-3">
              <p style={{ color: ink }} className="text-xs font-bold uppercase tracking-wide">Doctores ({doctores.length})</p>
            </div>
            {doctores.length === 0 ? (
              <p style={{ color: ink, opacity: 0.5 }} className="text-sm p-4">No hay doctores con plan de campaña activo.</p>
            ) : (
              doctores.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => selectDoctor(doc)}
                  style={{
                    backgroundColor: selectedDoctor?.id === doc.id ? surface : "transparent",
                    borderColor: border
                  }}
                  className="w-full text-left px-4 py-3 border-b last:border-b-0 hover:bg-gray-50"
                >
                  <p style={{ color: ink }} className="text-sm font-medium">{doc.nombre}</p>
                  <p style={{ color: ink, opacity: 0.5 }} className="text-xs">{doc.ciudad}</p>
                </button>
              ))
            )}
          </div>

          {/* Panel de edición */}
          <div>
            {!selectedDoctor ? (
              <div style={{ borderColor: border }} className="border rounded-2xl p-8 text-center">
                <p style={{ color: ink, opacity: 0.5 }} className="text-sm">Selecciona un doctor de la lista para ver y agregar métricas.</p>
              </div>
            ) : (
              <>
                <div style={{ borderColor: border }} className="border rounded-2xl p-6 mb-6">
                  <p style={{ color: teal }} className="font-mono text-xs mb-1">{selectedDoctor.ciudad}</p>
                  <h2 style={{ color: ink }} className="font-display font-bold text-lg mb-4">{selectedDoctor.nombre}</h2>

                  <form onSubmit={handleAddMetric} className="grid grid-cols-3 gap-3 mb-2">
                    <div>
                      <label style={{ color: ink, opacity: 0.5 }} className="text-xs block mb-1">Alcance</label>
                      <input
                        type="number"
                        value={form.alcance}
                        onChange={(e) => setForm({ ...form, alcance: e.target.value })}
                        style={{ borderColor: border, color: ink }}
                        className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ color: ink, opacity: 0.5 }} className="text-xs block mb-1">Mensajes</label>
                      <input
                        type="number"
                        value={form.mensajes}
                        onChange={(e) => setForm({ ...form, mensajes: e.target.value })}
                        style={{ borderColor: border, color: ink }}
                        className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ color: ink, opacity: 0.5 }} className="text-xs block mb-1">Gasto (MXN)</label>
                      <input
                        type="number"
                        value={form.gasto}
                        onChange={(e) => setForm({ ...form, gasto: e.target.value })}
                        style={{ borderColor: border, color: ink }}
                        className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={saving}
                      style={{ backgroundColor: ink, color: "#fff" }}
                      className="col-span-3 rounded-lg py-2.5 text-sm font-medium mt-1 disabled:opacity-50"
                    >
                      {saving ? "Guardando..." : "+ Agregar registro de hoy"}
                    </button>
                  </form>
                </div>

                <div style={{ borderColor: border }} className="border rounded-2xl overflow-hidden">
                  <div style={{ backgroundColor: surface }} className="px-4 py-3">
                    <p style={{ color: ink }} className="text-xs font-bold uppercase tracking-wide">Historial reciente</p>
                  </div>
                  {metricas.length === 0 ? (
                    <p style={{ color: ink, opacity: 0.5 }} className="text-sm p-4">Aún no hay registros para este doctor.</p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ borderColor: border }} className="border-b">
                          <th style={{ color: ink, opacity: 0.5 }} className="text-left px-4 py-2 text-xs font-medium">Fecha</th>
                          <th style={{ color: ink, opacity: 0.5 }} className="text-right px-4 py-2 text-xs font-medium">Alcance</th>
                          <th style={{ color: ink, opacity: 0.5 }} className="text-right px-4 py-2 text-xs font-medium">Mensajes</th>
                          <th style={{ color: ink, opacity: 0.5 }} className="text-right px-4 py-2 text-xs font-medium">Gasto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metricas.map(m => (
                          <tr key={m.id} style={{ borderColor: border }} className="border-b last:border-b-0">
                            <td style={{ color: ink }} className="px-4 py-2.5">{m.fecha}</td>
                            <td style={{ color: ink }} className="px-4 py-2.5 text-right font-mono">{m.alcance}</td>
                            <td style={{ color: teal }} className="px-4 py-2.5 text-right font-mono font-bold">{m.mensajes}</td>
                            <td style={{ color: ink }} className="px-4 py-2.5 text-right font-mono">${m.gasto}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}