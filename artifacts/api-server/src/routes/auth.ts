import { Router, type IRouter } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const router: IRouter = Router();

const sessionTokens = new Map<string, { userId: number; expiresAt: number }>();
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function generateSessionToken(userId: number): string {
  const token = crypto.randomBytes(32).toString("hex");
  sessionTokens.set(token, { userId, expiresAt: Date.now() + SESSION_TTL_MS });
  return token;
}

export function resolveSessionToken(token: string): number | null {
  const session = sessionTokens.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    sessionTokens.delete(token);
    return null;
  }
  return session.userId;
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const testHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return hash === testHash;
}

router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, fullName, companyName } = req.body;

    if (!email || !password || !fullName) {
      res.status(400).json({ error: "Email, password, and full name are required" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase().trim()))
      .limit(1);

    if (existing.length > 0) {
      res.status(409).json({ error: "An account with this email already exists" });
      return;
    }

    const passwordHash = hashPassword(password);

    const [user] = await db
      .insert(usersTable)
      .values({
        email: email.toLowerCase().trim(),
        passwordHash,
        fullName: fullName.trim(),
        companyName: companyName?.trim() || null,
        role: "registered",
        credits: 10,
      })
      .returning();

    const token = generateSessionToken(user.id);

    res.status(201).json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      companyName: user.companyName,
      role: user.role,
      credits: user.credits,
      createdAt: user.createdAt.toISOString(),
      token,
    });
  } catch (error) {
    req.log.error({ err: error }, "Failed to register user");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase().trim()))
      .limit(1);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = generateSessionToken(user.id);

    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      companyName: user.companyName,
      role: user.role,
      credits: user.credits,
      createdAt: user.createdAt.toISOString(),
      token,
    });
  } catch (error) {
    req.log.error({ err: error }, "Failed to login");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/auth/refresh", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Authorization token required" });
      return;
    }

    const oldToken = authHeader.slice(7);
    const userId = resolveSessionToken(oldToken);
    if (!userId) {
      res.status(401).json({ error: "Invalid or expired session" });
      return;
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const token = generateSessionToken(user.id);

    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      companyName: user.companyName,
      role: user.role,
      credits: user.credits,
      createdAt: user.createdAt.toISOString(),
      token,
    });
  } catch (error) {
    req.log.error({ err: error }, "Failed to refresh user");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
