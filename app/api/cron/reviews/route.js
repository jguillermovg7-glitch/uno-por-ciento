import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

async function googleToken() {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_AGENCY_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("No se pudo renovar el token de Google");
  return j.access_token;
}

async function redactarRespuesta(loc, stars, comment) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-5-5",
      max_tokens: 250,
      system: `Respondes reseñas de Google en nombre de ${loc.doctor_name} (${loc.specialty}). Tono: ${loc.tone}. Español de México, 2 a 3 frases, sin emojis. Nunca confirmes que la persona fue paciente ni menciones datos de salud. Si es una queja, agradece e invita a contactar por privado. Responde solo con el texto de la respuesta.`,
      messages: [{ role: "user", content: `${stars} estrellas. Reseña: ${comment || "(sin texto)"}` }],
    }),
  });
  const j = await r.json();
  return j.content?.[0]?.text?.trim() || null;
}

export async function GET(request) {
  if (!process.env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }

  const resumen = { revisadas: 0, publicadas: 0, borradores: 0, errores: 0 };

  try {
    const token = await googleToken();
    const h = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
    const { data: locs } = await supabaseAdmin.from("gbp_locations").select("*").eq("active", true);

    for (const loc of locs || []) {
      const base = `https://mybusiness.googleapis.com/v4/${loc.account_id}/${loc.location_id}/reviews`;
      const res = await fetch(`${base}?pageSize=20`, { headers: h });
      if (!res.ok) { resumen.errores++; continue; }
      const { reviews = [] } = await res.json();

      for (const rv of reviews) {
        if (rv.reviewReply) continue;
        const { data: seen } = await supabaseAdmin
          .from("gbp_reviews").select("review_id").eq("review_id", rv.reviewId).maybeSingle();
        if (seen) continue;
        resumen.revisadas++;

        const stars = STARS[rv.starRating] || 0;
        const reply = await redactarRespuesta(loc, stars, rv.comment);
        let status = "needs_approval";

        if (!reply) {
          status = "error";
        } else if (stars >= loc.auto_publish_min_stars) {
          const put = await fetch(`${base}/${rv.reviewId}/reply`, {
            method: "PUT", headers: h, body: JSON.stringify({ comment: reply }),
          });
          status = put.ok ? "published" : "error";
        }

        if (status === "published") resumen.publicadas++;
        else if (status === "needs_approval") resumen.borradores++;
        else resumen.errores++;

        await supabaseAdmin.from("gbp_reviews").insert({
          review_id: rv.reviewId, location_uuid: loc.id, stars,
          reviewer: rv.reviewer?.displayName, comment: rv.comment,
          review_created_at: rv.createTime, reply_draft: reply, status,
          published_at: status === "published" ? new Date().toISOString() : null,
        });
      }
    }
  } catch (e) {
    return NextResponse.json({ error: e.message, resumen }, { status: 500 });
  }

  return NextResponse.json({ ok: true, resumen });
}
