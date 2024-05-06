"use client";

import * as React from "react";

import useWorkspaceIdStore from "@/stores/workspaceIdStore";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import CreateWorkspaceForm from "@/components/dashboard/create-workspace-form";
import useWorkspaceQuery from "@/hooks/use-workspace-query";
import { Spinner } from "@/components/global/spinner";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export function WorkspaceSwitcher() {
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] =
    React.useState(false);
  const { workspaceId, setWorkspaceId } = useWorkspaceIdStore();

  const { data: workspaces, isLoading } = useWorkspaceQuery();

  React.useEffect(() => {
    if (workspaces) {
      setWorkspaceId(workspaces[0]?.id);
    }
  }, [workspaces]);

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center sm:w-[240px]">
        <Spinner />
      </div>
    );

  return (
    <div
      className={cn(
        "w-[calc(100%-50px)] p-2 transition duration-300 ease-in-out group-hover/sidebar:w-[calc(100%-50px)] sm:w-full",
      )}
    >
      <Dialog
        open={showNewWorkspaceDialog}
        onOpenChange={setShowNewWorkspaceDialog}
      >
        <Select
          defaultValue={workspaces ? workspaces[0]?.id : ""}
          onValueChange={setWorkspaceId}
          onOpenChange={setSelectOpen}
          open={selectOpen}
        >
          <SelectTrigger aria-label="Select Workspace">
            <SelectValue placeholder="Select a workspace">
              <div className="flex gap-2">
                <span>
                  {
                    workspaces?.find(
                      (workspace) => workspace.id === workspaceId,
                    )?.logo
                  }
                </span>
                <span className="line-clamp-1 text-start">
                  {
                    workspaces?.find(
                      (workspace) => workspace.id === workspaceId,
                    )?.title
                  }
                </span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {workspaces?.map((workspace) => (
                <SelectItem key={workspace.id} value={workspace.id}>
                  <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                    <span>{workspace.logo}</span>
                    <span className="line-clamp-1">{workspace.title}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
            <Separator className="my-2" />
            <SelectGroup>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectOpen(false);
                    setShowNewWorkspaceDialog(true);
                  }}
                  className="w-full"
                >
                  <PlusCircledIcon className="mr-2 h-5 w-5" />
                  Create Workspace
                </Button>
              </DialogTrigger>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create workspace</DialogTitle>
            <DialogDescription>
              Add a new workspace to manage boards and tasks.
            </DialogDescription>
          </DialogHeader>
          <CreateWorkspaceForm />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewWorkspaceDialog(false)}
            >
              Cancel
            </Button>
            <Button
              form="createWorkspace"
              type="submit"
              onClick={() => setShowNewWorkspaceDialog(false)}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
