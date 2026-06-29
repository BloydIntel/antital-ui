"use client"

import { PaymentApplicationFee } from '@/components/onboarding/organisms/fundraiser/payment-application-fee/PaymentApplicationFee'
import { useInvestmentCheckoutOffering } from '@/hooks/use-investment-checkout-offering'
import { parseCheckoutSearchParams } from '@/lib/investment-checkout'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export function MarketPlacePayment() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const checkoutContext = parseCheckoutSearchParams(searchParams)
    const { data: shell, isLoading, isError } = useInvestmentCheckoutOffering(
        checkoutContext?.slug ?? null
    )

    const companyName = shell?.offering.name
    const unitPrice = shell?.funding.sharePrice
    const minInvestment = shell?.funding.minInvestment

    if (!checkoutContext) {
        return (
            <div className="px-4 lg:px-8 min-h-screen flex items-center justify-center">
                <div className="max-w-md text-center space-y-4">
                    <p className="text-[#2C2C2C] text-lg">This checkout link is missing offering details.</p>
                    <button
                        type="button"
                        className="text-[#7BA147] underline"
                        onClick={() => router.push('/marketplace')}
                    >
                        Back to marketplace
                    </button>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="px-4 lg:px-8 min-h-screen flex items-center justify-center">
                <p className="text-[#505050]">Loading offering details…</p>
            </div>
        )
    }

    if (isError || !shell || !companyName || unitPrice == null || minInvestment == null) {
        return (
            <div className="px-4 lg:px-8 min-h-screen flex items-center justify-center">
                <div className="max-w-md text-center space-y-4">
                    <p className="text-[#2C2C2C] text-lg">Unable to load this investment offering.</p>
                    <button
                        type="button"
                        className="text-[#7BA147] underline"
                        onClick={() => router.push('/marketplace')}
                    >
                        Back to marketplace
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='px-4 lg:px-8 min-h-screen'>
            <div className='sticky top-[70px] z-50 bg-[#F8F8F8F8] hidden lg:flex gap-1 items-center'>
                <button
                    onClick={() => router.back()}
                    className="hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    aria-label="Go back"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12H3M10 19l-7-7 7-7" />
                    </svg>
                </button>

                <p className='text-[#858585] text-[18px]'>Trade & Market &gt;</p>
                <p className='text-[#858585] text-[18px]'>Invest &gt;</p>
                <p className='text-[18px]'>{companyName}</p>
            </div>

            <div className='lg:pt-14'>
                <PaymentApplicationFee
                    companyName={companyName}
                    unitPrice={unitPrice}
                    minInvestment={minInvestment}
                    offeringId={checkoutContext.offeringId}
                    offeringSlug={checkoutContext.slug}
                />
            </div>
        </div>
    )
}
