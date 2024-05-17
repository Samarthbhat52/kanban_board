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
  workspaceId: string;
  boardId?: number | undefined;
}

export const createBoard = async ({
  name,
  logo,
  workspaceId,
  boardId,
}: createBoardProps) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("boards")
    .upsert({ id: boardId, name, logo, workspace_id: workspaceId });

  if (error) throw new Error(error.message);

  return data;
};
