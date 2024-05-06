import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

function useWorkspaceQuery() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["workspace"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspaces")
        .select("id, title, logo")
        .order("created_at", { ascending: false })
        .throwOnError();

      if (error) toast.error("Something went wrong. Please try reloading.");

      if (data) {
        return data;
      }
      return [];
    },
  });
}

export default useWorkspaceQuery;
