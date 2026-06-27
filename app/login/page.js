"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("login");
  const [nextUrl, setNextUrl] = useState("/dashboard");

  const supabase = createClient();
  const searchParams = useSearchParams();

  useEffect(() => {
    const next = searchParams.get("next");
    if (next) setNextUrl(next);
  }, [searchParams]);

  async function handleGoogleLogin() {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${nextUrl}`,
      },
    });
    if (error) setError(error.message);
  }

  async function handleEmailAuth(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Correo o contraseña incorrectos.");
      } else {
        window.location.href = nextUrl;
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}${nextUrl}` },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Cuenta creada. Revisa tu correo para confirmar.");
      }
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
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h1>
          <p style={{ color: "#0B1418", opacity: 0.6 }} className="text-sm text-center mb-6">
            {mode === "login" ? "Accede a tu panel de doctor" : "Empieza a usar tu plataforma"}
          </p>

          <button
            onClick={handleGoogleLogin}
            style={{ borderColor: "#D8E3E1", color: "#0B1418" }}
            className="w-full border rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-2 mb-4 hover:bg-[#EDF2F1] transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div style={{ backgroundColor: "#D8E3E1" }} className="flex-1 h-px"></div>
            <span style={{ color: "#0B1418", opacity: 0.4 }} className="text-xs">o</span>
            <div style={{ backgroundColor: "#D8E3E1" }} className="flex-1 h-px"></div>
          </div>

          <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: "#D8E3E1", color: "#0B1418", backgroundColor: "#FFFFFF" }}
              className="border rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0E7C7B]"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
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
              {loading ? "Cargando..." : mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          </form>

          <p style={{ color: "#0B1418", opacity: 0.6 }} className="text-center text-[13px] mt-5">
            {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }}
              style={{ color: "#0E7C7B" }}
              className="font-medium underline"
            >
              {mode === "login" ? "Crear una" : "Iniciar sesión"}
            </button>
          </p>
        </div>

        <p style={{ color: "#0B1418", opacity: 0.4 }} className="text-center text-xs mt-6">
          <a href="/" className="underline">← Volver al inicio</a>
        </p>
      </div>
    </main>
  );
}