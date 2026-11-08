"use client";

interface InvestorSnapshotProps {
    user: {
        email: string;
        phone: string;
        residentialAddress: string;
    };
}

export function InvestorSnapshot({ user }: InvestorSnapshotProps) {
    return (
        <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] space-y-4">
            <h2 className="font-bold text-[16px] text-[#11110F]">Investor Snapshot</h2>
            <div className="space-y-3 text-xs">
                <div>
                    <p className="text-[#858585]">Email address</p>
                    <p className="text-[14px] font-medium text-[#11110F] mt-0.5">{user.email}</p>
                </div>
                <div>
                    <p className="text-[#858585]">Phone Number</p>
                    <p className="text-[14px] font-medium text-[#11110F] mt-0.5">{user.phone}</p>
                </div>
                <div>
                    <p className="text-[#858585]">Residential address</p>
                    <p className="text-[14px] font-medium text-[#11110F] mt-0.5">{user.residentialAddress}</p>
                </div>
            </div>
        </div>
    );
}