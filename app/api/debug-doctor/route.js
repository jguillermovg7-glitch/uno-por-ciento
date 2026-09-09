import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const apply = searchParams.get("apply") === "1";
  if (!email) {
    return NextResponse.json({ error: "Falta ?email=" }, { status: 400 });
  }

  const resultado = { email, pasos: [] };

  const { data: existing, error: selectError } = await supabaseAdmin
    .from("doctores")
    .select("user_id, email, estado, stripe_subscription_id")
    .eq("email", email)
    .maybeSingle();

  resultado.pasos.push({
    paso: "select doctores por email",
    existing,
    selectError: selectError?.message || null,
  });

  if (apply && existing?.user_id) {
    const { data: upsertData, error: upsertError } = await supabaseAdmin
      .from("doctores")
      .upsert({
        user_id: existing.user_id,
        email,
        estado: "pago_confirmado_TEST",
      }, { onConflict: "user_id" })
      .select();

    resultado.pasos.push({
      paso: "upsert de prueba",
      upsertData,
      upsertError: upsertError?.message || null,
      upsertErrorCode: upsertError?.code || null,
      upsertErrorDetails: upsertError?.details || null,
    });
  }

  return NextResponse.json(resultado);
}
