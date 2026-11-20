"use client";

import { TYPOGRAPHY } from "@/constants/styles";

interface InvestorSnapshotProps {
    user: {
        email: string;
        phone: string;
        residentialAddress: string;
    };
}

export function InvestorSnapshot({ user }: InvestorSnapshotProps) {
    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA]">
            <h2 className="text-[16px] text-[#11110F] border-b border-[#EAEAEA] p-4" style={{ ...TYPOGRAPHY.body, fontWeight: '500' }}>Investor Snapshot</h2>
            <div className="space-y-4 text-[14px] px-4 py-5">
                <div className="space-y-2">
                    <p className="text-[#858585]">Email address</p>
                    <p className="text-[16px] text-[#11110F] mt-1">{user.email}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[#858585]">Phone Number</p>
                    <p className="text-[16px] text-[#11110F] mt-1">{user.phone}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[#858585]">Residential address</p>
                    <p className="text-[16px] text-[#11110F] mt-1">{user.residentialAddress}</p>
                </div>
            </div>
        </div>
    );
}