import "./globals.css";

export const metadata = {
  verification: { google: "cdRfeeGl2DkogCL3T0o5CuCOaltir9HdivmNsBwfKKI" },
  title: "Uno por Ciento - Sitios web para doctores",
  description: "Sé parte del 1% de doctores que sí aparece en Google. Sitios web profesionales para doctores en 30 minutos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        {/* Google Ads / GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10827456865"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-10827456865');
          gtag('config', 'AW-18421386124');
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') { window.location = url; }
            };
            gtag('event', 'conversion', {'send_to': 'AW-10827456865/syOLCMarzKYDEOHC96oo', 'event_callback': callback});
            return false;
          }
          function gtag_report_conversion_compra(url, transactionId) {
            var callback = function () {
              if (typeof(url) != 'undefined') { window.location = url; }
            };
            gtag('event', 'conversion', {'send_to': 'AW-10827456865/D5UlCPb3ofIcEOHC96oo', 'transaction_id': transactionId || '', 'event_callback': callback});
            return false;
          }
        `}} />
        {/* Meta Pixel */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '636103248221169');
          fbq('track', 'PageView');
        `}} />
        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=636103248221169&ev=PageView&noscript=1" />
        </noscript>
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
