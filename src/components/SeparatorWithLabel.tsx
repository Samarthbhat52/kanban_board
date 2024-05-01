interface separatorWithLabelProps {
  label: string;
}

export const SeparatorWithLabel = ({ label }: separatorWithLabelProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background text-muted-foreground px-2">
          {label}
        </span>
      </div>
    </div>
  );
};
