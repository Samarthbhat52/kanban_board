import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface ProgressColorMap {
  inProgress: string;
  todo: string;
  completed: string;
  [key: string]: string; // Index signature
}

export const progressColors: ProgressColorMap = {
  inProgress: "#2c70a4",
  todo: "#C2962C",
  completed: "#5bab54",
};

const ProgressTag = ({
  progress,
  className,
}: {
  progress: keyof ProgressColorMap;
  className?: string;
}) => {
  const colorStyle = progressColors[progress] || "#808080";

  return (
    <span
      className={cn(
        "flex w-fit items-center gap-1 rounded-xl px-2 text-xs capitalize",
        className,
      )}
      style={{ color: colorStyle, backgroundColor: `${colorStyle}47` }}
    >
      <Loader color={colorStyle} className="h-3 w-3" />
      {progress}
    </span>
  );
};
export default ProgressTag;
