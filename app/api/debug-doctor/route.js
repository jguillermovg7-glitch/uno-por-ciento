import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Falta ?email=" }, { status: 400 });
  }

  const resultado = { email, pasos: [] };

  // Paso 1: buscar en doctores por email
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

  // Paso 2: intentar crear usuario (esto va a fallar si ya existe, es esperado)
  const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
  });

  resultado.pasos.push({
    paso: "createUser",
    created: created?.user?.id || null,
    createError: createError?.message || null,
    createErrorStatus: createError?.status || null,
  });

  // Paso 3: si falló, buscar por listUsers
  if (createError) {
    let encontrado = null;
    const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (listData) {
      const match = listData.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
      encontrado = match?.id || null;
    }
    resultado.pasos.push({
      paso: "listUsers fallback",
      encontrado,
      listError: listError?.message || null,
      totalUsuarios: listData?.users?.length || 0,
    });
  }

  return NextResponse.json(resultado);
}
