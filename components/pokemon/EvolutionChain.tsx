import Image from "next/image";
import Link from "next/link";
import type { ChainLink, EvolutionDetail } from "@/lib/pokemon/types";
import { getPokemonByName } from "@/lib/pokemon/api";

// ─── Sprite node (async server component) ────────────────────────────────────

async function PokemonNode({
  species,
}: {
  species: { name: string; url: string };
}) {
  const id = species.url.split("/").at(-2);
  let sprite: string | null = null;
  try {
    const pokemon = await getPokemonByName(species.name);
    sprite =
      pokemon.sprites.other["official-artwork"].front_default ??
      pokemon.sprites.front_default;
  } catch {
    // sprite stays null — fallback rendered below
  }

  const displayName = species.name.replace(/-/g, " ");

  return (
    <Link
      href={`/pokemon/${species.name}`}
      className="group flex flex-col items-center gap-1"
    >
      <div className="relative h-20 w-20">
        {sprite ? (
          <Image
            src={sprite}
            alt={displayName}
            fill
            sizes="80px"
            className="object-contain transition-transform duration-200 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl text-muted-foreground">
            ?
          </div>
        )}
      </div>
      <span className="max-w-[80px] text-center text-xs font-medium capitalize leading-tight">
        {displayName}
      </span>
      <span className="font-mono text-xs text-muted-foreground">
        #{String(id).padStart(4, "0")}
      </span>
    </Link>
  );
}

// ─── Arrow with optional evolution details ────────────────────────────────────

function EvolutionArrow({ detail }: { detail?: EvolutionDetail }) {
  const lines: string[] = [];

  if (detail?.min_level) lines.push(`Lv. ${detail.min_level}`);
  if (detail?.item) lines.push(detail.item.name.replace(/-/g, " "));
  if (detail?.held_item) lines.push(detail.held_item.name.replace(/-/g, " "));
  if (detail?.min_happiness) lines.push("High friendship");
  if (detail?.time_of_day === "day") lines.push("Day");
  if (detail?.time_of_day === "night") lines.push("Night");
  if (detail?.known_move) lines.push(detail.known_move.name.replace(/-/g, " "));

  return (
    <div className="flex min-w-[3rem] flex-col items-center gap-0.5 text-muted-foreground">
      <span className="text-lg leading-none">→</span>
      {lines.map((line) => (
        <span key={line} className="whitespace-nowrap text-[10px] capitalize leading-tight">
          {line}
        </span>
      ))}
    </div>
  );
}

// ─── Recursive tree node ──────────────────────────────────────────────────────
// Base case: link.evolves_to.length === 0 — renders only the Pokémon node.
// Branching: renders a column of (arrow + subtree) pairs beside the current node.

function TreeNode({ link }: { link: ChainLink }) {
  // Base case
  if (link.evolves_to.length === 0) {
    return <PokemonNode species={link.species} />;
  }

  return (
    <div className="flex items-center gap-3">
      <PokemonNode species={link.species} />

      {/* Column of branches — one row per evolution path */}
      <div className="flex flex-col justify-center gap-6">
        {link.evolves_to.map((child) => (
          <div key={child.species.name} className="flex items-center gap-3">
            <EvolutionArrow detail={child.evolution_details[0]} />
            <TreeNode link={child} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

interface EvolutionChainProps {
  chain: ChainLink;
}

export default function EvolutionChain({ chain }: EvolutionChainProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max justify-center p-2">
        <TreeNode link={chain} />
      </div>
    </div>
  );
}
