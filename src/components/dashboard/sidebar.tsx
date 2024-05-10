"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, Settings, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { WorkspaceSwitcher } from "./workspace-switcher";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Boards from "@/components/dashboard/boards";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 270) newWidth = 270;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "270px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 270px)",
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "270px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0px";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar flex h-[calc(100dvh)] w-[270px] flex-col justify-between overflow-y-auto p-2",
          isResetting && "transition-all duration-300 ease-in-out",
          isCollapsed && "p-0",
          isMobile && "w-0",
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between py-4">
            {/* <WorkspaceSwitcher /> */}
            <Image
              src="/logo-coloured.svg"
              width="150"
              height="80"
              alt="Logo"
              className="w-200 dark:hidden"
            />
            <Image
              src="/logo-light.svg"
              width="150"
              height="80"
              alt="Logo"
              className="w-200 hidden dark:block"
            />
            <div
              role="button"
              onClick={collapse}
              className={cn(
                "focus h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
                isMobile && "opacity-100",
              )}
            >
              <ChevronsLeft className="h-6 w-6" />
            </div>
          </div>
          <WorkspaceSwitcher />
          <Separator />
          <Boards />
          <div
            onMouseDown={handleMouseDown}
            onClick={resetWidth}
            className="absolute right-0 top-0 hidden h-[calc(100dvh)] w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100 sm:block"
          />
        </div>
        <div>
          <Separator />
          <div className="flex flex-col gap-2 py-2">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/" className="flex items-center gap-3">
                <Settings className="text-foreground" />
                <p>Settings</p>
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/" className="flex items-center gap-3">
                <User className="text-foreground" />
                <p>Profile</p>
              </Link>
            </Button>
          </div>
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "w-[calc(100% - 270px)] absolute left-60 top-0 ",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "left-0 w-full",
        )}
      >
        <nav
          className={cn(
            "hidden w-full bg-transparent px-3 py-2",
            isCollapsed && "block",
          )}
        >
          {isCollapsed && (
            <ChevronsRight
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};
export default Sidebar;
