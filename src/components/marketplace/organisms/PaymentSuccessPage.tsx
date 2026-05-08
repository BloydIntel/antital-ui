"use client"

import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { TYPOGRAPHY } from '@/constants/styles'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface PaymentSuccessPageProps {
    totalAmount: number
    companyName: string
}

export function PaymentSuccessPage({ totalAmount, companyName }: PaymentSuccessPageProps) {

    const router = useRouter()

    return (
        <div className="flex flex-col justify-between lg:justify-start w-full h-screen lg:w-[568px] mx-auto">
            <div className='flex flex-col items-center py-4 px-6 space-y-4 mb-8' style={TYPOGRAPHY.body}>
                <Image src="/trade&market/payment-success-icon.png" alt='success' width={80} height={95} className='pt-[122px]' />

                <p className='text-[20px] text-[#2C2C2C]'>Investment Completed!</p>
                <p className='text-[14px] lg:text-[16px] text-[#505050] w-[358px] lg:w-[411px] text-center'>Your investment of ₦{totalAmount.toLocaleString()} in {companyName} has been confirmed and added to your portfolio.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-10">
                <div className="flex-1">
                    <OnboardingButton
                        label="Go to Dashboard"
                        variant="plain"
                        onClick={() => router.push('/dashboard')}
                        className="mt-0"
                    />
                </div>

                <div className="flex-1">
                    <OnboardingButton
                        label="Continue Exploring"
                        variant="solid"
                        onClick={() => router.push('/marketplace')}
                        className="mt-0"
                    />
                </div>
            </div>
        </div >
    )
}
