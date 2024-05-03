import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return redirect("/");
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
};

export default MainLayout;
