import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://cksfnlgqgnsduqvkoqpa.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_6cBCKv5hg0co2Uh1-I3Dqw_LXGMDpFG";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    flowType: "pkce",
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export function createUserScopedSupabase(accessToken: string) {
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
