"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { DocumentUpload } from '@/components/onboarding/organisms/kyc/DocumentUpload'

const KYC_SUB_STEPS = [
    { id: 'docs', title: 'Government ID' },
    { id: 'selfie', title: 'Selfie' },
    { id: 'income', title: 'Income' }
]

export function IdentityVerification() {
    const [step, setStep] = useState(0)

    const nextStep = () => setStep((p) => Math.min(p + 1, KYC_SUB_STEPS.length - 1))
    const prevStep = () => setStep((p) => Math.max(p - 1, 0))

    return (
        <div className="w-full flex flex-col gap-10">
            {/* Header Section */}
            <div>
                <div className="flex justify-between">
                    <h2 className="text-[28px] text-[#1B1B1B] leading-tight"
                        style={{
                            fontFamily: "var(--font-rethink-sans)",
                            fontWeight: 500,
                            letterSpacing: "-1%",
                        }}
                    >
                        Identity Verification
                    </h2>
                    <button className="text-[#0F3D2E] text-sm font-semibold hover:underline">
                        Skip to complete KYC later
                    </button>
                </div>

                <p className="text-[16px] text-[#2C2C2C] leading-tight"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        letterSpacing: "-1%",
                    }}
                >
                    Upload your ID, proof of address, and a selfie to complete verification.
                </p>

            </div>

            {/* Dynamic Content Area */}
            <div className="min-h-[500px]">
                {step === 0 && <DocumentUpload />}
                {step === 1 && <div className="py-20 text-center">Selfie Camera UI Placeholder</div>}
                {step === 2 && <div className="py-20 text-center">Income Document UI Placeholder</div>}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-8 pb-10">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    className="h-12 px-6 gap-2 border-[#E6EEDC] text-[#3D3D3D]"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </Button>

                {/* Stepper Dots */}
                <div className="flex gap-2">
                    {KYC_SUB_STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#042E27]' : 'w-2 bg-[#E6EEDC]'
                                }`}
                        />
                    ))}
                </div>

                <Button
                    onClick={nextStep}
                    className="h-12 px-8 gap-2 bg-[#042E27] hover:bg-[#042E27]/90 text-white"
                >
                    Next <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}