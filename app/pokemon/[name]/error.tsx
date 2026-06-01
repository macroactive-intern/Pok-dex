"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-semibold">Pokémon not found</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={reset}>Try again</Button>
        <Button asChild><Link href="/">Back to Pokédex</Link></Button>
      </div>
    </main>
  );
}
