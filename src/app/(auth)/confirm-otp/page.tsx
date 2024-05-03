"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

import { useSearchParams, redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Icons } from "@/components/global/icons";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const ConfirmOtpPage = () => {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;

  const [loading, setLoading] = useState(false);

  if (!email) {
    return redirect("/");
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: data.pin,
      type: "email",
    });

    if (error) {
      throw new Error(error.message);
    }

    setLoading(false);
    router.replace("/dashboard");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-2/3 flex-col items-center space-y-6"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
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
              <h2>OTP Verification</h2>
              <FormDescription className="max-w-[40ch] text-center">
                Please enter the one-time password sent to{" "}
                <span className="font-extrabold">{email}</span>.
              </FormDescription>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
        <Link href={"/login"}>
          <p className="text-sm underline">Back to login.</p>
        </Link>
      </form>
    </Form>
  );
};
export default ConfirmOtpPage;
