"use client";

import BlankSpace from "@/components/boards/blank-space";

import { useBoardExistsQuery } from "@/hooks/use-boards-query";
import useWorkspaceIdStore from "@/stores/workspaceIdStore";
import { Spinner } from "@/components/global/spinner";

const page = () => {
  const { workspaceId } = useWorkspaceIdStore();
  const { data, isLoading } = useBoardExistsQuery(workspaceId);

  if (!workspaceId || isLoading) return <Spinner size="lg" />;
  if (!data) return <BlankSpace />;

  return <div>Dashboard</div>;
};

export default page;
