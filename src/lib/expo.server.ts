import { expoCampaign } from "./expo-campaign";

export function boothCodeMatches(code: string) {
  const real = process.env.EXPO_BOOTH_CODE?.trim().toUpperCase();
  return Boolean(real) && code.trim().toUpperCase() === real;
}

type Status = "lead" | "account" | "paid";
const rank: Record<Status, number> = { lead: 0, account: 1, paid: 2 };

/** One contact per campaign + normalized email. Status only moves forward. */
export async function upsertExpoContact(input: {
  email: string;
  name?: string | null;
  company?: string | null;
  phone?: string | null;
  wantsToCreate?: string | null;
  interest?: string | null;
  source: string;
  status?: Status;
  purchased?: string | null;
  offer?: "public" | "booth" | null;
  workspaceId?: string | null;
  stripeCustomerId?: string | null;
  event: { kind: string; detail?: string; dedupeKey?: string };
}) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const db = supabaseAdmin as any;
  const email = input.email.trim().toLowerCase();
  const existing = await db
    .from("expo_contacts")
    .select("*")
    .eq("campaign_id", expoCampaign.id)
    .eq("email", email)
    .maybeSingle();
  if (existing.error) throw new Error("Could not save your details. Please try again.");
  const prev = existing.data;
  const status: Status =
    prev && rank[prev.status as Status] >= rank[input.status ?? "lead"]
      ? prev.status
      : (input.status ?? "lead");
  const row = {
    campaign_id: expoCampaign.id,
    email,
    name: input.name || prev?.name || null,
    company: input.company || prev?.company || null,
    phone: input.phone || prev?.phone || null,
    wants_to_create: input.wantsToCreate || prev?.wants_to_create || null,
    interest: input.interest || prev?.interest || null,
    source: prev?.source || input.source,
    status,
    purchased: input.purchased || prev?.purchased || null,
    offer: prev?.offer === "booth" ? "booth" : input.offer || prev?.offer || null,
    workspace_id: input.workspaceId || prev?.workspace_id || null,
    stripe_customer_id: input.stripeCustomerId || prev?.stripe_customer_id || null,
    updated_at: new Date().toISOString(),
  };
  const saved = await db
    .from("expo_contacts")
    .upsert(row, { onConflict: "campaign_id,email" })
    .select("id")
    .single();
  if (saved.error) throw new Error("Could not save your details. Please try again.");
  await db.from("expo_contact_events").upsert(
    {
      contact_id: saved.data.id,
      kind: input.event.kind,
      detail: input.event.detail ?? null,
      dedupe_key: input.event.dedupeKey ?? null,
    },
    { onConflict: "dedupe_key", ignoreDuplicates: true },
  );
  return saved.data.id as string;
}
