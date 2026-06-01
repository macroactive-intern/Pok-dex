import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import TypeBadge from "./TypeBadge";
import type { Pokemon } from "@/lib/pokemon/types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const sprite =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <CardContent className="flex flex-col items-center gap-2 p-4">
          <span className="self-start text-xs text-muted-foreground font-mono">
            #{String(pokemon.id).padStart(4, "0")}
          </span>
          <div className="relative h-24 w-24">
            {sprite ? (
              <Image
                src={sprite}
                alt={pokemon.name}
                fill
                className="object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                sizes="96px"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-muted" />
            )}
          </div>
          <p className="capitalize font-semibold text-sm">{pokemon.name}</p>
          <div className="flex gap-1 flex-wrap justify-center">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name} size="sm" />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
