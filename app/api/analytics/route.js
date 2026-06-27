import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

function getPrivateKey() {
  // Soporta tanto la clave en texto plano (con \n) como en base64
  const raw = process.env.GA4_PRIVATE_KEY;
  if (!raw) return undefined;

  if (raw.includes("BEGIN PRIVATE KEY")) {
    // Ya viene en texto plano, solo normalizamos los \n
    return raw.replace(/\\n/g, "\n");
  }
  // Viene en base64, la decodificamos
  return Buffer.from(raw, "base64").toString("utf-8");
}

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA4_CLIENT_EMAIL,
    private_key: getPrivateKey(),
  },
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId") || process.env.GA4_PROPERTY_ID;

    if (!propertyId) {
      return NextResponse.json({ error: "Falta propertyId" }, { status: 400 });
    }

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

    return NextResponse.json({
      activeUsers,
      pageViews,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}