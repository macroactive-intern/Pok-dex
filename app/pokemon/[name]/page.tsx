import { notFound } from "next/navigation";
import { getPokemonByName, getPokemonSpecies, getEvolutionChainByUrl } from "@/lib/pokemon/api";
import { getDefensiveMatchups } from "@/lib/pokemon/typeChart";
import type { TypeName } from "@/lib/pokemon/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import TypeBadge from "@/components/pokemon/TypeBadge";
import PokemonStats from "@/components/pokemon/PokemonStats";
import EvolutionChain from "@/components/pokemon/EvolutionChain";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, GitCompareArrows } from "lucide-react";

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { name } = await params;
  return { title: `${name.charAt(0).toUpperCase() + name.slice(1)} — Pokédex` };
}

export default async function PokemonPage({ params }: Props) {
  const { name } = await params;

  const pokemon = await getPokemonByName(name).catch(() => null);
  if (!pokemon) notFound();

  const [species, evolutionChain] = await Promise.allSettled([
    getPokemonSpecies(pokemon.species.name),
    getPokemonSpecies(pokemon.species.name).then((s) =>
      getEvolutionChainByUrl(s.evolution_chain.url)
    ),
  ]);

  const speciesData = species.status === "fulfilled" ? species.value : null;
  const evoChain = evolutionChain.status === "fulfilled" ? evolutionChain.value : null;

  const types = pokemon.types.map((t) => t.type.name as TypeName);
  const matchups = getDefensiveMatchups(types);

  const rawFlavor =
    speciesData?.flavor_text_entries.find((e) => e.language.name === "en")
      ?.flavor_text ?? null;
  const flavorText = rawFlavor
    ? rawFlavor.replace(/[\f\n\r­]/g, " ").replace(/\s+/g, " ").trim()
    : "No flavour text available.";

  const genus = speciesData?.genera.find((g) => g.language.name === "en")?.genus;

  const sprite =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ChevronLeft className="h-4 w-4" />Back
        </Link>
        <Link
          href={`/compare?a=${pokemon.name}`}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <GitCompareArrows className="h-4 w-4" />Compare
        </Link>
      </div>

      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        <div className="relative h-48 w-48 shrink-0">
          {sprite && (
            <Image src={sprite} alt={pokemon.name} fill className="object-contain drop-shadow-xl" sizes="192px" priority />
          )}
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground font-mono text-lg">#{String(pokemon.id).padStart(4, "0")}</span>
            <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
            {speciesData?.is_legendary && <Badge variant="secondary">Legendary</Badge>}
            {speciesData?.is_mythical && <Badge variant="secondary">Mythical</Badge>}
          </div>
          {genus && <p className="text-muted-foreground italic">{genus}</p>}
          <div className="flex gap-2">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name as TypeName} size="lg" />
            ))}
          </div>
          <p className="text-sm leading-relaxed max-w-prose">{flavorText}</p>
          <div className="flex gap-6 text-sm">
            <div><span className="text-muted-foreground">Height</span><br /><strong>{(pokemon.height / 10).toFixed(1)} m</strong></div>
            <div><span className="text-muted-foreground">Weight</span><br /><strong>{(pokemon.weight / 10).toFixed(1)} kg</strong></div>
            {speciesData && (
              <div><span className="text-muted-foreground">Capture rate</span><br /><strong>{speciesData.capture_rate}</strong></div>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="stats">
        <TabsList>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="matchups">Type Matchups</TabsTrigger>
          <TabsTrigger value="evolution">Evolution</TabsTrigger>
          <TabsTrigger value="abilities">Abilities</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="pt-4">
          <PokemonStats stats={pokemon.stats} />
        </TabsContent>

        <TabsContent value="matchups" className="pt-4 space-y-4">
          <MatchupSection title="Weak to (×2+)" types={matchups.weaknesses} />
          <MatchupSection title="Resists (×0.5−)" types={matchups.resistances} />
          <MatchupSection title="Immune to (×0)" types={matchups.immunities} />
        </TabsContent>

        <TabsContent value="evolution" className="pt-4">
          {evoChain ? (
            <EvolutionChain chain={evoChain.chain} />
          ) : (
            <p className="text-muted-foreground">No evolution data.</p>
          )}
        </TabsContent>

        <TabsContent value="abilities" className="pt-4">
          <ul className="space-y-2">
            {pokemon.abilities.map(({ ability, is_hidden }) => (
              <li key={ability.name} className="flex items-center gap-2">
                <span className="capitalize font-medium">{ability.name.replace("-", " ")}</span>
                {is_hidden && <Badge variant="outline">Hidden</Badge>}
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </main>
  );
}

function MatchupSection({ title, types }: { title: string; types: TypeName[] }) {
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
