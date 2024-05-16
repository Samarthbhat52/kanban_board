"use client";

import { Button } from "@/components/ui/button";
import { useBoardsListQuery } from "@/hooks/use-boards-query";

const BoardsList = ({ workspaceId }: { workspaceId: string }) => {
  const { data, isLoading } = useBoardsListQuery(workspaceId);

  return (
    <>
      {data?.map((board) => (
        <Button
          variant="ghost"
          key={board.id}
          className="h-28 w-full rounded-md border p-3"
        >
          <p className="flex items-center gap-2 capitalize">
            <span className="text-lg">{board.logo}</span>
            {board.name}
          </p>
        </Button>
      ))}
    </>
  );
};
export default BoardsList;
