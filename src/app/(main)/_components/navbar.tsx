import Logo from "@/components/global/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b bg-background p-4 shadow-sm">
      <MobileSidebar />

      <div className="hidden md:block">
        <Logo />
      </div>

      <div>
        {/* // TODO: Add avatar from supabase // */}
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
export default Navbar;
