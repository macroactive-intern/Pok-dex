"use client";

import { Heart } from "lucide-react";
import { useFavourites } from "@/lib/favourites";
import { cn } from "@/lib/utils";

interface FavouriteButtonProps {
  name: string;
  className?: string;
  size?: "sm" | "md";
}

export default function FavouriteButton({ name, className, size = "sm" }: FavouriteButtonProps) {
  const { isFavourite, toggle } = useFavourites();
  const active = isFavourite(name);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(name);
      }}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      className={cn(
        "transition-colors",
        active ? "text-rose-500" : "text-muted-foreground hover:text-rose-400",
        className
      )}
    >
      <Heart className={cn(size === "md" ? "h-5 w-5" : "h-4 w-4", active && "fill-current")} />
    </button>
  );
}
