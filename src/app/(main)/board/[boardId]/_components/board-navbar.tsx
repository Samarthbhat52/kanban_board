import { Tables } from "@/lib/supabase/supabase.types";

interface BoardNavbarProps {
  boardData: Tables<"boards">;
}

const BoardNavbar = ({ boardData }: BoardNavbarProps) => {
  return <div></div>;
};
export default BoardNavbar;
