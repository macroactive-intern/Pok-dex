"use client";

import { useState } from "react";
import PokemonSearch from "./PokemonSearch";
import InfiniteList from "./InfiniteList";
import FavouritesGrid from "./FavouritesGrid";
import TypeBadge from "./TypeBadge";
import { cn } from "@/lib/utils";
import type { Pokemon, TypeName } from "@/lib/pokemon/types";

const ALL_TYPES: TypeName[] = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

type Tab = "all" | "favourites";

export default function HomeClient({ initialPokemon }: { initialPokemon: Pokemon[] }) {
  const [tab, setTab] = useState<Tab>("all");
  const [activeType, setActiveType] = useState<TypeName | null>(null);

  function toggleType(type: TypeName) {
    setActiveType((prev) => (prev === type ? null : type));
  }

  return (
    <div className="space-y-4">
      {/* Sticky header: tab switcher + type filter (All tab only) */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b -mx-4 px-4 py-2 space-y-2">
        {/* Tab switcher */}
        <div className="flex gap-1 text-sm">
          {(["all", "favourites"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "px-3 py-1 rounded-full font-medium transition-colors",
                tab === t
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "all" ? "All Pokémon" : "♥ Favourites"}
            </button>
          ))}
        </div>

        {/* Type filter — only shown in All tab; horizontal scroll on mobile */}
        {tab === "all" && (
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
        )}
      </div>

      {/* Tab content */}
      {tab === "all" ? (
        <PokemonSearch>
          <InfiniteList initialPokemon={initialPokemon} typeFilter={activeType} />
        </PokemonSearch>
      ) : (
        <FavouritesGrid />
      )}
    </div>
  );
}
