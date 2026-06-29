import React, { Suspense } from 'react'
import { InvestCallbackContent } from './InvestCallbackContent'

export default function InvestCallbackPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
            <InvestCallbackContent />
        </Suspense>
    )
}
