import type { Pokemon } from "@/lib/pokemon/types";
import PokemonCard from "./PokemonCard";

interface PokemonGridProps {
  pokemon: Pokemon[];
}

export default function PokemonGrid({ pokemon }: PokemonGridProps) {
  if (pokemon.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-16">No Pokémon found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
