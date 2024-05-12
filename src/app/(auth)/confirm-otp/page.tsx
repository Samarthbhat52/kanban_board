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
import { toast } from "sonner";
import Logo from "@/components/global/logo";

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

  if (!email) {
    return redirect("/");
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const checkOTP = async () => {
      const { data: userdata, error } = await supabase.auth.verifyOtp({
        email,
        token: data.pin,
        type: "email",
      });

      if (error) {
        throw new Error(error.message);
      }

      return userdata;
    };

    toast.promise(checkOTP, {
      loading: "Verifying OTP",
      success: () => {
        router.replace("/dashboard");
        return `successfully logged in`;
      },
      error: "Something went wrong",
    });
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
              <Logo />
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

        <Button type="submit">Submit</Button>
        <Link href={"/login"}>
          <p className="text-sm underline">Back to login.</p>
        </Link>
      </form>
    </Form>
  );
};
export default ConfirmOtpPage;
