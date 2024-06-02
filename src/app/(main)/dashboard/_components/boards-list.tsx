"use client";

import { getBoards } from "@/actions/boards";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import PriorityTag from "./priority-tag";
import ProgressTag from "./progress-tag";

const BoardsList = ({ workspaceId }: { workspaceId: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["boards", "list", workspaceId],
    queryFn: () => getBoards(workspaceId),
  });

  if (isLoading) {
    return (
      <>
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </>
    );
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      {data?.map((board) => (
        <TooltipProvider key={board.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/board/${board.id}`}
                key={board.id}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex h-28 w-full flex-col items-start justify-between gap-3 rounded-md border p-3",
                )}
              >
                <div className="flex h-full w-full flex-col gap-3">
                  <div className="flex gap-2">
                    <ProgressTag progress={board.status} />
                    <PriorityTag priority={board.priority} />
                  </div>
                  <p className="text-wrap font-semibold capitalize">
                    {board.name}
                  </p>
                </div>
                <p className="flex items-center gap-1 text-[14px] text-muted-foreground">
                  <CalendarDays className="h-3 w-3 pb-0.5" />
                  Due Date: {dayjs(board.due_date).format("D MMM, YYYY")}
                </p>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{board.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
};
export default BoardsList;
