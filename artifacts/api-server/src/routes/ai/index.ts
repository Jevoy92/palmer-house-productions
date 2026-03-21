import { Router, type IRouter, type Request, type Response } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import { db, usersTable, toolResults } from "@workspace/db";
import { eq, desc, and, sql } from "drizzle-orm";
import { resolveSessionToken } from "../auth";
import { getSystemPrompt, type PalContext } from "./prompts";

const router: IRouter = Router();

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

const guestUsageMap = new Map<string, { count: number; resetAt: number }>();
const GUEST_CREDIT_LIMIT = 3;
const GUEST_RESET_MS = 24 * 60 * 60 * 1000;

function checkGuestCredits(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = guestUsageMap.get(ip);
  if (!entry || now > entry.resetAt) {
    guestUsageMap.set(ip, { count: 0, resetAt: now + GUEST_RESET_MS });
    return { allowed: true, remaining: GUEST_CREDIT_LIMIT };
  }
  if (entry.count >= GUEST_CREDIT_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  return { allowed: true, remaining: GUEST_CREDIT_LIMIT - entry.count };
}

function recordGuestUsage(ip: string): number {
  const entry = guestUsageMap.get(ip);
  if (entry) {
    entry.count++;
    return GUEST_CREDIT_LIMIT - entry.count;
  }
  return GUEST_CREDIT_LIMIT;
}

function getClientIp(req: Request): string {
  return req.ip || "unknown";
}

function extractBearerToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

async function resolveAuthenticatedUser(req: Request): Promise<typeof usersTable.$inferSelect | null> {
  const token = extractBearerToken(req);
  if (!token) return null;
  const userId = resolveSessionToken(token);
  if (!userId) return null;
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);
  return user || null;
}

router.post("/ai/generate", async (req: Request, res: Response) => {
  try {
    const { toolId, palId, inputs } = req.body as {
      toolId?: string;
      palId?: string;
      inputs?: Record<string, string>;
    };

    if (!toolId || !inputs) {
      res.status(400).json({ error: "toolId and inputs are required" });
      return;
    }

    const clientIp = getClientIp(req);
    const user = await resolveAuthenticatedUser(req);

    if (!checkRateLimit(user ? `user:${user.id}` : `ip:${clientIp}`)) {
      res.status(429).json({ error: "Too many requests. Please wait a minute and try again." });
      return;
    }

    if (user) {
      const checkResult = await db
        .select({ credits: usersTable.credits })
        .from(usersTable)
        .where(eq(usersTable.id, user.id))
        .limit(1);
      if (!checkResult[0] || checkResult[0].credits <= 0) {
        res.status(402).json({ error: "Insufficient credits. Please upgrade your plan to continue using AI tools." });
        return;
      }
    } else {
      const guestCheck = checkGuestCredits(clientIp);
      if (!guestCheck.allowed) {
        res.status(402).json({ error: "You've used all your free credits. Sign up for more!" });
        return;
      }
    }

    const palContext: PalContext | undefined = palId
      ? { palCategory: palId, ...inputs }
      : undefined;
    const systemPrompt = getSystemPrompt(toolId, inputs, palContext);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let fullResponse = "";

    const stream = await openai.chat.completions.create({
      model: "gpt-5-mini",
      max_completion_tokens: 8192,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: inputs.additionalNotes || inputs.topic || "Generate content based on the provided parameters." },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    let creditsAfterDeduction: number | null = null;
    if (user) {
      const deductResult = await db
        .update(usersTable)
        .set({ credits: sql`${usersTable.credits} - 1` })
        .where(and(eq(usersTable.id, user.id), sql`${usersTable.credits} > 0`))
        .returning({ credits: usersTable.credits });
      creditsAfterDeduction = deductResult[0]?.credits ?? null;
    } else {
      creditsAfterDeduction = recordGuestUsage(clientIp);
    }

    let savedResultId: number | null = null;
    try {
      const [result] = await db
        .insert(toolResults)
        .values({
          userId: user?.id || null,
          toolId,
          palId: palId || null,
          inputs,
          output: fullResponse,
        })
        .returning({ id: toolResults.id });
      savedResultId = result?.id ?? null;
    } catch (dbErr) {
      req.log.error({ err: dbErr }, "Failed to save tool result");
    }

    res.write(`data: ${JSON.stringify({ done: true, resultId: savedResultId, creditsRemaining: creditsAfterDeduction })}\n\n`);
    res.end();
  } catch (error: unknown) {
    req.log.error({ err: error }, "AI generation failed");
    if (!res.headersSent) {
      res.status(500).json({ error: "AI generation failed. Please try again." });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Generation failed. Please try again." })}\n\n`);
      res.end();
    }
  }
});

router.post("/ai/generate-pdf", async (req: Request, res: Response) => {
  try {
    const { title, sections, toolId } = req.body as {
      title?: string;
      sections?: Array<{ heading?: string; content: string; type?: string }>;
      toolId?: string;
    };

    if (!title || !sections) {
      res.status(400).json({ error: "title and sections are required" });
      return;
    }

    const clientIp = getClientIp(req);
    if (!checkRateLimit(`pdf:${clientIp}`)) {
      res.status(429).json({ error: "Too many requests. Please wait a minute and try again." });
      return;
    }

    const safeTitle = escapeHtml(String(title));
    const safeToolId = toolId ? escapeHtml(String(toolId)) : null;

    const htmlSections = sections
      .map((section) => {
        const safeHeading = section.heading ? escapeHtml(section.heading) : "";
        const heading = safeHeading ? `<h2 style="color:#6B3FA0;margin:24px 0 12px;font-size:20px;">${safeHeading}</h2>` : "";
        const content = escapeHtml(section.content)
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\n/g, "<br/>");

        if (section.type === "checklist") {
          const items = section.content.split("\n").filter(Boolean);
          const listItems = items.map((item) => `<li style="margin:6px 0;padding:4px 0;">${escapeHtml(item.replace(/^[-•]\s*/, ""))}</li>`).join("");
          return `${heading}<ul style="padding-left:20px;margin:8px 0;">${listItems}</ul>`;
        }

        return `${heading}<div style="margin:8px 0;line-height:1.6;">${content}</div>`;
      })
      .join("");

    const toolBadge = safeToolId
      ? `<div class="tool-badge">${safeToolId.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}</div>`
      : "";

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${safeTitle}</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 32px; color: #1a1a1a; line-height: 1.6; }
    h1 { color: #6B3FA0; font-size: 28px; margin-bottom: 8px; letter-spacing: -0.5px; }
    .subtitle { color: #666; font-size: 14px; margin-bottom: 32px; }
    .tool-badge { display: inline-block; background: #F3EEFB; color: #6B3FA0; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
    .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #eee; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  ${toolBadge}
  <h1>${safeTitle}</h1>
  <div class="subtitle">Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
  ${htmlSections}
  <div class="footer">Generated by Palmer House Productions AI Tools</div>
</body>
</html>`;

    res.json({
      html,
      title,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    req.log.error({ err: error }, "PDF generation failed");
    res.status(500).json({ error: "Document generation failed" });
  }
});

router.post("/ai/tool-results/list", async (req: Request, res: Response) => {
  try {
    const user = await resolveAuthenticatedUser(req);
    if (!user) {
      res.status(401).json({ error: "Authentication required to view results" });
      return;
    }

    const { toolId, limit: rawLimit } = req.body as { toolId?: string; limit?: number };
    const limit = Math.min(Number(rawLimit) || 20, 50);

    const conditions = [eq(toolResults.userId, user.id)];
    if (toolId) conditions.push(eq(toolResults.toolId, toolId));

    const results = await db
      .select()
      .from(toolResults)
      .where(and(...conditions))
      .orderBy(desc(toolResults.createdAt))
      .limit(limit);

    res.json(results);
  } catch (error: unknown) {
    req.log.error({ err: error }, "Failed to fetch tool results");
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

router.post("/ai/tool-results/get", async (req: Request, res: Response) => {
  try {
    const user = await resolveAuthenticatedUser(req);
    if (!user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const { id } = req.body as { id?: number };
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid result ID" });
      return;
    }

    const [result] = await db
      .select()
      .from(toolResults)
      .where(and(eq(toolResults.id, Number(id)), eq(toolResults.userId, user.id)))
      .limit(1);

    if (!result) {
      res.status(404).json({ error: "Result not found" });
      return;
    }

    res.json(result);
  } catch (error: unknown) {
    req.log.error({ err: error }, "Failed to fetch tool result");
    res.status(500).json({ error: "Failed to fetch result" });
  }
});

export default router;
