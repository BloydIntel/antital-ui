import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function InvestmentCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col p-4 bg-white rounded-lg border border-[#F4F5F7] w-full max-w-[358px] md:max-w-[397px] min-h-[500px] md:min-h-[600px]",
        className
      )}
    >
      <Skeleton className="w-full h-[200px] rounded-lg" />
      <div className="flex flex-col gap-4 mt-6 flex-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <div className="grid grid-cols-2 gap-3 mt-2">
          <Skeleton className="h-10 rounded-md" />
          <Skeleton className="h-10 rounded-md" />
          <Skeleton className="h-10 rounded-md" />
          <Skeleton className="h-10 rounded-md" />
        </div>
        <Skeleton className="h-2 w-full rounded-full mt-auto" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
    </div>
  )
}

export function InvestmentCardGridSkeleton({
  count = 3,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center",
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <InvestmentCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function InvestmentCardRowSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="w-full flex gap-5 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <InvestmentCardSkeleton key={index} className="shrink-0" />
      ))}
    </div>
  )
}

export function InvestmentDetailSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("w-full", compact ? "px-4 py-6" : "max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] py-8 lg:py-16")}>
      <Skeleton className="h-6 w-32 rounded-full mb-8" />
      <Skeleton className="h-8 w-2/3 max-w-xl mb-3" />
      <Skeleton className="h-5 w-full max-w-2xl mb-12" />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex flex-col w-full lg:flex-1 max-w-[816px] gap-6">
          <Skeleton className="w-full aspect-video rounded-xl" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-24 rounded-lg shrink-0" />
            ))}
          </div>
          <Skeleton className="h-12 w-3/4 max-w-lg" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-4/5" />
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[360px] shrink-0">
          <div className="rounded-xl border border-[#EAEAEA] p-6 space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-2 w-full rounded-full" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
