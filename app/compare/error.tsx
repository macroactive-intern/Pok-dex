"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-semibold">Compare failed</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={reset}>Try again</Button>
        <Link href="/" className={buttonVariants()}>Back to Pokédex</Link>
      </div>
    </main>
  );
}
