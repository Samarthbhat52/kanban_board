"use client";

import { useMobileSidebar } from "@/stores/mobileSidebarStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

const MobileSidebar = () => {
  const pathname = usePathname();

  // Used to prevent hydration warnings/errors
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Closes the sidebar whenever the path changes.
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-20">
          <Sidebar storageKey="b-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};
export default MobileSidebar;
