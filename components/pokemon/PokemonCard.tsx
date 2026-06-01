import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import TypeBadge from "./TypeBadge";
import type { Pokemon, TypeName } from "@/lib/pokemon/types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

function formatName(name: string): string {
  return name.replace(/-/g, " ");
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const sprite =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  return (
    <Link href={`/pokemon/${pokemon.name}`} className="block">
      <Card className="group h-full cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:translate-y-0">
        <CardContent className="flex flex-col items-center gap-2 p-4">
          {/* Pokédex number */}
          <span className="self-start text-xs text-muted-foreground font-mono tabular-nums">
            #{String(pokemon.id).padStart(4, "0")}
          </span>

          {/* Sprite */}
          <div className="relative h-24 w-24 shrink-0">
            {sprite ? (
              <Image
                src={sprite}
                alt={formatName(pokemon.name)}
                fill
                sizes="96px"
                className="object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted text-3xl text-muted-foreground select-none">
                ?
              </div>
            )}
          </div>

          {/* Name */}
          <p className="text-center text-sm font-semibold capitalize leading-tight">
            {formatName(pokemon.name)}
          </p>

          {/* Type badges */}
          <div className="flex flex-wrap justify-center gap-1">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name as TypeName} size="sm" />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
