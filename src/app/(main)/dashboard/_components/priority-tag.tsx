import { cn } from "@/lib/utils";
import { CircleGauge } from "lucide-react";

interface PriorityColorMap {
  high: string;
  medium: string;
  low: string;
  critical: string;
  [key: string]: string; // Index signature
}

export const priorityColors: PriorityColorMap = {
  high: "#C2962C",
  medium: "#5bab54",
  low: "#6b7a89",
  critical: "#ff5509",
};

const PriorityTag = ({
  priority,
  className,
}: {
  priority: keyof PriorityColorMap;
  className?: string;
}) => {
  const colorStyle = priorityColors[priority] || "#808080";

  return (
    <span
      className={cn(
        "flex w-fit items-center gap-1 rounded-xl px-2 text-xs capitalize",
        className,
      )}
      style={{ color: colorStyle, backgroundColor: `${colorStyle}47` }}
    >
      <CircleGauge color={colorStyle} className="h-3 w-3" />
      {priority}
    </span>
  );
};
export default PriorityTag;
