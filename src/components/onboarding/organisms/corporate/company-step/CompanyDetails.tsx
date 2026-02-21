"use client"

import React from 'react'
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput'
import { TYPOGRAPHY } from '@/constants/styles'
import { useOnboardingStore } from '@/store/onboardingStore'
import { SelectInput } from '@/components/onboarding/molecules/SelectInput'

export function CompanyDetails({ onNext }: { onNext: () => void }) {
    const { formData, updateFormData } = useOnboardingStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext()
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-[558px] w-full mx-auto">
            <div className="mb-8">
                <h2 className="text-[36px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                    Corporate Investment Account
                </h2>
                <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                    Register your organization to invest in vetted Nigerian startups
                </p>
            </div>

            <div className="space-y-6">
                <p className="text-[24px] font-semibold text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Company Details
                </p>

                <OnboardingInput
                    label="Company Legal Name"
                    placeholder="Exactly as registered with CAC"
                    value={formData.companyName || ''}
                    onChange={(e) => updateFormData({ companyName: e.target.value })}
                />

                <OnboardingInput
                    label="Trading/Brand Name"
                    placeholder="Public business name"
                    value={formData.brandName || ''}
                    onChange={(e) => updateFormData({ brandName: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                    <SelectInput
                        label="Registration Type"
                        placeholder="BN (Business Name)"
                        options={[{ label: 'BN (Business Name)', value: 'BN' }]}
                    />
                    <OnboardingInput
                        label="Registration Number"
                        placeholder="BN1234567"
                    />
                </div>

                <OnboardingInput
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                />

                <div className="grid grid-cols-2 gap-4">
                    <OnboardingInput
                        label="Create Password"
                        type="password"
                        placeholder="***********"
                    />
                    <OnboardingInput
                        label="Confirm Password"
                        type="password"
                        placeholder="***********"
                    />
                </div>
            </div>
        </form>
    )
}