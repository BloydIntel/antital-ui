import React from 'react'
import BalanceFunding from '@/app/(dashboard)/balance-funding/components/BalanceFunding'
import { InvestorOnly } from '@/components/auth/require-user-type'

export default function Page() {
    return (
        <InvestorOnly>
            <div>
                <BalanceFunding />
            </div>
        </InvestorOnly>
    )
}
