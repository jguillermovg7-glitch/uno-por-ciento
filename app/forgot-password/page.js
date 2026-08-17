"use client";
import { useState } from "react";
import { createClient } from "../../lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError("No se pudo enviar el correo. Verifica que el email sea correcto.");
    } else {
      setMessage("Te enviamos un enlace para restablecer tu contraseña. Revisa tu correo.");
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
            Restablecer contraseña
          </h1>
          <p style={{ color: "#0B1418", opacity: 0.6 }} className="text-sm text-center mb-6">
            Te enviamos un enlace a tu correo
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: "#D8E3E1", color: "#0B1418", backgroundColor: "#FFFFFF" }}
              className="border rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0E7C7B]"
            />
            {error && <p style={{ color: "#D85A30" }} className="text-[13px]">{error}</p>}
            {message && <p style={{ color: "#1D9E75" }} className="text-[13px]">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#0B1418", color: "#FFFFFF" }}
              className="rounded-lg py-3 text-sm font-medium mt-1 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>
        </div>
        <p style={{ color: "#0B1418", opacity: 0.4 }} className="text-center text-xs mt-6">
          <a href="/login" className="underline">← Volver al inicio de sesión</a>
        </p>
      </div>
    </main>
  );
}
