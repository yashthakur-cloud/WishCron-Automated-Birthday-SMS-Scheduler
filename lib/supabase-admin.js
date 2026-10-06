import { createClient } from "@supabase/supabase-js";

export function assertSupabaseAdminConfig() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable."
    );
  }
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://missing.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "missing-service-role-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
