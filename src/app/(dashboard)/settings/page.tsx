"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from "@/store/userStore"
import { InvestorsSettings } from './components/InvestorsSettings'
import FundraiserSettings from './components/FundraiserSettings'

export default function SettingsIndexPage() {
    const router = useRouter()
    const userType = useUserStore((state) => state.userType)
    const [hasHydrated, setHasHydrated] = useState(false)

    useEffect(() => {
        setHasHydrated(true)
    }, [])

    const currentUserType = hasHydrated ? userType : "individual"
    const isFundraiser = currentUserType === 'fundraiser'

    if (!hasHydrated) return null

    // If they are a fundraiser on the root path, show the settings menu dashboard shell
    if (isFundraiser) {
        return (
            <FundraiserSettings
                activeSlug=""
                onNavigate={(newSlug) => router.push(`/settings/${newSlug}`)}
            />
        )
    }

    // Otherwise, render investor settings tabs
    return <InvestorsSettings />
}