"use client";

import * as React from "react";

import useWorkspaceIdStore from "@/stores/workspaceIdStore";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WoskspaceProps {
  workspaces: {
    id: string;
    title: string;
    logo: string | null;
  }[];
}

export function WorkspaceSwitcher({ workspaces }: WoskspaceProps) {
  const { workspaceId, setWorkspaceId } = useWorkspaceIdStore();

  React.useEffect(() => {
    setWorkspaceId(workspaces[0]?.id);
  }, []);

  return (
    <div
      className={cn(
        "w-[calc(100%-50px)] p-2 transition duration-300 ease-in-out group-hover/sidebar:w-[calc(100%-50px)] sm:w-full",
      )}
    >
      <Select defaultValue={workspaces[0]?.id} onValueChange={setWorkspaceId}>
        <SelectTrigger aria-label="Select Workspace">
          <SelectValue placeholder="Select a workspace">
            <div className="flex gap-2">
              <span>
                {
                  workspaces.find((workspace) => workspace.id === workspaceId)
                    ?.logo
                }
              </span>
              <span className="line-clamp-1 text-start">
                {
                  workspaces.find((workspace) => workspace.id === workspaceId)
                    ?.title
                }
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {workspaces.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                <span>{workspace.logo}</span>
                <span className="line-clamp-1">{workspace.title}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
