"use client";

import { useBoardsListQuery } from "@/hooks/use-boards-query";
import useWorkspaceIdStore from "@/stores/workspaceIdStore";
import { Spinner } from "@/components/global/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import CreateBoardForm from "./create-board-form";
import { useEffect } from "react";
import useBoardIdStore from "@/stores/boardsIdStore";

const BoardsList = () => {
  const { workspaceId } = useWorkspaceIdStore();
  const { data, isLoading } = useBoardsListQuery(workspaceId);
  const { boardId, setBoardId } = useBoardIdStore();

  useEffect(() => {
    data && setBoardId(data[0]?.id);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner size="default" />
      </div>
    );

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h4>Boards</h4>
      {data?.length ? (
        data.map((board) => (
          <Button
            variant={boardId == board.id ? "secondary" : "ghost"}
            onClick={() => setBoardId(board.id)}
            key={board.id}
            className="justify-start gap-2"
          >
            <span>{board.logo}</span>
            <span className="line-clamp-1">{board.name}</span>
          </Button>
        ))
      ) : (
        <p className="rounded-sm bg-muted p-2 text-center text-sm text-muted-foreground">
          No boards created, create a baord to get started.
        </p>
      )}
      <Dialog>
        <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
          + Create a board
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new board</DialogTitle>
            <DialogDescription>
              Create a new board to manage your tasks
            </DialogDescription>
          </DialogHeader>

          <CreateBoardForm workspaceId={workspaceId!} />

          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="createBoard" type="submit">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default BoardsList;
