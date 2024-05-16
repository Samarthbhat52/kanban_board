"use client";

import useWorkspaceIdStore from "@/stores/workspaceIdStore";
import { Button } from "@/components/ui/button";
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

import CreateBoardForm from "../../../../components/dashboard/create-board-form";

const CreateBoardComponent = ({
  children,
  workspaceId,
}: {
  children: React.ReactNode;
  workspaceId: string;
}) => {
  // const { workspaceId } = useWorkspaceIdStore();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
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
  );
};
export default CreateBoardComponent;
