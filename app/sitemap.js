export default function sitemap() {
  const base = "https://www.unorporciento.com";
  const lastModified = new Date();
  return ["", "/marketing-para-doctores", "/marketing-para/dentistas", "/marketing-para/psicologos", "/planes-b", "/privacidad", "/terminos"].map((path) => ({
    url: base + path,
    lastModified,
  }));
}
