"use client";

import useWorkspaceIdStore from "@/stores/workspaceIdStore";
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

const BoardsList = () => {
  const { workspaceId } = useWorkspaceIdStore();

  return (
    <div className="flex flex-1 flex-col gap-4">
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
