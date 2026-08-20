import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { doctorId, stripeCustomerId, planActual } = await request.json();

    if (!doctorId || !stripeCustomerId || !planActual) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    if (planActual === "completo") {
      return NextResponse.json({ error: "Ya tienes el Plan Completo" }, { status: 400 });
    }

    // Obtener suscripción activa del cliente
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: "active",
      limit: 1,
    });

    if (!subscriptions.data.length) {
      return NextResponse.json({ error: "No se encontró suscripción activa" }, { status: 404 });
    }

    const subscription = subscriptions.data[0];

    if (planActual === "campana") {
      // Agregar sitio web a suscripción existente (prorateado)
      await stripe.subscriptions.update(subscription.id, {
        proration_behavior: "create_prorations",
        items: [
          ...subscription.items.data.map((item) => ({ id: item.id })),
          { price: process.env.STRIPE_PRICE_SITIO_MANTENIMIENTO },
        ],
      });

      // Cobrar dominio como pago único aparte
      await stripe.invoiceItems.create({
        customer: stripeCustomerId,
        price: process.env.STRIPE_PRICE_SITIO_DOMINIO,
      });
      await stripe.invoices.create({
        customer: stripeCustomerId,
        auto_advance: true,
      });

    } else if (planActual === "sitio") {
      // Agregar campaña a suscripción existente (prorateado)
      await stripe.subscriptions.update(subscription.id, {
        proration_behavior: "create_prorations",
        items: [
          ...subscription.items.data.map((item) => ({ id: item.id })),
          { price: process.env.STRIPE_PRICE_CAMPANA },
        ],
      });
    }

    // Actualizar plan en Supabase
    const { error: dbError } = await supabase
      .from("doctores")
      .update({ plan: "completo" })
      .eq("id", doctorId);

    if (dbError) {
      console.error("Error actualizando Supabase:", dbError);
      return NextResponse.json({ error: "Plan actualizado en Stripe pero error en base de datos" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
