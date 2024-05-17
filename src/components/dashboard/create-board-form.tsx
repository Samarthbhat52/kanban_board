"use client";

import { z } from "zod";
import EmojiPicker from "@/components/global/emoji-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { createBoard } from "@/actions/boards";

const createBoardFormSchema = z.object({
  name: z.string().min(2).max(50),
});

interface CreateBoardFormProps {
  workspaceId: string;
  boardId?: number;
  logo?: string;
  title?: string;
}

const CreateBoardForm = ({
  workspaceId,
  boardId,
  logo,
  title,
}: CreateBoardFormProps) => {
  const queryClient = useQueryClient();
  const [boardLogo, setBoardLogo] = useState(logo || "🐹");

  const form = useForm<z.infer<typeof createBoardFormSchema>>({
    resolver: zodResolver(createBoardFormSchema),
    defaultValues: {
      name: title || "",
    },
  });

  const { mutate: server_mutateBoard } = useMutation({
    mutationFn: createBoard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      form.reset();
      toast.success("Board successfully created");
    },
    onError: () => {
      toast.error("Error while creating board. Please try again.");
    },
  });

  function onSubmit(values: z.infer<typeof createBoardFormSchema>) {
    server_mutateBoard({
      name: values.name,
      logo: boardLogo,
      workspaceId: workspaceId,
      boardId: boardId,
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="createBoard"
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">
              <EmojiPicker getValue={(emoji) => setBoardLogo(emoji)}>
                {boardLogo}
              </EmojiPicker>
            </div>
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
          </div>
        </form>
      </Form>
    </>
  );
};
export default CreateBoardForm;
