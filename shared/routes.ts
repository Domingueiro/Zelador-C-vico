
import { z } from 'zod';
import { insertWorkSchema, insertIssueSchema, insertFinanceSchema, works, issues, finances } from './schema';

export const errorSchemas = {
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  works: {
    list: {
      method: 'GET' as const,
      path: '/api/works' as const,
      responses: {
        200: z.array(z.custom<typeof works.$inferSelect>()),
      },
    },
  },
  issues: {
    list: {
      method: 'GET' as const,
      path: '/api/issues' as const,
      responses: {
        200: z.array(z.custom<typeof issues.$inferSelect>()),
      },
    },
  },
  finances: {
    list: {
      method: 'GET' as const,
      path: '/api/finances' as const,
      responses: {
        200: z.array(z.custom<typeof finances.$inferSelect>()),
      },
    },
  },
};
