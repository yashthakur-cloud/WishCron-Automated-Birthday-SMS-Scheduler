import { NextResponse } from "next/server";
import { assertSupabaseAdminConfig, supabaseAdmin } from "../../../lib/supabase-admin";

const TEXTBEE_URL = "https://api.textbee.dev/api/v1/gateway/send-sms";

function getIndiaDateParts() {
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(new Date());

  return Object.fromEntries(
    parts
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, Number(value)])
  );
}

function getMessage(contact) {
  return (
    contact.custom_message?.trim() ||
    `Wishing you a very Happy Birthday ${contact.recipient_name}!🎉 Hope your day is filled with lots of joy, laughter, and great memories. Have a wonderful year ahead! ✨ - ${contact.sender_name}`
  );
}

export async function GET(request) {
  const expectedSecret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");
  const providedSecret = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  assertSupabaseAdminConfig();

  if (!process.env.TEXTBEE_API_KEY || !process.env.TEXTBEE_DEVICE_ID) {
    return NextResponse.json(
      { error: "Textbee environment variables are not configured." },
      { status: 500 }
    );
  }

  const { year, month, day } = getIndiaDateParts();
  const { data: contacts, error: queryError } = await supabaseAdmin
    .from("contacts")
    .select(
      "id, sender_name, recipient_name, recipient_phone, custom_message, last_sent_year"
    )
    .eq("dob_month", month)
    .eq("dob_day", day)
    .neq("last_sent_year", year);

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  let sent = 0;
  const failures = [];

  for (const contact of contacts ?? []) {
    const response = await fetch(TEXTBEE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.TEXTBEE_API_KEY
      },
      body: JSON.stringify({
        recipients: [contact.recipient_phone],
        message: getMessage(contact),
        deviceId: process.env.TEXTBEE_DEVICE_ID
      })
    });

    if (!response.ok) {
      const responseText = await response.text();
      failures.push({
        id: contact.id,
        error: `Textbee returned ${response.status}: ${responseText.slice(0, 300)}`
      });
      continue;
    }

    const { error: updateError } = await supabaseAdmin
      .from("contacts")
      .update({ last_sent_year: year })
      .eq("id", contact.id);

    if (updateError) {
      return NextResponse.json(
        {
          error: `SMS sent but failed to record last_sent_year for contact ${contact.id}.`,
          details: updateError.message,
          processed: contacts.length,
          sent,
          failed: failures.length
        },
        { status: 500 }
      );
    }

    sent += 1;
  }

  return NextResponse.json({
    date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    processed: contacts?.length ?? 0,
    sent,
    failed: failures.length,
    failures
  });
}
