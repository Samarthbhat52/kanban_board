import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b p-2 shadow-sm">
      {/* TODO: Implement mobile sidebar */}

      <div className="flex items-center gap-x-4">
        <div className="hidden md:block">
          <Logo />
        </div>
        <Button>
          <span className="hidden md:block">Create</span>{" "}
          <span className="md:hidden">+</span>{" "}
        </Button>
      </div>
      <div>
        {/* TODO: Add avatar from supabase */}
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
export default Navbar;
