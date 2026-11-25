export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin", "/dashboard", "/onboarding", "/pago", "/preview", "/login", "/forgot-password", "/reset-password"],
      },
    ],
    sitemap: "https://www.unorporciento.com/sitemap.xml",
  };
}
