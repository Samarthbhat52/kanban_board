import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";

const WorkspaceLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("title, logo, created_at")
    .eq("id", params.workspaceId)
    .single();

  if (error || !data) {
    notFound();
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
      {children}
    </div>
  );
};
export default WorkspaceLayout;
