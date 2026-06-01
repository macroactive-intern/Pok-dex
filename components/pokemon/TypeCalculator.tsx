"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypeBadge from "./TypeBadge";
import {
  getDefendersAgainst,
  getAttackersAgainst,
  getDualTypeEffectiveness,
  getEffectiveness,
} from "@/lib/pokemon/typeChart";
import type { TypeName } from "@/lib/pokemon/types";
import { cn } from "@/lib/utils";

const ALL_TYPES: TypeName[] = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

function formatMultiplier(n: number): string {
  if (n === 0)    return "0×";
  if (n === 0.25) return "¼×";
  if (n === 0.5)  return "½×";
  if (n === 1)    return "1×";
  if (n === 2)    return "2×";
  if (n === 4)    return "4×";
  return `${n}×`;
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function TypePicker({
  label,
  selected,
  onToggle,
  max = 1,
}: {
  label: string;
  selected: TypeName[];
  onToggle: (type: TypeName) => void;
  max?: number;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {ALL_TYPES.map((type) => {
          const active = selected.includes(type);
          const disabled = !active && selected.length >= max;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onToggle(type)}
              disabled={disabled}
              className={cn(
                "rounded-full transition-all",
                active   ? "ring-2 ring-offset-1 ring-foreground scale-110" : "",
                disabled ? "opacity-30 cursor-not-allowed" : "hover:opacity-80"
              )}
            >
              <TypeBadge type={type} size="sm" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TypeGroup({ label, types }: { label: string; types: TypeName[] }) {
  if (types.length === 0) return null;
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-1">
        {types.map((t) => <TypeBadge key={t} type={t} size="sm" />)}
      </div>
    </div>
  );
}

// ─── Attack mode ──────────────────────────────────────────────────────────────
// Select one attacking type → see effectiveness against all 18 defending types

function AttackMode() {
  const [atk, setAtk] = useState<TypeName | null>(null);

  function toggle(type: TypeName) {
    setAtk((prev) => (prev === type ? null : type));
  }

  const matchups = atk ? getDefendersAgainst(atk) : null;

  const groups: Record<string, TypeName[]> = { "2": [], "1": [], "0.5": [], "0": [] };
  if (matchups) {
    for (const [type, eff] of Object.entries(matchups)) {
      const key = String(eff);
      groups[key]?.push(type as TypeName);
    }
  }

  return (
    <div className="space-y-5">
      <TypePicker label="Select attacking type" selected={atk ? [atk] : []} onToggle={toggle} />
      {matchups && (
        <div className="space-y-3">
          <TypeGroup label="Super effective — 2×" types={groups["2"]} />
          <TypeGroup label="Neutral — 1×"         types={groups["1"]} />
          <TypeGroup label="Not very effective — ½×" types={groups["0.5"]} />
          <TypeGroup label="No effect — 0×"       types={groups["0"]} />
        </div>
      )}
    </div>
  );
}

// ─── Defence mode ─────────────────────────────────────────────────────────────
// Select one defending type → see how every attacking type fares against it

function DefenceMode() {
  const [def, setDef] = useState<TypeName | null>(null);

  function toggle(type: TypeName) {
    setDef((prev) => (prev === type ? null : type));
  }

  const matchups = def ? getAttackersAgainst(def) : null;

  const groups: Record<string, TypeName[]> = { "2": [], "1": [], "0.5": [], "0": [] };
  if (matchups) {
    for (const [type, eff] of Object.entries(matchups)) {
      const key = String(eff);
      groups[key]?.push(type as TypeName);
    }
  }

  return (
    <div className="space-y-5">
      <TypePicker label="Select defending type" selected={def ? [def] : []} onToggle={toggle} />
      {matchups && (
        <div className="space-y-3">
          <TypeGroup label="Weak to — 2×"    types={groups["2"]} />
          <TypeGroup label="Neutral — 1×"    types={groups["1"]} />
          <TypeGroup label="Resists — ½×"    types={groups["0.5"]} />
          <TypeGroup label="Immune to — 0×"  types={groups["0"]} />
        </div>
      )}
    </div>
  );
}

// ─── Dual defence mode ────────────────────────────────────────────────────────
// Select attacking type + 1–2 defending types → combined multiplier + full table

function DualMode() {
  const [atk, setAtk]      = useState<TypeName | null>(null);
  const [defs, setDefs]    = useState<TypeName[]>([]);

  function toggleAtk(type: TypeName) {
    setAtk((prev) => (prev === type ? null : type));
  }

  function toggleDef(type: TypeName) {
    setDefs((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : prev.length < 2
        ? [...prev, type]
        : prev
    );
  }

  const defA = defs[0] ?? null;
  const defB = defs[1] ?? null;

  // Spotlight: specific attacker vs the selected defending combo
  const spotlight: number | null =
    atk && defA
      ? defB
        ? getDualTypeEffectiveness(atk, defA, defB)
        : getEffectiveness(atk, defA)
      : null;

  // Full table: all 18 attackers vs the defending combo
  const groups: Record<string, TypeName[]> = {
    "4": [], "2": [], "1": [], "0.5": [], "0.25": [], "0": [],
  };
  if (defA) {
    for (const atkType of ALL_TYPES) {
      const eff = defB
        ? getDualTypeEffectiveness(atkType, defA, defB)
        : getEffectiveness(atkType, defA);
      const key = String(eff);
      groups[key]?.push(atkType);
    }
  }

  const spotlightColor =
    spotlight === null ? "" :
    spotlight === 0    ? "text-muted-foreground" :
    spotlight < 1      ? "text-blue-500 dark:text-blue-400" :
    spotlight > 1      ? "text-red-500 dark:text-red-400" :
    "";

  return (
    <div className="space-y-5">
      <TypePicker label="Attacking type"          selected={atk ? [atk] : []} onToggle={toggleAtk} />
      <TypePicker label="Defending types (1 or 2)" selected={defs}            onToggle={toggleDef} max={2} />

      {/* Spotlight result */}
      {spotlight !== null && (
        <div className="rounded-lg border bg-muted/40 p-4 text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            <span className="capitalize font-medium text-foreground">{atk}</span>
            {" vs "}
            <span className="capitalize font-medium text-foreground">
              {defs.join(" / ")}
            </span>
          </p>
          <p className={cn("text-5xl font-bold tabular-nums", spotlightColor)}>
            {formatMultiplier(spotlight)}
          </p>
        </div>
      )}

      {/* Full matchup table for the defending combo */}
      {defA && (
        <div className="space-y-3">
          <TypeGroup label="4× double super effective" types={groups["4"]} />
          <TypeGroup label="2× super effective"        types={groups["2"]} />
          <TypeGroup label="1× neutral"                types={groups["1"]} />
          <TypeGroup label="½× resists"                types={groups["0.5"]} />
          <TypeGroup label="¼× double resists"         types={groups["0.25"]} />
          <TypeGroup label="0× immune"                 types={groups["0"]} />
        </div>
      )}
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function TypeCalculator() {
  return (
    <Tabs defaultValue="attack" className="space-y-4">
      <TabsList className="w-full">
        <TabsTrigger value="attack"  className="flex-1">Attack</TabsTrigger>
        <TabsTrigger value="defence" className="flex-1">Defence</TabsTrigger>
        <TabsTrigger value="dual"    className="flex-1">Dual Type</TabsTrigger>
      </TabsList>

      <TabsContent value="attack"  className="pt-2"><AttackMode  /></TabsContent>
      <TabsContent value="defence" className="pt-2"><DefenceMode /></TabsContent>
      <TabsContent value="dual"    className="pt-2"><DualMode    /></TabsContent>
    </Tabs>
  );
}
