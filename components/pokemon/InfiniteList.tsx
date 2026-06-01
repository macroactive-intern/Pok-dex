"use client";

import { useEffect, useRef, useMemo } from "react";
import { useInfinitePokemonList } from "@/lib/pokemon/client";
import type { Pokemon } from "@/lib/pokemon/types";
import PokemonGrid from "./PokemonGrid";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 20;

interface InfiniteListProps {
  initialPokemon: Pokemon[];
}

export default function InfiniteList({ initialPokemon }: InfiniteListProps) {
  const initialData = useMemo(
    () => ({
      pages: [
        {
          pokemon: initialPokemon,
          next: "has-more" as string | null,
          offset: PAGE_SIZE,
        },
      ],
      pageParams: [0] as number[],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfinitePokemonList(initialData);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "error") {
    return <p className="text-destructive">Failed to load Pokémon.</p>;
  }

  const allPokemon: Pokemon[] = data.pages.flatMap((p) => p.pokemon);

  return (
    <div className="space-y-6">
      <PokemonGrid pokemon={allPokemon} />
      <div ref={sentinelRef} className="flex justify-center py-4">
        {isFetchingNextPage && <GridSkeleton count={6} />}
        {!hasNextPage && !isFetchingNextPage && (
          <p className="text-muted-foreground text-sm">All Pokémon loaded.</p>
        )}
      </div>
    </div>
  );
}

function GridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-40 rounded-xl" />
      ))}
    </div>
  );
}
