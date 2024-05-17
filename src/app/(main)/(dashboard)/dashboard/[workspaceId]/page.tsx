import { Separator } from "@/components/ui/separator";
import { PlusCircle, User2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import BoardsList from "../../_components/boards-list";
import { redirect } from "next/navigation";
import CreateBoardComponent from "../../_components/create-board";
import dayjs from "dayjs";

const DashboardPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("title, logo, created_at")
    .eq("id", params.workspaceId)
    .single();

  if (error || !data) {
    return redirect("/");
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-4xl">{data.logo}</span>
        <div className="flex flex-col justify-between">
          <h3 className="capitalize">{data.title}</h3>
          <p className="text-sm italic text-muted-foreground">
            Created on: {dayjs(data.created_at).format("D MMM, YYYY")}
          </p>
        </div>
      </div>

      <Separator />
      <div className="flex items-center gap-2">
        <User2 className="h-5 w-5" />
        <h3>Your Boards</h3>
      </div>

      <div className="grid grid-cols-1 items-center justify-center gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CreateBoardComponent workspaceId={params.workspaceId}>
          <div className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-md bg-muted p-3">
            Create a board
            <PlusCircle />
          </div>
        </CreateBoardComponent>
        <BoardsList workspaceId={params.workspaceId} />
      </div>
    </div>
  );
};

export default DashboardPage;
