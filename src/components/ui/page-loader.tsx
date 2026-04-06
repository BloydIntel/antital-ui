"use client"

export function PageLoader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      aria-live="polite"
      aria-label="Loading, please wait"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
        <p className="text-white text-sm font-medium"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Loading…
        </p>
      </div>
    </div>
  )
}
