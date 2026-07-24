import { Skeleton } from "@/components/ui/skeleton"

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
