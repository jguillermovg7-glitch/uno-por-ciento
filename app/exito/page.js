"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

function ExitoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [status, setStatus] = useState("procesando"); // procesando | listo | error

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18421386124/8qGzCNGYo_IcEIyXgNBE',
        'transaction_id': sessionId || '',
      });
    }
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq('track', 'Purchase', {}, { eventID: sessionId || undefined });
    }

    async function completarAcceso() {
      // Si ya hay sesión (flujo viejo: login antes de pagar), no hace falta nada más.
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setStatus("listo");
        router.push("/dashboard");
        return;
      }

      if (!sessionId) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch("/api/auto-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          return;
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash: data.hashed_token,
          type: "magiclink",
        });

        if (error) {
          console.error("Error iniciando sesión automática:", error.message);
          setStatus("error");
          return;
        }

        setStatus("listo");
        router.push("/onboarding");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    }

    completarAcceso();
  }, []);

  const ink = "#0B1418";
  const live = "#3DDC84";

  return (
    <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[440px] w-full text-center">
        <div className="flex items-center justify-center mb-8">
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "28px", width: "auto" }} />
        </div>

        <div style={{ backgroundColor: live }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <span style={{ color: ink }} className="text-3xl">✓</span>
        </div>

        <h1 style={{ color: ink }} className="font-display font-bold text-2xl mb-3">
          ¡Pago confirmado!
        </h1>

        {status === "procesando" && (
          <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-8">
            Estamos preparando tu cuenta. Un momento...
          </p>
        )}
        {status === "error" && (
          <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-8">
            Tu pago se procesó, pero hubo un problema al preparar tu acceso.
            Escríbenos por WhatsApp y te ayudamos al instante.
          </p>
        )}
      </div>
    </main>
  );
}

export default function ExitoPage() {
  return (
    <Suspense fallback={null}>
      <ExitoContent />
    </Suspense>
  );
}
