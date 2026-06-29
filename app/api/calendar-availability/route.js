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
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");
    const fecha = searchParams.get("fecha"); // formato YYYY-MM-DD

    if (!doctorId || !fecha) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const { data: doctor } = await supabaseAdmin
      .from("doctores")
      .select("google_calendar_refresh_token, horario")
      .eq("id", doctorId)
      .single();

    if (!doctor?.google_calendar_refresh_token) {
      return NextResponse.json({ error: "Doctor no tiene Calendar conectado" }, { status: 400 });
    }

    const tokens = await refreshAccessToken(doctor.google_calendar_refresh_token);

    if (tokens.error) {
      return NextResponse.json({ error: "Error renovando token" }, { status: 500 });
    }

    // Horario de trabajo: 9am a 6pm por defecto
    const timeMin = `${fecha}T09:00:00-06:00`;
    const timeMax = `${fecha}T18:00:00-06:00`;

    const freeBusyRes = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin,
        timeMax,
        items: [{ id: "primary" }],
      }),
    });

    const freeBusyData = await freeBusyRes.json();
    const busySlots = freeBusyData.calendars?.primary?.busy || [];

    // Generar slots de 30 minutos entre 9am y 6pm, excluyendo los ocupados
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const slotStart = new Date(`${fecha}T${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:00-06:00`);
        const slotEnd = new Date(slotStart.getTime() + 30 * 60000);

        const isBusy = busySlots.some(busy => {
          const busyStart = new Date(busy.start);
          const busyEnd = new Date(busy.end);
          return slotStart < busyEnd && slotEnd > busyStart;
        });

        if (!isBusy && slotStart > new Date()) {
          slots.push(slotStart.toISOString());
        }
      }
    }

    return NextResponse.json({ slots });
  } catch (err) {
    console.error("Availability error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
