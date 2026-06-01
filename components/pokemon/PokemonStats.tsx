import type { PokemonStat } from "@/lib/pokemon/types";
import { cn } from "@/lib/utils";

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const MAX_STAT = 255;

export type PokemonStatsProps = {
  stats: PokemonStat[];
  compareTo?: PokemonStat[];
};

type Result = "win" | "lose" | "equal" | "none";

function compare(a: number, b: number | undefined): Result {
  if (b === undefined) return "none";
  if (a > b) return "win";
  if (a < b) return "lose";
  return "equal";
}

const TEXT_COLOR: Record<Result, string> = {
  win:   "text-green-600 dark:text-green-400",
  lose:  "text-red-500  dark:text-red-400",
  equal: "",
  none:  "",
};

const BAR_COLOR: Record<Result, string> = {
  win:   "bg-green-500",
  lose:  "bg-red-500",
  equal: "bg-primary",
  none:  "bg-primary",
};

export default function PokemonStats({ stats, compareTo }: PokemonStatsProps) {
  const compareMap = new Map(
    compareTo?.map((s) => [s.stat.name, s.base_stat])
  );

  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);
  const compareTotal = compareTo?.reduce((sum, s) => sum + s.base_stat, 0);
  const totalResult = compare(total, compareTotal);

  return (
    <div className="space-y-2.5">
      {stats.map(({ stat, base_stat }) => {
        const compareVal = compareMap.get(stat.name);
        const result = compare(base_stat, compareVal);

        return (
          <div
            key={stat.name}
            className="grid grid-cols-[7rem_3rem_1fr] items-center gap-3"
          >
            <span className="text-sm text-muted-foreground">
              {STAT_LABELS[stat.name] ?? stat.name}
            </span>

            <span
              className={cn(
                "text-sm font-semibold tabular-nums text-right transition-colors",
                compareTo ? TEXT_COLOR[result] : ""
              )}
            >
              {base_stat}
            </span>

            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-[width] duration-500",
                  compareTo ? BAR_COLOR[result] : "bg-primary"
                )}
                style={{ width: `${(base_stat / MAX_STAT) * 100}%` }}
              />
            </div>
          </div>
        );
      })}

      {/* Total */}
      <div className="grid grid-cols-[7rem_3rem_1fr] items-center gap-3 border-t pt-2 mt-1">
        <span className="text-sm font-semibold">Total</span>
        <span
          className={cn(
            "text-sm font-bold tabular-nums text-right transition-colors",
            compareTo ? TEXT_COLOR[totalResult] : ""
          )}
        >
          {total}
        </span>
        <div />
      </div>
    </div>
  );
}
