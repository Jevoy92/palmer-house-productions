import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { expoOfferLive } from "./expo-campaign";

/** Server-validated booth code check. Never reveals the real code. */
export const checkExpoCode = createServerFn({ method: "POST" })
  .validator((d) => z.object({ code: z.string().trim().max(40) }).parse(d))
  .handler(async ({ data }) => {
    if (!expoOfferLive()) return { valid: false as const, reason: "ended" as const };
    const { boothCodeMatches } = await import("./expo.server");
    return boothCodeMatches(data.code)
      ? { valid: true as const }
      : { valid: false as const, reason: "invalid" as const };
  });

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  wantsToCreate: z.string().trim().max(600).optional().default(""),
  interest: z.enum(["studio", "production", "planning", ""]).optional().default(""),
  boothCode: z.string().trim().max(40).optional().default(""),
  website: z.string().max(0).optional().default(""), // honeypot
});

export const submitExpoLead = createServerFn({ method: "POST" })
  .validator((d) => LeadSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    const { upsertExpoContact, boothCodeMatches } = await import("./expo.server");
    await upsertExpoContact({
      email: data.email,
      name: data.name,
      company: data.company || null,
      phone: data.phone || null,
      wantsToCreate: data.wantsToCreate || null,
      interest: data.interest || null,
      source: "form",
      offer: data.boothCode && boothCodeMatches(data.boothCode) ? "booth" : "public",
      event: { kind: "form", detail: data.interest || undefined },
    });
    return { ok: true as const };
  });
