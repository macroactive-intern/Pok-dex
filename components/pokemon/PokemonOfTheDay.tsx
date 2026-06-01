import { getPokemonByName } from "@/lib/pokemon/api";
import Image from "next/image";
import Link from "next/link";
import TypeBadge from "./TypeBadge";
import type { TypeName } from "@/lib/pokemon/types";

function getTodaysPokemonId(): number {
  // Total days since Unix epoch mod 1025 (+1 so id is never 0).
  // Same value for everyone on the same UTC calendar day — no randomness.
  const totalDays = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return (totalDays % 1025) + 1;
}

export default async function PokemonOfTheDay() {
  const id = getTodaysPokemonId();
  const pokemon = await getPokemonByName(String(id)).catch(() => null);
  if (!pokemon) return null;

  const sprite =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  return (
    <section className="rounded-xl border bg-muted/30 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Pokémon of the Day
      </p>
      <Link
        href={`/pokemon/${pokemon.name}`}
        className="flex items-center gap-4 transition-opacity hover:opacity-80"
      >
        {sprite && (
          <Image
            src={sprite}
            alt={pokemon.name}
            width={72}
            height={72}
            className="object-contain drop-shadow-md"
          />
        )}
        <div className="space-y-1">
          <p className="text-lg font-bold capitalize leading-none">
            {pokemon.name.replace(/-/g, " ")}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            #{String(pokemon.id).padStart(4, "0")}
          </p>
          <div className="flex flex-wrap gap-1">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name as TypeName} size="sm" />
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
}
