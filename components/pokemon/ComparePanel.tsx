"use client";

import Image from "next/image";
import { usePokemonCompare } from "@/lib/pokemon/client";
import type { Pokemon, TypeName } from "@/lib/pokemon/types";
import TypeBadge from "./TypeBadge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export type ComparePanelProps = {
  pokemonA?: string;
  pokemonB?: string;
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const MAX_STAT = 255;

function getStat(pokemon: Pokemon, name: string) {
  return pokemon.stats.find((s) => s.stat.name === name)?.base_stat ?? 0;
}

function PokemonCard({
  name,
  pokemon,
  isLoading,
  isError,
}: {
  name?: string;
  pokemon?: Pokemon;
  isLoading: boolean;
  isError: boolean;
}) {
  if (!name) {
    return (
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <div className="h-24 w-24 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
          <span className="text-3xl select-none">?</span>
        </div>
        <p className="text-sm">Choose a Pokémon</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    );
  }

  if (isError || !pokemon) {
    return (
      <div className="flex flex-col items-center gap-2 text-destructive">
        <div className="h-24 w-24 rounded-full border-2 border-dashed border-destructive/40 flex items-center justify-center">
          <span className="text-3xl select-none">✕</span>
        </div>
        <p className="text-sm capitalize">{name}</p>
        <p className="text-xs text-muted-foreground">Not found</p>
      </div>
    );
  }

  const sprite =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  return (
    <div className="flex flex-col items-center gap-1">
      {sprite ? (
        <Image
          src={sprite}
          alt={pokemon.name}
          width={96}
          height={96}
          className="object-contain drop-shadow-md"
        />
      ) : (
        <div className="h-24 w-24" />
      )}
      <p className="capitalize font-semibold">{pokemon.name.replace(/-/g, " ")}</p>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon.types.map(({ type }) => (
          <TypeBadge key={type.name} type={type.name as TypeName} size="sm" />
        ))}
      </div>
    </div>
  );
}

export default function ComparePanel({ pokemonA, pokemonB }: ComparePanelProps) {
  const { left, right } = usePokemonCompare(pokemonA, pokemonB);

  const a = left.data;
  const b = right.data;
  const statNames = a?.stats.map((s) => s.stat.name) ?? [];

  return (
    <div className="space-y-6">
      {/* Side-by-side cards — stacks vertically on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center text-center gap-4">
        <PokemonCard
          name={pokemonA}
          pokemon={a}
          isLoading={left.isLoading}
          isError={left.isError}
        />
        <span className="text-2xl font-bold text-muted-foreground">VS</span>
        <PokemonCard
          name={pokemonB}
          pokemon={b}
          isLoading={right.isLoading}
          isError={right.isError}
        />
      </div>

      {/* Stat bars — only rendered when both Pokémon are available */}
      {a && b && statNames.map((name) => {
        const av = getStat(a, name);
        const bv = getStat(b, name);
        const aWins = av > bv;
        const bWins = bv > av;
        return (
          <div key={name} className="grid grid-cols-3 items-center gap-1.5 sm:gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold tabular-nums w-8 text-right ${
                  aWins
                    ? "text-green-600 dark:text-green-400"
                    : bWins
                    ? "text-red-500 dark:text-red-400"
                    : "text-muted-foreground"
                }`}
              >
                {av}
              </span>
              <Progress value={(av / MAX_STAT) * 100} className="h-2 flex-1" />
            </div>
            <span className="text-xs text-center text-muted-foreground">
              {STAT_LABELS[name] ?? name}
            </span>
            <div className="flex items-center gap-2">
              <Progress value={(bv / MAX_STAT) * 100} className="h-2 flex-1" />
              <span
                className={`text-sm font-semibold tabular-nums w-8 text-left ${
                  bWins
                    ? "text-green-600 dark:text-green-400"
                    : aWins
                    ? "text-red-500 dark:text-red-400"
                    : "text-muted-foreground"
                }`}
              >
                {bv}
              </span>
            </div>
          </div>
        );
      })}

      {/* Hint when only one Pokémon is provided */}
      {pokemonA && !pokemonB && !left.isLoading && !left.isError && (
        <p className="text-center text-sm text-muted-foreground">
          Add <code className="font-mono">&amp;right=pokemonname</code> to the URL to compare.
        </p>
      )}
    </div>
  );
}
