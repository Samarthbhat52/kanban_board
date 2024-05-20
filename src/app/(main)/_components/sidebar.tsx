"use client";

import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { useLocalStorage } from "usehooks-ts";
import { Workspace, NavItem } from "./nav-item";
import { usePathname } from "next/navigation";

import CreateWorkspaceForm from "@/app/(main)/_components/create-workspace-form";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "@/actions/workspaces";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

  const pathname = usePathname();

  // const { data: WorkspaceList, isLoading: isWspLoading } = useWorkspaceQuery();

  const {
    data: WorkspaceList,
    isLoading: isWspLoading,
    error,
  } = useQuery({
    queryKey: ["workspace"],
    queryFn: () => getWorkspaces(),
  });

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

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Workspaces</p>
        <CreateWorkspaceForm>
          <div className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            <Plus className="h-4 w-4" />
          </div>
        </CreateWorkspaceForm>
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
