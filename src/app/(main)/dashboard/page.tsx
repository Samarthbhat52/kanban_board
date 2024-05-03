"use client";

import DashboardSetup from "@/components/dashboard/dashboard-setup";
import useWorkspaceQuery from "@/hooks/use-workspace-query";

const page = () => {
  const { data: workspace, isLoading } = useWorkspaceQuery();

  if (!workspace?.data) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <DashboardSetup />
      </div>
    );
  }

  return <div>home</div>;
};
export default page;
