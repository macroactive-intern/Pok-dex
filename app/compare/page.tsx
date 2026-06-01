import { Suspense } from "react";
import { getPokemon } from "@/lib/pokemon/api";
import ComparePanel from "@/components/pokemon/ComparePanel";
import PokemonSearch from "@/components/pokemon/PokemonSearch";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  searchParams: Promise<{ left?: string; right?: string }>;
}

export const metadata = { title: "Compare Pokémon — Pokédex" };

export default async function ComparePage({ searchParams }: Props) {
  const { left, right } = await searchParams;

  const [leftPokemon, rightPokemon] = await Promise.all([
    left ? getPokemon(left).catch(() => null) : null,
    right ? getPokemon(right).catch(() => null) : null,
  ]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold">Compare Pokémon</h1>
        <p className="text-muted-foreground">Add ?left=pikachu&right=charmander to the URL</p>
      </div>

      {leftPokemon && rightPokemon ? (
        <ComparePanel left={leftPokemon} right={rightPokemon} />
      ) : (
        <div className="text-center py-16 text-muted-foreground space-y-2">
          <p>Enter two Pokémon names in the URL to compare them.</p>
          <p className="text-sm font-mono">/compare?left=pikachu&right=charmander</p>
        </div>
      )}
    </main>
  );
}
