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
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

interface CreateBoardFormProps {
  workspaceId: string;
  boardId?: string;
  logo?: string;
  title?: string;
  update?: string;
}

const CreateBoardForm = ({
  workspaceId,
  boardId,
  logo,
  title,
  update,
}: CreateBoardFormProps) => {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const [boardLogo, setBoardLogo] = useState(logo || "🐹");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: title || "",
    },
  });

  const { mutate: createBoard } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await supabase
        .from("boards")
        .insert({ ...values, logo: boardLogo, workspace_id: workspaceId });
    },
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

  const { mutate: updateBoard } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await supabase
        .from("boards")
        .insert({ ...values, logo: boardLogo, workspace_id: workspaceId })
        .eq("id", boardId!);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      form.reset();
      toast.success("Board successfully updated");
    },
    onError: () => {
      toast.error("Error while updating board. Please try again.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    update ? updateBoard(values) : createBoard(values);
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
