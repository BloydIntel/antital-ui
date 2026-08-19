"use client";

import { Check, AlertTriangle, Building2 } from "lucide-react";
import Link from "next/link";

export interface IdentityKycData {
    email: string;
    phone: string;
    address: string;
    tierLevel: string;
    bvnMatch: boolean;
    idDocumentUrl?: string;
    activeFlag?: {
        flagId: string;
        label: string;
        url?: string;
    };
    walletBalance: string;
    bankName: string;
    accountNumber: string;
}


export function IdentityKycSidebar({ data }: { data: IdentityKycData }) {
    const CONTACT_FIELDS = [
        { label: "Email address", value: data.email },
        { label: "Phone Number", value: data.phone },
        { label: "Residential address", value: data.address },
    ];

    return (
        <div className="space-y-6">
            {/* Identity & Contact Card */}
            <div className="bg-white rounded-md">
                <div className="border-b border-[#EAEAEA]">
                    <h3 className="text-[16px] py-5 px-6 font-medium text-[#040C17]">
                        Identity & Contact
                    </h3>
                </div>
                <div className="pt-2 pb-5 px-6 space-y-4">
                    {CONTACT_FIELDS.map(({ label, value }) => (
                        <div key={label}>
                            <span className="block text-[14px] text-[#858585] mb-0.5">
                                {label}
                            </span>
                            <span className="text-[16px] text-[#11110F] leading-relaxed">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* KYC & Compliance Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4">
                <h3 className="text-[15px] font-bold text-[#11110F] border-b border-[#F1F5F9] pb-3">
                    KYC & Compliance
                </h3>

                <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#858585]">Tier Level</span>
                    <span className="text-[13px] font-semibold text-[#11110F]">
                        {data.tierLevel}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#858585]">BVN Match</span>
                    {data.bvnMatch && (
                        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#10B981]">
                            <Check className="w-3.5 h-3.5" /> Verified
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#858585]">ID Document</span>
                    <a
                        href={data.idDocumentUrl || "#"}
                        className="text-[13px] font-medium text-[#22C55E] hover:underline"
                    >
                        View Document
                    </a>
                </div>

                {/* Active Flags Banner */}
                {data.activeFlag && (
                    <div className="rounded-xl bg-[#FFF2F2] border border-[#FFD0D0] p-3.5 space-y-1">
                        <div className="flex items-center gap-2 text-[12px] font-bold text-[#D4001A]">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>ACTIVE FLAGS</span>
                        </div>
                        <Link
                            href={data.activeFlag.url || "#"}
                            className="block text-[12px] font-semibold text-[#D4001A] hover:underline"
                        >
                            {data.activeFlag.flagId}: {data.activeFlag.label}
                        </Link>
                    </div>
                )}
            </div>

            {/* Wallet & Bank Details Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4">
                <h3 className="text-[15px] font-bold text-[#11110F] border-b border-[#F1F5F9] pb-3">
                    Wallet & Bank Details
                </h3>

                {/* Wallet Balance Box */}
                <div className="bg-[#EAEAEA]/60 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-[13px] text-[#64748B] font-medium">
                        Wallet Balance
                    </span>
                    <span className="text-[18px] font-bold text-[#11110F]">
                        {data.walletBalance}
                    </span>
                </div>

                {/* Linked Bank Account Box */}
                <div className="space-y-2">
                    <span className="block text-[11px] font-bold tracking-wider text-[#858585] uppercase">
                        LINKED BANK ACCOUNT
                    </span>

                    <div className="border border-[#E2E8F0] rounded-xl p-3.5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#F8F9FA] flex items-center justify-center text-[#64748B]">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="block text-[13px] font-bold text-[#11110F]">
                                {data.bankName}
                            </span>
                            <span className="block text-[12px] text-[#858585]">
                                {data.accountNumber}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}