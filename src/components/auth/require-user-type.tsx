"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useUserStore, type UserType } from "@/store/userStore"

interface RequireUserTypeProps {
  allow: UserType | UserType[]
  children: ReactNode
}

/**
 * Client-side role gate. Wrong role → `/errors/forbidden` (full 403 page).
 * Waits for zustand persist hydration so default store values don't flash-allow.
 */
export function RequireUserType({ allow, children }: RequireUserTypeProps) {
  const router = useRouter()
  const userType = useUserStore((state) => state.userType)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const markReady = () => setHasHydrated(true)
    if (useUserStore.persist.hasHydrated()) {
      markReady()
    }
    return useUserStore.persist.onFinishHydration(markReady)
  }, [])

  const allowed = Array.isArray(allow) ? allow : [allow]
  const isAllowed = allowed.includes(userType)

  useEffect(() => {
    if (hasHydrated && !isAllowed) {
      router.replace("/errors/forbidden")
    }
  }, [hasHydrated, isAllowed, router])

  if (!hasHydrated || !isAllowed) {
    return null
  }

  return <>{children}</>
}

export function FundraiserOnly({ children }: { children: ReactNode }) {
  return <RequireUserType allow="fundraiser">{children}</RequireUserType>
}

export function InvestorOnly({ children }: { children: ReactNode }) {
  return (
    <RequireUserType allow={["individual", "corporate"]}>{children}</RequireUserType>
  )
}
