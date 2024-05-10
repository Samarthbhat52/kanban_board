import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto h-[calc(100dvh)] w-full max-w-[1920px]",
        className,
      )}
    >
      {children}
    </div>
  );
};
