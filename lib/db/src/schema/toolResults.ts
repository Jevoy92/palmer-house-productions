import { integer, pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const toolResults = pgTable("tool_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
  toolId: text("tool_id").notNull(),
  palId: text("pal_id"),
  inputs: jsonb("inputs").notNull(),
  output: text("output").notNull(),
  creditsCost: integer("credits_cost").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertToolResultSchema = createInsertSchema(toolResults).omit({
  id: true,
  createdAt: true,
});

export type ToolResult = typeof toolResults.$inferSelect;
export type InsertToolResult = z.infer<typeof insertToolResultSchema>;
