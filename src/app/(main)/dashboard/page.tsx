"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const page = () => {
  const supabase = createClient();

  return (
    <div>
      <Button onClick={() => supabase.auth.signOut()}>Sign out</Button>
    </div>
  );
};
export default page;
