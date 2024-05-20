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

interface CreateWorkspaceProps {
  title: string;
  logo: string;
  status?: "inProgress" | "todo" | "completed";
  priority?: "critical" | "high" | "medium" | "low";
  id?: string | undefined;
}

export const createWorkspace = async (values: CreateWorkspaceProps) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("workspaces")
    .upsert(values)
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};
