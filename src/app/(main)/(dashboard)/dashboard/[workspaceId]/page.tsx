import { PlusCircle, User2 } from "lucide-react";
import BoardsList from "../../_components/boards-list";
import MutateBoardComponent from "../../_components/create-board-form";

const DashboardPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <User2 className="h-5 w-5" />
        <h3>Your Boards</h3>
      </div>

      <div className="grid grid-cols-1 items-center justify-center gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <MutateBoardComponent workspaceId={params.workspaceId}>
          <div className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-md bg-muted p-3">
            Create a board
            <PlusCircle />
          </div>
        </MutateBoardComponent>
        <BoardsList workspaceId={params.workspaceId} />
      </div>
    </>
  );
};

export default DashboardPage;
