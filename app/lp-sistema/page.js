import { readFileSync } from "fs";
import { join } from "path";

export const metadata = {
  title: "Uno por Ciento — Anuncios para tu consultorio, por suscripción",
  description: "Suscripción para médicos en México. La IA arma y ajusta tus anuncios en Google y Facebook todos los días. Desde $699 al mes, cancela en un clic.",
};

export default function LpSistema() {
  const html = readFileSync(join(process.cwd(), "public/lp-sistema.html"), "utf-8");
  const bodyContent = html.replace(/[\s\S]*<body[^>]*>([\s\S]*)<\/body>[\s\S]*/i, "$1");
  const styleContent = html.match(/<style>([\s\S]*?)<\/style>/i)?.[1] || "";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}
