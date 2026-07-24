import { Skeleton } from "@/components/ui/skeleton"

export function PaymentMethodsSkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="w-full bg-white border border-[#EAEAEA] rounded-xl p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function RecentActivitySkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="mt-8 space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-xl border border-[#EAEAEA] bg-white p-4"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      ))}
    </div>
  )
}

export function TransactionHistorySkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-[#EAEAEA] bg-white overflow-hidden">
      <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-[#FAFAFA] border-b border-[#EAEAEA]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-20" />
        ))}
      </div>
      <div className="divide-y divide-[#EAEAEA]">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-4 px-6 py-4">
            {Array.from({ length: 5 }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 w-24" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function TransactionInvoiceSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8">
      <div className="max-w-[692px] mx-auto bg-white border border-[#EAEAEA] rounded-xl p-6 md:p-12 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 pb-6 border-b border-[#EAEAEA]">
          <div className="space-y-2">
            <Skeleton className="h-11 w-36" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="space-y-2 sm:text-right">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-44 sm:ml-auto" />
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-44" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <div className="rounded-xl bg-[#EAEAEA] p-4 space-y-4">
          <Skeleton className="h-5 w-44" />
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MarketplacePaymentSkeleton() {
  return (
    <div className="px-4 lg:px-8 min-h-screen py-8 space-y-8">
      <div className="hidden lg:flex gap-2 items-center">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <div className="rounded-xl border border-[#EAEAEA] p-6 space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-11 w-full rounded-md" />
          <Skeleton className="h-11 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
