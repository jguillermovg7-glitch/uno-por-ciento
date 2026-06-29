import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function POST(request) {
  try {
    const { doctorId, servicioId, fechaHoraInicio, pacienteNombre, pacienteTelefono } = await request.json();

    if (!doctorId || !servicioId || !fechaHoraInicio || !pacienteNombre || !pacienteTelefono) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const { data: doctor } = await supabaseAdmin
      .from("doctores")
      .select("google_calendar_refresh_token, nombre, email")
      .eq("id", doctorId)
      .single();

    const { data: servicio } = await supabaseAdmin
      .from("servicios")
      .select("*")
      .eq("id", servicioId)
      .single();

    if (!doctor?.google_calendar_refresh_token || !servicio) {
      return NextResponse.json({ error: "Datos no encontrados" }, { status: 400 });
    }

    const tokens = await refreshAccessToken(doctor.google_calendar_refresh_token);

    if (tokens.error) {
      return NextResponse.json({ error: "Error renovando token" }, { status: 500 });
    }

    const startDate = new Date(fechaHoraInicio);
    const endDate = new Date(startDate.getTime() + servicio.duracion_minutos * 60000);

    const eventRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: `${servicio.nombre} - ${pacienteNombre}`,
        description: `Servicio: ${servicio.nombre}\nPaciente: ${pacienteNombre}\nTeléfono: ${pacienteTelefono}\nAgendado vía Uno por Ciento`,
        start: { dateTime: startDate.toISOString(), timeZone: "America/Mexico_City" },
        end: { dateTime: endDate.toISOString(), timeZone: "America/Mexico_City" },
      }),
    });

    const eventData = await eventRes.json();

    if (eventData.error) {
      console.error("Event creation error:", eventData);
      return NextResponse.json({ error: "No se pudo crear la cita" }, { status: 500 });
    }

    await supabaseAdmin.from("citas").insert({
      doctor_id: doctorId,
      servicio_id: servicioId,
      paciente_nombre: pacienteNombre,
      paciente_telefono: pacienteTelefono,
      fecha_hora: startDate.toISOString(),
      google_event_id: eventData.id,
    });

    // Enviar notificación por correo al doctor (no bloqueante)
    const fechaFormateada = startDate.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
    const horaFormateada = startDate.toLocaleTimeString("es-MX", { hour: "numeric", minute: "2-digit", hour12: true });

    if (doctor.email) {
      try {
        await resend.emails.send({
          from: "Uno por Ciento <onboarding@resend.dev>",
          to: doctor.email,
          subject: `Nueva cita agendada: ${pacienteNombre}`,
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
              <h2 style="color: #0B1418;">Te acaban de agendar una cita 🎉</h2>
              <p style="color: #444; font-size: 15px;">
                <strong>${pacienteNombre}</strong> agendó <strong>${servicio.nombre}</strong> para el ${fechaFormateada} a las ${horaFormateada}.
              </p>
              <p style="color: #444; font-size: 15px;">Teléfono de contacto: ${pacienteTelefono}</p>
              <p style="color: #888; font-size: 13px; margin-top: 24px;">La cita ya quedó agregada a tu Google Calendar automáticamente.</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true, eventId: eventData.id });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}