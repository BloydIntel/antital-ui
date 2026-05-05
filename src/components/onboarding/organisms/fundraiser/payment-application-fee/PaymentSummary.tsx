import { TYPOGRAPHY } from "@/constants/styles"
import { ApplicationFee } from "@/types/payment"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"

interface PaymentSummary {
    email?: string
    userId?: string
    isFundraiserPaymentPage: boolean
    unitCount: number
    setUnitCount: (count: number) => void
    unitPrice: number
    minInvestment?: number
    isBelowMinimum?: boolean
    formattedDate: string
    showError?: boolean
}

const fee: ApplicationFee = {
    amount: 25750,
    currency: "NGN"
}


export function PaymentSummary({ email, userId, isFundraiserPaymentPage, unitCount, setUnitCount, unitPrice = 0, minInvestment = 0, isBelowMinimum, formattedDate, showError }: PaymentSummary) {

    const safeUnitPrice = unitPrice ?? 0;
    const safeMinInvestment = minInvestment ?? 0;

    return (
        <div className="space-y-6">
            <div className={`grid grid-cols-10 ${isFundraiserPaymentPage ? "bg-[#F9F9F9]" : "bg-[#FFFFFF]"} rounded-lg py-2 px-2 lg:py-4 border border-[#F0F0F0]`}>

                <div className="flex justify-center items-center col-span-2 lg:col-span-1">
                    <Image src="/icons/antital-single.png" alt="antital icon" width={20} height={20} />
                </div>

                <div className="col-span-5 lg:col-span-7 flex flex-col min-w-0">
                    <span className="text-[14px] text-[#858585] mb-1">
                        {isFundraiserPaymentPage ? "User email" : "User ID"}
                    </span>
                    <span
                        className="text-[16px] lg:text-[18px] text-[#1A1A1A] truncate"
                        title={isFundraiserPaymentPage ? email : userId}
                    >
                        {isFundraiserPaymentPage ? (email || "Not provided") : (userId || "No ID")}
                    </span>
                </div>

                <div className="col-span-3 lg:col-span-2 flex justify-end lg:justify-center items-center pr-1 lg:pr-0">
                    <span className="text-[#1A1A1A] text-sm whitespace-nowrap">{formattedDate}</span>
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
                        <div className="my-2"
                            style={{
                                ...TYPOGRAPHY.body,
                                backgroundImage: `linear-gradient(to right, #1011114D 50%, rgba(255,255,255,0) 0%)`,
                                backgroundPosition: 'top',
                                backgroundSize: '12px 1px', // Increase 12px to make dashes longer
                                backgroundRepeat: 'repeat-x',
                            }}
                        />
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
                                    className="w-8 h-8 flex items-center justify-center bg-[#062F24] text-white rounded cursor-pointer"
                                    aria-label="Minus"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="text-[16px] w-8 h-8 text-center border border-[#A8A8A8] rounded py-1">{unitCount}</span>
                                <button
                                    onClick={() => setUnitCount(unitCount + 1)}
                                    className="w-8 h-8 flex items-center justify-center bg-[#062F24] text-white rounded cursor-pointer"
                                    aria-label="Plus"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <p className="text-[#666666]">Unit Price:</p>
                            <p style={TYPOGRAPHY.body}>₦{safeUnitPrice.toLocaleString()}.00</p>
                        </div>
                        <div className="text-[16px] pt-4 flex justify-between items-center"
                            style={{
                                ...TYPOGRAPHY.body,
                                backgroundImage: `linear-gradient(to right, #1011114D 50%, rgba(255,255,255,0) 0%)`,
                                backgroundPosition: 'top',
                                backgroundSize: '12px 1px', // Increase 12px to make dashes longer
                                backgroundRepeat: 'repeat-x',
                            }}
                        >
                            <p className="font-medium">Total Investment:</p>
                            <p className="font-medium text-lg">₦{(unitCount * safeUnitPrice).toLocaleString()}.00</p>
                        </div>

                        {/* Error Message Section */}
                        {isBelowMinimum && showError && (
                            <div className="bg-red-50 border border-red-200 p-3 rounded-lg mt-2">
                                <p className="text-red-600 text-sm font-medium">
                                    Minimum investment for this project is ₦{safeMinInvestment.toLocaleString()}.
                                    Please increase your units to proceed.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}