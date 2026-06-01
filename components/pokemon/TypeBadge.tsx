import { TYPE_COLORS } from "@/lib/pokemon/typeChart";
import type { TypeName } from "@/lib/pokemon/types";
import { cn } from "@/lib/utils";

export type { TypeName as PokemonType };

export type TypeBadgeProps = {
  type: TypeName;
  onClick?: (type: TypeName) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const BASE =
  "inline-block rounded-full font-semibold text-white capitalize tracking-wide";

export default function TypeBadge({
  type,
  onClick,
  size = "md",
  className,
}: TypeBadgeProps) {
  const color = TYPE_COLORS[type] ?? "bg-gray-400";
  const classes = cn(BASE, color, SIZE_CLASSES[size], className);

  if (onClick) {
    return (
      <button
        type="button"
        onClick={() => onClick(type)}
        className={cn(classes, "cursor-pointer hover:opacity-80 transition-opacity")}
      >
        {type}
      </button>
    );
  }

  return <span className={classes}>{type}</span>;
}
