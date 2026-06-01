import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-72" />
        <Skeleton className="h-10 w-80" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </main>
  );
}
