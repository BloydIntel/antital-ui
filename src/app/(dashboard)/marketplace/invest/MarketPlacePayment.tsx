import { PaymentApplicationFee } from '@/components/onboarding/organisms/fundraiser/payment-application-fee/PaymentApplicationFee'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

const companyDetails = {
    name: "Green Tech Solution"
}

export function MarketPlacePayment() {
    return (
        <div className='px-4 lg:px-8 min-h-screen'>
            <div className='hidden lg:flex gap-1 items-center'>
                <ArrowLeft size={18} />
                <p className='text-[#858585] text-[18px]'>Trade & Market &gt;</p>
                <p className='text-[#858585] text-[18px]'>Invest &gt;</p>
                <p className='text-[18px]'>{companyDetails.name}</p>
            </div>

            <div className='lg:pt-14'>
                <PaymentApplicationFee />
            </div>
        </div>
    )
}
