'use client';

import React from 'react';
import { Landmark, CheckCircle2, Clock3, Pencil, ShieldCheck, Star, Trash2 } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

export interface BankAccountDetails {
    id: number;
    bankName: string;
    accountHolder: string;
    accountNumberMasked: string;
    isPrimary?: boolean;
    isVerified: boolean;
    verificationStatus: string;
}

interface BankAccountCardProps {
    account: BankAccountDetails;
    onEdit?: (id: number) => void;
    onVerify?: (id: number) => void;
    onSetPrimary?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export function BankAccountCard({ account, onEdit, onVerify, onSetPrimary, onDelete }: BankAccountCardProps) {
    return (
        <div className="bg-white border border-[#F4F5F7] rounded-md p-4 lg:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 lg:gap-4">
            <div className="flex items-center gap-4">
                {/* Bank Icon Container */}
                <div className="p-3 bg-[#F9FAFB] rounded-md shrink-0">
                    <Landmark className="w-6 h-6 text-[#1B1B1B]" />
                </div>

                {/* Bank Info Details */}
                <div className='space-y-2'>
                    <div className="flex items-center gap-2">
                        <h4 className="text-[16px] text-[#505050]" style={{ ...TYPOGRAPHY.body, fontWeight: 700 }}>
                            {account.bankName}
                        </h4>
                        {account.isPrimary && (
                            <span className="text-[12px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase bg-[#EDF1D6] text-[#B9C65B]">
                                PRIMARY
                            </span>
                        )}
                    </div>
                    <p className="text-[14px] text-[#858585] mt-0.5" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>
                        {account.accountHolder} – {account.accountNumberMasked}
                    </p>

                    {account.isVerified ? (
                        <div className="flex items-center gap-1.5 mt-2 text-[#34C759] text-[14px] font-bold tracking-wide uppercase">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>VERIFIED</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 mt-2 text-[#B7791F] text-[14px] font-bold tracking-wide uppercase">
                            <Clock3 className="w-4 h-4" />
                            <span>{account.verificationStatus}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                <OnboardingButton
                    variant="plain"
                    label="Edit"
                    onClick={() => onEdit?.(account.id)}
                    icon={<Pencil className="h-4 w-4" />}
                    className="lg:w-fit bg-[#F4F5F7] text-[#505050] hover:text-[#1B1B1B] border-none"
                />
                {!account.isVerified && (
                    <OnboardingButton
                        variant="plain"
                        label="Verify"
                        onClick={() => onVerify?.(account.id)}
                        icon={<ShieldCheck className="h-4 w-4" />}
                        className="lg:w-fit bg-[#EDF1D6] text-[#042E27] border-none"
                    />
                )}
                {account.isVerified && !account.isPrimary && (
                    <OnboardingButton
                        variant="plain"
                        label="Make primary"
                        onClick={() => onSetPrimary?.(account.id)}
                        icon={<Star className="h-4 w-4" />}
                        className="lg:w-fit bg-[#F4F5F7] text-[#505050] border-none"
                    />
                )}
                <button type="button" onClick={() => onDelete?.(account.id)} className="p-2 text-[#858585] hover:text-red-600" aria-label={`Delete ${account.bankName}`}>
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
