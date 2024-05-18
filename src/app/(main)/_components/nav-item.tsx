"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Activity, Layout, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export type Workspace = {
  id: string;
  logo: string;
  title: string;
};

interface NavItemProps {
  isActive: boolean;
  isExpanded: boolean;
  workspace: Workspace;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isActive,
  isExpanded,
  workspace,
  onExpand,
}: NavItemProps) => {
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="mr-2 h-4 w-4" />,
      href: `/dashboard/${workspace.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="mr-2 h-4 w-4" />,
      href: `/dashboard/${workspace.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: `/dashboard/${workspace.id}/settings`,
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={workspace.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(workspace.id)}
        className={cn(
          "flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline",
          isActive && "bg-sky-500/10 text-sky-700",
          isActive && isExpanded && "bg-primary-background text-primary",
        )}
      >
        <div className="flex items-center gap-x-2">
          <span className="text-xl">{workspace.logo}</span>
          <p>{workspace.title}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              pathname == route.href && "bg-sky-500/10 text-sky-700",
              buttonVariants({ variant: "ghost" }),
              "mb-1 w-full justify-start pl-10",
            )}
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
