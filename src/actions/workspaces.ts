"use server";

import { createClient } from "@/lib/supabase/server";

export const getWorkspaces = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("id, logo, title")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
};
