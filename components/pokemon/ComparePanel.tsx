"use client";

import Image from "next/image";
import type { Pokemon, TypeName } from "@/lib/pokemon/types";
import TypeBadge from "./TypeBadge";
import { Progress } from "@/components/ui/progress";

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const MAX_STAT = 255;

interface ComparePanelProps {
  left: Pokemon;
  right: Pokemon;
}

function getStat(pokemon: Pokemon, name: string) {
  return pokemon.stats.find((s) => s.stat.name === name)?.base_stat ?? 0;
}

export default function ComparePanel({ left, right }: ComparePanelProps) {
  const statNames = left.stats.map((s) => s.stat.name);

  const spriteOf = (p: Pokemon) =>
    p.sprites.other["official-artwork"].front_default ?? p.sprites.front_default;

  return (
    <div className="space-y-6">
      {/* Headers */}
      <div className="grid grid-cols-3 items-center text-center gap-4">
        <div className="flex flex-col items-center gap-1">
          {spriteOf(left) && (
            <Image src={spriteOf(left)!} alt={left.name} width={96} height={96} className="object-contain" />
          )}
          <p className="capitalize font-semibold">{left.name}</p>
          <div className="flex gap-1 flex-wrap justify-center">
            {left.types.map(({ type }) => <TypeBadge key={type.name} type={type.name as TypeName} size="sm" />)}
          </div>
        </div>
        <span className="text-2xl font-bold text-muted-foreground">VS</span>
        <div className="flex flex-col items-center gap-1">
          {spriteOf(right) && (
            <Image src={spriteOf(right)!} alt={right.name} width={96} height={96} className="object-contain" />
          )}
          <p className="capitalize font-semibold">{right.name}</p>
          <div className="flex gap-1 flex-wrap justify-center">
            {right.types.map(({ type }) => <TypeBadge key={type.name} type={type.name as TypeName} size="sm" />)}
          </div>
        </div>
      </div>

      {/* Stats */}
      {statNames.map((name) => {
        const l = getStat(left, name);
        const r = getStat(right, name);
        return (
          <div key={name} className="grid grid-cols-3 items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold tabular-nums ${l >= r ? "text-green-600" : "text-muted-foreground"}`}>{l}</span>
              <Progress value={(l / MAX_STAT) * 100} className="h-2 flex-1" />
            </div>
            <span className="text-xs text-center text-muted-foreground">{STAT_LABELS[name] ?? name}</span>
            <div className="flex items-center gap-2">
              <Progress value={(r / MAX_STAT) * 100} className="h-2 flex-1" />
              <span className={`text-sm font-semibold tabular-nums ${r >= l ? "text-green-600" : "text-muted-foreground"}`}>{r}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
