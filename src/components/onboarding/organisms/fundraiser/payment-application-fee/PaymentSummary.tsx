import { TYPOGRAPHY } from "@/constants/styles"
import { ApplicationFee } from "@/types/payment"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface PaymentSummary {
    email?: string
    userId?: string
    isFundraiserPaymentPage: boolean
}

const fee: ApplicationFee = {
    amount: 25750,
    currency: "NGN"
}


export function PaymentSummary({ email, userId, isFundraiserPaymentPage }: PaymentSummary) {
    const [unitCount, setUnitCount] = useState(1);
    const UNIT_PRICE = 5000;

    const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className="space-y-6">
            <div className={`grid grid-cols-10 ${isFundraiserPaymentPage ? "bg-[#F9F9F9]" : "bg-[#FFFFFF]"} rounded-lg py-2 px-2 lg:py-4 border border-[#F0F0F0]`}>
                <div className="flex justify-center items-center col-span-2 lg:col-span-1">
                    <Image src="/icons/antital-single.png" alt="antital icon" width={20} height={20} />
                </div>
                {isFundraiserPaymentPage ? (
                    <div className="col-span-7 flex flex-col">
                        <span className="text-[14px] text-[#858585] mb-1">User email</span>
                        <span className="text-[18px] text-[#1A1A1A] break-all">{email || "Not provided"}</span>
                    </div>
                ) : (
                    <div className="col-span-7 flex flex-col">
                        <span className="text-[14px] text-[#858585] mb-1">User ID</span>
                        <span className="text-[18px] text-[#1A1A1A] break-all">{userId || "No ID"}</span>
                    </div>
                )
                }
                <div className="col-span-2 flex justify-center items-center ">
                    <span className="text-[#1A1A1A] text-sm hidden md:block">{formattedDate}</span>
                </div>
            </div>

            <div className={`${isFundraiserPaymentPage ? "bg-[#F9F9F9]" : "bg-[#FFFFFF]"} border border-[#E5E7EB] rounded-xl py-4 px-6 space-y-4`} style={TYPOGRAPHY.body}>
                <h3 className="text-[16px] font-medium text-[#1A1A1A] border-b border-[#BFBFBF] pb-4">{isFundraiserPaymentPage ? "Total payment amount" : "Enter Investment Amount"}</h3>
                {isFundraiserPaymentPage ? (
                    <>
                        <div className="flex justify-between text-[#505050] text-[16px]">
                            <span>Application Fee</span>
                            <span>{fee.currency}{fee.amount}</span>
                        </div>
                        <div className="border-t-2 border-dashed border-[#1011114D] my-2" />
                        <div className="flex justify-between font-medium text-[#2C2C2C] text-[16px]">
                            <span>Total Amount:</span>
                            <span>{fee.currency}{fee.amount}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-[#666666]">Number of Unit(s)</p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setUnitCount(Math.max(1, unitCount - 1))}
                                    className="w-8 h-8 flex items-center justify-center bg-[#062F24] text-white rounded"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="text-[16px] w-8 h-8 text-center border border-[#A8A8A8] rounded py-1">{unitCount}</span>
                                <button
                                    onClick={() => setUnitCount(unitCount + 1)}
                                    className="w-8 h-8 flex items-center justify-center bg-[#062F24] text-white rounded"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <p className="text-[#666666]">Unit Price:</p>
                            <p style={TYPOGRAPHY.body}>₦{UNIT_PRICE.toLocaleString()}.00</p>
                        </div>
                        <div className="text-[16px] border-t-2 border-dashed border-[#1011114D] pt-4 flex justify-between items-center" style={TYPOGRAPHY.body}>
                            <p className="font-medium">Total Investment:</p>
                            <p className="font-medium text-lg">₦{(unitCount * UNIT_PRICE).toLocaleString()}.00</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}