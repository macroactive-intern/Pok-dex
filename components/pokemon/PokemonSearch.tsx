"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePokemonSearch } from "@/lib/pokemon/client";
import PokemonCard from "./PokemonCard";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Inline search results ────────────────────────────────────────────────────

function SearchResults({ query }: { query: string }) {
  const { data, isLoading, isError } = usePokemonSearch(query);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        {/* Matches PokemonCard structure for a stable layout shift */}
        <div className="flex w-40 flex-col items-center gap-2 rounded-xl border p-4">
          <Skeleton className="h-3 w-10 self-start" />
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        No Pokémon found for{" "}
        <span className="font-medium text-foreground">"{query}"</span>.
        <br />
        <span className="text-sm">Try an exact name or Pokédex number.</span>
      </p>
    );
  }

  return (
    <div className="flex justify-center py-4">
      <div className="w-44">
        <PokemonCard pokemon={data} />
      </div>
    </div>
  );
}

// ─── PokemonSearch ────────────────────────────────────────────────────────────

interface PokemonSearchProps {
  /** Rendered when the query is empty (e.g. InfiniteList). Replaced by results when searching. */
  children?: React.ReactNode;
}

export default function PokemonSearch({ children }: PokemonSearchProps) {
  const [input, setInput]   = useState("");
  const [query, setQuery]   = useState("");

  // 300ms debounce: update the live query only after typing pauses
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(input.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(timer);
  }, [input]);

  function clear() {
    setInput("");
    setQuery("");
  }

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="relative mx-auto w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search by name or Pokédex number…"
          className="pl-9 pr-9"
          aria-label="Search Pokémon"
        />
        {input && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results when searching, children (InfiniteList) otherwise */}
      {query ? <SearchResults query={query} /> : children}
    </div>
  );
}
