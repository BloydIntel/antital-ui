"use client"

import { useParams, useRouter } from 'next/navigation'
import { FundraiserOnly } from '@/components/auth/require-user-type'
import FundraiserSettings from '@/app/(dashboard)/settings/components/FundraiserSettings'

export default function FundraiserSettingsSlugPage() {
    const params = useParams()
    const router = useRouter()
    const slug = (params?.slug as string) || ''

    return (
        <FundraiserOnly>
            <FundraiserSettings
                activeSlug={slug}
                onNavigate={(newSlug) => router.push(`/settings/${newSlug}`)}
            />
        </FundraiserOnly>
    )
}
