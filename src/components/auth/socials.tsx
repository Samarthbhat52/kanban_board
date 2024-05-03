"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { Icons } from "@/components/global/icons";

export const SocialButtons = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    setLoading(true);

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/callback`,
      },
    });

    setLoading(false);
  };
  const loginWithGitHub = async () => {
    setLoading(true);

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/callback`,
      },
    });

    setLoading(false);
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
        {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
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
        {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        <FaGithub size={22} />
        <p>Login with GitHub</p>
      </Button>
    </div>
  );
};
