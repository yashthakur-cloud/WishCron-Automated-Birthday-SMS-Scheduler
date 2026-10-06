import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";

export async function DELETE(_request, { params }) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (!params.id) {
    return NextResponse.json({ error: "Contact ID is required." }, { status: 400 });
  }

  const { error } = await supabase.from("contacts").delete().eq("id", params.id).eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
