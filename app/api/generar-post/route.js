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
  const colorCta = searchParams.get("colorCta") || "#25D366";
  const colorTextoCta = searchParams.get("colorTextoCta") || "#FFFFFF";
  const fotoUrl = searchParams.get("fotoUrl") || "";
  const logoUrl = searchParams.get("logoUrl") || "";
  const titulo = searchParams.get("titulo") || "¿En qué te puedo ayudar?";
  const subtitulo = searchParams.get("subtitulo") || "Atención profesional y personalizada para ti.";
  const cta = searchParams.get("cta") || "";
  const mostrarDatos = searchParams.get("mostrarDatos") !== "0";
  const layout = searchParams.get("layout") || "foto-derecha";

  const FooterDatos = () => mostrarDatos ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ color: colorSecundario, fontSize: "18px", fontWeight: "700" }}>{nombre}</span>
      <span style={{ color: colorSecundario, fontSize: "16px", opacity: 0.7 }}>{especialidad}{ciudad ? ` · ${ciudad}` : ""}</span>
      <span style={{ color: colorSecundario, fontSize: "20px", fontWeight: "800", marginTop: "4px" }}>📞 {telefono}</span>
    </div>
  ) : null;

  const CtaButton = () => cta ? (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: colorCta, borderRadius: "16px", padding: "16px 24px", width: "fit-content" }}>
      <span style={{ color: colorTextoCta, fontSize: "20px", fontWeight: "700" }}>📱 {cta}</span>
    </div>
  ) : null;

  if (layout === "foto-fondo") {
    return new ImageResponse(
      (
        <div style={{ width: "1080px", height: "1080px", display: "flex", position: "relative", overflow: "hidden" }}>
          {fotoUrl && <img src={fotoUrl} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />}
          <div style={{ position: "absolute", width: "100%", height: "100%", background: `linear-gradient(135deg, ${colorPrimario}ee 0%, ${colorPrimario}99 60%, transparent 100%)` }} />
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px" }}>
            <div style={{ display: "flex" }}>
              {logoUrl ? <img src={logoUrl} style={{ height: "60px", objectFit: "contain" }} /> : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ color: colorSecundario, fontSize: "22px", fontWeight: "800" }}>{nombre}</span>
                  <span style={{ color: colorSecundario, fontSize: "14px", opacity: 0.8 }}>{especialidad}</span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "640px" }}>
              <span style={{ color: colorSecundario, fontSize: "72px", fontWeight: "900", lineHeight: "1.05", letterSpacing: "-2px" }}>{titulo}</span>
              <span style={{ color: colorSecundario, fontSize: "26px", lineHeight: "1.4", opacity: 0.9 }}>{subtitulo}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <CtaButton />
                <FooterDatos />
              </div>
            </div>
          </div>
        </div>
      ),
      { width: 1080, height: 1080 }
    );
  }

  if (layout === "solo-color") {
    return new ImageResponse(
      (
        <div style={{ width: "1080px", height: "1080px", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: colorPrimario, padding: "70px" }}>
          <div style={{ display: "flex" }}>
            {logoUrl ? <img src={logoUrl} style={{ height: "60px", objectFit: "contain" }} /> : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: colorSecundario, fontSize: "22px", fontWeight: "800" }}>{nombre}</span>
                <span style={{ color: colorSecundario, fontSize: "14px", opacity: 0.8 }}>{especialidad}</span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{ width: "80px", height: "6px", backgroundColor: colorCta, borderRadius: "3px" }} />
            <span style={{ color: colorSecundario, fontSize: "80px", fontWeight: "900", lineHeight: "1.05", letterSpacing: "-2px" }}>{titulo}</span>
            <span style={{ color: colorSecundario, fontSize: "28px", lineHeight: "1.4", opacity: 0.85 }}>{subtitulo}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <CtaButton />
            <FooterDatos />
          </div>
        </div>
      ),
      { width: 1080, height: 1080 }
    );
  }

  return new ImageResponse(
    (
      <div style={{ width: "1080px", height: "1080px", display: "flex", flexDirection: "row", backgroundColor: colorPrimario, overflow: "hidden" }}>
        <div style={{ width: "55%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 50px 60px 60px" }}>
          <div style={{ display: "flex" }}>
            {logoUrl ? <img src={logoUrl} style={{ height: "60px", objectFit: "contain" }} /> : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: colorSecundario, fontSize: "22px", fontWeight: "800" }}>{nombre}</span>
                <span style={{ color: colorSecundario, fontSize: "14px", opacity: 0.8 }}>{especialidad}</span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <span style={{ color: colorSecundario, fontSize: "64px", fontWeight: "900", lineHeight: "1.1", letterSpacing: "-1px" }}>{titulo}</span>
            <span style={{ color: colorSecundario, fontSize: "24px", lineHeight: "1.4", opacity: 0.85 }}>{subtitulo}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <CtaButton />
            <FooterDatos />
          </div>
        </div>
        <div style={{ width: "45%", height: "100%", display: "flex", position: "relative", overflow: "hidden" }}>
          {fotoUrl ? (
            <img src={fotoUrl} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", backgroundColor: colorSecundario, opacity: 0.1 }} />
          )}
          <div style={{ position: "absolute", left: 0, top: 0, width: "40%", height: "100%", background: `linear-gradient(to right, ${colorPrimario}, transparent)` }} />
        </div>
      </div>
    ),
    { width: 1080, height: 1080 }
  );
}
