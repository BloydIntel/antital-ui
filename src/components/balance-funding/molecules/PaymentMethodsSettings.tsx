'use client'

import React, { useState } from 'react'
import { TYPOGRAPHY } from '@/constants/styles'
import { AddPaymentMethodModal } from './AddPaymentModal';
import { CreditCardIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import {
    useDeletePaymentMethod,
    usePaymentMethods,
    useSetDefaultPaymentMethod,
} from '@/hooks/use-payment-methods';

function formatAddedAt(isoDate: string): string {
    return `Added ${new Date(isoDate).toLocaleDateString('en-US')}`;
}

export default function PaymentMethodsSettings() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { data, isLoading, isError } = usePaymentMethods()
    const setDefaultMutation = useSetDefaultPaymentMethod()
    const deleteMutation = useDeletePaymentMethod()

    const paymentMethods = data?.items ?? []

    const handleDelete = (id: number): void => {
        deleteMutation.mutate(id)
    }

    const handleSetDefault = (id: number): void => {
        setDefaultMutation.mutate(id)
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] relative">

            {/* Main Operational Container Area */}
            <div className="w-full max-w-[1200px] mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1 text-[#1F1F1F]">
                            <CreditCardIcon className="w-5 lg:w-6 h-5 lg:h-6 text-black" />
                            <h2 className="text-[18px] lg:text-[20px]" style={TYPOGRAPHY.body}>Payment Methods</h2>
                        </div>
                        <p className="text-[14px] lg:text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                            Manage your bank accounts and cards
                        </p>
                    </div>

                    <OnboardingButton
                        icon={<PlusIcon className="w-4 h-4 text-white" />}
                        label='Add Payment Method'
                        onClick={() => setIsModalOpen(true)}
                        className="w-full lg:w-fit my-0 text-[14px] lg:text-[16px] px-2 lg:px-4 py-1 lg:py-2"
                    />

                </div>

                {isLoading && (
                    <div className="w-full bg-white border border-[#EAEAEA] rounded-xl p-8 text-center text-[#858585]">
                        Loading payment methods...
                    </div>
                )}

                {isError && (
                    <div className="w-full bg-white border border-[#EAEAEA] rounded-xl p-8 text-center text-red-600">
                        Unable to load payment methods. Please try again.
                    </div>
                )}

                {!isLoading && !isError && (
                <div className="space-y-4">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className="w-full bg-white border border-[#EAEAEA] rounded-xl p-2 lg:p-5 flex items-center justify-between transition-all hover:shadow-sm"
                        >
                            <div className="flex items-center gap-1 lg:gap-4">
                                <div className="w-8 lg:w-12 h-8 lg:h-12 bg-[#E6EAE9] text-[#E6EAE9] rounded-full flex items-center justify-center flex-shrink-0">
                                    <CreditCardIcon className="w-5 h-5 text-[#505050]" />
                                </div>

                                {/* Summary Strings block */}
                                <div className="space-y-0.5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                                            {method.title}
                                        </h4>
                                        {method.isDefault && (
                                            <span className="bg-[#7D8A26] text-white text-[12px] px-2 py-1 rounded">
                                                Default
                                            </span>
                                        )}
                                        {method.isVerified && (
                                            <span className="lg:border lg:border-[#45B424] text-[#45B424] text-[12px] lg:px-2 lg:py-1 rounded flex items-center gap-1 lg:bg-[#4CAF50]/05" style={TYPOGRAPHY.body}>
                                                <span className="bg-[#45B424] text-white px-1 text-[12px] font-extrabold rounded-full h-4 w-4">✓</span>
                                                <span className='hidden lg:block'>Verified </span>
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[12px] lg:text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>{method.subtitle}</p>
                                    <p className="text-[12px] text-[#858585]" style={TYPOGRAPHY.body}>{formatAddedAt(method.addedAt)}</p>
                                </div>
                            </div>

                            {/* Operational Action Controls Block */}
                            <div className="flex items-center gap-6">
                                {!method.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(method.id)}
                                        disabled={setDefaultMutation.isPending}
                                        className="text-[12px] lg:text-[16px] text-[#505050] font-medium hover:text-black transition-colors cursor-pointer disabled:opacity-50"
                                        style={TYPOGRAPHY.body}
                                    >
                                        Set Default
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(method.id)}
                                    disabled={deleteMutation.isPending}
                                    className="text-[#717171] hover:text-red-600 transition-colors cursor-pointer p-1 disabled:opacity-50"
                                    aria-label="Delete payment method"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {paymentMethods.length === 0 && (
                        <div className="w-full bg-white border border-dashed border-[#EAEAEA] rounded-xl p-12 text-center text-[#858585]">
                            No payment methods yet. Add a bank account or card to get started.
                        </div>
                    )}
                </div>
                )}
            </div>

            {/* Overlay Container Execution Core */}
            {isModalOpen && <AddPaymentMethodModal onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}
