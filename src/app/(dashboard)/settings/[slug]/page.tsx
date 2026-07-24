"use client"

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useUserStore } from "@/store/userStore"
import FundraiserSettings from '@/app/(dashboard)/settings/components/FundraiserSettings'

export default function FundraiserSettingsSlugPage() {
    const params = useParams()
    const router = useRouter()
    const slug = (params?.slug as string) || ''

    const userType = useUserStore((state) => state.userType)
    const [hasHydrated, setHasHydrated] = useState(false)

    useEffect(() => {
        setHasHydrated(true)
    }, [])

    const currentUserType = hasHydrated ? userType : "individual"
    const isFundraiser = currentUserType === 'fundraiser'

    useEffect(() => {
        if (hasHydrated && !isFundraiser) {
            router.replace('/settings')
        }
    }, [hasHydrated, isFundraiser, router])

    if (!hasHydrated || !isFundraiser) return null

    return (
        <FundraiserSettings
            activeSlug={slug}
            onNavigate={(newSlug) => router.push(`/settings/${newSlug}`)}
        />
    )
}