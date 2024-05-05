import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface boardsListProps {
  workspaceId: string;
}

export function useBoardsListQuery({ workspaceId }: boardsListProps) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["boards", "list", workspaceId],
    queryFn: async () => {
      if (workspaceId) {
        const { data, error } = await supabase
          .from("boards")
          .select("name, logo, id")
          .eq("workspace_id", workspaceId);

        if (error)
          toast.error("something went wrong. Please try reloading the page.");

        return data || [];
      }
      return [];
    },
  });
}
