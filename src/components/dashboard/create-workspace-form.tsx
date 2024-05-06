"use client";

import { z } from "zod";
import EmojiPicker from "@/components/global/emoji-picker";
import { Spinner } from "@/components/global/spinner";
import { Button } from "@/components/ui/button";
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
  title: z.string().min(2).max(50),
});

interface CreateWorkspaceFormProps {
  submitButton?: boolean;
}

const CreateWorkspaceForm = ({
  submitButton = false,
}: CreateWorkspaceFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();
  const [logo, setLogo] = useState("🐱");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await supabase.from("workspaces").insert({ ...values, logo });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["workspace"] });
      toast.success("Workspace successfully created");
    },
    onError: () => {
      toast.error("Error while creating Workspace. Please try again.");
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
          id="createWorkspace"
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
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Workspace Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {submitButton && (
            <Button className="w-full" type="submit">
              {isPending && (
                <div className="mr-2">
                  <Spinner size="sm" />
                </div>
              )}
              Submit
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};
export default CreateWorkspaceForm;
