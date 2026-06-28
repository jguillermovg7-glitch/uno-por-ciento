import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

function getPrivateKey() {
  let raw = process.env.GA4_PRIVATE_KEY || "";

  // Si viene en base64 (no contiene el header PEM), decodificar primero
  if (!raw.includes("BEGIN PRIVATE KEY")) {
    raw = Buffer.from(raw, "base64").toString("utf-8");
  }

  // Limpieza agresiva de caracteres problemáticos
  raw = raw.replace(/\\n/g, "\n"); // \n literal -> salto de línea real
  raw = raw.replace(/\r\n/g, "\n"); // CRLF -> LF
  raw = raw.replace(/\r/g, ""); // eliminar CR sueltos
  raw = raw.trim(); // espacios al inicio/final
  raw = raw + "\n"; // asegurar salto de línea final

  return raw;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId") || process.env.GA4_PROPERTY_ID;

    if (!propertyId) {
      return NextResponse.json({ error: "Falta propertyId" }, { status: 400 });
    }

    const privateKey = getPrivateKey();

    // Debug: confirmar estructura sin exponer la clave completa
    const debugInfo = {
      startsCorrect: privateKey.startsWith("-----BEGIN PRIVATE KEY-----"),
      endsCorrect: privateKey.trim().endsWith("-----END PRIVATE KEY-----"),
      length: privateKey.length,
      lineCount: privateKey.split("\n").length,
    };

    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GA4_CLIENT_EMAIL,
        private_key: privateKey,
      },
    });

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
      ],
    });

    const row = response.rows?.[0];
    const activeUsers = row ? parseInt(row.metricValues[0].value) : 0;
    const pageViews = row ? parseInt(row.metricValues[1].value) : 0;

    return NextResponse.json({ activeUsers, pageViews });
  } catch (err) {
    console.error("Analytics error:", err);
    const privateKey = getPrivateKey();
    return NextResponse.json({
      error: err.message,
      debug: {
        startsCorrect: privateKey.startsWith("-----BEGIN PRIVATE KEY-----"),
        endsCorrect: privateKey.trim().endsWith("-----END PRIVATE KEY-----"),
        length: privateKey.length,
        lineCount: privateKey.split("\n").length,
      }
    }, { status: 500 });
  }
}