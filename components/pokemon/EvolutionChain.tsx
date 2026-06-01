import Image from "next/image";
import Link from "next/link";
import type { ChainLink } from "@/lib/pokemon/types";
import { getPokemonByName } from "@/lib/pokemon/api";

async function EvolutionNode({ species }: { species: { name: string; url: string } }) {
  const id = species.url.split("/").at(-2);
  let sprite: string | null = null;
  try {
    const pokemon = await getPokemonByName(species.name);
    sprite = pokemon.sprites.other["official-artwork"].front_default ?? pokemon.sprites.front_default;
  } catch {
    // sprite remains null
  }

  return (
    <Link href={`/pokemon/${species.name}`} className="flex flex-col items-center gap-1 group">
      <div className="relative h-20 w-20">
        {sprite ? (
          <Image
            src={sprite}
            alt={species.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform"
            sizes="80px"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-muted" />
        )}
      </div>
      <span className="capitalize text-xs font-medium">{species.name}</span>
      <span className="text-xs text-muted-foreground font-mono">#{String(id).padStart(4, "0")}</span>
    </Link>
  );
}

function collectChain(link: ChainLink): ChainLink[] {
  const chain: ChainLink[] = [link];
  for (const next of link.evolves_to) {
    chain.push(...collectChain(next));
  }
  return chain;
}

interface EvolutionChainProps {
  chain: ChainLink;
}

export default function EvolutionChain({ chain }: EvolutionChainProps) {
  const links = collectChain(chain);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {links.map((link, i) => (
        <div key={link.species.name} className="flex items-center gap-4">
          {i > 0 && (
            <div className="flex flex-col items-center text-muted-foreground">
              <span className="text-lg">→</span>
              {link.evolution_details[0]?.min_level && (
                <span className="text-xs">Lv. {link.evolution_details[0].min_level}</span>
              )}
              {link.evolution_details[0]?.item && (
                <span className="text-xs capitalize">{link.evolution_details[0].item!.name}</span>
              )}
            </div>
          )}
          <EvolutionNode species={link.species} />
        </div>
      ))}
    </div>
  );
}
