import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Nav row: back + compare */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        <Skeleton className="h-48 w-48 shrink-0 rounded-xl" />
        <div className="space-y-3 flex-1 w-full">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-10 w-48" />
          </div>
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
          <Skeleton className="h-16 w-full" />
          <div className="flex gap-6">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <Skeleton className="h-10 w-full" />

      {/* Stat bars */}
      <div className="space-y-3 pt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[3rem_1fr_3rem] items-center gap-3">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </main>
  );
}
