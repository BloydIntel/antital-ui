import { PaymentMethod } from "@/types/payment"
import { CreditCard } from "lucide-react"

interface Props {
    selectedMethod: PaymentMethod | null
    onSelect: (m: PaymentMethod) => void
}

export function PaymentMethodSelect({ selectedMethod, onSelect }: Props) {
    const methods: { id: PaymentMethod; label: string }[] = [
        { id: "card", label: "Pay with card" },
        { id: "transfer", label: "Pay with transfer" },
        { id: "opay", label: "Pay with Opay" }
    ];

    return (
        <div className="border border-[#E5E7EB] rounded-xl px-4 pb-4">
            <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-6 border-b border-[#BFBFBF] py-4">Select payment method</h3>
            <div className="space-y-4 px-3">
                {methods.map((m) => (
                    <label key={m.id} className="flex items-center justify-between px-1 pb-2 border-b border-[#D3D3D3] rounded-b cursor-pointer hover:bg-gray-50 group transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#EDF1D6] rounded-lg flex items-center justify-center">
                                <CreditCard className="w-6 h-5 text-black" />
                            </div>
                            <span className="text-[#1A1A1A] text-[16px]">{m.label}</span>
                        </div>
                        <input
                            type="radio"
                            name="payment"
                            checked={selectedMethod === m.id}
                            onChange={() => onSelect(m.id)}
                            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-[#0F3D2E] checked:bg-[radial-gradient(circle,_#0F3D2E_40%,_transparent_45%)] transition-all cursor-pointer"
                        />
                    </label>
                ))}
            </div>
        </div>
    )
}