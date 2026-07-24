import React, { Suspense } from 'react'
import { InvestCallbackContent } from './InvestCallbackContent'
import { InvestorOnly } from '@/components/auth/require-user-type'

export default function InvestCallbackPage() {
    return (
        <InvestorOnly>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
                <InvestCallbackContent />
            </Suspense>
        </InvestorOnly>
    )
}
