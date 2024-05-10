"use client";

import Image from "next/image";

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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Image
            src="/logo-dark.svg"
            width="150"
            height="80"
            alt="Logo"
            className="w-200 mx-auto dark:hidden"
          />
          <Image
            src="/logo-light.svg"
            width="150"
            height="80"
            alt="Logo"
            className="w-200 mx-auto hidden dark:block"
          />
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-center text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-5"
            >
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
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://vsxovmocmtqxdqbjgwou.supabase.co/storage/v1/object/public/Assets/login-dark.png?t=2024-05-03T03%3A39%3A49.201Z"
          alt="Image"
          width="1920"
          height="1080"
          className="h-[calc(100dvh)] w-full bg-background object-contain dark:hidden"
        />
        <Image
          src="https://vsxovmocmtqxdqbjgwou.supabase.co/storage/v1/object/public/Assets/login-light.png?t=2024-05-03T03%3A36%3A54.061Z"
          alt="Image"
          width="1920"
          height="1080"
          className="text-red hidden h-[calc(100dvh)] w-full bg-background object-contain dark:block"
        />
      </div>
    </div>
  );
}
