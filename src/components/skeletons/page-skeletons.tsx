import { Skeleton } from "@/components/ui/skeleton"

export function PageLoadingSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mx-auto" />
        <Skeleton className="h-11 w-full rounded-lg mt-6" />
      </div>
    </div>
  )
}

export function DashboardPageSkeleton() {
  return (
    <div className="space-y-6 p-1">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  )
}

export function ChatPageSkeleton() {
  return (
    <div className="px-4 md:px-6">
      <div className="flex h-[600px] rounded-xl border border-[#EAEAEA] overflow-hidden bg-white">
        <div className="w-full md:w-80 border-r border-[#EAEAEA] p-4 space-y-3">
          <Skeleton className="h-10 w-full rounded-lg" />
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 p-2">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-1 flex-col">
          <div className="border-b border-[#EAEAEA] p-4 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex-1 p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className={`h-12 rounded-xl ${index % 2 === 0 ? "w-2/3" : "w-1/2 ml-auto"}`}
              />
            ))}
          </div>
          <div className="border-t border-[#EAEAEA] p-4">
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function QuestionnaireSkeleton() {
  return (
    <div className="space-y-6 py-10">
      <Skeleton className="h-7 w-64" />
      <Skeleton className="h-4 w-full max-w-2xl" />
      <div className="space-y-4 pt-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-[#EAEAEA] p-5 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
        ))}
      </div>
      <Skeleton className="h-11 w-32 rounded-lg" />
    </div>
  )
}

export function AuthVerifySkeleton() {
  return (
    <div className="rounded-xl border border-[#EAEAEA] p-8 flex flex-col items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-7 w-56" />
      <Skeleton className="h-4 w-72" />
    </div>
  )
}

export function ResetPasswordFormSkeleton() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-11 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  )
}

export function InlineTextSkeleton({ width = "w-24" }: { width?: string }) {
  return <Skeleton className={`h-4 ${width} inline-block align-middle`} />
}
