import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

function useWorkspaceQuery() {
  const queryKey = ["workspace"];
  const supabase = createClient();

  return useQuery({
    queryKey,
    queryFn: async () =>
      await supabase
        .from("workspaces")
        .select("id")
        .throwOnError()
        .maybeSingle(),
  });
}

export default useWorkspaceQuery;
