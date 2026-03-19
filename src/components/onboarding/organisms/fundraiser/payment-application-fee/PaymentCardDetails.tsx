import { ApplicationFee, CardFormData } from "@/types/payment"
import { OnboardingInput } from "@/components/onboarding/molecules/OnboardingInput"

import { TYPOGRAPHY } from "@/constants/styles"

interface PaymentCardDetailsProps {
    cardData: CardFormData
    setCardData: (data: CardFormData) => void
}

const fee: ApplicationFee = {
    amount: 25750,
    currency: "NGN"
}

export function PaymentCardDetails({ cardData, setCardData }: PaymentCardDetailsProps) {

    const handleInputChange = (field: keyof CardFormData, value: string) => {
        let formattedValue = value

        if (field === "cardNumber") {
            const digits = value.replace(/\D/g, "").substring(0, 16)
            formattedValue = digits.replace(/(\d{4})(?=\d)/g, "$1 ")
        }

        if (field === "expiry") {
            const digits = value.replace(/\D/g, "").substring(0, 6)
            formattedValue = digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
        }

        if (field === "cvv") {
            formattedValue = value.replace(/\D/g, "").substring(0, 4)
        }

        setCardData({ ...cardData, [field]: formattedValue })
    }

    return (
        <div>
            <div className="border border-[#EAEAEA] rounded-xl py-4 px-6 space-y-4 mb-8" style={TYPOGRAPHY.body}>
                <h3 className="text-[16px] font-medium text-[#1A1A1A] border-b border-[#EAEAEA] pb-4">Application Fee</h3>

                <div className="flex justify-between text-[#2C2C2C] text-[16px]">
                    <span>Total Amount:</span>
                    <span>{fee.currency}{fee.amount}</span>
                </div>
            </div>

            <div className="border border-[#E5E7EB] rounded-xl p-6 space-y-6 bg-white transition-all">
                <div className="flex justify-between items-center border-b border-[#F0F0F0] pb-4">
                    <h3 className="text-[16px] font-medium text-[#1A1A1A]">Card Details</h3>
                </div>

                <div className="grid grid-cols-12 gap-x-4">
                    <div className="col-span-12 lg:col-span-8">
                        <OnboardingInput
                            label="Name on card"
                            placeholder="John Doe"
                            value={cardData.nameOnCard}
                            onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                        />
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <OnboardingInput
                            label="Expiry"
                            placeholder="mm/yyyy"
                            value={cardData.expiry}
                            onChange={(e) => handleInputChange("expiry", e.target.value)}
                        />
                    </div>

                    <div className="col-span-12 lg:col-span-8">
                        <OnboardingInput
                            label="Card Number"
                            placeholder="0000 0000 0000 0000"
                            value={cardData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        />
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <OnboardingInput
                            label="CVV"
                            placeholder="000"
                            type="password"
                            value={cardData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>)
}