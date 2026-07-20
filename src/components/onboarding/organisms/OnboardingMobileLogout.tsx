"use client"

import useLogout from "@/hooks/use-logout"

/** Mobile-only logout — desktop uses the onboarding sidebar control. */
export function OnboardingMobileLogout() {
  const logoutMutation = useLogout()

  return (
    <div className="lg:hidden w-full flex justify-end px-4 pt-4">
      <button
        type="button"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending}
        className="text-sm text-[#042E27] hover:underline disabled:opacity-60 font-[family-name:var(--font-dm-sans)] cursor-pointer"
      >
        {logoutMutation.isPending ? "Logging out…" : "Log out"}
      </button>
    </div>
  )
}
