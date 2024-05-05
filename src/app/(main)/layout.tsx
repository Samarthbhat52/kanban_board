import DashboardSetup from "@/components/dashboard/dashboard-setup";
import Sidebar from "@/components/dashboard/sidebar";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return redirect("/");
  }

  const { data: workspaceData, error: workspaceError } = await supabase
    .from("workspaces")
    .select("id, title, logo")
    .throwOnError()
    .maybeSingle();

  if (workspaceError)
    toast.error("Something went wrong. Please try again later.");

  if (!workspaceData)
    return (
      <div className="flex h-full w-full items-start justify-center pt-2 sm:items-center sm:pt-0">
        <DashboardSetup />
      </div>
    );

  return (
    <div className="flex h-full bg-background">
      <Sidebar />
      <Separator orientation="vertical" className="hidden sm:block" />
      <div className="flex h-full flex-1 items-center justify-center overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
