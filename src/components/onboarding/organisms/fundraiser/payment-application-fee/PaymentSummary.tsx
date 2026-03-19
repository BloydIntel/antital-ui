import { TYPOGRAPHY } from "@/constants/styles"
import { ApplicationFee } from "@/types/payment"
import Image from "next/image"


const fee: ApplicationFee = {
    amount: 25750,
    currency: "NGN"
}


export function PaymentSummary({ email }: { email: string }) {
    const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className="space-y-6">
            <div className="bg-[#F9F9F9] rounded-lg p-1 lg:p-4 flex justify-between items-center border border-[#F0F0F0]">
                <div className="pl-3">
                    <Image src="/icons/antital-single.png" alt="antital icon" width={20} height={20} />
                </div>
                <div className="flex flex-col lg:-ml-40">
                    <span className="text-[14px] text-[#858585] mb-1">User email</span>
                    <span className="text-[18px] text-[#1A1A1A] break-all">{email || "Not provided"}</span>
                </div>
                <span className="text-[#1A1A1A] text-sm hidden md:block">{formattedDate}</span>
            </div>

            <div className="border border-[#E5E7EB] rounded-xl py-4 px-6 space-y-4" style={TYPOGRAPHY.body}>
                <h3 className="text-[16px] font-medium text-[#1A1A1A] border-b border-[#1F1F1F] pb-4">Total payment amount</h3>
                <div className="flex justify-between text-[#505050] text-[16px]">
                    <span>Application Fee</span>
                    <span>{fee.currency}{fee.amount}</span>
                </div>
                <div className="border-t-2 border-dashed border-[#1011114D] my-2" />
                <div className="flex justify-between font-medium text-[#2C2C2C] text-[16px]">
                    <span>Total Amount:</span>
                    <span>{fee.currency}{fee.amount}</span>
                </div>
            </div>
        </div>
    )
}