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
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

interface CreateBoardFormProps {
  workspaceId: string;
}

const CreateBoardForm = ({ workspaceId }: CreateBoardFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();
  const [logo, setLogo] = useState("🐹");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await supabase
        .from("boards")
        .insert({ ...values, logo, workspace_id: workspaceId });
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
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
              <EmojiPicker getValue={(emoji) => setLogo(emoji)}>
                {logo}
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
