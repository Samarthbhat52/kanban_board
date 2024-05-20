"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { createBoard } from "@/actions/boards";
import { Spinner } from "@/components/global/spinner";

const mutateBoardFormSchema = z.object({
  name: z.string().min(2).max(50),
});

interface CreateBoardComponentProps {
  children: React.ReactNode;
  workspaceId: string;
  boardId?: string;
  title?: string;
}

const MutateBoardComponent = ({
  children,
  workspaceId,
  boardId,
  title,
}: CreateBoardComponentProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof mutateBoardFormSchema>>({
    resolver: zodResolver(mutateBoardFormSchema),
    defaultValues: {
      name: title || "",
    },
  });

  const { mutate: server_mutateBoard, isPending } = useMutation({
    mutationFn: createBoard,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      setDialogOpen(false);
      router.replace(`/board/${data[0]?.id}`);
      toast.success("Board successfully created");
    },
    onError: () => {
      toast.error("Error while creating board. Please try again.");
    },
  });

  function onSubmit(values: z.infer<typeof mutateBoardFormSchema>) {
    server_mutateBoard({
      name: values.name,
      workspace_id: workspaceId,
      id: boardId,
    });
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new board</DialogTitle>
          <DialogDescription>
            Create a new board to manage your tasks
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="createBoard"
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Board Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button form="createBoard" type="submit">
            {isPending && (
              <div className="mr-2">
                <Spinner size="sm" />
              </div>
            )}
            Create
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default MutateBoardComponent;
