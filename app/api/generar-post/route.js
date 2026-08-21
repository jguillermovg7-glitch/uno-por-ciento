import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const nombre = searchParams.get("nombre") || "Dr. Ejemplo";
  const especialidad = searchParams.get("especialidad") || "Especialidad";
  const telefono = searchParams.get("telefono") || "000 000 0000";
  const ciudad = searchParams.get("ciudad") || "";
  const colorPrimario = searchParams.get("colorPrimario") || "#0E7C7B";
  const colorSecundario = searchParams.get("colorSecundario") || "#FFFFFF";
  const fotoUrl = searchParams.get("fotoUrl") || "";
  const logoUrl = searchParams.get("logoUrl") || "";
  const tema = searchParams.get("tema") || "ansiedad";

  const temas = {
    ansiedad: {
      titulo: "¿Sientes ansiedad constante?",
      subtitulo: "La ansiedad tiene solución. Con el acompañamiento correcto puedes recuperar tu calma.",
      cta: "Agenda tu primera sesión",
    },
    depresion: {
      titulo: "No tienes que cargarlo solo.",
      subtitulo: "La depresión es tratable. Da el primer paso y empieza a sentirte mejor.",
      cta: "Agenda tu primera sesión",
    },
    conoceme: {
      titulo: "Hola, soy tu especialista.",
      subtitulo: "Te acompaño en tu proceso con un enfoque profesional, humano y basado en evidencia.",
      cta: "Contáctame por WhatsApp",
    },
    servicios: {
      titulo: "¿En qué te puedo ayudar?",
      subtitulo: "Ofrezco atención personalizada adaptada a tus necesidades.",
      cta: "Agenda tu cita hoy",
    },
  };

  const contenido = temas[tema] || temas["ansiedad"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1080px",
          display: "flex",
          flexDirection: "row",
          backgroundColor: colorPrimario,
          fontFamily: "sans-serif",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Columna izquierda — contenido */}
        <div
          style={{
            width: "55%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 50px 60px 60px",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {logoUrl ? (
              <img
                src={logoUrl}
                style={{ height: "60px", objectFit: "contain" }}
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: colorSecundario, fontSize: "22px", fontWeight: "800" }}>
                  {nombre}
                </span>
                <span style={{ color: colorSecundario, fontSize: "14px", opacity: 0.7 }}>
                  {especialidad}
                </span>
              </div>
            )}
          </div>

          {/* Texto principal */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <span
              style={{
                color: colorSecundario,
                fontSize: "64px",
                fontWeight: "900",
                lineHeight: "1.1",
                letterSpacing: "-1px",
              }}
            >
              {contenido.titulo}
            </span>
            <span
              style={{
                color: colorSecundario,
                fontSize: "24px",
                lineHeight: "1.4",
                opacity: 0.85,
              }}
            >
              {contenido.subtitulo}
            </span>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* CTA WhatsApp */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "#25D366",
                borderRadius: "16px",
                padding: "16px 24px",
                width: "fit-content",
              }}
            >
              <span style={{ color: "#fff", fontSize: "20px", fontWeight: "700" }}>
                📱 {contenido.cta}
              </span>
            </div>

            {/* Nombre + teléfono */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: colorSecundario, fontSize: "20px", fontWeight: "700" }}>
                {nombre}
              </span>
              <span style={{ color: colorSecundario, fontSize: "18px", opacity: 0.7 }}>
                {especialidad} {ciudad ? `· ${ciudad}` : ""}
              </span>
              <span style={{ color: colorSecundario, fontSize: "22px", fontWeight: "800", marginTop: "4px" }}>
                📞 {telefono}
              </span>
            </div>
          </div>
        </div>

        {/* Columna derecha — foto */}
        <div
          style={{
            width: "45%",
            height: "100%",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {fotoUrl ? (
            <img
              src={fotoUrl}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: colorSecundario,
                opacity: 0.1,
              }}
            />
          )}
          {/* Gradiente sobre la foto */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "40%",
              height: "100%",
              background: `linear-gradient(to right, ${colorPrimario}, transparent)`,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  );
}
