"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

export default function PagoPage() {
  const router = useRouter();
  const supabase = createClient();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

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
        router.push("/onboarding");
        return;
      }
      setDoctor(data);
      setLoading(false);
    }
    load();
  }, []);

  async function handlePago() {
    setProcessing(true);
    setError("");

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: doctor.plan,
          email: doctor.email,
          userId: doctor.user_id,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Error al procesar el pago");
        setProcessing(false);
      }
    } catch (err) {
      setError("Error de conexión. Intenta de nuevo.");
      setProcessing(false);
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

  const isPlanSitio = doctor.plan === "sitio";

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen px-4 flex items-center justify-center">
      <div className="max-w-[440px] w-full">
        <div className="flex items-center justify-center mb-8">
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "28px", width: "auto" }} />
        </div>

        <div style={{ borderColor: border }} className="border rounded-2xl p-7">
          <p style={{ color: teal }} className="font-mono text-[13px] mb-2">Confirmar pago</p>
          <h1 style={{ color: ink }} className="font-display font-bold text-xl mb-6">
            {isPlanSitio ? "Sitio web profesional" : "Campaña de captación"}
          </h1>

          <div className="flex flex-col gap-3 mb-6">
            {isPlanSitio ? (
              <>
                <div className="flex justify-between items-center">
                  <span style={{ color: ink, opacity: 0.7 }} className="text-sm">Dominio (pago único)</span>
                  <span style={{ color: ink }} className="font-mono text-sm font-bold">$300 MXN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: ink, opacity: 0.7 }} className="text-sm">Mantenimiento mensual</span>
                  <span style={{ color: ink }} className="font-mono text-sm font-bold">$600 MXN/mes</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span style={{ color: ink, opacity: 0.7 }} className="text-sm">Campaña de captación</span>
                <span style={{ color: ink }} className="font-mono text-sm font-bold">$600 MXN/mes</span>
              </div>
            )}
          </div>

          <div style={{ borderColor: border }} className="border-t pt-4 mb-6">
            <p style={{ color: ink, opacity: 0.5 }} className="text-xs">
              Se te cobrará hoy{isPlanSitio ? " $900 MXN ($300 dominio + $600 primer mes)" : " $600 MXN"} y después $600 MXN cada mes. Puedes cancelar cuando quieras.
            </p>
          </div>

          {error && <p style={{ color: "#D85A30" }} className="text-[13px] mb-4">{error}</p>}

          <button
            onClick={handlePago}
            disabled={processing}
            style={{ backgroundColor: ink, color: "#fff" }}
            className="w-full rounded-lg py-3.5 text-sm font-medium disabled:opacity-50"
          >
            {processing ? "Redirigiendo..." : "Pagar de forma segura →"}
          </button>

          <p style={{ color: ink, opacity: 0.4 }} className="text-center text-xs mt-4">
            Pago procesado de forma segura por Stripe
          </p>
        </div>
      </div>
    </main>
  );
}
