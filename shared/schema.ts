
import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Although we are using mock data for the map mostly, having a structure for 
// "Works" (Investments) and "Issues" (Reality) helps if we want to persist them later.
// For now, we'll keep it simple to support the specific PoC requirements.

export const works = pgTable("works", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  budget: text("budget").notNull(), // e.g., "R$ 2.4 Milhões"
  status: text("status").notNull(), // e.g., "Planned", "In Progress"
  coordinates: jsonb("coordinates").notNull(), // GeoJSON or array of points for polygon
  type: text("type").notNull(), // "paving", "construction", etc.
});

export const issues = pgTable("issues", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(), // "High", "Critical"
  coordinates: jsonb("coordinates").notNull(), // Lat/Lng point
  type: text("type").notNull(), // "sewage", "flood"
});

export const finances = pgTable("finances", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // "Arrecadação", "Investimento", "Emendas Ocultas"
  amount: integer("amount").notNull(),
  period: text("period").notNull(), // e.g., "2023"
});

// === SCHEMAS ===
export const insertWorkSchema = createInsertSchema(works);
export const insertIssueSchema = createInsertSchema(issues);
export const insertFinanceSchema = createInsertSchema(finances);

// === TYPES ===
export type Work = typeof works.$inferSelect;
export type Issue = typeof issues.$inferSelect;
export type Finance = typeof finances.$inferSelect;

export type InsertWork = z.infer<typeof insertWorkSchema>;
export type InsertIssue = z.infer<typeof insertIssueSchema>;
export type InsertFinance = z.infer<typeof insertFinanceSchema>;

// === MOCK DATA CONSTANTS (To be used by frontend and backend) ===
// We define them here so they can be shared/referenced if needed, 
// though typically frontend might consume them via API.

export const MOCK_BIMBO_LIMAO_CENTER = [-23.5097, -46.6669]; // Approx Bairro do Limão, SP
