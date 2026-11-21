import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function NotificationCenterSkeleton({
  rows = 5,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("w-full bg-[#FAFAFA] min-h-screen space-y-6", className)}>
      {/* Top Toolbar Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 lg:h-8 w-52" />
          <Skeleton className="h-4 lg:h-5 w-72 lg:w-96" />
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>

      {/* Sub-counter and Utility Filter Action Bar Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="space-y-2">
          <Skeleton className="h-5 md:h-6 w-40" />
          <Skeleton className="h-4 w-64 lg:w-80" />
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <Skeleton className="h-10 w-48 sm:w-56 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
          <div className="flex items-center gap-2 ml-2">
            <Skeleton className="h-3 w-3 rounded" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>

      {/* Notifications Feed Cards Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="flex items-center bg-white border border-[#F0F0F0] rounded-xl p-4 relative"
          >
            {/* Checkbox */}
            <div className="pt-1 pr-3">
              <Skeleton className="w-3 h-3 rounded" />
            </div>

            <div className="flex items-start flex-1 min-w-0">
              {/* Category Icon */}
              <div className="pt-1 pr-3">
                <Skeleton className="w-4 h-4 md:w-5 md:h-5 rounded-md shrink-0" />
              </div>

              {/* Message Body */}
              <div className="flex-1 min-w-0 pr-8 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Skeleton className="h-5 md:h-6 w-48 lg:w-64" />
                  <Skeleton className="h-5 w-16 rounded" />
                </div>

                <Skeleton className="h-4 md:h-5 w-64 sm:w-80 lg:w-3/4" />

                <div className="flex items-center gap-1.5 pt-0.5">
                  <Skeleton className="h-3.5 w-3.5 rounded-full" />
                  <Skeleton className="h-3.5 w-20" />
                </div>

                {index === 0 && (
                  <div className="pt-1">
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                )}
              </div>

              {/* Row Delete Icon */}
              <div className="hidden lg:block absolute right-4 top-4">
                <Skeleton className="h-7 w-7 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}