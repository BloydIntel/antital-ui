'use client';

import React, { useEffect, useMemo } from 'react';
import { User, CheckCircle2, FileText, RefreshCw } from 'lucide-react';
import { TYPOGRAPHY } from "@/constants/styles";
import { useInvestorAccount } from '@/hooks/use-settings';
import {
  mapAccountCompliance,
  mapAccountLimits,
  mapAccountToProfile,
} from '@/lib/settings-mappers';
import { showApiErrorToast } from '@/lib/error-feedback';

export interface AccountDataProfile {
    accountType: string;
    accountStatus: 'Active' | 'Suspended' | 'Pending';
    kycStatus: 'Completed' | 'Pending' | 'Failed';
    kycCompletedDate: string;
    investorClassification: string;
    verificationStatus: 'Verified' | 'Unverified';
    memberSince: string;
    riskRating: 'Low' | 'Medium' | 'High';
}

export interface InvestmentLimitsMetrics {
    annualLimit: number;
    usedPercentage: number;
    perProjectLimit: number;
    lifetimeLimit: number;
}

export interface ComplianceCheckItem {
    id: string;
    label: string;
    status: 'Passed' | 'Clear' | 'Not Applicable' | 'Failed' | 'Pending';
}

interface AccountProps {
    onViewKYC?: () => void;
    onRequestUpgrade?: () => void;
}

export function Account({
    onViewKYC,
    onRequestUpgrade
}: AccountProps) {
    const { data: account, isLoading, isError, error } = useInvestorAccount();

    useEffect(() => {
        if (isError) {
            showApiErrorToast(error, 'Unable to load account information.');
        }
    }, [isError, error]);

    const profile = useMemo(
        () => (account ? mapAccountToProfile(account) : null),
        [account]
    );
    const limits = useMemo(
        () => (account ? mapAccountLimits(account) : null),
        [account]
    );
    const compliance = useMemo(
        () => (account ? mapAccountCompliance(account) : []),
        [account]
    );

    const informationGridItems = useMemo(() => {
        if (!profile) {
            return [];
        }

        return [
            {
                label: "Account Type",
                value: profile.accountType,
                badge: profile.accountStatus
            },
            {
                label: "KYC Status",
                value: profile.kycStatus,
                badge: profile.kycStatus,
                subtext: profile.kycStatus === 'Completed' && profile.kycCompletedDate
                    ? `Completed: ${profile.kycCompletedDate}`
                    : undefined,
                showIcon: profile.kycStatus === 'Completed'
            },
            {
                label: "Investor Classification",
                value: profile.investorClassification
            },
            {
                label: "Verification Status",
                value: profile.verificationStatus,
                badge: profile.verificationStatus,
                showIcon: profile.verificationStatus === 'Verified'
            },
            {
                label: "Member Since",
                value: profile.memberSince
            },
            {
                label: "Risk Rating",
                badge: profile.riskRating
            }
        ];
    }, [profile]);

    if (isLoading) {
        return (
            <div className="w-full">
                <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                    Loading account information...
                </p>
            </div>
        );
    }

    if (!profile || !limits) {
        return (
            <div className="w-full">
                <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                    Unable to load account information.
                </p>
            </div>
        );
    }

    // Formatter utility for Nigerian Naira
    const formatNaira = (value: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Helper status badge styles map to avoid hardcoded inline conditionals
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Active':
            case 'Completed':
            case 'Verified':
            case 'Passed':
            case 'Clear':
                return 'bg-[#45B424] text-white';
            case 'Low':
                return 'text-[#45B424] border border-[#45B424]';
            case 'Medium':
            case 'Pending':
                return 'bg-amber-500 text-white';
            case 'High':
            case 'Failed':
            case 'Suspended':
                return 'bg-rose-500 text-white';
            default:
                return 'bg-[#F4F5F7] text-[#505050] border border-[#EAEAEA]';
        }
    };

    return (
        <div className="w-full">

            {/* ==================== SECTION 1: ACCOUNT HEADER INFORMATION ==================== */}
            <div className="flex items-center gap-2 pb-1">
                <User className="w-4 h-4 text-[#1F1F1F]" fill="#1F1F1F" stroke="#1F1F1F" />
                <h2 className="text-[18px] lg:text-[20px] text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                    Account Information
                </h2>
            </div>
            <p className="text-[14px] lg:text-[16px] text-[#858585] mb-8" style={TYPOGRAPHY.body}>
                Manage your password and login security
            </p>

            {/* Profile Grid Information Matrix Layout */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 max-w-4xl mb-8">
                {informationGridItems.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1.5">
                        <span className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                            {item.label}
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                            {item.value && (
                                <span className="text-[16px] font-medium text-[#1A1A1A]" style={TYPOGRAPHY.body}>
                                    {item.value}
                                </span>
                            )}
                            {item.badge && (
                                <span className={`inline-flex items-center gap-1 text-[12px] px-2 py-0.5 rounded font-medium ${getStatusStyle(item.badge)}`}>
                                    {item.showIcon && <CheckCircle2 size={12} className="fill-white text-[#45B424]" />}
                                    {item.badge}
                                </span>
                            )}
                        </div>
                        {item.subtext && (
                            <span className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>
                                {item.subtext}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* ==================== SECTION 2: INVESTMENT LIMITS ==================== */}
            <h3 className="text-[20px] text-[#1A1A1A] mb-4" style={TYPOGRAPHY.body}>
                Investment Limits
            </h3>

            <div className="w-full space-y-6 mb-8">
                {/* Annual Progress Indicator Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-[14px] font-medium md:text-[16px] text-[#1F1F1F]">
                        <span style={TYPOGRAPHY.body}>Annual Limit</span>
                        <span style={TYPOGRAPHY.body}>{formatNaira(limits.annualLimit)}</span>
                    </div>

                    {/* Custom Styled Two-Tone Progress Bar track */}
                    <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden flex">
                        <div
                            className="bg-[#042E27] h-full transition-all duration-500 rounded-full"
                            style={{ width: `${limits.usedPercentage}%` }}
                        />
                        <div
                            className="bg-[#D9E3B4] h-full transition-all duration-500"
                            style={{ width: `${100 - limits.usedPercentage}%` }}
                        />
                    </div>

                    <p className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>
                        {limits.usedPercentage}% used this year
                    </p>
                </div>

                {/* Split Limits Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Per Project Limit</span>
                        <span className="text-[16px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                            {formatNaira(limits.perProjectLimit)}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Lifetime Limit</span>
                        <span className="text-[16px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                            {formatNaira(limits.lifetimeLimit)}
                        </span>
                    </div>
                </div>
            </div>

            {/* ==================== SECTION 3: COMPLIANCE STATUS ==================== */}
            <h3 className="text-[20px] text-[#1A1A1A] mb-4 pt-4" style={TYPOGRAPHY.body}>
                Compliance Status
            </h3>

            <div className="space-y-3 w-full mb-8">
                {compliance.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-1.5 gap-4">
                        <span className="text-[16px] text-[#1A1A1A] font-medium" style={TYPOGRAPHY.body}>
                            {item.label}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[12px] px-2 py-0.5 rounded font-medium ${getStatusStyle(item.status)}`}>
                            {(item.status === 'Passed' || item.status === 'Clear') && (
                                <CheckCircle2 size={12} className="fill-white text-[#45B424]" />
                            )}
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>

            {/* ==================== SECTION 4: ACTIONS BAR FOOTER ==================== */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-end pt-6 border-t border-[#F4F5F7]">
                <button
                    type="button"
                    onClick={onViewKYC}
                    aria-label="View KYC Document"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 h-[44px] border border-[#EAEAEA] rounded-md bg-white text-[#1A1A1A] text-[14px] font-semibold shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    style={TYPOGRAPHY.body}
                >
                    <FileText size={16} aria-hidden="true" />
                    <span>View KYC Document</span>
                </button>
                <button
                    type="button"
                    onClick={onRequestUpgrade}
                    aria-label="Request Account Upgrade"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 h-[44px] border border-[#EAEAEA] rounded-md bg-white text-[#1A1A1A] text-[14px] font-semibold shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    style={TYPOGRAPHY.body}
                >
                    <RefreshCw size={16} aria-hidden="true" />
                    <span>Request Account Upgrade</span>
                </button>
            </div>

        </div>
    );
}