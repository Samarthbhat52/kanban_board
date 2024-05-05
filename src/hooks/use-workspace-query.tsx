import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

function useWorkspaceQuery() {
  const queryKey = ["workspace"];
  const supabase = createClient();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspaces")
        .select("id, title, logo")
        .throwOnError();

      if (error) toast.error("Something went wrong. Please try reloading.");

      return data || [];
    },
    gcTime: 20000,
  });
}

export default useWorkspaceQuery;
