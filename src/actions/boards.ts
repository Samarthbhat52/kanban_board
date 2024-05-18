"use server";

import { createClient } from "@/lib/supabase/server";

export const getBoards = async (workspaceId: string | undefined) => {
  const supabase = createClient();

  if (workspaceId) {
    const { data, error } = await supabase
      .from("boards")
      .select("name, logo, id")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data || [];
  }
  return [];
};

interface createBoardProps {
  name: string;
  logo: string;
  workspace_id: string;
  id?: number | undefined;
}

export const createBoard = async (values: createBoardProps) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("boards")
    .upsert(values)
    .select("id");

  if (error) throw new Error(error.message);

  return data;
};
