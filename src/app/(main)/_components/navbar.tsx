import Logo from "@/components/global/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileSidebar from "./mobile-sidebar";
import CreateWorkspaceForm from "@/app/(main)/(dashboard)/_components/create-workspace-form";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b bg-background p-4 shadow-sm">
      <div className="flex items-center gap-x-4">
        <MobileSidebar />
        <div className="hidden md:block">
          <Logo />
        </div>
        <CreateWorkspaceForm>
          <div
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            <span className="hidden md:block">Create</span>{" "}
            <span className="md:hidden">+</span>{" "}
          </div>
        </CreateWorkspaceForm>
      </div>
      <div>
        {/* // TODO: Add avatar from supabase // */}
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
export default Navbar;
