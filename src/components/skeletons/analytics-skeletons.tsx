import { Skeleton } from "@/components/ui/skeleton"

export function AnalyticsOverviewSkeleton() {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex-1 bg-white border border-[#EAEAEA] rounded-xl p-4 flex items-center gap-5 min-w-[240px]"
        >
          <Skeleton className="h-14 w-14 rounded-lg shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function AnalyticsTrafficSkeleton() {
  return (
    <div className="w-full bg-white border border-[#F4F5F7] rounded-xl p-6">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="h-[392px] flex items-end justify-between gap-3 px-8 pb-6">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full max-w-10 rounded-t-md"
            style={{ height: `${35 + (index % 4) * 15}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function AnalyticsDiversitySkeleton() {
  return (
    <div className="w-full max-w-[640px] bg-white border border-[#F4F5F7] rounded-xl p-6">
      <Skeleton className="h-5 w-40 mb-6" />
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-3 w-full rounded-full" />
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-16" />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-36" />
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function AnalyticsConversionSkeleton() {
  return (
    <div className="w-full bg-white border border-[#F4F5F7] rounded-xl p-6">
      <Skeleton className="h-5 w-40 mb-5" />
      <div className="space-y-0">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-[#EAEAEA] last:border-0"
          >
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}
