import { TYPOGRAPHY } from "@/constants/styles";
import { CreditCardIcon, Landmark, WalletIcon, XIcon } from "lucide-react";

interface AddPaymentMethodModalProps {
    onClose: () => void;
}

export function AddPaymentMethodModal({ onClose }: AddPaymentMethodModalProps) {

    const selections = [
        {
            title: "Add bank account",
            description: "Connect a regular bank account",
            icon: <Landmark className="w-5 h-5 text-black" />,
            action: () => console.log("Init bank linkage")
        },
        {
            title: "Add debit card",
            description: "Connect your Mastercard, VISA or VERVE card",
            icon: <CreditCardIcon className="w-5 h-5 text-black" />,
            action: () => console.log("Init card verification linkage")
        },
        {
            title: "Add wallet",
            description: "Connect your cryptocurrency wallet",
            icon: <WalletIcon className="w-5 h-5 text-black" />,
            action: () => console.log("Init web3/crypto ledger routing")
        }
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blurred background shadow layer backing block */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Dialogue Frame Container */}
            <div className="bg-white w-full max-w-[536px] rounded-2xl border border-[#EAEAEA] shadow-xl relative z-10 p-6 md:p-8 animate-in fade-in zoom-in-95 duration-150">

                {/* Header Context Frame Row */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5 text-[#1F1F1F]">
                        <CreditCardIcon className="w-5 h-5 text-black" />
                        <h3 className="text-[18px] font-medium" style={TYPOGRAPHY.body}>Add Payment Method</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-[#717171] hover:text-black hover:bg-gray-100 transition-all cursor-pointer"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Option Menu List Groups */}
                <div className="space-y-4">
                    {selections.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                opt.action();
                                onClose();
                            }}
                            className="w-full border border-[#EAEAEA] rounded-xl p-4 flex items-center justify-between text-left hover:border-black/30 hover:bg-[#F9FAFB] transition-all group cursor-pointer"
                        >
                            <div className="space-y-1">
                                <h4 className="text-[16px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                                    {opt.title}
                                </h4>
                                <p className="text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>
                                    {opt.description}
                                </p>
                            </div>

                            {/* Circle badge encapsulation container for the functional icons */}
                            <div className="w-10 h-10 bg-[#E6EAE9] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#DCDCDC] transition-colors">
                                {opt.icon}
                            </div>
                        </button>
                    ))}
                </div>

            </div>
        </div>
    )
}