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
      <div className="flex flex-wrap gap-1.5">
        {ALL_TYPES.map((type) => {
          const active = activeType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              className={cn(
                "rounded-full transition-all",
                active ? "ring-2 ring-offset-1 ring-foreground scale-110" : "hover:opacity-80"
              )}
            >
              <TypeBadge type={type} size="sm" />
            </button>
          );
        })}
      </div>
      <PokemonSearch>
        <InfiniteList initialPokemon={initialPokemon} typeFilter={activeType} />
      </PokemonSearch>
    </div>
  );
}
