"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CreateWorkspaceForm from "@/components/dashboard/create-workspace-form";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(500),
});

const DashboardSetup = () => {
  const router = useRouter();
  const queryClient = new QueryClient();
  const supabase = createClient();
  const [logo, setLogo] = useState("🐱");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await supabase.from("workspaces").insert({ ...values, logo });
    },
    onSuccess: async () => {
      toast.success("Workspace successfully created");
      router.refresh();
      queryClient.resetQueries({ queryKey: ["workspace"] });
    },
    onError: () => {
      toast.error("Error while creating Workspace. Please try again.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Card className="h-auto w-[400px]">
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Let's create a private workspace to get you started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateWorkspaceForm submitButton />
      </CardContent>
    </Card>
  );
};
export default DashboardSetup;
