"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { tokenStorage } from "@/lib/token-storage"

export function RequireAuthentication({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const hasSession = hasMounted && Boolean(
    tokenStorage.getAccessToken() || tokenStorage.getRefreshToken()
  )

  useEffect(() => {
    if (hasMounted && !hasSession) {
      router.replace("/sign-in")
    }
  }, [hasMounted, hasSession, router])

  if (!hasSession) {
    return null
  }

  return <>{children}</>
}
