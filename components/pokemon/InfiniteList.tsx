"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { getPokemonByName, getPokemonList } from "@/lib/pokemon/api";
import type { Pokemon } from "@/lib/pokemon/types";
import PokemonGrid from "./PokemonGrid";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 20;

async function fetchPage({ pageParam }: { pageParam: number }) {
  const list = await getPokemonList(PAGE_SIZE, pageParam);
  const pokemon = await Promise.all(
    list.results.map((r) => getPokemonByName(r.name))
  );
  return { pokemon, next: list.next, offset: pageParam + PAGE_SIZE };
}

interface InfiniteListProps {
  initialPokemon: Pokemon[];
}

export default function InfiniteList({ initialPokemon }: InfiniteListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["pokemon-infinite"],
      queryFn: fetchPage,
      initialPageParam: PAGE_SIZE,
      getNextPageParam: (last) => (last.next ? last.offset : undefined),
      initialData: {
        pages: [{ pokemon: initialPokemon, next: "yes", offset: PAGE_SIZE }],
        pageParams: [0],
      },
    });

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
