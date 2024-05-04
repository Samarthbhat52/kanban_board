"use client";

import DashboardSetup from "@/components/dashboard/dashboard-setup";
import useWorkspaceQuery from "@/hooks/use-workspace-query";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { WorkspaceSwitcher } from "@/components/dashboard/workspace-switcher";
import { ChevronLeft } from "lucide-react";

const page = () => {
  // const { data: workspace, isLoading } = useWorkspaceQuery();
  // const [isCollapsed, setIsCollapsed] = useState(false);

  // if (!workspace?.data?.length) {
  //   return (
  //     <div className="flex h-full w-full items-center justify-center bg-background">
  //       <DashboardSetup />
  //     </div>
  //   );
  // }

  // if (isLoading) return <div>loading</div>;

  return <div>home</div>;
};
export default page;
