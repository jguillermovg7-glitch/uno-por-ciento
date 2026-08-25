"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabaseClient";

export default function PerfilPage() {
  const router = useRouter();
  const supabase = createClient();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    especialidad: "",
    ciudad: "",
    direccion: "",
    whatsapp: "",
    horario: "",
    frase: "",
    diferenciador: "",
    experiencia: "",
    instagram: "",
    facebook: "",
  });

  const ink = "#0B1418";
  const teal = "#0E7C7B";
  const border = "#D8E3E1";

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) { router.push("/login"); return; }
      const { data } = await supabase
        .from("doctores")
        .select("*")
        .eq("user_id", userData.user.id)
        .single();
      if (!data || data.estado !== "activo") { router.push("/dashboard"); return; }
      setDoctor(data);
      setForm({
        nombre: data.nombre || "",
        especialidad: data.especialidad || "",
        ciudad: data.ciudad || "",
        direccion: data.direccion || "",
        whatsapp: data.whatsapp || "",
        horario: data.horario || "",
        frase: data.frase || "",
        diferenciador: data.diferenciador || "",
        experiencia: data.experiencia || "",
        instagram: data.instagram || "",
        facebook: data.facebook || "",
      });
      setLoading(false);
    }
    load();
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleGuardar() {
    setSaving(true);
    setMsg("");
    const { error } = await supabase
      .from("doctores")
      .update(form)
      .eq("id", doctor.id);
    if (error) {
      setMsg("Error al guardar: " + error.message);
    } else {
      setMsg("Datos actualizados correctamente.");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: ink }}>Cargando...</p>
      </main>
    );
  }

  function Campo({ label, name, tipo = "text", placeholder = "" }) {
    return (
      <div>
        <p style={{ color: ink, opacity: 0.6 }} className="text-xs mb-1">{label}</p>
        {tipo === "textarea" ? (
          <textarea
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={placeholder}
            rows={3}
            style={{ borderColor: border, color: ink }}
            className="border rounded-xl px-3 py-2.5 text-sm w-full resize-none"
          />
        ) : (
          <input
            type={tipo}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={placeholder}
            style={{ borderColor: border, color: ink }}
            className="border rounded-xl px-3 py-2.5 text-sm w-full"
          />
        )}
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen">
      <nav style={{ borderColor: border }} className="flex justify-between items-center px-4 md:px-12 py-4 border-b">
        <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "26px", width: "auto" }} />
        <button onClick={() => router.push("/dashboard")} style={{ color: ink, opacity: 0.6 }} className="text-sm">
          ← Volver al panel
        </button>
      </nav>

      <div className="max-w-[700px] mx-auto px-4 md:px-12 py-10">
        <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Tu cuenta</p>
        <h1 style={{ color: ink }} className="font-display font-bold text-2xl md:text-[28px] mb-1">
          Editar perfil
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-10">
          Esta información aparece en tu sitio web y campañas.
        </p>

        <div className="flex flex-col gap-6">

          {/* Datos básicos */}
          <div style={{ borderColor: border }} className="border rounded-2xl p-6">
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-4">Datos básicos</p>
            <div className="flex flex-col gap-4">
              <Campo label="Nombre completo" name="nombre" />
              <Campo label="Especialidad" name="especialidad" />
              <Campo label="Ciudad" name="ciudad" />
              <Campo label="Dirección" name="direccion" />
            </div>
          </div>

          {/* Contacto */}
          <div style={{ borderColor: border }} className="border rounded-2xl p-6">
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-4">Contacto y horario</p>
            <div className="flex flex-col gap-4">
              <Campo label="WhatsApp" name="whatsapp" placeholder="10 dígitos sin espacios" />
              <Campo label="Horario de atención" name="horario" placeholder="Ej. Lunes a viernes 9am a 6pm" />
            </div>
          </div>

          {/* Perfil profesional */}
          <div style={{ borderColor: border }} className="border rounded-2xl p-6">
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-4">Perfil profesional</p>
            <div className="flex flex-col gap-4">
              <Campo label="Frase o slogan" name="frase" placeholder="Ej. Tu salud es mi prioridad" />
              <Campo label="¿Por qué elegirte? (diferenciador)" name="diferenciador" tipo="textarea" />
              <Campo label="Años de experiencia" name="experiencia" />
            </div>
          </div>

          {/* Redes sociales */}
          <div style={{ borderColor: border }} className="border rounded-2xl p-6">
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-4">Redes sociales</p>
            <div className="flex flex-col gap-4">
              <Campo label="Instagram (URL o @usuario)" name="instagram" placeholder="@tuusuario" />
              <Campo label="Facebook (URL o nombre de página)" name="facebook" placeholder="facebook.com/tupagina" />
            </div>
          </div>

          {msg && (
            <p style={{ color: msg.includes("Error") ? "#D85A30" : "#1D9E75" }} className="text-sm">
              {msg}
            </p>
          )}

          <button
            onClick={handleGuardar}
            disabled={saving}
            style={{ backgroundColor: teal, color: "#fff" }}
            className="rounded-xl px-8 py-3 text-sm font-medium disabled:opacity-50 w-full"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </main>
  );
}
