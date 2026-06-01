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
  // Seed React Query's cache with the server-rendered first page so it never
  // re-fetches page 0; infinite scroll starts from offset PAGE_SIZE.
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

  // Sentinel: a zero-height element at the list bottom.
  // IntersectionObserver fires when it enters the viewport (+ 200px rootMargin).
  // useEffect is only used to attach / detach the observer — no polling.
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
    return (
      <p className="py-16 text-center text-destructive">
        Failed to load Pokémon. Please refresh.
      </p>
    );
  }

  const allPokemon: Pokemon[] = data.pages.flatMap((p) => p.pokemon);

  return (
    <div className="space-y-6">
      <PokemonGrid pokemon={allPokemon} />

      {/* Skeleton cards shown while the next page loads */}
      {isFetchingNextPage && <CardSkeleton count={PAGE_SIZE} />}

      {/* Zero-height sentinel — intersection triggers fetchNextPage */}
      <div ref={sentinelRef} aria-hidden="true" />

      {/* End-of-list message, shown only after all pages are loaded */}
      {!hasNextPage && !isFetchingNextPage && (
        <p className="pb-8 text-center text-sm text-muted-foreground">
          All Pokémon loaded.
        </p>
      )}
    </div>
  );
}

function CardSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        // Mimics PokemonCard inner layout: number + sprite + name + badge
        <div key={i} className="flex flex-col items-center gap-2 rounded-xl border p-4">
          <Skeleton className="h-3 w-10 self-start" />
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      ))}
    </div>
  );
}
