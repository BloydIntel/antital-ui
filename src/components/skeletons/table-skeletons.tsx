import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function WatchlistTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-[#EAEAEA] bg-white overflow-hidden">
      <div className="hidden lg:grid grid-cols-6 gap-4 px-6 py-4 bg-[#FAFAFA] border-b border-[#EAEAEA]">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-20" />
        ))}
      </div>
      <div className="divide-y divide-[#EAEAEA]">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 lg:grid-cols-6 gap-4 px-6 py-5 items-center">
            <div className="flex items-center gap-3 lg:col-span-2">
              <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-4 w-16 hidden lg:block" />
            <Skeleton className="h-4 w-20 hidden lg:block" />
            <Skeleton className="h-4 w-14 hidden lg:block" />
            <div className="flex gap-2 justify-end">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function QIITableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#EAEAEA]">
      <table className="w-full">
        <thead>
          <tr className="bg-[#EDF1D6]">
            {Array.from({ length: 5 }).map((_, index) => (
              <th key={index} className="py-3 px-4 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F4F5F7]">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <td key={colIndex} className="py-4 px-4">
                  <Skeleton className="h-4 w-24" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DocumentTableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="rounded-lg border border-[#EAEAEA] overflow-hidden">
      <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-20" />
        ))}
      </div>
      <div className="divide-y divide-[#EAEAEA]">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-4 px-4 py-4 items-center">
            <div className="flex items-center gap-3 col-span-2">
              <Skeleton className="h-8 w-8 rounded-md shrink-0" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-20 rounded-md justify-self-end" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function InboxFeedSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="divide-y divide-[#EAEAEA]">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      ))}
    </div>
  )
}


export function TransactionHistorySkeleton2({
  rowCount = 5,
  className,
}: {
  rowCount?: number
  className?: string
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="w-full bg-white border border-[#EAEAEA] rounded-xl p-6 shadow-sm">
        {/* Header Controls Block Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="space-y-2">
            {/* Title */}
            <Skeleton className="h-6 lg:h-7 w-48" />
            {/* Subtitle */}
            <Skeleton className="h-4 w-64 lg:w-72" />
          </div>

          {/* Filter Dropdowns and Action Buttons Skeleton */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Date Filter Dropdown */}
            <Skeleton className="h-9 w-24 rounded-md" />
            {/* Type Filter Dropdown */}
            <Skeleton className="h-9 w-24 rounded-md" />
            {/* Status Filter Dropdown */}
            <Skeleton className="h-9 w-24 rounded-md" />
            {/* Select All Button */}
            <Skeleton className="h-9 w-28 rounded-md" />
            {/* Clear Button */}
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>

        {/* Structured Ledger Layout Skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#F0F0F0] text-[14px]">
                <th className="pb-3 pl-2 w-10">
                  <Skeleton className="h-4 w-4 rounded" />
                </th>
                <th className="pb-3">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="pb-3">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="pb-3">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="pb-3 text-right">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </th>
                <th className="pb-3 text-right">
                  <Skeleton className="h-4 w-12 ml-auto" />
                </th>
                <th className="pb-3 text-center">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </th>
                <th className="pb-3 text-center">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F9F9F9]">
              {Array.from({ length: rowCount }).map((_, index) => (
                <tr key={index}>
                  {/* Checkbox Column */}
                  <td className="py-2 lg:py-4 pl-2">
                    <Skeleton className="h-4 w-4 rounded" />
                  </td>

                  {/* Type Badge */}
                  <td className="py-2 lg:py-4">
                    <Skeleton className="h-6 w-24 rounded-md" />
                  </td>

                  {/* Description & SubDescription */}
                  <td className="py-2 lg:py-4 max-w-xs">
                    <div className="space-y-1.5">
                      <Skeleton className="h-5 w-36 lg:w-48" />
                      <Skeleton className="h-3 w-24 lg:w-32" />
                    </div>
                  </td>

                  {/* Date & TimeStamp */}
                  <td className="py-2 lg:py-4">
                    <div className="space-y-1.5">
                      <Skeleton className="h-5 w-20 lg:w-28" />
                      <Skeleton className="h-3 w-16 lg:w-20" />
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-2 lg:py-4 text-right">
                    <Skeleton className="h-5 w-20 lg:w-24 ml-auto" />
                  </td>

                  {/* Fees */}
                  <td className="py-2 lg:py-4 text-right">
                    <Skeleton className="h-5 w-14 lg:w-16 ml-auto mr-2" />
                  </td>

                  {/* Status Button */}
                  <td className="py-2 lg:py-4 text-center">
                    <Skeleton className="h-7 w-20 rounded-full mx-auto" />
                  </td>

                  {/* Action Buttons (Invoice & Download Icons) */}
                  <td className="py-2 lg:py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-4 rounded" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Skeleton */}
        <div className="flex items-center justify-end mt-4">
          <Skeleton className="h-9 w-64 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function RecordTableRowSkeleton({
  rowCount = 5,
}: {
  rowCount?: number
}) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <tr key={index} className="border-b border-transparent">
          {/* Institution */}
          <td className="py-4 px-4">
            <Skeleton className="h-5 w-36 lg:w-48" />
          </td>

          {/* Type */}
          <td className="py-4 px-4">
            <Skeleton className="h-5 w-24" />
          </td>

          {/* Commitment Amount */}
          <td className="py-4 px-4">
            <Skeleton className="h-5 w-28" />
          </td>

          {/* Committed Date */}
          <td className="py-4 px-4">
            <Skeleton className="h-5 w-24" />
          </td>

          {/* Status (Dot Indicator + Text) */}
          <td className="py-4 px-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2 h-2 rounded-full shrink-0" />
              <Skeleton className="h-5 w-16" />
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}