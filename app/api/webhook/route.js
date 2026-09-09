import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function buscarUserIdPorEmail(email) {
  let page = 1;
  while (page <= 10) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) return null;
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
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const trace = [];
  trace.push(`inicio: ${event.type} @ ${new Date().toISOString()}`);

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;
      const email = session.customer_details?.email || session.customer_email;

      trace.push(`session.id=${session.id} userId="${userId}" plan="${plan}" email="${email}"`);

      if (userId) {
        trace.push("rama: userId presente (flujo viejo)");
        const { error } = await supabaseAdmin
          .from("doctores")
          .update({
            estado: "activo",
            plan_type: plan,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            debug_log: trace.join(" | "),
          })
          .eq("user_id", userId);
        trace.push(`update por userId error=${error?.message || "ninguno"}`);

      } else if (email) {
        trace.push("rama: sin userId, buscando por email");
        let newUserId = null;

        const { data: existing, error: selectError } = await supabaseAdmin
          .from("doctores")
          .select("user_id")
          .eq("email", email)
          .maybeSingle();

        trace.push(`select existing.user_id=${existing?.user_id || "null"} selectError=${selectError?.message || "ninguno"}`);

        if (existing?.user_id) {
          newUserId = existing.user_id;
          trace.push(`usando existing.user_id=${newUserId}`);
        } else {
          const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            email_confirm: true,
          });
          trace.push(`createUser created=${created?.user?.id || "null"} createError=${createError?.message || "ninguno"}`);

          if (createError) {
            newUserId = await buscarUserIdPorEmail(email);
            trace.push(`fallback listUsers encontrado=${newUserId || "null"}`);
          } else {
            newUserId = created.user.id;
          }
        }

        if (newUserId) {
          const { data: upsertData, error: upsertError } = await supabaseAdmin
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
              debug_log: trace.join(" | "),
            }, { onConflict: "user_id" })
            .select();

          trace.push(`upsert filas_afectadas=${upsertData?.length ?? "null"} upsertError=${upsertError?.message || "ninguno"}`);

          if (!upsertData || upsertData.length === 0) {
            // El upsert no tocó ninguna fila (posible mismatch de onConflict). Reintenta con update directo.
            const { data: updateData, error: updateError } = await supabaseAdmin
              .from("doctores")
              .update({
                plan: plan,
                plan_type: plan,
                estado: "pago_confirmado",
                stripe_customer_id: session.customer,
                stripe_subscription_id: session.subscription,
                stripe_session_id: session.id,
                debug_log: trace.join(" | ") + " | fallback update directo",
              })
              .eq("user_id", newUserId)
              .select();
            trace.push(`fallback update filas_afectadas=${updateData?.length ?? "null"} updateError=${updateError?.message || "ninguno"}`);
          }
        } else {
          trace.push("newUserId nunca se resolvió, no se intentó upsert");
          await supabaseAdmin
            .from("doctores")
            .update({ debug_log: trace.join(" | ") })
            .eq("email", email);
        }
      } else {
        trace.push("ni userId ni email presentes, nada que hacer");
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      trace.push(`subscription.deleted id=${subscription.id}`);
      const { data: updateData, error } = await supabaseAdmin
        .from("doctores")
        .update({ estado: "cancelado", debug_log: trace.join(" | ") })
        .eq("stripe_subscription_id", subscription.id)
        .select();
      trace.push(`filas_afectadas=${updateData?.length ?? "null"} error=${error?.message || "ninguno"}`);
    }
  } catch (err) {
    trace.push(`EXCEPCION: ${err.message}`);
    console.error("Error inesperado procesando webhook:", err);
  }

  return NextResponse.json({ received: true });
}
