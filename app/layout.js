import "./globals.css";

export const metadata = {
  title: "Uno por Ciento - Sitios web para doctores",
  description: "Sé parte del 1% de doctores que sí aparece en Google. Sitios web profesionales para doctores en 30 minutos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
     <head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}