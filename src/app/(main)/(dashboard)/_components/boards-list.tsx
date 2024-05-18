"use client";

import { getBoards } from "@/actions/boards";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/board/${board.id}`}
                key={board.id}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-28 w-full rounded-md border p-3",
                )}
              >
                <p className="line-clamp-1 flex items-center gap-2 capitalize">
                  <span className="text-lg">{board.logo}</span>
                  {board.name}
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
