"use client"

import { useState, useMemo } from "react"
import { PaymentSubStep, PaymentMethod, CardFormData } from "@/types/payment"
import { TYPOGRAPHY } from "@/constants/styles"
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton"
import { useRouter } from "next/navigation"

import { PaymentSummary } from "@/components/onboarding/organisms/fundraiser/payment-application-fee/PaymentSummary"
import { PaymentMethodSelect } from "@/components/onboarding/organisms/fundraiser/payment-application-fee/PaymentMethodSelect"
import { PaymentCardDetails } from "@/components/onboarding/organisms/fundraiser/payment-application-fee/PaymentCardDetails"
import { useOnboardingStore } from "@/store/onboardingStore"

export function PaymentApplicationFee() {
    const router = useRouter();
    const { formData, updateFormData } = useOnboardingStore();

    const [subStep, setSubStep] = useState<PaymentSubStep>("summary");
    const [method, setMethod] = useState<PaymentMethod | null>(formData.paymentMethod);
    const [cardData, setCardData] = useState<CardFormData>(formData.paymentCardDetails);

    const handleNext = () => {
        switch (subStep) {
            case "summary":
                setSubStep("method");
                break;
            case "method":
                updateFormData({ paymentMethod: method });
                setSubStep("details");
                break;
            case "details":
                updateFormData({
                    paymentCardDetails: cardData,
                    applicationFeePaid: true
                });
                console.log("Payment Saved to Store for:", formData.email);
                router.push('/onboarding/fundraiser/review');
                break;
        }
    };

    const handleBack = () => {
        if (subStep === "details") setSubStep("method")
        else if (subStep === "method") setSubStep("summary")
        else if (subStep === "summary") window.history.back()
    }

    const isNextDisabled = useMemo(() => {
        if (subStep === "method") return !method
        if (subStep === "details") {
            return !cardData.nameOnCard || !cardData.cardNumber || !cardData.expiry || !cardData.cvv
        }
        return false
    }, [subStep, method, cardData])

    const nextLabel = subStep === "details" ? "Pay" : "Next"

    return (
        <div className="w-full lg:w-[568px] mx-auto">

            <header className="mb-8">
                <h2 className="text-[28px] text-[#1B1B1B] font-bold" style={TYPOGRAPHY.heading}>
                    Payment of Application Fee
                </h2>
                <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                    Confirm application by paying application fee
                </p>
            </header>

            {/* Sub-step content */}
            <main>
                {subStep === "summary" && <PaymentSummary email={formData.loginEmail} />}
                {subStep === "method" && <PaymentMethodSelect selectedMethod={method} onSelect={setMethod} />}
                {subStep === "details" && <PaymentCardDetails cardData={cardData} setCardData={setCardData} />}
            </main>

            <footer className="flex gap-4 mt-10">
                <div className="flex-1">
                    <OnboardingButton
                        label={subStep === "summary" ? "Go Back" : "Go back"}
                        variant="plain"
                        onClick={handleBack}
                        className="mt-0"
                    />
                </div>
                <div className="flex-1">
                    <OnboardingButton
                        label={nextLabel}
                        variant="solid"
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className="mt-0"
                    />
                </div>
            </footer>
        </div>
    )
}