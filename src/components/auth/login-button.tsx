"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
  const router = useRouter();

  function onClick() {
    // TODO: Implement login flow with email
    console.log("Login flow with email");
  }

  return (
    <Button onClick={onClick} type="submit" className="w-full">
      Login
    </Button>
  );
};
