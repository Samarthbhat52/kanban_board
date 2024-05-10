"use client";

import BlankSpace from "@/components/boards/blank-space";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const page = () => {
  const supabase = createClient();

  return <BlankSpace />;
};
export default page;
