import React from 'react'
import Campaign from '@/app/(dashboard)/campaigns/components/Campaigns'
import { FundraiserOnly } from '@/components/auth/require-user-type'

export default function page() {
    return (
        <FundraiserOnly>
            <Campaign />
        </FundraiserOnly>
    )
}
