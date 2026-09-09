import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { sessionId } = await request.json();
    if (!sessionId) {
      return NextResponse.json({ error: "Falta sessionId" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const email = session.customer_details?.email || session.customer_email;
    if (!email) {
      return NextResponse.json({ error: "No se encontró el correo del pago" }, { status: 400 });
    }

    // Puede llegar antes de que el webhook haya creado la cuenta — reintenta un poco.
    let doctor = null;
    for (let i = 0; i < 6; i++) {
      const { data } = await supabaseAdmin
        .from("doctores")
        .select("user_id")
        .eq("email", email)
        .maybeSingle();
      if (data?.user_id) {
        doctor = data;
        break;
      }
      await new Promise((r) => setTimeout(r, 1500));
    }

    if (!doctor) {
      return NextResponse.json({ error: "Tu cuenta aún se está creando, intenta de nuevo en unos segundos." }, { status: 202 });
    }

    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email,
    });

    if (linkError) {
      console.error("Error generando magic link:", linkError.message);
      return NextResponse.json({ error: linkError.message }, { status: 500 });
    }

    return NextResponse.json({
      email,
      hashed_token: linkData.properties.hashed_token,
    });
  } catch (err) {
    console.error("Error en auto-login:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
