import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabase as generatedSupabase } from "@/integrations/supabase/client";
import type { Database } from "./database.types";

export const SUPABASE_URL =
  import.meta.env["VITE_SUPABASE_URL"] || process.env["SUPABASE_URL"];
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
  process.env["SUPABASE_PUBLISHABLE_KEY"];

// Single shared client for the whole app. The Studio previously created its own
// instance, which meant sign-in landed in one client while the UI watched another.
export const supabase = generatedSupabase as unknown as SupabaseClient<Database>;

export function createUserScopedSupabase(accessToken: string) {
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
