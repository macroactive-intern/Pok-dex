"use client";

import { useState } from "react";
import { getDefensiveMatchups } from "@/lib/pokemon/typeChart";
import type { TypeName } from "@/lib/pokemon/types";
import TypeBadge from "./TypeBadge";
import { Label } from "@/components/ui/label";

const ALL_TYPES: TypeName[] = [
  "normal","fire","water","electric","grass","ice","fighting","poison",
  "ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy",
];

export default function TypeCalculator() {
  const [selected, setSelected] = useState<TypeName[]>([]);

  function toggle(type: TypeName) {
    setSelected((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : prev.length < 2
        ? [...prev, type]
        : prev
    );
  }

  const matchups = selected.length > 0 ? getDefensiveMatchups(selected) : null;

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-2 block">Select up to 2 types</Label>
        <div className="flex flex-wrap gap-2">
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggle(type)}
              className={`rounded-full transition-all ${selected.includes(type) ? "ring-2 ring-offset-2 ring-foreground scale-110" : "opacity-70 hover:opacity-100"}`}
            >
              <TypeBadge type={type} size="sm" />
            </button>
          ))}
        </div>
      </div>

      {matchups && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Section title="Weak to (×2+)" types={matchups.weaknesses} />
          <Section title="Resists (×0.5−)" types={matchups.resistances} />
          <Section title="Immune to (×0)" types={matchups.immunities} />
        </div>
      )}
    </div>
  );
}

function Section({ title, types }: { title: string; types: TypeName[] }) {
  return (
    <div>
      <p className="text-sm font-semibold mb-2">{title}</p>
      {types.length === 0 ? (
        <p className="text-xs text-muted-foreground">None</p>
      ) : (
        <div className="flex flex-wrap gap-1">
          {types.map((t) => <TypeBadge key={t} type={t} size="sm" />)}
        </div>
      )}
    </div>
  );
}
