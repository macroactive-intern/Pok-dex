import { TYPE_COLORS } from "@/lib/pokemon/typeChart";
import type { TypeName } from "@/lib/pokemon/types";
import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export default function TypeBadge({ type, size = "md", className }: TypeBadgeProps) {
  const color = TYPE_COLORS[type as TypeName] ?? "bg-gray-400";
  return (
    <span
      className={cn(
        "inline-block rounded-full font-semibold text-white capitalize tracking-wide",
        color,
        SIZE_CLASSES[size],
        className
      )}
    >
      {type}
    </span>
  );
}
