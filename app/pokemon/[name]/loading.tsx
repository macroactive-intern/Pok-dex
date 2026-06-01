import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <Skeleton className="h-8 w-20" />
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        <Skeleton className="h-48 w-48 rounded-xl" />
        <div className="space-y-3 flex-1 w-full">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    </main>
  );
}
