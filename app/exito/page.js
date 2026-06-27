"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExitoPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          router.push("/dashboard");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
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
        <p style={{ color: ink, opacity: 0.6 }} className="text-sm mb-8">
          Estamos preparando todo. En breve tu sitio estará publicado y funcionando.
        </p>

        <p style={{ color: ink, opacity: 0.4 }} className="text-xs">
          Redirigiendo a tu panel en {countdown}...
        </p>
      </div>
    </main>
  );
}
