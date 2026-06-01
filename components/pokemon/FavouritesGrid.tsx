"use client";

import { useFavourites } from "@/lib/favourites";
import { usePokemon } from "@/lib/pokemon/client";
import PokemonCard from "./PokemonCard";
import { Skeleton } from "@/components/ui/skeleton";

function FavouriteCard({ name }: { name: string }) {
  const { data, isLoading } = usePokemon(name);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border p-4">
        <Skeleton className="h-3 w-10 self-start" />
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    );
  }

  if (!data) return null;
  return <PokemonCard pokemon={data} />;
}

export default function FavouritesGrid() {
  const { favourites } = useFavourites();

  if (favourites.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        No favourites yet. Click the{" "}
        <span className="text-rose-500">♥</span> on any Pokémon card to save it here.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {favourites.map((name) => (
        <FavouriteCard key={name} name={name} />
      ))}
    </div>
  );
}
