'use client';

import React from 'react';
import { CheckCircle2, Clock3 } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import type { FundraiserBankAccount } from '@/types/settings';

export function VerificationStatusCard({ accounts }: { accounts: FundraiserBankAccount[] }) {
    return (
        <div className="bg-white border border-[#F4F5F7] rounded-md px-4 py-6 space-y-5">
            <h3 className="text-[18px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.heading, fontWeight: 700 }}>
                Verification Status
            </h3>

            <div className="space-y-3">
                {accounts.length === 0 && <p className="text-[14px] text-[#858585]">Add a bank account to begin verification.</p>}
                {accounts.map((account) => (
                    <div key={account.id} className="flex items-center gap-3">
                        {account.isVerified ? <CheckCircle2 className="h-4 w-4 text-[#34C759] shrink-0" /> : <Clock3 className="h-4 w-4 text-[#B7791F] shrink-0" />}
                        <span className="text-[14px] text-[#2C2C2C]" style={TYPOGRAPHY.body}>
                            {account.bankName} · {account.isVerified ? "Verified" : "Pending verification"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
