import React, { Suspense } from 'react'
import { MarketPlacePayment } from '@/app/(dashboard)/marketplace/invest/MarketPlacePayment'
import { InvestorOnly } from '@/components/auth/require-user-type'
import { PageLoadingSkeleton } from '@/components/skeletons/page-skeletons'

export default function page() {
    return (
        <InvestorOnly>
            <Suspense fallback={<PageLoadingSkeleton />}>
                <MarketPlacePayment />
            </Suspense>
        </InvestorOnly>
    )
}
