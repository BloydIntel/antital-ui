"use client"

import { PaymentApplicationFee } from '@/components/onboarding/organisms/fundraiser/payment-application-fee/PaymentApplicationFee'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'


export function MarketPlacePayment() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const companyName = searchParams.get('company');
    const unitPrice = Number(searchParams.get("price")) || 0;
    const minInvestment = Number(searchParams.get("minInvestment"))

    return (
        <div className='px-4 lg:px-8 min-h-screen'>
            <div className='sticky top-20 z-50 bg-[#F8F8F8F8] hidden lg:flex gap-1 items-center'>
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
                <PaymentApplicationFee companyName={companyName!} unitPrice={unitPrice} minInvestment={minInvestment} />
            </div>
        </div>
    )
}
