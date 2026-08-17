"use client";
import { useState, useEffect, Suspense } from "react";
import { createClient } from "../../lib/supabaseClient";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError("No se pudo actualizar la contraseña. El enlace puede haber expirado.");
    } else {
      setMessage("Contraseña actualizada. Redirigiendo...");
      setTimeout(() => { window.location.href = "/dashboard"; }, 2000);
    }
    setLoading(false);
  }

  return (
    <main style={{ backgroundColor: "#FFFFFF", color: "#0B1418" }} className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="flex items-center justify-center mb-10">
          <img src="/logo-uno.png" alt="Uno por Ciento" style={{ height: "32px", width: "auto" }} />
        </div>
        <div style={{ borderColor: "#D8E3E1", backgroundColor: "#FFFFFF" }} className="border rounded-2xl p-7">
          <h1 style={{ color: "#0B1418" }} className="font-display font-bold text-2xl mb-1 text-center">
            Nueva contraseña
          </h1>
          <p style={{ color: "#0B1418", opacity: 0.6 }} className="text-sm text-center mb-6">
            Elige una contraseña segura
          </p>
          {!ready && !message && (
            <p style={{ color: "#0B1418", opacity: 0.5 }} className="text-sm text-center">
              Verificando enlace...
            </p>
          )}
          {ready && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={{ borderColor: "#D8E3E1", color: "#0B1418", backgroundColor: "#FFFFFF" }}
                className="border rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0E7C7B]"
              />
              {error && <p style={{ color: "#D85A30" }} className="text-[13px]">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#0B1418", color: "#FFFFFF" }}
                className="rounded-lg py-3 text-sm font-medium mt-1 disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Guardar contraseña"}
              </button>
            </form>
          )}
          {message && <p style={{ color: "#1D9E75" }} className="text-[13px] text-center mt-3">{message}</p>}
        </div>
        <p style={{ color: "#0B1418", opacity: 0.4 }} className="text-center text-xs mt-6">
          <a href="/login" className="underline">← Volver al inicio de sesión</a>
        </p>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <main style={{ backgroundColor: "#FFFFFF" }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: "#0B1418" }}>Cargando...</p>
      </main>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
