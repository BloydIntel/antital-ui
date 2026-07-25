import { Skeleton } from "@/components/ui/skeleton"

export function SettingsProfileSkeleton() {
  return (
    <div className="w-full mx-auto rounded-xl space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SettingsAccountSkeleton() {
  return (
    <div className="w-full space-y-8">
      <div>
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-[#EAEAEA] p-5 space-y-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-[#EAEAEA] p-5 space-y-4">
        <Skeleton className="h-5 w-40" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SettingsCompanyProfileSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-[#F4F5F7] overflow-hidden">
        <Skeleton className="h-28 w-full rounded-none" />
        <div className="px-6 pb-6 flex items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-full -mt-10" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-xl border border-[#F4F5F7] p-4 space-y-4">
            <Skeleton className="h-5 w-40" />
            <div className="grid sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-11 w-full rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="rounded-xl border border-[#F4F5F7] p-4 space-y-4">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-full rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SettingsContactSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div>
        <Skeleton className="h-6 w-44 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-40" />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}

export function SettingsPreferencesSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start justify-between rounded-xl border border-[#EAEAEA] p-5 gap-6"
          >
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-5/6 max-w-lg" />
            </div>
            <Skeleton className="h-6 w-11 rounded-full shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
