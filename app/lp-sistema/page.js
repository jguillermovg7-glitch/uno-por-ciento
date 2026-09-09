import fs from "fs";
import path from "path";

export const metadata = {
  title: "Uno por Ciento — Anuncios para tu consultorio, por suscripción",
  description: "Suscripción para médicos en México. La IA arma y ajusta tus anuncios en Google y Facebook todos los días. Desde $699 al mes, cancela en un clic.",
};

export default function LpSistema() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "app/lp-sistema/page.html"),
    "utf-8"
  );
  // Extraer solo el body para evitar conflictos con el layout de Next.js
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: html.match(/<style>([\s\S]*?)<\/style>/)?.[1] || "" }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
