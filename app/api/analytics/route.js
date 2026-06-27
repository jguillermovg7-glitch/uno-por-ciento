import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA4_CLIENT_EMAIL,
    private_key: process.env.GA4_PRIVATE_KEY,
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
