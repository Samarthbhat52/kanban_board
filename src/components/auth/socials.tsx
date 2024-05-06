"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export const SocialButtons = () => {
  const supabase = createClient();

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  };
  const loginWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Button
        type="button"
        size="lg"
        className="w-full space-x-2"
        variant="secondary"
        onClick={loginWithGoogle}
      >
        <FcGoogle size={22} />
        <p>Login with Google</p>
      </Button>
      <Button
        type="button"
        size="lg"
        className="w-full space-x-2"
        variant="secondary"
        onClick={loginWithGitHub}
      >
        <FaGithub size={22} />
        <p>Login with GitHub</p>
      </Button>
    </div>
  );
};
