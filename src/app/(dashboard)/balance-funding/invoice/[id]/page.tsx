import React from 'react'
import TransactionInvoice from '@/app/(dashboard)/balance-funding/invoice/components/TransactionInvoice'
import { InvestorOnly } from '@/components/auth/require-user-type'

export default function page() {
    return (
        <InvestorOnly>
            <TransactionInvoice />
        </InvestorOnly>
    )
}
