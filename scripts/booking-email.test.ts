import { mock, test, expect } from "bun:test";
let log: any[] = [], queued: any[] = [], suppressed = new Set<string>(), failEnqueue = false;
const q = (table: string) => {
  const f: any = { filters: {} as any };
  const chain: any = {
    select: () => chain, limit: () => chain,
    eq: (k: string, v: any) => ((f.filters[k] = v), chain),
    in: (k: string, v: any) => ((f.filters[k + "_in"] = v), chain),
    maybeSingle: async () => ({ data: table === "suppressed_emails" && suppressed.has(f.filters.email) ? { email: f.filters.email } : null }),
    insert: async (row: any) => (log.push({ ...row }), { error: null }),
    update: (patch: any) => { f.patch = patch; return chain; },
    then: (res: any) => {
      if (f.patch) { log.filter(r => r.message_id === f.filters.message_id && r.status === f.filters.status).forEach(r => Object.assign(r, f.patch)); return res({ error: null }); }
      return res({ data: log.filter(r => r.message_id === f.filters.message_id && f.filters.status_in.includes(r.status)), error: null });
    },
  };
  return chain;
};
mock.module("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: { from: q, rpc: async (_: string, a: any) => failEnqueue ? { error: { message: "queue down" } } : (queued.push(a.payload), { error: null }) },
}));
const { queueCustomerEmail } = await import("../src/lib/team-email.server.ts");
const { clientBookingEmailData, studioWelcomeEmailData } = await import("../src/lib/client-booking-email.ts");

test("deposit email: once per checkout, reply-to set, retry-safe", async () => {
  const d = clientBookingEmailData({ reference: "PH-ABC234", customerName: "Jane", depositPaid: "$225.00", purchasedAt: Date.UTC(2026, 9, 1) });
  expect(await queueCustomerEmail("client-deposit-confirmed", "Jane@Example.com", d, "client-deposit-cs_1")).toBe("queued");
  expect(await queueCustomerEmail("client-deposit-confirmed", "jane@example.com", d, "client-deposit-cs_1")).toBe("duplicate");
  expect(queued.length).toBe(1);
  expect(queued[0].reply_to).toBe("info@palmerhouseproductions.com");
  expect(queued[0].to).toBe("jane@example.com");
  expect(queued[0].html).toContain("AcZssZ3U");
  expect(queued[0].html).toContain("does not reserve a filming date");
});
test("welcome: renewal/retry for same workspace never resends; different workspace does", async () => {
  const w = studioWelcomeEmailData({ planName: "Studio", purchasedAt: Date.now() });
  expect(await queueCustomerEmail("studio-welcome", "a@b.co", w, "studio-welcome-ws1")).toBe("queued");
  expect(await queueCustomerEmail("studio-welcome", "a@b.co", w, "studio-welcome-ws1")).toBe("duplicate");
  expect(await queueCustomerEmail("studio-welcome", "c@d.co", w, "studio-welcome-ws2")).toBe("queued");
  expect(queued.at(-1).html).toContain("AcZssZ2V");
});
test("failures never throw and free the key for a real retry; suppressed is respected", async () => {
  failEnqueue = true;
  expect(await queueCustomerEmail("studio-welcome", "x@y.co", {}, "k-fail")).toBe("failed");
  failEnqueue = false;
  expect(await queueCustomerEmail("studio-welcome", "x@y.co", {}, "k-fail")).toBe("queued");
  suppressed.add("s@y.co");
  expect(await queueCustomerEmail("studio-welcome", "s@y.co", {}, "k-sup")).toBe("suppressed");
  expect(await queueCustomerEmail("deposit-booked", "z@y.co", {}, "k-team")).toBe("skipped");
});
