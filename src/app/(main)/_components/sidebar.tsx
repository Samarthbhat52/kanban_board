"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { useLocalStorage } from "usehooks-ts";
import { useState } from "react";
import useWorkspaceQuery from "@/hooks/use-workspace-query";
import { Workspace, NavItem } from "./nav-item";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateWorkspaceForm from "@/components/dashboard/create-workspace-form";

interface SidebarProps {
  // Used to keep track of the open states of accordions in the sidebar.
  // Corrosponds to the key stored in local storage.
  storageKey?: string;
}

const Sidebar = ({ storageKey = "b-sidebar-state" }: SidebarProps) => {
  // Used to store the expanded state of accordions in local storage,
  // Stores a key value pair.
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

  // Manage dialog open states
  const [dialogOpen, setDialogOpen] = useState(false);

  // Checks all the accordions to see which has the value of expanded.
  const defautAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    [],
  );

  // When clicking on an accordion, set the expanded state to the opposite of what it previously was.
  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  const { data: WorkspaceList, isLoading: isWspLoading } = useWorkspaceQuery();
  const pathname = usePathname();

  if (isWspLoading) {
    return (
      <>
        <div className="mb-2 flex items-start justify-between">
          <Skeleton className="h-8 w-[50%]" />
          <Skeleton className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Workspaces</p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create workspace</DialogTitle>
              <DialogDescription>
                Add a new workspace to manage boards and tasks.
              </DialogDescription>
            </DialogHeader>
            <CreateWorkspaceForm />
            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                form="createWorkspace"
                type="submit"
                onClick={() => setDialogOpen(false)}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defautAccordionValue}
        className="mt-4 space-y-2"
      >
        {WorkspaceList?.map((workspace) => (
          <NavItem
            isActive={pathname == `/dashboard/${workspace.id}`}
            key={workspace.id}
            isExpanded={expanded[workspace.id]}
            workspace={workspace as Workspace}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
export default Sidebar;
