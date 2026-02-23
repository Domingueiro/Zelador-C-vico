import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Using the generated API routes
export function useWorks() {
  return useQuery({
    queryKey: [api.works.list.path],
    queryFn: async () => {
      const res = await fetch(api.works.list.path);
      if (!res.ok) throw new Error("Failed to fetch works");
      return api.works.list.responses[200].parse(await res.json());
    },
  });
}

export function useIssues() {
  return useQuery({
    queryKey: [api.issues.list.path],
    queryFn: async () => {
      const res = await fetch(api.issues.list.path);
      if (!res.ok) throw new Error("Failed to fetch issues");
      return api.issues.list.responses[200].parse(await res.json());
    },
  });
}

export function useFinances() {
  return useQuery({
    queryKey: [api.finances.list.path],
    queryFn: async () => {
      const res = await fetch(api.finances.list.path);
      if (!res.ok) throw new Error("Failed to fetch finances");
      return api.finances.list.responses[200].parse(await res.json());
    },
  });
}
