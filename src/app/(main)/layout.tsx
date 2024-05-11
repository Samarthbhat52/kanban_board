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

  const { data: workspaceData, error: workspaceError } = await supabase
    .from("workspaces")
    .select("id")
    .limit(1);

  if (workspaceError) throw new Error(workspaceError.message);

  if (!workspaceData.length) return <OnboardingForm />;

  return (
    <div className="flex h-[calc(100dvh)] bg-background">
      <Sidebar />
      <Separator orientation="vertical" className="hidden sm:block" />
      <div className="flex h-[calc(100dvh)] flex-1 items-center justify-center overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
