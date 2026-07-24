import React, { Suspense } from 'react'
import { MarketPlacePayment } from '@/app/(dashboard)/marketplace/invest/MarketPlacePayment'
import { InvestorOnly } from '@/components/auth/require-user-type'

export default function page() {
    return (
        <InvestorOnly>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
                <MarketPlacePayment />
            </Suspense>
        </InvestorOnly>
    )
}
