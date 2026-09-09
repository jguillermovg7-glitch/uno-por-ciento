import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function buscarUserIdPorEmail(email) {
  // Recorre las páginas de usuarios de Auth buscando el email exacto.
  let page = 1;
  while (page <= 10) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) {
      console.error("Error listando usuarios de Auth:", error.message);
      return null;
    }
    const match = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (match) return match.id;
    if (data.users.length < 200) break;
    page++;
  }
  return null;
}

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;
      const email = session.customer_details?.email || session.customer_email;

      if (userId) {
        // Flujo viejo: ya existía cuenta y perfil, solo actualizamos.
        const { error } = await supabaseAdmin
          .from("doctores")
          .update({
            estado: "activo",
            plan_type: plan,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
          })
          .eq("user_id", userId);
        if (error) console.error("Error actualizando doctor (flujo viejo):", error.message);

      } else if (email) {
        // Flujo nuevo: pago primero, cuenta después.
        let newUserId = null;

        const { data: existing, error: selectError } = await supabaseAdmin
          .from("doctores")
          .select("user_id")
          .eq("email", email)
          .maybeSingle();

        if (selectError) {
          console.error("Error buscando doctor existente por email:", selectError.message);
        }

        if (existing?.user_id) {
          newUserId = existing.user_id;
        } else {
          const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            email_confirm: true,
          });

          if (createError) {
            console.error("Error creando usuario post-pago:", createError.message);
            // Si ya existía en Auth (aunque no en doctores), lo buscamos por email.
            newUserId = await buscarUserIdPorEmail(email);
            if (!newUserId) {
              console.error("No se pudo recuperar el user_id existente para", email);
            }
          } else {
            newUserId = created.user.id;
          }
        }

        if (newUserId) {
          const { error: upsertError } = await supabaseAdmin
            .from("doctores")
            .upsert({
              user_id: newUserId,
              email,
              plan: plan,
              plan_type: plan,
              estado: "pago_confirmado",
              stripe_customer_id: session.customer,
              stripe_subscription_id: session.subscription,
              stripe_session_id: session.id,
            }, { onConflict: "user_id" });

          if (upsertError) {
            console.error("Error en upsert post-pago:", upsertError.message);
          }
        }
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const { error } = await supabaseAdmin
        .from("doctores")
        .update({ estado: "cancelado" })
        .eq("stripe_subscription_id", subscription.id);
      if (error) console.error("Error marcando cancelado:", error.message);
    }
  } catch (err) {
    console.error("Error inesperado procesando webhook:", err);
  }

  return NextResponse.json({ received: true });
}
