"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SeparatorWithLabel } from "@/components/global/SeparatorWithLabel";
import { SocialButtons } from "@/components/auth/socials";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "@/components/global/spinner";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email().min(1, { message: "Email is a required field" }),
});

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
    });

    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }

    setLoading(false);
    router.push(`/confirm-otp?email=${values.email}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading && (
            <div className="mr-2">
              <Spinner size="sm" />
            </div>
          )}
          Login
        </Button>

        <SeparatorWithLabel label="OR" />
        <SocialButtons />
      </form>
    </Form>
  );
}
