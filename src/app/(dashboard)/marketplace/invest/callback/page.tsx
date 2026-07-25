import React, { Suspense } from 'react'
import { InvestCallbackContent } from './InvestCallbackContent'
import { InvestorOnly } from '@/components/auth/require-user-type'
import { PageLoadingSkeleton } from '@/components/skeletons/page-skeletons'

export default function InvestCallbackPage() {
    return (
        <InvestorOnly>
            <Suspense fallback={<PageLoadingSkeleton />}>
                <InvestCallbackContent />
            </Suspense>
        </InvestorOnly>
    )
}
