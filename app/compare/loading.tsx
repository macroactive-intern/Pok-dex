import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Nav row */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-48" />
        <div className="w-16" />
      </div>

      {/* Two name inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Side-by-side cards */}
      <div className="grid grid-cols-3 items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-8 w-10 mx-auto" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>

      {/* Stat bars */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-3 items-center gap-3">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-3 w-16 mx-auto" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>
    </main>
  );
}
