"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminOtpPageLayout } from "./admin-otp-page-layout"
import { usePendingOtpStore } from "@/store/pendingOtpStore"

export default function AdminOtpPage() {
    const router = useRouter()
    const challengeId = usePendingOtpStore((state) => state.challengeId)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        setIsReady(true)
    }, [])

    useEffect(() => {
        if (isReady && !challengeId) {
            router.replace("/sign-in")
        }
    }, [challengeId, isReady, router])

    if (!isReady || !challengeId) return null

    return (
        <AdminOtpPageLayout
            onVerifySuccess={() => {
                router.replace("/dashboard")
            }}
        />
    )
}
