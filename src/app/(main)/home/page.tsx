"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const page = () => {
  const supabase = createClient();
  const router = useRouter();

  const signOutFunction = async () => {
    await supabase.auth.signOut();
    return router.replace("/");
  };

  return <Button onClick={signOutFunction}>Sign out</Button>;
};
export default page;
