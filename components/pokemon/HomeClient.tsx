"use client";

import { useState } from "react";
import PokemonSearch from "./PokemonSearch";
import InfiniteList from "./InfiniteList";
import TypeBadge from "./TypeBadge";
import { cn } from "@/lib/utils";
import type { Pokemon, TypeName } from "@/lib/pokemon/types";

const ALL_TYPES: TypeName[] = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

export default function HomeClient({ initialPokemon }: { initialPokemon: Pokemon[] }) {
  const [activeType, setActiveType] = useState<TypeName | null>(null);

  function toggleType(type: TypeName) {
    setActiveType((prev) => (prev === type ? null : type));
  }

  return (
    <div className="space-y-4">
      {/* Sticky type filter — single scrollable row on mobile, wraps on sm+ */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b -mx-4 px-4 py-2">
        <div className="overflow-x-auto">
          <div className="flex gap-1.5 sm:flex-wrap min-w-max sm:min-w-0 py-1">
            {ALL_TYPES.map((type) => {
              const active = activeType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={cn(
                    "shrink-0 rounded-full transition-all",
                    active ? "ring-2 ring-offset-1 ring-foreground scale-110" : "hover:opacity-80"
                  )}
                >
                  <TypeBadge type={type} size="sm" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search input + grid / search results */}
      <PokemonSearch>
        <InfiniteList initialPokemon={initialPokemon} typeFilter={activeType} />
      </PokemonSearch>
    </div>
  );
}
