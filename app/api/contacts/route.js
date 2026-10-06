import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../lib/supabase-server";

const contactFields =
  "id, sender_name, recipient_name, recipient_phone, dob_month, dob_day, custom_message, created_at";

function validateContact(payload) {
  const requiredTextFields = [
    ["sender_name", "Sender name"],
    ["recipient_name", "Recipient name"],
    ["recipient_phone", "Recipient phone"]
  ];

  for (const [field, label] of requiredTextFields) {
    if (typeof payload[field] !== "string" || !payload[field].trim()) {
      return `${label} is required.`;
    }
  }

  if (!/^\+[1-9]\d{6,14}$/.test(payload.recipient_phone.trim())) {
    return "Recipient phone must be a valid international number, for example +919876543210.";
  }
  if (typeof payload.recipient_phone_local !== "string" || !/^\d{10}$/.test(payload.recipient_phone_local)) {
    return "Phone number must contain exactly 10 digits.";
  }
  if (/\d/.test(payload.sender_name) || /\d/.test(payload.recipient_name)) {
    return "Sender and recipient names must not contain numbers.";
  }

  const month = Number(payload.dob_month);
  const day = Number(payload.dob_day);
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return "Birth month must be between 1 and 12.";
  }
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return "Birth day must be between 1 and 31.";
  }

  return null;
}

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { data, error } = await supabase
    .from("contacts")
    .select(contactFields)
    .order("dob_month", { ascending: true })
    .order("dob_day", { ascending: true })
    .order("recipient_name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ contacts: data });
}

export async function POST(request) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const validationError = validateContact(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("contacts")
    .insert({
      user_id: user.id,
      sender_name: payload.sender_name.trim(),
      recipient_name: payload.recipient_name.trim(),
      recipient_phone: payload.recipient_phone.trim(),
      dob_month: Number(payload.dob_month),
      dob_day: Number(payload.dob_day),
      custom_message:
        typeof payload.custom_message === "string" && payload.custom_message.trim()
          ? payload.custom_message.trim()
          : null
    })
    .select(contactFields)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ contact: data }, { status: 201 });
}
