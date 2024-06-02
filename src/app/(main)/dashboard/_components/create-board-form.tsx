"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import PriorityTag from "./priority-tag";
import { createBoard } from "@/actions/boards";
import { Spinner } from "@/components/global/spinner";
import ProgressTag from "./progress-tag";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const mutateBoardFormSchema = z.object({
  name: z.string().min(2).max(50),
  status: z.enum(["todo", "inProgress", "completed"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  due_date: z.date({
    required_error: "A due date is required.",
  }),
});

interface CreateBoardComponentProps {
  children: React.ReactNode;
  workspaceId: string;
  boardId?: string;
  formValues?: z.infer<typeof mutateBoardFormSchema>;
}

const MutateBoardComponent = ({
  children,
  workspaceId,
  boardId,
  formValues,
}: CreateBoardComponentProps) => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof mutateBoardFormSchema>>({
    resolver: zodResolver(mutateBoardFormSchema),
    defaultValues: {
      name: formValues?.name || "",
      priority: formValues?.priority || "low",
      status: formValues?.status || "todo",
    },
  });

  const { mutate: server_mutateBoard, isPending } = useMutation({
    mutationFn: createBoard,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      setDialogOpen(false);
      toast.success("Board successfully created");
    },
    onError: () => {
      toast.error("Error while creating board. Please try again.");
    },
  });

  function onSubmit(values: z.infer<typeof mutateBoardFormSchema>) {
    server_mutateBoard({
      ...values,
      workspace_id: workspaceId,
      due_date: values.due_date.toISOString(),
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
                  <FormLabel>Board Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">
                          <PriorityTag priority={"low"} />
                        </SelectItem>
                        <SelectItem value="medium">
                          <PriorityTag priority={"medium"} />
                        </SelectItem>
                        <SelectItem value="high">
                          <PriorityTag priority={"high"} />
                        </SelectItem>
                        <SelectItem value="critical">
                          <PriorityTag priority={"critical"} />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="todo">
                          <ProgressTag progress={"todo"} />
                        </SelectItem>
                        <SelectItem value="inProgress">
                          <ProgressTag progress={"inProgress"} />
                        </SelectItem>
                        <SelectItem value="completed">
                          <ProgressTag progress={"completed"} />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

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
