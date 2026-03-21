import { Router, type IRouter } from "express";
import { db, usersTable, toolResults } from "@workspace/db";
import { eq, sql, and, gte } from "drizzle-orm";
import { openai } from "@workspace/integrations-openai-ai-server";
import { getToolPrompt } from "../lib/toolPrompts";

const router: IRouter = Router();

const FREE_TOOLS = new Set([
  "teleprompter",
  "about-page-script",
  "faq-video-series",
  "content-audit",
]);

const CREDIT_COSTS: Record<string, number> = {
  "content-calendar": 2,
  "course-outline-builder": 2,
  "workshop-planner": 2,
};

function getCreditCost(toolId: string): number {
  if (FREE_TOOLS.has(toolId)) return 0;
  return CREDIT_COSTS[toolId] ?? 1;
}

router.post("/ai/generate", async (req, res) => {
  try {
    const { toolId, palId, inputs, userId } = req.body;

    if (!toolId || !inputs) {
      res.status(400).json({ error: "toolId and inputs are required" });
      return;
    }

    const toolPrompt = getToolPrompt(toolId);
    if (!toolPrompt) {
      res.status(404).json({ error: `Unknown tool: ${toolId}` });
      return;
    }

    const creditCost = getCreditCost(toolId);

    if (userId && creditCost > 0) {
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .limit(1);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      if (user.credits < creditCost) {
        res.status(402).json({
          error: "Insufficient credits",
          required: creditCost,
          available: user.credits,
        });
        return;
      }
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });

    const userPrompt = toolPrompt.userPromptTemplate(inputs);

    const stream = await openai.chat.completions.create({
      model: toolPrompt.model,
      max_tokens: toolPrompt.maxTokens,
      stream: true,
      messages: [
        { role: "system", content: toolPrompt.systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    let fullContent = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullContent += content;
        res.write(`data: ${JSON.stringify({ type: "chunk", content })}\n\n`);
      }
    }

    if (userId && creditCost > 0) {
      const updated = await db
        .update(usersTable)
        .set({
          credits: sql`${usersTable.credits} - ${creditCost}`,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(usersTable.id, userId),
            gte(usersTable.credits, creditCost)
          )
        )
        .returning({ credits: usersTable.credits });

      const creditsRemaining = updated[0]?.credits ?? 0;

      await db.insert(toolResults).values({
        userId,
        toolId,
        palId: palId || null,
        inputs,
        output: fullContent,
        creditsCost: creditCost,
      });

      res.write(
        `data: ${JSON.stringify({ type: "done", creditsRemaining, creditsCost: creditCost })}\n\n`
      );
    } else if (userId) {
      await db.insert(toolResults).values({
        userId,
        toolId,
        palId: palId || null,
        inputs,
        output: fullContent,
        creditsCost: 0,
      });

      res.write(
        `data: ${JSON.stringify({ type: "done", creditsCost: 0 })}\n\n`
      );
    } else {
      res.write(
        `data: ${JSON.stringify({ type: "done", creditsCost: creditCost })}\n\n`
      );
    }

    res.end();
  } catch (error: any) {
    req.log.error({ err: error }, "AI generation failed");
    if (!res.headersSent) {
      res.status(500).json({ error: "AI generation failed" });
    } else {
      res.write(
        `data: ${JSON.stringify({ type: "error", error: "Generation failed. Please try again." })}\n\n`
      );
      res.end();
    }
  }
});

router.post("/ai/chat", async (req, res) => {
  try {
    const { message, palId, conversationHistory, userId } = req.body;

    if (!message) {
      res.status(400).json({ error: "message is required" });
      return;
    }

    const palPersonas: Record<string, string> = {
      reel: "You are Ryder, a Reel Pal from Palmer House Productions. You're energetic, creative, and specialize in short-form video and social media content.",
      spotlight: "You are Kareem, a Spotlight Pal from Palmer House Productions. You're warm, professional, and specialize in brand storytelling and trust-building content.",
      evergreen: "You are Cyrus, an Evergreen Pal from Palmer House Productions. You're knowledgeable, structured, and specialize in educational and authority-building content.",
      system: "You are Silas, a System Pal from Palmer House Productions. You're organized, strategic, and specialize in content systems and workflows.",
    };

    const systemPrompt = palId && palPersonas[palId]
      ? `${palPersonas[palId]}\n\nPalmer House Productions tagline: "We Don't Make Videos. We Translate Businesses." You help business owners create exceptional video content. Be specific, actionable, and personalized. Keep responses concise but valuable.`
      : `You are a helpful AI assistant for Palmer House Productions. Their tagline: "We Don't Make Videos. We Translate Businesses." You help business owners plan and create exceptional video content. Be specific, actionable, and personalized.`;

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
    ];

    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory.slice(-10)) {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content,
        });
      }
    }

    messages.push({ role: "user", content: message });

    if (userId) {
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .limit(1);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      if (user.credits < 1) {
        res.status(402).json({
          error: "Insufficient credits",
          required: 1,
          available: user.credits,
        });
        return;
      }
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1000,
      stream: true,
      messages,
    });

    let fullContent = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullContent += content;
        res.write(`data: ${JSON.stringify({ type: "chunk", content })}\n\n`);
      }
    }

    if (userId) {
      const updated = await db
        .update(usersTable)
        .set({
          credits: sql`${usersTable.credits} - 1`,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(usersTable.id, userId),
            gte(usersTable.credits, 1)
          )
        )
        .returning({ credits: usersTable.credits });

      res.write(
        `data: ${JSON.stringify({ type: "done", creditsRemaining: updated[0]?.credits ?? 0, creditsCost: 1 })}\n\n`
      );
    } else {
      res.write(`data: ${JSON.stringify({ type: "done", creditsCost: 1 })}\n\n`);
    }

    res.end();
  } catch (error: any) {
    req.log.error({ err: error }, "AI chat failed");
    if (!res.headersSent) {
      res.status(500).json({ error: "AI chat failed" });
    } else {
      res.write(
        `data: ${JSON.stringify({ type: "error", error: "Chat failed. Please try again." })}\n\n`
      );
      res.end();
    }
  }
});

router.get("/ai/history", async (req, res) => {
  try {
    const userId = parseInt(req.query.userId as string);
    if (!userId || isNaN(userId)) {
      res.status(400).json({ error: "userId is required" });
      return;
    }

    const results = await db
      .select()
      .from(toolResults)
      .where(eq(toolResults.userId, userId))
      .orderBy(sql`${toolResults.createdAt} DESC`)
      .limit(50);

    res.json(results);
  } catch (error) {
    req.log.error({ err: error }, "Failed to fetch AI history");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
