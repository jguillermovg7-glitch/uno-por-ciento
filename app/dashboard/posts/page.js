"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabaseClient";

const TEMAS_POR_ESPECIALIDAD = {
  psicologia: [
    { id: "ansiedad", label: "Ansiedad", titulo: "¿Sientes ansiedad constante?", subtitulo: "La ansiedad tiene solución. Con el acompañamiento correcto puedes recuperar tu calma." },
    { id: "depresion", label: "Depresión", titulo: "No tienes que cargarlo solo.", subtitulo: "La depresión es tratable. Da el primer paso y empieza a sentirte mejor." },
    { id: "autoestima", label: "Autoestima", titulo: "Mereces sentirte bien contigo mismo.", subtitulo: "Trabajamos juntos para que recuperes tu confianza y bienestar emocional." },
    { id: "pareja", label: "Terapia de pareja", titulo: "¿Tu relación necesita apoyo?", subtitulo: "La terapia de pareja ayuda a mejorar la comunicación y reconectar." },
    { id: "conoceme", label: "Conóceme", titulo: "Hola, soy tu psicólogo.", subtitulo: "Te acompaño en tu proceso con un enfoque profesional, humano y basado en evidencia." },
    { id: "servicios", label: "Mis servicios", titulo: "¿En qué te puedo ayudar?", subtitulo: "Ofrezco atención psicológica personalizada adaptada a tus necesidades." },
  ],
  nutricion: [
    { id: "peso", label: "Bajar de peso", titulo: "Baja de peso sin pasar hambre.", subtitulo: "Un plan nutricional personalizado y sostenible, diseñado para ti." },
    { id: "musculo", label: "Masa muscular", titulo: "Gana músculo con la alimentación correcta.", subtitulo: "Te ayudo a optimizar tu nutrición para alcanzar tus metas de rendimiento." },
    { id: "diabetes", label: "Diabetes y metabolismo", titulo: "Controla tu diabetes con alimentación.", subtitulo: "Un enfoque basado en evidencia para mejorar tu salud metabólica." },
    { id: "habitos", label: "Hábitos sostenibles", titulo: "Resultados que duran toda la vida.", subtitulo: "No más dietas. Aprende a comer bien y mantén tus resultados para siempre." },
    { id: "conoceme", label: "Conóceme", titulo: "Hola, soy tu nutriólogo.", subtitulo: "Te ayudo a alcanzar tus metas con un plan personalizado y basado en ciencia." },
    { id: "servicios", label: "Mis servicios", titulo: "¿En qué te puedo ayudar?", subtitulo: "Planes nutricionales personalizados para cada etapa y objetivo de tu vida." },
  ],
  fisioterapia: [
    { id: "espalda", label: "Dolor de espalda", titulo: "Deja de vivir con dolor de espalda.", subtitulo: "Tratamiento especializado para recuperar tu movilidad y calidad de vida." },
    { id: "postquirurgico", label: "Post-quirúrgico", titulo: "Recupera tu movilidad más rápido.", subtitulo: "Rehabilitación profesional para que vuelvas a tu vida normal lo antes posible." },
    { id: "deportivo", label: "Lesiones deportivas", titulo: "Vuelve a tu deporte sin dolor.", subtitulo: "Tratamiento y prevención de lesiones deportivas con enfoque en tu rendimiento." },
    { id: "mayores", label: "Adultos mayores", titulo: "Moverte bien es vivir mejor.", subtitulo: "Rehabilitación especializada para adultos mayores que quieren mantener su independencia." },
    { id: "conoceme", label: "Conóceme", titulo: "Hola, soy tu fisioterapeuta.", subtitulo: "Tratamientos personalizados para que recuperes tu movilidad y bienestar." },
    { id: "servicios", label: "Mis servicios", titulo: "¿En qué te puedo ayudar?", subtitulo: "Fisioterapia y rehabilitación adaptada a tus necesidades y objetivos." },
  ],
  alternativa: [
    { id: "cronicas", label: "Enfermedades crónicas", titulo: "Recupera tu salud de forma natural.", subtitulo: "Tratamientos alternativos para enfermedades crónicas con resultados comprobados." },
    { id: "natural", label: "Medicina natural", titulo: "Tu cuerpo tiene capacidad de sanar.", subtitulo: "Medicina natural y fitoterapia para apoyar tu proceso de recuperación." },
    { id: "bienestar", label: "Bienestar integral", titulo: "Salud que va más allá del síntoma.", subtitulo: "Un enfoque integral que cuida tu cuerpo, mente y energía." },
    { id: "conoceme", label: "Conóceme", titulo: "Hola, soy tu médico naturista.", subtitulo: "Tratamientos alternativos personalizados para mejorar tu calidad de vida." },
    { id: "servicios", label: "Mis servicios", titulo: "¿En qué te puedo ayudar?", subtitulo: "Medicina alternativa y naturopatía adaptada a tu caso particular." },
  ],
  odontologia: [
    { id: "implantes", label: "Implantes dentales", titulo: "Recupera tu sonrisa con implantes.", subtitulo: "Implantes dentales de alta calidad con materiales de primera y seguimiento garantizado." },
    { id: "sonrisa", label: "Diseño de sonrisa", titulo: "La sonrisa que siempre quisiste.", subtitulo: "Diseño de sonrisa personalizado para que luzcas con confianza." },
    { id: "limpieza", label: "Limpieza dental", titulo: "Una boca sana es tu mejor inversión.", subtitulo: "Limpieza dental profesional para prevenir problemas y mantener tu salud bucal." },
    { id: "ortodoncia", label: "Ortodoncia", titulo: "Alinea tus dientes. Transforma tu vida.", subtitulo: "Brackets y alineadores para conseguir la sonrisa que mereces." },
    { id: "conoceme", label: "Conóceme", titulo: "Hola, soy tu dentista.", subtitulo: "Atención dental profesional con tecnología de vanguardia y trato humano." },
    { id: "servicios", label: "Mis servicios", titulo: "¿En qué te puedo ayudar?", subtitulo: "Odontología integral para cuidar tu salud bucal en todas sus etapas." },
  ],
  traumatologia: [
    { id: "rodilla", label: "Dolor de rodilla", titulo: "Deja de vivir con dolor de rodilla.", subtitulo: "Diagnóstico preciso y tratamiento personalizado para recuperar tu movilidad." },
    { id: "deportivo", label: "Lesiones deportivas", titulo: "Vuelve a tu deporte más fuerte.", subtitulo: "Tratamiento especializado en lesiones deportivas para atletas y personas activas." },
    { id: "cirugia", label: "Cirugía mínima invasión", titulo: "Cirugía moderna. Recuperación rápida.", subtitulo: "Procedimientos de mínima invasión para que vuelvas a tu vida normal antes." },
    { id: "recuperacion", label: "Recuperación", titulo: "Recupera tu movilidad e independencia.", subtitulo: "Acompañamiento integral desde el diagnóstico hasta tu total recuperación." },
    { id: "conoceme", label: "Conóceme", titulo: "Hola, soy tu traumatólogo.", subtitulo: "Atención especializada en huesos, articulaciones y lesiones del sistema músculo-esquelético." },
    { id: "servicios", label: "Mis servicios", titulo: "¿En qué te puedo ayudar?", subtitulo: "Traumatología y ortopedia con enfoque en tu recuperación y calidad de vida." },
  ],
};

const CTAS_PREDEFINIDOS = [
  "Agenda tu primera sesión",
  "Contáctame por WhatsApp",
  "Agenda tu cita hoy",
  "Llámame ahora",
  "Primera consulta gratis",
  "Solicita información",
];

function detectarEspecialidad(especialidad) {
  const e = (especialidad || "").toLowerCase().trim();
  if (e.includes("psic") || e.includes("terap")) return "psicologia";
  if (e.includes("nutri")) return "nutricion";
  if (e.includes("fisio") || e.includes("rehab") || e.includes("quiro") || e.includes("masaj")) return "fisioterapia";
  if (e.includes("altern") || e.includes("natur") || e.includes("homeo") || e.includes("acup")) return "alternativa";
  if (e.includes("dent") || e.includes("odont") || e.includes("ortod")) return "odontologia";
  if (e.includes("trauma") || e.includes("ortop")) return "traumatologia";
  return "psicologia";
}

export default function PostsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generando, setGenerando] = useState(false);

  const [temas, setTemas] = useState([]);
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [cta, setCta] = useState("Agenda tu primera sesión");
  const [ctaPersonalizado, setCtaPersonalizado] = useState(false);
  const [colorCta, setColorCta] = useState("#25D366");
  const [colorTextoCta, setColorTextoCta] = useState("#FFFFFF");
  const [layout, setLayout] = useState("foto-derecha");
  const [mostrarCta, setMostrarCta] = useState(true);
  const [mostrarDatos, setMostrarDatos] = useState(true);

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
      const clave = detectarEspecialidad(data.especialidad);
      const temasEsp = TEMAS_POR_ESPECIALIDAD[clave] || TEMAS_POR_ESPECIALIDAD.psicologia;
      setTemas(temasEsp);
      setTemaSeleccionado(temasEsp[0]);
      setTitulo(temasEsp[0].titulo);
      setSubtitulo(temasEsp[0].subtitulo);
      if (data.marca_color_primario) setColorCta(data.marca_color_primario);
      setLoading(false);
    }
    load();
  }, []);

  function seleccionarTema(tema) {
    setTemaSeleccionado(tema);
    setTitulo(tema.titulo);
    setSubtitulo(tema.subtitulo);
  }

  function buildUrl() {
    if (!doctor) return "";
    const params = new URLSearchParams({
      nombre: doctor.nombre || "",
      especialidad: doctor.especialidad || "",
      telefono: doctor.whatsapp || "",
      ciudad: doctor.ciudad || "",
      colorPrimario: doctor.marca_color_primario || "#0E7C7B",
      colorSecundario: doctor.marca_color_secundario || "#FFFFFF",
      colorCta,
      colorTextoCta,
      fotoUrl: doctor.marca_foto_url || "",
      logoUrl: doctor.marca_logo_url || "",
      titulo,
      subtitulo,
      cta: mostrarCta ? cta : "",
      mostrarDatos: mostrarDatos ? "1" : "0",
      layout,
    });
    return `/api/generar-post?${params.toString()}`;
  }

  async function handleDescargar() {
    setGenerando(true);
    try {
      const res = await fetch(buildUrl());
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `post-${temaSeleccionado?.id || "custom"}.png`;
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

  const layouts = [
    { id: "foto-derecha", label: "Foto derecha" },
    { id: "foto-fondo", label: "Foto de fondo" },
    { id: "solo-color", label: "Solo color" },
  ];

  function Toggle({ label, value, onChange }) {
    return (
      <div className="flex items-center justify-between">
        <p style={{ color: ink }} className="text-sm">{label}</p>
        <button
          onClick={() => onChange(!value)}
          style={{
            width: "44px", height: "24px", borderRadius: "12px",
            backgroundColor: value ? teal : border,
            position: "relative", transition: "background 0.2s",
            border: "none", cursor: "pointer", flexShrink: 0,
          }}
        >
          <span style={{
            position: "absolute", top: "3px",
            left: value ? "23px" : "3px",
            width: "18px", height: "18px",
            borderRadius: "50%", backgroundColor: "#fff",
            transition: "left 0.2s",
          }} />
        </button>
      </div>
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

      <div className="max-w-[1100px] mx-auto px-4 md:px-12 py-10">
        <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Kit de contenido</p>
        <h1 style={{ color: ink }} className="font-display font-bold text-2xl md:text-[28px] mb-1">Genera tu post</h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-10">Personaliza y descarga tu imagen lista para publicar en redes.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Panel izquierdo */}
          <div className="flex flex-col gap-5">

            {/* Tema */}
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <p style={{ color: ink }} className="font-display font-bold text-sm mb-3">Tema del post</p>
              <div className="grid grid-cols-2 gap-2">
                {temas.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => seleccionarTema(t)}
                    style={{
                      borderColor: temaSeleccionado?.id === t.id ? teal : border,
                      backgroundColor: temaSeleccionado?.id === t.id ? "#F4FAF9" : "#fff",
                      color: ink,
                    }}
                    className="border-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Texto */}
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <p style={{ color: ink }} className="font-display font-bold text-sm mb-3">Texto</p>
              <div className="flex flex-col gap-3">
                <div>
                  <p style={{ color: ink, opacity: 0.6 }} className="text-xs mb-1">Título</p>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    style={{ borderColor: border, color: ink }}
                    className="border rounded-xl px-3 py-2.5 text-sm w-full"
                  />
                </div>
                <div>
                  <p style={{ color: ink, opacity: 0.6 }} className="text-xs mb-1">Subtítulo</p>
                  <textarea
                    value={subtitulo}
                    onChange={(e) => setSubtitulo(e.target.value)}
                    rows={3}
                    style={{ borderColor: border, color: ink }}
                    className="border rounded-xl px-3 py-2.5 text-sm w-full resize-none"
                  />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <div className="mb-3">
                <Toggle label="Mostrar llamada a la acción" value={mostrarCta} onChange={setMostrarCta} />
              </div>
              {mostrarCta && (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {CTAS_PREDEFINIDOS.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCta(c); setCtaPersonalizado(false); }}
                        style={{
                          borderColor: cta === c && !ctaPersonalizado ? teal : border,
                          backgroundColor: cta === c && !ctaPersonalizado ? "#F4FAF9" : "#fff",
                          color: ink,
                        }}
                        className="border-2 rounded-xl px-3 py-2 text-xs text-left"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <div className="mb-3">
                    <p style={{ color: ink, opacity: 0.6 }} className="text-xs mb-1">O escribe el tuyo</p>
                    <input
                      type="text"
                      value={ctaPersonalizado ? cta : ""}
                      placeholder="Texto personalizado..."
                      onChange={(e) => { setCta(e.target.value); setCtaPersonalizado(true); }}
                      style={{ borderColor: border, color: ink }}
                      className="border rounded-xl px-3 py-2.5 text-sm w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p style={{ color: ink, opacity: 0.6 }} className="text-xs mb-1">Color del botón</p>
                      <div className="flex items-center gap-2">
                        <input type="color" value={colorCta} onChange={(e) => setColorCta(e.target.value)}
                          style={{ width: "36px", height: "36px", borderRadius: "8px", border: "none", cursor: "pointer" }} />
                        <input type="text" value={colorCta} onChange={(e) => setColorCta(e.target.value)}
                          style={{ borderColor: border, color: ink, fontFamily: "monospace" }}
                          className="border rounded-lg px-2 py-1.5 text-xs flex-1" />
                      </div>
                    </div>
                    <div>
                      <p style={{ color: ink, opacity: 0.6 }} className="text-xs mb-1">Color del texto</p>
                      <div className="flex items-center gap-2">
                        <input type="color" value={colorTextoCta} onChange={(e) => setColorTextoCta(e.target.value)}
                          style={{ width: "36px", height: "36px", borderRadius: "8px", border: "none", cursor: "pointer" }} />
                        <input type="text" value={colorTextoCta} onChange={(e) => setColorTextoCta(e.target.value)}
                          style={{ borderColor: border, color: ink, fontFamily: "monospace" }}
                          className="border rounded-lg px-2 py-1.5 text-xs flex-1" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Datos de contacto */}
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <Toggle label="Mostrar nombre y teléfono" value={mostrarDatos} onChange={setMostrarDatos} />
            </div>

            {/* Layout */}
            <div style={{ borderColor: border }} className="border rounded-2xl p-5">
              <p style={{ color: ink }} className="font-display font-bold text-sm mb-3">Diseño</p>
              <div className="grid grid-cols-3 gap-2">
                {layouts.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLayout(l.id)}
                    style={{
                      borderColor: layout === l.id ? teal : border,
                      backgroundColor: layout === l.id ? "#F4FAF9" : "#fff",
                      color: ink,
                    }}
                    className="border-2 rounded-xl px-3 py-2.5 text-xs font-medium"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Editar marca */}
            <div style={{ backgroundColor: surface, borderColor: border }} className="border rounded-2xl p-4 flex justify-between items-center">
              <p style={{ color: ink, opacity: 0.6 }} className="text-xs">¿Quieres cambiar logo, foto o colores?</p>
              <a href="/dashboard/marca" style={{ color: teal }} className="text-xs font-medium no-underline">Editar marca →</a>
            </div>
          </div>

          {/* Panel derecho — preview */}
          <div className="flex flex-col gap-4">
            <p style={{ color: ink }} className="font-display font-bold text-sm">Vista previa</p>
            <img
              key={buildUrl()}
              src={buildUrl()}
              alt="Preview post"
              style={{ width: "100%", borderRadius: "16px", border: `1px solid ${border}` }}
            />
            <p style={{ color: ink, opacity: 0.4 }} className="text-xs">1080×1080px · Lista para Instagram y Facebook</p>
            <button
              onClick={handleDescargar}
              disabled={generando}
              style={{ backgroundColor: teal, color: "#fff" }}
              className="rounded-xl px-8 py-4 text-sm font-medium disabled:opacity-50 w-full"
            >
              {generando ? "Generando..." : "⬇ Descargar PNG"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
