"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabaseClient";

export default function PostsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [temaSeleccionado, setTemaSeleccionado] = useState("ansiedad");
  const [generando, setGenerando] = useState(false);

  const ink = "#0B1418";
  const teal = "#0E7C7B";
  const border = "#D8E3E1";

  const temas = [
    { id: "ansiedad", label: "Ansiedad", emoji: "🧠" },
    { id: "depresion", label: "Depresión", emoji: "💙" },
    { id: "conoceme", label: "Conóceme", emoji: "👋" },
    { id: "servicios", label: "Mis servicios", emoji: "📋" },
  ];

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
      setLoading(false);
    }
    load();
  }, []);

  function buildUrl(tema) {
    if (!doctor) return "";
    const params = new URLSearchParams({
      nombre: doctor.nombre || "",
      especialidad: doctor.especialidad || "",
      telefono: doctor.whatsapp || "",
      ciudad: doctor.ciudad || "",
      colorPrimario: doctor.marca_color_primario || "#0E7C7B",
      colorSecundario: doctor.marca_color_secundario || "#FFFFFF",
      fotoUrl: doctor.marca_foto_url || "",
      logoUrl: doctor.marca_logo_url || "",
      tema,
    });
    return `/api/generar-post?${params.toString()}`;
  }

  async function handleDescargar() {
    setGenerando(true);
    try {
      const url = buildUrl(temaSeleccionado);
      const res = await fetch(url);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `post-${temaSeleccionado}.png`;
      a.click();
    } catch (err) {
      alert("Error generando imagen: " + err.message);
    }
    setGenerando(false);
  }

  if (loading) {
    return (
      <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: ink }}>Cargando...</p>
      </main>
    );
  }

  if (!doctor.marca_color_primario && !doctor.marca_foto_url) {
    return (
      <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen">
        <nav style={{ borderColor: border }} className="flex justify-between items-center px-4 md:px-12 py-4 border-b">
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "26px" }} />
          <button onClick={() => router.push("/dashboard")} style={{ color: ink, opacity: 0.6 }} className="text-sm">
            ← Volver al panel
          </button>
        </nav>
        <div className="max-w-[900px] mx-auto px-4 md:px-12 py-20 text-center">
          <p style={{ color: ink }} className="font-display font-bold text-xl mb-3">Primero configura tu marca</p>
          <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-6">Sube tu logo, foto y colores antes de generar posts.</p>
          <a href="/dashboard/marca" style={{ backgroundColor: teal, color: "#fff" }} className="rounded-xl px-6 py-3 text-sm font-medium no-underline">
            Configurar marca
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen">
      <nav style={{ borderColor: border }} className="flex justify-between items-center px-4 md:px-12 py-4 border-b">
        <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "26px" }} />
        <button onClick={() => router.push("/dashboard")} style={{ color: ink, opacity: 0.6 }} className="text-sm">
          ← Volver al panel
        </button>
      </nav>

      <div className="max-w-[900px] mx-auto px-4 md:px-12 py-10">
        <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Kit de contenido</p>
        <h1 style={{ color: ink }} className="font-display font-bold text-2xl md:text-[28px] mb-1">
          Genera tu post
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-10">
          Elige el tema, previsualiza y descarga tu imagen lista para publicar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-4">Tema del post</p>
            <div className="flex flex-col gap-3">
              {temas.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemaSeleccionado(t.id)}
                  style={{
                    borderColor: temaSeleccionado === t.id ? teal : border,
                    backgroundColor: temaSeleccionado === t.id ? "#F4FAF9" : "#fff",
                    color: ink,
                  }}
                  className="border-2 rounded-xl px-5 py-4 text-left flex items-center gap-3"
                >
                  <span style={{ fontSize: "24px" }}>{t.emoji}</span>
                  <span className="font-medium text-sm">{t.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleDescargar}
              disabled={generando}
              style={{ backgroundColor: teal, color: "#fff" }}
              className="rounded-xl px-8 py-3 text-sm font-medium disabled:opacity-50 w-full mt-6"
            >
              {generando ? "Generando..." : "⬇ Descargar PNG"}
            </button>
          </div>

          <div>
            <p style={{ color: ink }} className="font-display font-bold text-sm mb-4">Vista previa</p>
            <img
              key={temaSeleccionado}
              src={buildUrl(temaSeleccionado)}
              alt="Preview post"
              style={{ width: "100%", borderRadius: "16px", border: `1px solid ${border}` }}
            />
            <p style={{ color: ink, opacity: 0.4 }} className="text-xs mt-2">
              La imagen descargada es de 1080×1080px lista para Instagram y Facebook.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
