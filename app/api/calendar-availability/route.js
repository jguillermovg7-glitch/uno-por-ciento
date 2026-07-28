import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function refreshAccessToken(refreshToken) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  return res.json();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get("doctorId");
  const fecha = searchParams.get("fecha");

  const { data: doctor } = await supabaseAdmin
    .from("doctores")
    .select("google_calendar_refresh_token")
    .eq("id", doctorId)
    .single();

  const tokens = await refreshAccessToken(doctor.google_calendar_refresh_token);

  // Esto aparecerá en Vercel Logs
  console.log("TOKEN RESPONSE:", JSON.stringify(tokens));

  return NextResponse.json({ debug: tokens });
}