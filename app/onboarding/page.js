"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [plan, setPlan] = useState("sitio");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    especialidad: "",
    servicios: "",
    sintomas: "",
    frase: "",
    ciudad: "",
    direccion: "",
    whatsapp: "",
    horario: "",
    diferenciador: "",
    experiencia: "",
    instagram: "",
    facebook: "",
    presupuesto_ads: "100",
  });

  useEffect(() => {
    const savedPlan = localStorage.getItem("plan_seleccionado") || "sitio";
    setPlan(savedPlan);

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/login?next=/onboarding");
        return;
      }

      // Checa si ya tiene registro en doctores
      const { data: doctor } = await supabase
        .from("doctores")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      if (doctor) {
        // Ya existe — es EDICIÓN
        setIsEditing(true);
        setPlan(doctor.plan);
        setForm({
          nombre: doctor.nombre || "",
          especialidad: doctor.especialidad || "",
          servicios: doctor.servicios || "",
          sintomas: doctor.sintomas || "",
          frase: doctor.frase || "",
          ciudad: doctor.ciudad || "",
          direccion: doctor.direccion || "",
          whatsapp: doctor.whatsapp || "",
          horario: doctor.horario || "",
          diferenciador: doctor.diferenciador || "",
          experiencia: doctor.experiencia || "",
          instagram: doctor.instagram || "",
          facebook: doctor.facebook || "",
          presupuesto_ads: doctor.presupuesto_ads || "100",
        });
      }

      setUser(data.user);
      setLoading(false);
    });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from("doctores").upsert({
      user_id: user.id,
      email: user.email,
      plan: plan,
      ...form,
      estado: "formulario_completo",
    }, { onConflict: "user_id" });

    setSaving(false);

    if (error) {
      alert("Hubo un error al guardar: " + error.message);
      return;
    }

    const planesLandingB = ["starter", "pro", "superior"];

    if (planesLandingB.includes(plan)) {
      try {
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan, email: user.email, userId: user.id }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert("Error al crear la sesión de pago.");
        }
      } catch (e) {
        alert("Error de conexión al iniciar el pago.");
      }
    } else {
      router.push("/preview");
    }
  }

  const ink = "#0B1418";
  const teal = "#0E7C7B";
  const border = "#D8E3E1";

  if (loading) {
    return (
      <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: ink }}>Cargando...</p>
      </main>
    );
  }

  const inputStyle = { borderColor: border, color: ink, backgroundColor: "#FFFFFF" };
  const labelStyle = { color: ink };

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen px-4 md:px-12 py-12">
      <div className="max-w-[640px] mx-auto">
        <div className="flex items-center justify-center mb-8">
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "28px", width: "auto" }} />
        </div>

        <p style={{ color: teal }} className="font-mono text-[13px] text-center mb-2">
          Plan: {
            plan === "sitio" ? "Sitio web profesional" :
            plan === "combo" ? "Sitio + Campaña" :
            plan === "campana" ? "Campaña de captación" :
            plan === "starter" ? "Campaña en Facebook Ads" :
            plan === "pro" ? "Google Ads + Landing" :
            plan === "superior" ? "Plan Superior" :
            "Tu plan"
          }
        </p>
        <h1 style={{ color: ink }} className="font-display font-bold text-2xl md:text-[28px] text-center mb-2">
          {isEditing ? "Edita tu información" : "Cuéntanos sobre ti"}
        </h1>
        <p style={{ color: ink, opacity: 0.6 }} className="text-center text-sm mb-10">
          {isEditing 
            ? "Actualiza los datos que necesites cambiar."
            : `Con esto armamos tu ${plan === "sitio" ? "sitio" : plan === "combo" ? "sitio y campaña" : "campaña"}. Tarda menos de 5 minutos.`
          }
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div>
            <p style={labelStyle} className="font-display font-bold text-sm mb-3">Información básica</p>
            <div className="flex flex-col gap-3">
              <input name="nombre" required placeholder="Nombre completo (ej. Dra. Nancy Moreno)" value={form.nombre} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
              <input name="especialidad" required placeholder="Especialidad (ej. Neuróloga)" value={form.especialidad} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
              <textarea name="servicios" required placeholder="¿Qué servicios ofreces?" value={form.servicios} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none min-h-[80px]" />
              <textarea name="sintomas" required placeholder="¿Por qué problemas o síntomas te buscan los pacientes?" value={form.sintomas} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none min-h-[80px]" />
              <input name="frase" placeholder="Tu frase o lema personal (opcional)" value={form.frase} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
            </div>
          </div>

          <div>
            <p style={labelStyle} className="font-display font-bold text-sm mb-3">Ubicación y contacto</p>
            <div className="flex flex-col gap-3">
              <input name="ciudad" required placeholder="Ciudad y estado" value={form.ciudad} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
              <input name="direccion" placeholder="Dirección del consultorio" value={form.direccion} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
              <input name="whatsapp" required placeholder="WhatsApp (ej. 4441234567)" value={form.whatsapp} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
              <input name="horario" placeholder="Horario de atención" value={form.horario} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
            </div>
          </div>

          <div>
            <p style={labelStyle} className="font-display font-bold text-sm mb-3">Credibilidad</p>
            <div className="flex flex-col gap-3">
              <textarea name="diferenciador" placeholder="¿Por qué te eligen a ti y no a otro doctor?" value={form.diferenciador} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none min-h-[80px]" />
              <input name="experiencia" placeholder="Años de experiencia o formación" value={form.experiencia} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
            </div>
          </div>

          <div>
            <p style={labelStyle} className="font-display font-bold text-sm mb-3">Redes (opcional)</p>
            <div className="flex flex-col gap-3">
              <input name="instagram" placeholder="Instagram" value={form.instagram} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
              <input name="facebook" placeholder="Facebook" value={form.facebook} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
            </div>
          </div>

          {(plan === "campana" || plan === "combo" || plan === "starter" || plan === "pro") && (
            <div>
              <p style={labelStyle} className="font-display font-bold text-sm mb-3">Presupuesto de publicidad</p>
              <input name="presupuesto_ads" type="number" placeholder="Presupuesto diario en pesos" value={form.presupuesto_ads} onChange={handleChange} style={inputStyle} className="border rounded-lg px-4 py-3 text-sm outline-none" />
              <p style={{ color: ink, opacity: 0.5 }} className="text-xs mt-1.5">Recomendamos mínimo $100/día. Este dinero va directo a Meta/Google, no a nosotros.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{ backgroundColor: ink, color: "#fff" }}
            className="rounded-lg py-3.5 text-sm font-medium disabled:opacity-50 mt-2"
          >
            {saving ? "Guardando..." : isEditing ? "Guardar cambios →" : "Continuar →"}
          </button>
        </form>
      </div>
    </main>
  );
}
