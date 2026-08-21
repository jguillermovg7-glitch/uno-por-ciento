"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabaseClient";

export default function MarcaPage() {
  const router = useRouter();
  const supabase = createClient();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const [colorPrimario, setColorPrimario] = useState("#0E7C7B");
  const [colorSecundario, setColorSecundario] = useState("#FFFFFF");
  const [logoUrl, setLogoUrl] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");

  const logoInputRef = useRef();
  const fotoInputRef = useRef();

  const ink = "#0B1418";
  const teal = "#0E7C7B";
  const border = "#D8E3E1";
  const surface = "#EDF2F1";

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
      if (data.marca_color_primario) setColorPrimario(data.marca_color_primario);
      if (data.marca_color_secundario) setColorSecundario(data.marca_color_secundario);
      if (data.marca_logo_url) setLogoUrl(data.marca_logo_url);
      if (data.marca_foto_url) setFotoUrl(data.marca_foto_url);
      setLoading(false);
    }
    load();
  }, []);

  async function subirArchivo(file, tipo) {
  const ext = file.name.split(".").pop();
  const timestamp = Date.now();
  const path = `${doctor.id}/${tipo}_${timestamp}.${ext}`;

  const { error } = await supabase.storage
    .from("marca-doctor")
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("marca-doctor")
    .getPublicUrl(path);

  return urlData.publicUrl;
}

  async function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await subirArchivo(file, "logo");
      setLogoUrl(url);
    } catch (err) {
      setMsg("Error al subir logo: " + err.message);
    }
  }

  async function handleFotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await subirArchivo(file, "foto");
      setFotoUrl(url);
    } catch (err) {
      setMsg("Error al subir foto: " + err.message);
    }
  }

  async function handleGuardar() {
    setSaving(true);
    setMsg("");
    const { error } = await supabase
      .from("doctores")
      .update({
        marca_color_primario: colorPrimario,
        marca_color_secundario: colorSecundario,
        marca_logo_url: logoUrl,
        marca_foto_url: fotoUrl,
      })
      .eq("id", doctor.id);

    if (error) {
      setMsg("Error al guardar: " + error.message);
    } else {
      setMsg("Marca guardada correctamente.");
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

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen">
      <nav style={{ borderColor: border }} className="flex justify-between items-center px-4 md:px-12 py-4 border-b">
        <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "26px", width: "auto" }} />
        <button
          onClick={() => router.push("/dashboard")}
          style={{ color: ink, opacity: 0.6 }}
          className="text-sm"
        >
          ← Volver al panel
        </button>
      </nav>

      <div className="max-w-[900px] mx-auto px-4 md:px-12 py-10">
        <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Kit de contenido</p>
        <h1 style={{ color: ink }} className="font-display font-bold text-2xl md:text-[28px] mb-1">
          Tu marca
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-10">
          Sube tu logo, foto y colores para personalizar tus plantillas de posts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div style={{ borderColor: border }} className="border rounded-2xl p-6">
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">Logo</p>
            <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-4">PNG o SVG con fondo transparente recomendado</p>
            <div
              onClick={() => logoInputRef.current.click()}
              style={{ borderColor: border, backgroundColor: surface, cursor: "pointer", minHeight: "120px" }}
              className="border-2 border-dashed rounded-xl flex items-center justify-center mb-3"
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" style={{ maxHeight: "80px", maxWidth: "100%", objectFit: "contain" }} />
              ) : (
                <p style={{ color: ink, opacity: 0.4 }} className="text-xs">Haz clic para subir</p>
              )}
            </div>
            <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
            <button
              onClick={() => logoInputRef.current.click()}
              style={{ borderColor: border, color: ink }}
              className="border rounded-lg px-4 py-2 text-xs w-full"
            >
              {logoUrl ? "Cambiar logo" : "Subir logo"}
            </button>
          </div>

          <div style={{ borderColor: border }} className="border rounded-2xl p-6">
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">Tu foto</p>
            <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-4">Foto profesional o de perfil</p>
            <div
              onClick={() => fotoInputRef.current.click()}
              style={{ borderColor: border, backgroundColor: surface, cursor: "pointer", minHeight: "120px" }}
              className="border-2 border-dashed rounded-xl flex items-center justify-center mb-3"
            >
              {fotoUrl ? (
                <img src={fotoUrl} alt="Foto" style={{ maxHeight: "120px", maxWidth: "100%", objectFit: "cover", borderRadius: "12px" }} />
              ) : (
                <p style={{ color: ink, opacity: 0.4 }} className="text-xs">Haz clic para subir</p>
              )}
            </div>
            <input ref={fotoInputRef} type="file" accept="image/*" className="hidden" onChange={handleFotoChange} />
            <button
              onClick={() => fotoInputRef.current.click()}
              style={{ borderColor: border, color: ink }}
              className="border rounded-lg px-4 py-2 text-xs w-full"
            >
              {fotoUrl ? "Cambiar foto" : "Subir foto"}
            </button>
          </div>
        </div>

        <div style={{ borderColor: border }} className="border rounded-2xl p-6 mb-8">
          <p style={{ color: ink }} className="font-display font-bold text-sm mb-1">Colores de tu marca</p>
          <p style={{ color: ink, opacity: 0.5 }} className="text-xs mb-6">Se usarán como fondo y texto en tus plantillas</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p style={{ color: ink, opacity: 0.6 }} className="text-xs mb-2">Color primario</p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={colorPrimario}
                  onChange={(e) => setColorPrimario(e.target.value)}
                  style={{ width: "48px", height: "48px", borderRadius: "10px", border: "none", cursor: "pointer", padding: "2px" }}
                />
                <input
                  type="text"
                  value={colorPrimario}
                  onChange={(e) => setColorPrimario(e.target.value)}
                  style={{ borderColor: border, color: ink, fontFamily: "monospace" }}
                  className="border rounded-lg px-3 py-2 text-sm flex-1"
                />
              </div>
            </div>
            <div>
              <p style={{ color: ink, opacity: 0.6 }} className="text-xs mb-2">Color secundario</p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={colorSecundario}
                  onChange={(e) => setColorSecundario(e.target.value)}
                  style={{ width: "48px", height: "48px", borderRadius: "10px", border: "none", cursor: "pointer", padding: "2px" }}
                />
                <input
                  type="text"
                  value={colorSecundario}
                  onChange={(e) => setColorSecundario(e.target.value)}
                  style={{ borderColor: border, color: ink, fontFamily: "monospace" }}
                  className="border rounded-lg px-3 py-2 text-sm flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderColor: border }} className="border rounded-2xl p-6 mb-8">
          <p style={{ color: ink }} className="font-display font-bold text-sm mb-4">Vista previa de plantilla</p>
          <div
            style={{
              backgroundColor: colorPrimario,
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "320px",
              aspectRatio: "1/1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" style={{ height: "36px", objectFit: "contain", filter: "brightness(10)" }} />
              ) : (
                <div style={{ width: "80px", height: "24px", backgroundColor: colorSecundario, opacity: 0.4, borderRadius: "4px" }} />
              )}
              {fotoUrl && (
                <img src={fotoUrl} alt="Foto" style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${colorSecundario}` }} />
              )}
            </div>
            <div>
              <p style={{ color: colorSecundario, fontSize: "18px", fontWeight: "700", lineHeight: "1.3", marginBottom: "8px" }}>
                ¿Sabes cuándo buscar ayuda profesional?
              </p>
              <p style={{ color: colorSecundario, opacity: 0.7, fontSize: "12px" }}>
                {doctor.nombre} · {doctor.especialidad}
              </p>
            </div>
          </div>
          <p style={{ color: ink, opacity: 0.4 }} className="text-xs mt-3">Vista previa aproximada</p>
        </div>

        {msg && (
          <p style={{ color: msg.includes("Error") ? "#D85A30" : "#1D9E75" }} className="text-sm mb-4">
            {msg}
          </p>
        )}
        <button
          onClick={handleGuardar}
          disabled={saving}
          style={{ backgroundColor: teal, color: "#fff" }}
          className="rounded-xl px-8 py-3 text-sm font-medium disabled:opacity-50 w-full md:w-auto"
        >
          {saving ? "Guardando..." : "Guardar marca"}
        </button>
      </div>
    </main>
  );
}
