import { readFileSync } from "fs";
import { join } from "path";

export const metadata = {
  title: "1% — Consigue pacientes nuevos sin pagar anuncios",
  description: "1% conecta tu perfil de Google Business y una IA se encarga de tus reseñas, tus publicaciones y tus preguntas todos los días. No es una agencia. Desde $599 al mes en México.",
};

export default function LpBusiness() {
  const html = readFileSync(join(process.cwd(), "public/lp-business.html"), "utf-8");
  const bodyContent = html.replace(/[\s\S]*<body[^>]*>([\s\S]*)<\/body>[\s\S]*/i, "$1");
  const styleContent = html.match(/<style>([\s\S]*?)<\/style>/i)?.[1] || "";
  const schemaBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => m[1]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
      {schemaBlocks.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}
