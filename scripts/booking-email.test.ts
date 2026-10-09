// Runs claim/finish against the REAL deployed database functions and unique keys.
// Only enqueue_email is stubbed, so no email is ever sent. Test rows are removed afterwards.
import { mock, test, expect, afterAll } from "bun:test";
import { SQL } from "bun";

// Local throwaway Postgres loaded with the exact deployed migration file.
const db = new SQL({ hostname: "127.0.0.1", port: 55432, username: "postgres", database: "postgres", max: 10 });
const PREFIX = `test-${crypto.randomUUID().slice(0, 8)}-`;
let queued: any[] = [];
let failEnqueue = false;
const suppressed = new Set<string>();

const chain = (table: string) => {
  const f: Record<string, any> = {};
  const c: any = {
    select: () => c, order: () => c, limit: () => c, in: () => c,
    eq: (k: string, v: any) => ((f[k] = v), c),
    upsert: async () => ({ error: null }),
    insert: async () => ({ error: null }),
    maybeSingle: async () => {
      if (table === "suppressed_emails") return { data: suppressed.has(f.email) ? { email: f.email } : null, error: null };
      if (table === "email_unsubscribe_tokens") return { data: { token: "tok" }, error: null };
      return { data: null, error: null };
    },
  };
  return c;
};

mock.module("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    from: chain,
    rpc: async (name: string, a: any) => {
      if (name === "claim_customer_email") {
        const [r] = await db`select public.claim_customer_email(${a.p_key}, ${a.p_template}, ${a.p_recipient}, ${a.p_data}::jsonb) as v`;
        return { data: typeof r.v === "string" ? JSON.parse(r.v) : r.v, error: null };
      }
      if (name === "finish_customer_email") {
        await db`select public.finish_customer_email(${a.p_key}, ${a.p_status}, ${a.p_error})`;
        return { error: null };
      }
      if (name === "enqueue_email") {
        await new Promise((r) => setTimeout(r, 5));
        if (failEnqueue) return { error: { message: "queue down" } };
        queued.push(a.payload);
        return { error: null };
      }
      throw new Error("unexpected rpc " + name);
    },
  },
}));

const { queueCustomerEmail } = await import("../src/lib/team-email.server.ts");
const { clientBookingEmailData, studioWelcomeEmailData } = await import("../src/lib/client-booking-email.ts");
const { bookingTargets } = await import("../src/lib/booking-links.ts");

afterAll(async () => {
  await db`delete from public.customer_email_outbox where idempotency_key like ${PREFIX + "%"}`;
});

test("10 concurrent webhook deliveries queue exactly one email", async () => {
  const d = clientBookingEmailData({ reference: "PH-ABC234", depositPaid: "$225.00", purchasedAt: Date.UTC(2026, 9, 1, 3) });
  const key = PREFIX + "client-deposit-cs_1";
  const results = await Promise.all(
    Array.from({ length: 10 }, () => queueCustomerEmail("client-deposit-confirmed", "Jane@Example.com", d, key)),
  );
  expect(results.filter((r) => r === "queued").length).toBe(1);
  expect(results.filter((r) => r === "duplicate").length).toBe(9);
  expect(queued.length).toBe(1);
  expect(queued[0].message_id).toBe(key);
  expect(queued[0].unsubscribe_token).toBe("tok");
  expect(queued[0].reply_to).toBe("info@palmerhouseproductions.com");
  expect(queued[0].html).toContain("Tuesdays and Thursdays");
  const [row] = await db`select status, attempts from public.customer_email_outbox where idempotency_key = ${key}`;
  expect(row.status).toBe("queued");
});

test("enqueue failure is durable, then a real retry re-claims with the ORIGINAL data", async () => {
  const key = PREFIX + "studio-welcome-ws1";
  failEnqueue = true;
  const first = studioWelcomeEmailData({ planName: "Guided", purchasedAt: Date.UTC(2026, 9, 1) });
  expect(await queueCustomerEmail("studio-welcome", "a@b.co", first, key)).toBe("failed");
  failEnqueue = false;
  let [row] = await db`select status, attempts, next_attempt_at from public.customer_email_outbox where idempotency_key = ${key}`;
  expect(row.status).toBe("failed");
  expect(row.next_attempt_at).not.toBeNull();
  const before = queued.length;
  // Retry arrives with different (later) data — stored first data must win so deadlines don't reset.
  const later = studioWelcomeEmailData({ planName: "Guided", purchasedAt: Date.UTC(2026, 9, 20) });
  const retries = await Promise.all([1, 2, 3].map(() => queueCustomerEmail("studio-welcome", "a@b.co", later, key)));
  expect(retries.filter((r) => r === "queued").length).toBe(1);
  expect(queued.length).toBe(before + 1);
  expect(queued.at(-1).html).toContain("October 7, 2026");
  [row] = await db`select status, attempts from public.customer_email_outbox where idempotency_key = ${key}`;
  expect(row.status).toBe("queued");
  expect(row.attempts).toBe(2);
  expect(await queueCustomerEmail("studio-welcome", "a@b.co", later, key)).toBe("duplicate");
});

test("transactional suppression honored; team templates skipped", async () => {
  suppressed.add("s@y.co");
  expect(await queueCustomerEmail("studio-welcome", "s@y.co", {}, PREFIX + "k-sup")).toBe("suppressed");
  expect(await queueCustomerEmail("studio-welcome", "s@y.co", {}, PREFIX + "k-sup")).toBe("duplicate");
  expect(await queueCustomerEmail("deposit-booked", "z@y.co", {}, PREFIX + "k-team")).toBe("skipped");
});

test("booking dates use Pacific time", () => {
  // 03:00 UTC Oct 9 is still Oct 8 in Los Angeles.
  expect(bookingTargets(Date.UTC(2026, 9, 9, 3))).toEqual({ bookBy: "October 15, 2026", meetBy: "October 22, 2026" });
  expect(bookingTargets(null)).toBeNull();
});
