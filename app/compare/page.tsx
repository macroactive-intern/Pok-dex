import ComparePanel from "@/components/pokemon/ComparePanel";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface Props {
  searchParams: Promise<{ left?: string; right?: string }>;
}

export const metadata = { title: "Compare Pokémon — Pokédex" };

export default async function ComparePage({ searchParams }: Props) {
  const { left, right } = await searchParams;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ChevronLeft className="h-4 w-4" />Back
        </Link>
        <div className="text-center space-y-0.5">
          <h1 className="text-2xl font-bold">Compare Pokémon</h1>
          <p className="text-sm text-muted-foreground font-mono">
            /compare?left=pikachu&amp;right=charmander
          </p>
        </div>
        <div className="w-16" />
      </div>

      <ComparePanel pokemonA={left} pokemonB={right} />
    </main>
  );
}
