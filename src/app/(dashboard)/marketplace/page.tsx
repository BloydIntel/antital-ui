import React from 'react'
import { Marketplace } from '@/app/(dashboard)/marketplace/components/Marketplace'
import { InvestorOnly } from '@/components/auth/require-user-type'

export default function Page() {
    return (
        <InvestorOnly>
            <div>
                <Marketplace />
            </div>
        </InvestorOnly>
    )
}
