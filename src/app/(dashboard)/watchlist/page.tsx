import React from 'react'
import { Watchlist } from '@/app/(dashboard)/watchlist/components/Watchlist'
import { InvestorOnly } from '@/components/auth/require-user-type'

export default function Page() {
    return (
        <InvestorOnly>
            <Watchlist />
        </InvestorOnly>
    )
}
