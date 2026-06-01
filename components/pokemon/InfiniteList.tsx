"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { getPokemon, getPokemonList } from "@/lib/pokemon/api";
import type { Pokemon } from "@/lib/pokemon/types";
import PokemonGrid from "./PokemonGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 24;

async function fetchPage({ pageParam = 0 }: { pageParam: number }) {
  const list = await getPokemonList(PAGE_SIZE, pageParam);
  const pokemon = await Promise.all(
    list.results.map((r) => getPokemon(r.name))
  );
  return { pokemon, next: list.next, offset: pageParam + PAGE_SIZE };
}

export default function InfiniteList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["pokemon-infinite"],
      queryFn: fetchPage,
      initialPageParam: 0,
      getNextPageParam: (last) => (last.next ? last.offset : undefined),
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

  if (status === "pending") return <GridSkeleton />;
  if (status === "error") return <p className="text-destructive">Failed to load Pokémon.</p>;

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

function GridSkeleton({ count = 24 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-40 rounded-xl" />
      ))}
    </div>
  );
}
