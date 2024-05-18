"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SyncLoader } from "react-spinners";
import { useTheme } from "next-themes";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker from "../../../components/global/emoji-picker";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { createWorkspace } from "@/actions/workspaces";

const formSchema = z.object({
  title: z.string().min(2).max(50),
});

const OnboardingForm = () => {
  const [step, setStep] = useState<number>(1);
  const [logo, setLogo] = useState("🐱");

  const router = useRouter();
  const queryClient = useQueryClient();
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const stepOneSubmit = () => {
    setStep(2);
  };

  const stepTwoSubmit = (values: z.infer<typeof formSchema>) => {
    server_mutateWsp({ title: values.title, logo: logo });
  };

  const { mutate: server_mutateWsp, isPending: isCreateWspPending } =
    useMutation({
      mutationFn: createWorkspace,
      onSuccess: async (data) => {
        await queryClient.refetchQueries({ queryKey: ["workspace"] });
        router.refresh();
        toast.success("Workspace successfully created");
      },
      onError: () => {
        toast.error("Error while creating Workspace. Please try again.");
      },
    });

  const goBack = () => {
    setStep(1);
  };

  return (
    <div className="flex h-full w-full max-w-[1920px] items-start justify-center pt-2 sm:items-center sm:pt-0">
      <div
        aria-hidden="true"
        className="sm:-top-30 pointer-events-none absolute inset-x-0 -top-40 -z-10 h-full w-full transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="mx-2 flex h-full w-full flex-col items-center justify-center sm:w-4/5"
      >
        {step == 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            <h1 className="mb-10 text-4xl uppercase">
              Hey 👋 , Let's add your first workspace
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(stepOneSubmit)}
                id="createWorkspace"
                className="flex flex-col items-center gap-10"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Workspace Name"
                          {...field}
                          className="h-20 w-full self-center border-primary bg-transparent text-3xl focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isCreateWspPending}>
                  Continue
                </Button>
              </form>
            </Form>
          </motion.div>
        )}

        {step == 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            <h1 className="mb-10 text-4xl uppercase">
              Let's pick an emoji 😄 for your workspace
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(stepTwoSubmit)}
                id="createWorkspace"
                className="flex flex-col items-center gap-10"
              >
                <div className="text-8xl">
                  <EmojiPicker getValue={(emoji) => setLogo(emoji)}>
                    {logo}
                  </EmojiPicker>
                </div>

                <div className="mb-10 flex w-full justify-between sm:w-4/5">
                  <Button variant="secondary" type="button" onClick={goBack}>
                    <ArrowLeft className="mr-2" /> Go Back
                  </Button>
                  <Button type="submit">Create</Button>
                </div>
                {isCreateWspPending && (
                  <div className="flex items-center gap-3">
                    <SyncLoader color={theme === "dark" ? "#fff" : "black"} />
                    <span>Your workspace is getting ready</span>
                  </div>
                )}
              </form>
            </Form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
export default OnboardingForm;
