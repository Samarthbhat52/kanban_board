import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex h-[calc(100dvh)] w-full items-center justify-center p-2">
      {children}
    </div>
  );
};

export default AuthLayout;
