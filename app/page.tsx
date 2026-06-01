import PokemonSearch from "@/components/pokemon/PokemonSearch";
import InfiniteList from "@/components/pokemon/InfiniteList";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Pokédex</h1>
        <p className="text-muted-foreground">Browse all Pokémon from every generation</p>
        <PokemonSearch />
      </div>
      <InfiniteList />
    </main>
  );
}
