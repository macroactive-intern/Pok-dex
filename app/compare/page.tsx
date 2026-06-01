import { Suspense } from "react";
import CompareClient from "@/components/pokemon/CompareClient";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata = { title: "Compare Pokémon — Pokédex" };

export default function ComparePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ChevronLeft className="h-4 w-4" />Back
        </Link>
        <h1 className="text-2xl font-bold">Compare Pokémon</h1>
        <div className="w-16" />
      </div>
      <Suspense>
        <CompareClient />
      </Suspense>
    </main>
  );
}
