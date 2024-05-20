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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { createWorkspace } from "@/actions/workspaces";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/global/spinner";

const formSchema = z.object({
  title: z.string().min(2).max(50),
});

interface CreateWorkspaceFormProps {
  children: React.ReactNode;
  icon?: string;
  title?: string;
  workspaceId?: string;
  update?: boolean;
}

const CreateWorkspaceForm = ({
  children,
  title,
  icon,
  workspaceId,
}: CreateWorkspaceFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [logo, setLogo] = useState(icon || "🐱");
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || "",
    },
  });

  const { mutate: server_mutateWsp, isPending: isCreateWspPending } =
    useMutation({
      mutationFn: createWorkspace,
      onSuccess: async (data) => {
        await queryClient.refetchQueries({ queryKey: ["workspace"] });
        router.replace(`/dashboard/${data?.id}`);
        toast.success("Workspace successfully created");
      },
      onError: () => {
        toast.error("Error while creating Workspace. Please try again.");
      },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    server_mutateWsp({ id: workspaceId, title: values.title, logo: logo });
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to manage your boards
          </DialogDescription>
        </DialogHeader>

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
          </form>
        </Form>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button
            form="createWorkspace"
            type="submit"
            onClick={() => setDialogOpen(false)}
          >
            {isCreateWspPending && (
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
export default CreateWorkspaceForm;
