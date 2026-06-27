import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { plan, email, userId } = await request.json();

    const origin = request.headers.get("origin");
    let line_items = [];

    if (plan === "sitio") {
      // Mezclamos un precio recurrente (mantenimiento) y uno de pago único (dominio)
      // en la misma sesión de modo "subscription". Stripe cobra el de pago único
      // solo en la primera factura, y el recurrente se repite cada mes.
      line_items = [
        { price: process.env.STRIPE_PRICE_SITIO_MANTENIMIENTO, quantity: 1 },
        { price: process.env.STRIPE_PRICE_SITIO_DOMINIO, quantity: 1 },
      ];
    } else if (plan === "campana") {
      line_items = [
        { price: process.env.STRIPE_PRICE_CAMPANA, quantity: 1 },
      ];
    } else {
      return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items,
      customer_email: email,
      metadata: { userId, plan },
      subscription_data: {
        metadata: { userId, plan },
      },
      success_url: `${origin}/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/preview`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}