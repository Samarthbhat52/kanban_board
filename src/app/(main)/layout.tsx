import OnboardingForm from "@/app/(main)/_components/onboarding-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

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
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
