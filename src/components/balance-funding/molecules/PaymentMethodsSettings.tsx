'use client'

import React, { useState } from 'react'
import { TYPOGRAPHY } from '@/constants/styles'
import { AddPaymentMethodModal } from './AddPaymentModal';
import { CreditCardIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

interface PaymentMethodItem {
    id: string;
    type: 'bank' | 'card' | 'crypto';
    title: string;
    subtitle: string;
    metaText: string;
    isDefault?: boolean;
    isVerified?: boolean;
}

export default function PaymentMethodsSettings() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodItem[]>([
        {
            id: 'pm-1',
            type: 'bank',
            title: 'GTBank Savings Account',
            subtitle: 'Guaranty Trust Bank • ********5678',
            metaText: 'Added 9/20/2024',
            isDefault: true,
            isVerified: true,
        },
        {
            id: 'pm-2',
            type: 'card',
            title: 'Visa Debit Card',
            subtitle: 'Visa ending in 4532',
            metaText: 'Added 10/5/2024',
            isVerified: true,
        },
        {
            id: 'pm-3',
            type: 'crypto',
            title: 'USDT Wallet',
            subtitle: 'TRON • ****xyz789',
            metaText: 'Added 11/10/2024',
            isVerified: true,
        }
    ])

    const handleDelete = (id: string): void => {
        setPaymentMethods(prev => prev.filter(item => item.id !== id))
    }

    const handleSetDefault = (id: string): void => {
        setPaymentMethods(prev => prev.map(item => ({
            ...item,
            isDefault: item.id === id
        })))
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
                            Manage your bank accounts, cards, and crypto wallets
                        </p>
                    </div>

                    <OnboardingButton
                        icon={<PlusIcon className="w-4 h-4 text-white" />}
                        label='Add Payment Method'
                        onClick={() => setIsModalOpen(true)}
                        className="w-fit my-0 text-[14px] lg:text-[16px] px-2 lg:px-4 py-1 lg:py-2" />

                </div>

                <div className="space-y-4">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className="w-full bg-white border border-[#EAEAEA] rounded-xl p-5 flex items-center justify-between transition-all hover:shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#E6EAE9] text-[#E6EAE9] rounded-full flex items-center justify-center flex-shrink-0">
                                    {method.type === 'crypto' ? (
                                        <span className="text-[18px] font-medium text-[#505050]">$</span>
                                    ) : (
                                        <CreditCardIcon className="w-5 h-5 text-[#505050]" />
                                    )}
                                </div>

                                {/* Summary Strings block */}
                                <div className="space-y-0.5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="text-[16px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                                            {method.title}
                                        </h4>
                                        {method.isDefault && (
                                            <span className="bg-[#7D8A26] text-white text-[12px] px-2 py-1 rounded">
                                                Default
                                            </span>
                                        )}
                                        {method.isVerified && (
                                            <span className="border border-[#45B424] text-[#45B424] text-[12px] px-2 py-1 rounded flex items-center gap-1 bg-[#4CAF50]/05" style={TYPOGRAPHY.body}>
                                                <span className="bg-[#45B424] text-white px-1 text-[12px] font-extrabold rounded-full h-4 w-4">✓</span> Verified
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>{method.subtitle}</p>
                                    <p className="text-[12px] text-[#858585]" style={TYPOGRAPHY.body}>{method.metaText}</p>
                                </div>
                            </div>

                            {/* Operational Action Controls Block */}
                            <div className="flex items-center gap-6">
                                {!method.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(method.id)}
                                        className="text-[14px] text-[#505050] font-medium hover:text-black transition-colors cursor-pointer"
                                        style={TYPOGRAPHY.body}
                                    >
                                        Set Default
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(method.id)}
                                    className="text-[#717171] hover:text-red-600 transition-colors cursor-pointer p-1"
                                    aria-label="Delete payment method"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {paymentMethods.length === 0 && (
                        <div className="w-full bg-white border border-dashed border-[#EAEAEA] rounded-xl p-12 text-center text-[#858585]">
                            No configured payment options available. Click above to append data profiles.
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay Container Execution Core */}
            {isModalOpen && <AddPaymentMethodModal onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}