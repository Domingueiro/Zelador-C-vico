
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed data on startup
  await storage.seedData();

  app.get(api.works.list.path, async (req, res) => {
    const data = await storage.getWorks();
    res.json(data);
  });

  app.get(api.issues.list.path, async (req, res) => {
    const data = await storage.getIssues();
    res.json(data);
  });

  app.get(api.finances.list.path, async (req, res) => {
    const data = await storage.getFinances();
    res.json(data);
  });

  return httpServer;
}
