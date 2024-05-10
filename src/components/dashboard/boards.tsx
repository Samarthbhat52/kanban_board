"use client";

import { useBoardsListQuery } from "@/hooks/use-boards-query";
import useWorkspaceIdStore from "@/stores/workspaceIdStore";
import { Spinner } from "@/components/global/spinner";
import { Button } from "../ui/button";

const Boards = () => {
  const { workspaceId } = useWorkspaceIdStore();
  const { data, isLoading } = useBoardsListQuery({
    workspaceId: workspaceId!,
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h4>Boards</h4>
      {data?.length ? (
        data.map((board) => (
          <Button variant={"ghost"} className="space-x-2">
            <span>{board.logo}</span>
            <span className="line-clamp-1">{board.name}</span>
          </Button>
        ))
      ) : (
        <p className="rounded-sm bg-muted p-2 text-center text-sm text-muted-foreground">
          No boards created, create a baord to get started.
        </p>
      )}
      <Button>+ Create a board</Button>
    </div>
  );
};
export default Boards;
