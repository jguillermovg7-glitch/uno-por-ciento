import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const doctorId = searchParams.get("state");
  const origin = new URL(request.url).origin;

  if (!code || !doctorId) {
    return NextResponse.redirect(`${origin}/dashboard/servicios?calendar=error`);
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${origin}/api/calendar-callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenRes.json();

    if (tokens.error) {
      console.error("Token error:", tokens);
      return NextResponse.redirect(`${origin}/dashboard/servicios?calendar=error`);
    }

    await supabaseAdmin
      .from("doctores")
      .update({
        google_calendar_refresh_token: tokens.refresh_token,
        google_calendar_access_token: tokens.access_token,
        google_calendar_connected: true,
      })
      .eq("id", doctorId);

    return NextResponse.redirect(`${origin}/dashboard/servicios?calendar=success`);
  } catch (err) {
    console.error("Calendar callback error:", err);
    return NextResponse.redirect(`${origin}/dashboard/servicios?calendar=error`);
  }
}
