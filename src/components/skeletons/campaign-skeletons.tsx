import { Skeleton } from "@/components/ui/skeleton"
import { InvestmentDetailSkeleton } from "@/components/skeletons/investment-skeletons"

export function CampaignUpdatesSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="pt-4 space-y-6">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="space-y-3 pb-6 border-b border-[#F4F5F7] last:border-0">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex gap-4 pt-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function CampaignPageSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-xl border border-[#EAEAEA] bg-white overflow-hidden">
        <InvestmentDetailSkeleton compact />
      </div>
      <div className="rounded-xl border border-[#EAEAEA] bg-white p-6 space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-11 w-full rounded-md" />
        <Skeleton className="h-10 w-32 rounded-lg" />
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export function OfferingPreviewSkeleton() {
  return (
    <div className="w-full rounded-xl border border-[#EAEAEA] bg-white overflow-hidden">
      <InvestmentDetailSkeleton compact />
    </div>
  )
}
