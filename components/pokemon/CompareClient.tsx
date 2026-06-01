"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import ComparePanel from "./ComparePanel";
import { Input } from "@/components/ui/input";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function CompareClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [inputA, setInputA] = useState(searchParams.get("a") ?? "");
  const [inputB, setInputB] = useState(searchParams.get("b") ?? "");

  const a = useDebounce(inputA.trim().toLowerCase(), 400);
  const b = useDebounce(inputB.trim().toLowerCase(), 400);

  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    const params = new URLSearchParams();
    if (a) params.set("a", a);
    if (b) params.set("b", b);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [a, b, pathname, router]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="pokemon-a" className="text-sm font-medium">Pokémon A</label>
          <Input
            id="pokemon-a"
            placeholder="e.g. pikachu"
            value={inputA}
            onChange={(e) => setInputA(e.target.value.toLowerCase())}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="pokemon-b" className="text-sm font-medium">Pokémon B</label>
          <Input
            id="pokemon-b"
            placeholder="e.g. charizard"
            value={inputB}
            onChange={(e) => setInputB(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <ComparePanel pokemonA={a || undefined} pokemonB={b || undefined} />
    </div>
  );
}
