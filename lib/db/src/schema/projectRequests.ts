import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const projectRequestsTable = pgTable("project_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  companyName: text("company_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  palCategory: text("pal_category").notNull(),
  missionId: text("mission_id").notNull(),
  packageDetails: text("package_details"),
  estimatedTotal: numeric("estimated_total", { precision: 10, scale: 2 }),
  projectDescription: text("project_description"),
  preferredTimeline: text("preferred_timeline"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectRequestSchema = createInsertSchema(projectRequestsTable).omit({ id: true, createdAt: true });
export type InsertProjectRequest = z.infer<typeof insertProjectRequestSchema>;
export type ProjectRequest = typeof projectRequestsTable.$inferSelect;
