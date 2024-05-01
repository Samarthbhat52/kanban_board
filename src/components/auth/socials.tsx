"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const SocialButtons = () => {
  //   const loginWithGoogle = () => {
  //     supabase.auth.signInWithOAuth({
  //       provider: "google",
  //       options: {
  //         redirectTo: `${location.origin}/auth/callback`,
  //       },
  //     });
  //   };
  //   const loginWithGitHub = () => {
  //     supabase.auth.signInWithOAuth({
  //       provider: "github",
  //       options: {
  //         redirectTo: `${location.origin}/auth/callback`,
  //       },
  //     });
  //   };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        type="button"
        size="lg"
        className="w-full"
        variant="secondary"
        // onClick={loginWithGoogle}
      >
        <FcGoogle size={22} />
      </Button>
      <Button
        type="button"
        size="lg"
        className="w-full"
        variant="secondary"
        // onClick={loginWithGitHub}
      >
        <FaGithub size={22} />
      </Button>
    </div>
  );
};
