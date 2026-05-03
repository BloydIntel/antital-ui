import { TYPOGRAPHY } from "@/constants/styles";
import Image from "next/image"

interface InvestmentPaymentSummaryProps {
    unitCount: number;
    unitPrice: number;
    userId: string;
    formattedDate: string;
    platformFee: number;
    totalAmount: number
}

export function InvestmentPaymentSummary({ unitCount, unitPrice, userId, formattedDate, platformFee, totalAmount }: InvestmentPaymentSummaryProps) {
    return (
        <div className="space-y-6">
            {/* User ID Card */}
            <div className={`grid grid-cols-10 bg-[#FFFFFF] rounded-lg py-2 px-2 lg:py-4 border border-[#F0F0F0]`}>
                <div className="flex justify-center items-center col-span-2 lg:col-span-1">
                    <Image src="/icons/antital-single.png" alt="antital icon" width={20} height={20} />
                </div>

                <div className="col-span-5 lg:col-span-7 flex flex-col min-w-0">
                    <span className="text-[14px] text-[#858585] mb-1">User ID</span>
                    <span className="text-[16px] lg:text-[18px] text-[#1A1A1A] truncate">{userId || "No ID"}</span>
                </div>
                <div className="col-span-3 lg:col-span-2 flex justify-end lg:justify-center items-center pr-1 lg:pr-0">
                    <span className="text-[#1A1A1A] text-sm whitespace-nowrap">{formattedDate}</span>
                </div>
            </div>

            {/* Investment Calculator */}
            <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 space-y-6">
                <h3 className="text-[16px] font-medium text-[#1A1A1A] border-b border-[#BFBFBF] pb-4">
                    Enter Investment Amount
                </h3>

                <div className="space-y-4">

                    <div className="flex justify-between text-[#505050] text-[16px]" style={TYPOGRAPHY.body}>
                        <p>Units:</p>
                        <p className="text-[#1B1B1B]">{unitCount}</p>
                    </div>

                    <div className="flex justify-between text-[#505050] text-[16px]" style={TYPOGRAPHY.body}>
                        <p>Unit Price:</p>
                        <p className="text-[#1B1B1B]">₦{unitPrice.toLocaleString()}.00</p>
                    </div>

                    <div className="flex justify-between text-[#505050] text-[16px]" style={TYPOGRAPHY.body}>
                        <p>Subtotal:</p>
                        <p className="text-[#1B1B1B]">₦{(unitCount * unitPrice).toLocaleString()}.00</p>
                    </div>

                    <div className="flex justify-between text-[#505050] text-[16px]" style={TYPOGRAPHY.body}>
                        <p>Platform fee (2.5%):</p>
                        <p className="text-[#1B1B1B]">₦{platformFee.toLocaleString()}.00</p>
                    </div>

                    <div
                        className="pt-4 flex justify-between items-center"
                        style={{
                            ...TYPOGRAPHY.body,
                            backgroundImage: `linear-gradient(to right, #1011114D 50%, rgba(255,255,255,0) 0%)`,
                            backgroundPosition: 'top',
                            backgroundSize: '12px 1px',
                            backgroundRepeat: 'repeat-x',
                        }}
                    >
                        <p className="font-medium text-[#2C2C2C]">Total Investment:</p>
                        <p className="font-medium text-lg text-[#2C2C2C]">₦{totalAmount.toLocaleString()}.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}