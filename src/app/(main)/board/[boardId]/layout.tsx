import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import BoardNavbar from "./_components/board-navbar";

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .eq("id", params.boardId);

  if (error) throw new Error(error.message);

  if (!data.length) {
    notFound();
  }

  return (
    <div className="h-full">
      <BoardNavbar boardData={data[0]!} />
      {children}
    </div>
  );
};
export default BoardIdLayout;
