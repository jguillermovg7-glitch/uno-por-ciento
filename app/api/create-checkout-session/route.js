import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { plan, email, userId } = await request.json();

    const origin = request.headers.get("origin");
    const planesLandingB = ["starter", "pro", "superior"];
    let sessionConfig = {
      payment_method_types: ["card"],
      metadata: { userId: userId || "", plan },
      success_url: `${origin}/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: planesLandingB.includes(plan) ? `${origin}/planes-b` : `${origin}/preview`,
      allow_promotion_codes: true,
    };

    // Si ya tenemos email (flujo viejo, con login previo), lo prellenamos.
    // Si no (flujo nuevo, pago antes de cuenta), Stripe lo pide directo en el Checkout.
    if (email) {
      sessionConfig.customer_email = email;
    }

    // ── Planes originales (no tocar) ──────────────────────────
    if (plan === "sitio") {
      sessionConfig.mode = "subscription";
      sessionConfig.line_items = [
        { price: process.env.STRIPE_PRICE_SITIO_DOMINIO, quantity: 1 },
        { price: process.env.STRIPE_PRICE_SITIO_MANTENIMIENTO, quantity: 1 },
      ];
      sessionConfig.subscription_data = { metadata: { userId, plan } };

    } else if (plan === "campana") {
      sessionConfig.mode = "subscription";
      sessionConfig.line_items = [
        { price: process.env.STRIPE_PRICE_CAMPANA, quantity: 1 },
      ];
      sessionConfig.subscription_data = { metadata: { userId, plan } };

    } else if (plan === "combo") {
      sessionConfig.mode = "subscription";
      sessionConfig.line_items = [
        { price: process.env.STRIPE_PRICE_SITIO_DOMINIO, quantity: 1 },
        { price: process.env.STRIPE_PRICE_SITIO_MANTENIMIENTO, quantity: 1 },
        { price: process.env.STRIPE_PRICE_CAMPANA, quantity: 1 },
      ];
      sessionConfig.subscription_data = { metadata: { userId, plan } };

    // ── Planes nuevos landing B ───────────────────────────────
    } else if (plan === "starter") {
      sessionConfig.mode = "subscription";
      sessionConfig.line_items = [
        { price: process.env.STRIPE_PRICE_STARTER, quantity: 1 },
      ];
      sessionConfig.subscription_data = { metadata: { userId: userId || "", plan } };

    } else if (plan === "pro") {
      sessionConfig.mode = "subscription";
      sessionConfig.line_items = [
        { price: process.env.STRIPE_PRICE_PRO, quantity: 1 },
      ];
      sessionConfig.subscription_data = { metadata: { userId: userId || "", plan } };

    } else if (plan === "superior") {
      sessionConfig.mode = "subscription";
      sessionConfig.line_items = [
        { price: process.env.STRIPE_PRICE_SUPERIOR, quantity: 1 },
      ];
      sessionConfig.subscription_data = { metadata: { userId: userId || "", plan } };

    } else {
      return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
