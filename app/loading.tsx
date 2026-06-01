import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border p-4">
      <Skeleton className="h-3 w-10 self-start" />
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-5 w-14 rounded-full" />
    </div>
  );
}

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Hero */}
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-72" />
      </div>

      {/* Type filter strip */}
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: 18 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>

      {/* Search bar */}
      <Skeleton className="h-10 w-full max-w-sm" />

      {/* Card grid — matches PokemonCard layout */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
