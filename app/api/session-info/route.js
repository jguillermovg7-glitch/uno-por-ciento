import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json({ error: "Falta session_id" }, { status: 400 });
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      amount_total: session.amount_total,
      currency: session.currency ? session.currency.toUpperCase() : "MXN",
      plan: session.metadata?.plan || null,
    });
  } catch (err) {
    console.error("Error obteniendo session-info:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
