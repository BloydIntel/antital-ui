"use client"

import React from 'react'
import { CheckCircle2, AlertTriangle, Clock4 } from 'lucide-react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'

interface ApplicationStatusProps {
    onRespondToQueries?: () => void
}

export function ApplicationStatus({ onRespondToQueries }: ApplicationStatusProps) {
    const steps = [
        { label: "KYC/AML Verification", status: "completed" },
        { label: "Document Submission", status: "active" },
        { label: "Regulatory Review", status: "upcoming" },
        { label: "Platform Listing", status: "upcoming" },
    ]

    return (
        <div className="w-full h-full bg-white border border-[#F4F5F7] rounded-xl p-4 font-sans flex flex-col justify-between">

            {/* Tracker Steps Stack */}
            <div className="space-y-6">
                <h3 className="text-[#1B1B1B] text-base font-medium tracking-tight">
                    Application Status
                </h3>

                <div className="space-y-5">
                    {steps.map((step, idx) => {
                        const isCompleted = step.status === "completed"
                        const isActive = step.status === "active"

                        return (
                            <div key={idx} className="flex items-center gap-3 text-sm">
                                {isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />
                                ) : isActive ? (
                                    <Clock4 className="w-5 h-5 text-[#B9C65B] fill-[#B9C65B]/10 stroke-[2.5] shrink-0" />
                                ) : (
                                    <div className="w-5 h-5 rounded-full border border-[#EAEAEA] flex items-center justify-center shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-[#D1D5DB]" />
                                    </div>
                                )}

                                <span className={`font-medium ${isCompleted || isActive ? "text-[#1B1B1B]" : "text-[#A8A8A8]"
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Action Warning Alert Box */}
            <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-xl p-4 space-y-3 mt-8">
                <div className="flex items-center justify-center gap-2 text-[#F4B942]">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="text-[14px] font-medium leading-tight">
                        Regulatory Clarification
                    </div>
                </div>
                <p className="text-[12px] text-[#F4B942] text-center leading-relaxed font-normal">
                    Compliance team has raised 1 query regarding your valuation model.
                </p>
                <OnboardingButton
                    label='Respond to queries'
                    variant='plain'
                    className='my-0 text-[#DCA73B] bg-white hover:text-[#1F1F1F] border-[#F4B942]'
                    onClick={onRespondToQueries}
                />
            </div>

        </div>
    )
}