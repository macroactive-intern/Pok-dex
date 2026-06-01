"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function PokemonSearch() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return;
    startTransition(() => {
      router.push(`/pokemon/${trimmed}`);
    });
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or number…"
        className="flex-1"
        disabled={isPending}
      />
      <Button type="submit" disabled={isPending || !query.trim()}>
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
