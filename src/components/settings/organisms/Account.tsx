'use client';

import React from 'react';
import { User, CheckCircle2, FileText, RefreshCw } from 'lucide-react';
import { TYPOGRAPHY } from "@/constants/styles";

export function Account() {
    // Investment profile limits metadata matching the SEC layout parameters
    const investmentMetrics = {
        annualLimit: 5000000, // ₦5,000,000
        usedPercentage: 60,   // 60% used this year
        perProjectLimit: 1000000, // ₦1,000,000
        lifetimeLimit: 20000000, // ₦20,000,000
    };

    // Formatter utility for Nigerian Naira
    const formatNaira = (value: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const handleViewKYC = () => {
        console.log('Displaying stored verification data sheets...');
    };

    const handleRequestUpgrade = () => {
        console.log('Triggering tiered structural account tier upgrade routing workflow...');
    };

    return (
        <div className="w-full">

            {/* ==================== SECTION 1: ACCOUNT HEADER INFORMATION ==================== */}
            <div className="flex items-center gap-2 pb-1">
                <User className="w-4 h-4 text-[#1A1A1A]" />
                <h2 className="text-[18px] lg:text-[20px] text-[#1A1A1A] font-medium" style={TYPOGRAPHY.body}>
                    Account Information
                </h2>
            </div>
            <p className="text-[14px] text-[#858585] mb-8" style={TYPOGRAPHY.body}>
                Manage your password and login security
            </p>

            {/* Profile Grid Information Matrix Layout */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-y-6 gap-x-4 max-w-4xl mb-8">
                {/* Column 1 Row 1 */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>Account Type</span>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[16px] font-semibold text-[#1A1A1A]" style={TYPOGRAPHY.body}>Ordinary Investor</span>
                        <span className="bg-[#E8F8EE] text-[#22C55E] text-[11px] font-medium px-2 py-0.5 rounded border border-[#D1F4DE]">Active</span>
                    </div>
                </div>

                {/* Column 2 Row 1 */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>KYC Status</span>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 bg-[#22C55E] text-white text-[12px] font-medium px-2.5 py-0.5 rounded-md">
                            <CheckCircle2 size={12} className="fill-white text-[#22C55E]" />
                            Completed
                        </span>
                    </div>
                    <span className="text-[12px] text-[#858585]" style={TYPOGRAPHY.body}>Completed: 10/1/2024</span>
                </div>

                {/* Column 1 Row 2 */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>Investor Classification</span>
                    <span className="text-[16px] font-semibold text-[#1A1A1A]" style={TYPOGRAPHY.body}>Ordinary</span>
                </div>

                {/* Column 2 Row 2 */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>Verification Status</span>
                    <div className="flex">
                        <span className="inline-flex items-center gap-1 bg-[#22C55E] text-white text-[12px] font-medium px-2.5 py-0.5 rounded-md">
                            <CheckCircle2 size={12} className="fill-white text-[#22C55E]" />
                            Verified
                        </span>
                    </div>
                </div>

                {/* Column 1 Row 3 */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>Member Since</span>
                    <span className="text-[16px] font-semibold text-[#1A1A1A]" style={TYPOGRAPHY.body}>9/15/2024</span>
                </div>

                {/* Column 2 Row 3 */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>Risk Rating</span>
                    <div className="flex">
                        <span className="bg-[#E8F8EE] text-[#22C55E] text-[12px] font-medium px-2.5 py-0.5 rounded border border-[#D1F4DE]">Low</span>
                    </div>
                </div>
            </div>

            {/* ==================== SECTION 2: INVESTMENT LIMITS ==================== */}
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4" style={TYPOGRAPHY.body}>
                Investment Limits
            </h3>

            <div className="w-full space-y-6 mb-8">
                {/* Annual Progress Indicator Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-[14px] md:text-[15px] font-semibold text-[#1A1A1A]">
                        <span style={TYPOGRAPHY.body}>Annual Limit</span>
                        <span style={TYPOGRAPHY.body}>{formatNaira(investmentMetrics.annualLimit)}</span>
                    </div>

                    {/* Custom Styled Two-Tone Progress Bar track */}
                    <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden flex">
                        <div
                            className="bg-[#042E27] h-full transition-all duration-500"
                            style={{ width: `${investmentMetrics.usedPercentage}%` }}
                        />
                        <div
                            className="bg-[#D9E3B4] h-full transition-all duration-500"
                            style={{ width: `${100 - investmentMetrics.usedPercentage}%` }}
                        />
                    </div>

                    <p className="text-[13px] text-[#858585]" style={TYPOGRAPHY.body}>
                        {investmentMetrics.usedPercentage}% used this year
                    </p>
                </div>

                {/* Split Limits Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>Per Project Limit</span>
                        <span className="text-[16px] font-bold text-[#1A1A1A]" style={TYPOGRAPHY.body}>
                            {formatNaira(investmentMetrics.perProjectLimit)}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>Lifetime Limit</span>
                        <span className="text-[16px] font-bold text-[#1A1A1A]" style={TYPOGRAPHY.body}>
                            {formatNaira(investmentMetrics.lifetimeLimit)}
                        </span>
                    </div>
                </div>
            </div>

            {/* ==================== SECTION 3: COMPLIANCE STATUS ==================== */}
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4 pt-4 border-t border-[#F4F5F7]" style={TYPOGRAPHY.body}>
                Compliance Status
            </h3>

            <div className="space-y-3 w-full mb-8">
                {/* Compliance Checking Rows */}
                <div className="flex items-center justify-between py-1.5 gap-4">
                    <span className="text-[15px] text-[#1A1A1A] font-medium" style={TYPOGRAPHY.body}>Anti-Money Laundering Check</span>
                    <span className="inline-flex items-center gap-1 bg-[#22C55E] text-white text-[12px] font-medium px-2.5 py-0.5 rounded-md">
                        <CheckCircle2 size={12} className="fill-white text-[#22C55E]" />
                        Passed
                    </span>
                </div>

                <div className="flex items-center justify-between py-1.5 gap-4">
                    <span className="text-[15px] text-[#1A1A1A] font-medium" style={TYPOGRAPHY.body}>Sanctions Screening</span>
                    <span className="inline-flex items-center gap-1 bg-[#22C55E] text-white text-[12px] font-medium px-2.5 py-0.5 rounded-md">
                        <CheckCircle2 size={12} className="fill-white text-[#22C55E]" />
                        Clear
                    </span>
                </div>

                <div className="flex items-center justify-between py-1.5 gap-4">
                    <span className="text-[15px] text-[#1A1A1A] font-medium" style={TYPOGRAPHY.body}>Politically Exposed Person</span>
                    <span className="bg-[#F4F5F7] text-[#505050] text-[12px] font-medium px-2.5 py-0.5 rounded border border-[#EAEAEA]" style={TYPOGRAPHY.body}>
                        Not Applicable
                    </span>
                </div>
            </div>

            {/* ==================== SECTION 4: ACTIONS BAR FOOTER ==================== */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-end pt-6 border-t border-[#F4F5F7]">
                <button
                    type="button"
                    onClick={handleViewKYC}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 h-[44px] border border-[#EAEAEA] rounded-xl bg-white text-[#1A1A1A] text-[14px] font-semibold shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    style={TYPOGRAPHY.body}
                >
                    <FileText size={16} />
                    <span>View KYC Document</span>
                </button>
                <button
                    type="button"
                    onClick={handleRequestUpgrade}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 h-[44px] border border-[#EAEAEA] rounded-xl bg-white text-[#1A1A1A] text-[14px] font-semibold shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    style={TYPOGRAPHY.body}
                >
                    <RefreshCw size={16} />
                    <span>Request Account Upgrade</span>
                </button>
            </div>

        </div>
    );
}