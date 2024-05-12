import Sidebar from "@/components/dashboard/sidebar";
import OnboardingForm from "@/components/onboarding/onboarding-form";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return redirect("/");
  }

  return (
    <div className="flex h-full flex-1 items-center justify-center overflow-y-auto">
      {children}
    </div>
  );
};

export default MainLayout;
