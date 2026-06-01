import { getPokemonList, getPokemonByName } from "@/lib/pokemon/api";
import HomeClient from "@/components/pokemon/HomeClient";
import TypeCalculator from "@/components/pokemon/TypeCalculator";
import PokemonOfTheDay from "@/components/pokemon/PokemonOfTheDay";

export default async function HomePage() {
  const list = await getPokemonList(20, 0);
  const initialPokemon = await Promise.all(
    list.results.map((r) => getPokemonByName(r.name))
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Pokédex</h1>
        <p className="text-muted-foreground">Browse all Pokémon from every generation</p>
      </div>

      <PokemonOfTheDay />

      <HomeClient initialPokemon={initialPokemon} />

      <section className="space-y-4 border-t pt-8">
        <h2 className="text-2xl font-bold">Type Calculator</h2>
        <TypeCalculator />
      </section>
    </main>
  );
}
