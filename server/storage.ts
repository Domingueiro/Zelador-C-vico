
import { db } from "./db";
import { works, issues, finances, type Work, type Issue, type Finance, type InsertWork, type InsertIssue, type InsertFinance } from "@shared/schema";

export interface IStorage {
  getWorks(): Promise<Work[]>;
  getIssues(): Promise<Issue[]>;
  getFinances(): Promise<Finance[]>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getWorks(): Promise<Work[]> {
    return await db.select().from(works);
  }

  async getIssues(): Promise<Issue[]> {
    return await db.select().from(issues);
  }

  async getFinances(): Promise<Finance[]> {
    return await db.select().from(finances);
  }

  async seedData(): Promise<void> {
    const existingWorks = await this.getWorks();
    if (existingWorks.length === 0) {
      // Seed Works
      await db.insert(works).values([
        {
          title: "Obra de Pavimentação e Novo Empreendimento",
          description: "Recapeamento total e nova via de acesso.",
          budget: "R$ 2.4 Milhões",
          status: "Planned",
          type: "paving",
          coordinates: [
            [-23.5085, -46.6675],
            [-23.5085, -46.6655],
            [-23.5105, -46.6655],
            [-23.5105, -46.6675]
          ]
        }
      ]);

      // Seed Issues
      await db.insert(issues).values([
        {
          title: "Saturação de Rede de Esgoto",
          description: "Rede antiga colapsada.",
          severity: "Critical",
          type: "sewage",
          coordinates: [-23.5095, -46.6665]
        },
        {
          title: "Histórico de Alagamentos",
          description: "Área de várzea sem drenagem.",
          severity: "High",
          type: "flood",
          coordinates: [-23.5092, -46.6662]
        },
        {
          title: "Vazamento Crônico",
          description: "Infiltração no subsolo.",
          severity: "Medium",
          type: "sewage",
          coordinates: [-23.5098, -46.6668]
        }
      ]);

      // Seed Finances
      await db.insert(finances).values([
        { category: "Arrecadação do Bairro", amount: 15000000, period: "2024" },
        { category: "Investimento Recebido", amount: 2400000, period: "2024" },
        { category: "Emendas Ocultas", amount: 5000000, period: "2024" },
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
