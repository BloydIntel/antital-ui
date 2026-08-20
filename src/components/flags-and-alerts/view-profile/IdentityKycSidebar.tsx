"use client";

import { Check, AlertTriangle, Landmark } from "lucide-react";
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
            <div className="bg-white rounded-md">
                <div className="border-b border-[#EAEAEA] py-5 px-6">
                    <h3 className="text-[16px] font-medium text-[#040C17]">
                        KYC & Compliance
                    </h3>
                </div>
                <div className="px-4 py-5 space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[16px] text-[#858585]">Tier Level</span>
                        <span className="text-[16px] text-[#11110F]">
                            {data.tierLevel}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[16px] text-[#858585]">BVN Match</span>
                        {data.bvnMatch && (
                            <span className="inline-flex items-center gap-1 text-[16px]  text-[#45B424]">
                                <Check className="w-3.5 h-3.5" /> Verified
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[16px] text-[#858585]">ID Document</span>
                        <a
                            href={data.idDocumentUrl || "#"}
                            className="text-[16px] text-[#7BA147] font-normal underline hover:opacity-70 transition-opacity"
                        >
                            View Document
                        </a>
                    </div>

                    {/* Active Flags Banner */}
                    {data.activeFlag && (
                        <div className="rounded-t-lg bg-[#FB2C360D] border border-[#FB2C3633] p-3.5 space-y-1 mt-2">
                            <div className="flex items-center gap-2 text-[16px] font-medium text-[#D4001A]">
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                <span>ACTIVE FLAGS</span>
                            </div>
                            <Link
                                href={data.activeFlag.url || "#"}
                                className="block text-[14px] font-normal text-[#D4001A] hover:underline"
                            >
                                {data.activeFlag.flagId}: {data.activeFlag.label}
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Wallet & Bank Details Card */}
            <div className="bg-white rounded-md">
                <div className="border-b border-[#EAEAEA] py-4 px-6">
                    <h3 className="text-[16px] font-medium text-[#040C17]">
                        Wallet & Bank Details
                    </h3>
                </div>
                <div className="p-4 space-y-6">
                    {/* Wallet Balance Box */}
                    <div className="bg-[#EAEAEA] rounded-lg p-4 flex items-center justify-between">
                        <span className="text-[16px] lg:text-[18px] text-[#858585] truncate">
                            Wallet Balance
                        </span>
                        <span className="text-[18px] lg:text-[24px] font-medium text-[#2C2C2C]">
                            {data.walletBalance}
                        </span>
                    </div>

                    {/* Linked Bank Account Box */}
                    <div className="space-y-2">
                        <span className="block text-[16px] text-[#858585] uppercase">
                            LINKED BANK ACCOUNT
                        </span>

                        <div className="border border-[#EAEAEA] rounded-lg p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#F4F6F5] flex items-center justify-center text-[#021310]">
                                <Landmark className="w-5 h-5" />
                            </div>
                            <div className="space-y-2">
                                <span className="block text-[16px] font-medium text-[#11110F]">
                                    {data.bankName}
                                </span>
                                <span className="block text-[14px] text-[#505050]">
                                    {data.accountNumber}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}