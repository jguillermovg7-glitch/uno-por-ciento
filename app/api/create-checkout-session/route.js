import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { plan, email, userId } = await request.json();

    const origin = request.headers.get("origin");
    let sessionConfig = {
      payment_method_types: ["card"],
      customer_email: email,
      metadata: { userId, plan },
      success_url: `${origin}/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/preview`,
    };

    if (plan === "sitio") {
      // Suscripción mensual + cargo único de dominio en la misma sesión
      sessionConfig.mode = "subscription";
      sessionConfig.line_items = [
        { price: process.env.STRIPE_PRICE_SITIO_MANTENIMIENTO, quantity: 1 },
      ];
      sessionConfig.subscription_data = {
        metadata: { userId, plan },
      };
      sessionConfig.invoice_creation = undefined;
      // El dominio se cobra como item único agregado a la primera factura via "add_invoice_items"
      sessionConfig.line_items.push();
      sessionConfig.subscription_data.add_invoice_items = [
        { price: process.env.STRIPE_PRICE_SITIO_DOMINIO, quantity: 1 },
      ];
    } else if (plan === "campana") {
      sessionConfig.mode = "subscription";
      sessionConfig.line_items = [
        { price: process.env.STRIPE_PRICE_CAMPANA, quantity: 1 },
      ];
      sessionConfig.subscription_data = {
        metadata: { userId, plan },
      };
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
