import { NextResponse } from "next/server";
import { assertSupabaseConfig, supabase } from "../../../../lib/supabase";

export async function DELETE(_request, { params }) {
  assertSupabaseConfig();
  if (!params.id) {
    return NextResponse.json({ error: "Contact ID is required." }, { status: 400 });
  }

  const { error } = await supabase.from("contacts").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
