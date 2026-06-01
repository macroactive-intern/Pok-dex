"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { getPokemonByName, getPokemonList } from "./api";
import type { Pokemon } from "./types";

const PAGE_SIZE = 20;

export interface PokemonPage {
  pokemon: Pokemon[];
  next: string | null;
  offset: number;
}

async function fetchPokemonPage({
  pageParam,
}: {
  pageParam: number;
}): Promise<PokemonPage> {
  const list = await getPokemonList(PAGE_SIZE, pageParam);
  const pokemon = await Promise.all(
    list.results.map((r) => getPokemonByName(r.name))
  );
  return { pokemon, next: list.next, offset: pageParam + PAGE_SIZE };
}

export function usePokemon(name: string) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
  });
}

export function usePokemonSearch(name: string) {
  return useQuery({
    queryKey: ["pokemon-search", name],
    queryFn: () => getPokemonByName(name.toLowerCase().trim()),
    enabled: !!name.trim(),
    retry: false,
  });
}

export function useInfinitePokemonList(
  initialData?: InfiniteData<PokemonPage, number>
) {
  return useInfiniteQuery({
    queryKey: ["pokemon-infinite"],
    queryFn: fetchPokemonPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.next ? lastPage.offset : undefined,
    initialData,
  });
}

export function usePokemonCompare(a?: string, b?: string) {
  const left = useQuery({
    queryKey: ["pokemon", a ?? ""],
    queryFn: () => getPokemonByName(a!),
    enabled: !!a,
  });
  const right = useQuery({
    queryKey: ["pokemon", b ?? ""],
    queryFn: () => getPokemonByName(b!),
    enabled: !!b,
  });
  return { left, right };
}
