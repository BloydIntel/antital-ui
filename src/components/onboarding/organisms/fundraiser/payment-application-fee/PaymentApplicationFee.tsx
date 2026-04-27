"use client"

import { useState, useMemo, useEffect } from "react"
import { PaymentMethod, CardFormData } from "@/types/payment"
import { TYPOGRAPHY } from "@/constants/styles"
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton"
import { useRouter, usePathname } from "next/navigation"

import { PaymentSummary } from "@/components/onboarding/organisms/fundraiser/payment-application-fee/PaymentSummary"
import { PaymentMethodSelect } from "@/components/onboarding/organisms/fundraiser/payment-application-fee/PaymentMethodSelect"
import { PaymentCardDetails } from "@/components/onboarding/organisms/fundraiser/payment-application-fee/PaymentCardDetails"
import { useOnboardingStore } from "@/store/onboardingStore"
import { PAYMENT_SUBSTEPS } from "@/constants/paymentStep"
import { useUserStore } from "@/store/userStore"

const companyDetails = {
    name: "Green Tech Solution"
}

export function PaymentApplicationFee() {
    const pathName = usePathname()
    const router = useRouter();
    const { formData, updateFormData } = useOnboardingStore();

    const userId = useUserStore((state) => state.userId);

    const [subStepIndex, setSubStepIndex] = useState(0);
    const [method, setMethod] = useState<PaymentMethod | null>(formData.paymentMethod);
    const [cardData, setCardData] = useState<CardFormData>({
        nameOnCard: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const isFundraiserPaymentPage = pathName === "/onboarding/fundraiser/application-fee"

    const currentSubStep = PAYMENT_SUBSTEPS[subStepIndex];

    useEffect(() => {
        updateFormData({ paymentMethod: method });
    }, [method, updateFormData]);

    const handleNext = () => {
        const isLastSubStep = subStepIndex === PAYMENT_SUBSTEPS.length - 1;

        if (currentSubStep === "method") {
            if (!method) return;

            if (method !== "card") {
                finalizePayment();
                return;
            }
        }

        if (isLastSubStep) {
            finalizePayment();
        } else {
            setSubStepIndex(prev => prev + 1);
        }
    };

    const finalizePayment = () => {

        updateFormData({
            paymentMethod: method,
            applicationFeePaid: true,
        });
        router.push('/onboarding/fundraiser/review');
    };

    const handleBack = () => {
        if (subStepIndex > 0) {
            setSubStepIndex(prev => prev - 1);
        } else {
            router.back();
        }
    };

    const isNextDisabled = useMemo(() => {
        switch (currentSubStep) {
            case "method":
                return !method;
            case "details":
                return !cardData.nameOnCard || !cardData.cardNumber || !cardData.expiry || !cardData.cvv;
            default:
                return false;
        }
    }, [currentSubStep, method, cardData]);

    const nextLabel = currentSubStep === "details" ? "Pay" : "Next";

    return (
        <div className="w-full lg:w-[568px] mx-auto">

            {isFundraiserPaymentPage ? (
                <header className="mb-8">
                    <h2 className="text-[28px] text-[#1B1B1B] font-bold" style={TYPOGRAPHY.heading}>
                        Payment of Application Fee
                    </h2>
                    <p className="text-[16px] text-[#2C2C2C] mt-2" style={TYPOGRAPHY.body}>
                        Confirm application by paying application fee
                    </p>
                </header>
            ) : (
                <header className="mb-8">
                    <div className="flex justify-between">
                        <h2 className="text-[24px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                            Stage 1: Invest in {companyDetails.name}
                        </h2>

                        {/* To be made dymanic later */}
                        <p className="text-[#505050]">1/4</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                        {[1, 2, 3, 4].map((step) => (
                            <div
                                key={step}
                                className={`h-1.5 flex-1 rounded-full ${step === 1 ? 'bg-[#062F24]' : 'bg-[#D9E3C8]'}`}
                            />
                        ))}
                    </div>
                </header>
            )}

            {/* Sub-step content */}
            <main>
                {currentSubStep === "summary" && (
                    isFundraiserPaymentPage
                        ? <PaymentSummary email={formData.loginEmail} isFundraiserPaymentPage />
                        : <PaymentSummary userId={userId!} isFundraiserPaymentPage />
                )}
                {currentSubStep === "method" && (
                    <PaymentMethodSelect selectedMethod={method} onSelect={setMethod} />
                )}
                {currentSubStep === "details" && (
                    <PaymentCardDetails cardData={cardData} setCardData={setCardData} />
                )}
            </main>

            <footer className="flex gap-4 mt-10">
                <div className="flex-1">
                    <OnboardingButton
                        label="Go back"
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