import type { PokemonStat } from "@/lib/pokemon/types";
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

interface PokemonStatsProps {
  stats: PokemonStat[];
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <div className="space-y-3">
      {stats.map(({ stat, base_stat }) => (
        <div key={stat.name} className="grid grid-cols-[7rem_3rem_1fr] items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {STAT_LABELS[stat.name] ?? stat.name}
          </span>
          <span className="text-sm font-semibold tabular-nums text-right">
            {base_stat}
          </span>
          <Progress value={(base_stat / MAX_STAT) * 100} className="h-2" />
        </div>
      ))}
      <div className="grid grid-cols-[7rem_3rem_1fr] items-center gap-3 border-t pt-2">
        <span className="text-sm font-semibold">Total</span>
        <span className="text-sm font-bold tabular-nums text-right">{total}</span>
        <div />
      </div>
    </div>
  );
}
