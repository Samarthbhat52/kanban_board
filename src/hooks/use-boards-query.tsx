import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function useBoardExistsQuery(workspaceId: string | undefined) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["boards", "exists", workspaceId],
    queryFn: async () => {
      if (workspaceId) {
        const { count, error } = await supabase
          .from("boards")
          .select("id", { count: "exact", head: true })
          .eq("workspace_id", workspaceId)
          .order("created_at", { ascending: false });

        if (error) throw new Error(error.message);

        if (!count || count == 0) return false;

        return true;
      }
      return false;
    },
  });
}

export function useBoardsListQuery(workspaceId: string | undefined) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["boards", "list", workspaceId],
    queryFn: async () => {
      if (workspaceId) {
        const { data, error } = await supabase
          .from("boards")
          .select("name, logo, id")
          .eq("workspace_id", workspaceId)
          .order("created_at", { ascending: false });

        if (error)
          toast.error("something went wrong. Please try reloading the page.");

        return data || [];
      }
      return [];
    },
  });
}
