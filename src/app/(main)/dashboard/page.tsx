"use client";

import BlankSpace from "@/components/boards/blank-space";

import { useBoardsListQuery } from "@/hooks/use-boards-query";
import useWorkspaceIdStore from "@/stores/workspaceIdStore";
import { Spinner } from "@/components/global/spinner";

const page = () => {
  const { workspaceId } = useWorkspaceIdStore();
  const { data, isLoading } = useBoardsListQuery(workspaceId);

  if (isLoading) return <Spinner size="lg" />;
  if (!data?.length) return <BlankSpace />;

  return <div>Dashboard</div>;
};
export default page;
