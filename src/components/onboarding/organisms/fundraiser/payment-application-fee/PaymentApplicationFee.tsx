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
import { InvestmentPaymentSummary } from "@/app/(dashboard)/marketplace/invest/InvestmentPaymentSummary"
import { PaymentSuccessPage } from "@/components/marketplace/organisms/PaymentSuccessPage"
import onboardingService from "@/services/onboardingService"
import investmentOrderService from "@/services/investmentOrderService"
import { showApiErrorToast } from "@/lib/error-feedback"
import { useCurrentUser } from "@/hooks/use-current-user"
import { getUserIdFromAccessToken } from "@/lib/jwt"
import { tokenStorage } from "@/lib/token-storage"
import { saveCheckoutOrderId } from "@/lib/investment-checkout"
import type { CreateInvestmentOrderResponse } from "@/types/investment-order"

interface PaymentApplicationFeeProps {
    companyName?: string
    unitPrice?: number
    minInvestment?: number
    offeringId?: number
    offeringSlug?: string
}

const FUNDRAISER_PAYMENT_STATE_KEY = "fundraiser_application_fee_state";

export function PaymentApplicationFee({
    companyName,
    unitPrice,
    minInvestment,
    offeringId,
}: PaymentApplicationFeeProps) {

    const pathName = usePathname()
    const router = useRouter();
    const { formData, updateFormData } = useOnboardingStore();
    const { data: currentUser } = useCurrentUser();

    const tokenUserId = getUserIdFromAccessToken(tokenStorage.getAccessToken());
    const displayUserId =
        tokenUserId?.toString() ??
        (currentUser?.id != null ? String(currentUser.id) : null);

    const [unitCount, setUnitCount] = useState(1);
    const [showError, setShowError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkoutOrder, setCheckoutOrder] = useState<CreateInvestmentOrderResponse | null>(null);

    const [subStepIndex, setSubStepIndex] = useState(0);
    const [method, setMethod] = useState<PaymentMethod | null>(formData.paymentMethod);
    const [cardData, setCardData] = useState<CardFormData>({
        nameOnCard: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const isFundraiserPaymentPage = pathName === "/onboarding/fundraiser/application-fee"

    useEffect(() => {
        if (!isFundraiserPaymentPage || typeof window === "undefined") return;

        try {
            const raw = window.sessionStorage.getItem(FUNDRAISER_PAYMENT_STATE_KEY);
            if (!raw) return;
            const persisted = JSON.parse(raw) as {
                paymentMethod: PaymentMethod | null;
                applicationFeePaid: boolean;
                paymentReference?: string | null;
                paymentStatus?: "pending" | "success" | "failed";
            };
            updateFormData({
                paymentMethod: persisted.paymentMethod ?? null,
                applicationFeePaid: !!persisted.applicationFeePaid,
                paymentReference: persisted.paymentReference ?? null,
                paymentStatus:
                    persisted.paymentStatus === "success" || persisted.paymentStatus === "failed"
                        ? persisted.paymentStatus
                        : "pending",
            });
            if (persisted.paymentMethod) setMethod(persisted.paymentMethod);
        } catch {
            // Ignore malformed session cache.
        }
    }, [isFundraiserPaymentPage, updateFormData]);

    useEffect(() => {
        setShowError(false);
    }, [unitCount]);

    const paymentSubSteps = useMemo(() => {
        if (isFundraiserPaymentPage) {
            return PAYMENT_SUBSTEPS.filter((step) => step !== "investment-summary" && step !== "success");
        }

        return PAYMENT_SUBSTEPS.filter((step) => step !== "details");
    }, [isFundraiserPaymentPage]);

    const currentSubStep = paymentSubSteps[subStepIndex];

    const { currentStage, totalStages } = useMemo(() => {
        if (isFundraiserPaymentPage) {
            // Fundraiser Flow: 1. Summary, 2. Method, 3. Details (Linear 1-2-3)
            const fundraiserMap: Record<string, number> = {
                "summary": 1,
                "method": 2,
                "details": 3,
            };
            return { currentStage: fundraiserMap[currentSubStep] || 1, totalStages: 3 };
        } else {
            // Investment Flow: 1. Summary, 2. Invest Summary, 3. Method/Details, 4. Success
            const investmentMap: Record<string, number> = {
                "summary": 1,
                "investment-summary": 2,
                "method": 3,
                "details": 3,
                "success": 4
            };
            return { currentStage: investmentMap[currentSubStep] || 1, totalStages: 4 };
        }
    }, [isFundraiserPaymentPage, currentSubStep]);


    const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    useEffect(() => {
        updateFormData({ paymentMethod: method });
    }, [method, updateFormData]);

    const handleNext = async () => {
        if (currentSubStep === "summary" && isBelowMinimum) {
            setShowError(true);
            return;
        }

        if (!isFundraiserPaymentPage && currentSubStep === "summary" && offeringId) {
            try {
                setIsSubmitting(true);
                const order = await investmentOrderService.createOrder(offeringId, unitCount);
                setCheckoutOrder(order);
            } catch (error) {
                showApiErrorToast(error, "Unable to create investment order.");
                return;
            } finally {
                setIsSubmitting(false);
            }
        }

        if (!isFundraiserPaymentPage && currentSubStep === "method") {
            if (!method || !checkoutOrder) return;
            await initializeInvestmentPayment(method);
            return;
        }

        if (currentSubStep === "method") {
            if (!method) return;

            if (isFundraiserPaymentPage && method !== "card") {
                await finalizePayment();
                return;
            }
        }

        if (currentSubStep === "details") {
            if (isFundraiserPaymentPage) {
                await finalizePayment();
            } else {
                setSubStepIndex(prev => prev + 1);
            }
            return;
        }

        const isLastSubStep = subStepIndex === paymentSubSteps.length - 1;
        if (isLastSubStep) {
            await finalizePayment();
        } else {
            setSubStepIndex(prev => prev + 1);
        }
    };

    const initializeInvestmentPayment = async (channel: PaymentMethod) => {
        if (!checkoutOrder) return;

        try {
            setIsSubmitting(true);
            const session = await investmentOrderService.initializePayment(checkoutOrder.orderId, channel);
            saveCheckoutOrderId(checkoutOrder.orderId);
            window.location.assign(session.authorizationUrl);
        } catch (error) {
            showApiErrorToast(error, "Unable to start Paystack checkout.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const finalizePayment = async () => {
        const paymentReference = formData.paymentReference || `FR-${Date.now()}`;
        const nextPaymentState = {
            paymentMethod: method,
            paymentReference,
            paymentStatus: "success" as const,
            applicationFeePaid: true,
        };
        updateFormData(nextPaymentState);

        if (isFundraiserPaymentPage) {
            if (!method) {
                setShowError(true);
                return;
            }

            try {
                await onboardingService.saveFundraiserPayment({
                    paymentMethod: method,
                    paymentReference,
                    paymentStatus: "success",
                    applicationFeePaid: true,
                });
            } catch (error) {
                showApiErrorToast(error, "Unable to save payment details.");
                return;
            }
        }

        if (isFundraiserPaymentPage && typeof window !== "undefined") {
            window.sessionStorage.setItem(FUNDRAISER_PAYMENT_STATE_KEY, JSON.stringify(nextPaymentState));
        }

        router.push('/onboarding/fundraiser/review');
    };

    const handleBack = () => {
        // If Investment Flow and on first step, go back to marketplace
        if (!isFundraiserPaymentPage && subStepIndex === 0) {
            router.push('/marketplace');
            return;
        }

        if (subStepIndex > 0) {
            setSubStepIndex(prev => prev - 1);
        } else {
            router.back();
        }
    };

    const unitPriceValue = checkoutOrder?.sharePrice ?? unitPrice ?? 0;
    const minInvestmentValue = checkoutOrder?.minInvestment ?? minInvestment ?? 0;

    const subtotal = checkoutOrder?.subtotal ?? unitCount * unitPriceValue;
    const platformFee = checkoutOrder?.platformFee ?? subtotal * 0.025;
    const total = checkoutOrder?.totalAmount ?? subtotal + platformFee;
    const isBelowMinimum = !isFundraiserPaymentPage && subtotal < minInvestmentValue;

    const isNextDisabled = useMemo(() => {
        if (isSubmitting) return true;

        switch (currentSubStep) {
            case "method":
                return !method || (!isFundraiserPaymentPage && !checkoutOrder);
            case "details":
                return !cardData.nameOnCard || !cardData.cardNumber || !cardData.expiry || !cardData.cvv;
            default:
                return false;
        }
    }, [currentSubStep, method, cardData, isSubmitting, isFundraiserPaymentPage, checkoutOrder]);

    const nextLabel = useMemo(() => {
        if (isSubmitting) return "Please wait…";
        if (!isFundraiserPaymentPage && currentSubStep === "method") return "Pay with Paystack";
        if (currentSubStep === "details") return "Pay";
        return "Next";
    }, [currentSubStep, isFundraiserPaymentPage, isSubmitting]);

    const backLabel = (!isFundraiserPaymentPage && subStepIndex === 0) ? "Cancel" : "Go back";

    return (
        <div className="flex flex-col justify-between lg:justify-start w-full h-screen lg:w-[568px] mx-auto">

            <div>
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
                            <h2 className="text-[18px] lg:text-[24px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                                Stage {currentStage}: Invest in {companyName}
                            </h2>

                            <p className="text-[#505050] tabular-nums">
                                {currentStage}/{totalStages}
                            </p>
                        </div>
                        <div className="flex gap-2 mt-4">
                            {Array.from({ length: totalStages }).map((_, index) => {
                                const stageNumber = index + 1;
                                return (
                                    <div
                                        key={stageNumber}
                                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${stageNumber <= currentStage ? 'bg-[#042E27]' : 'bg-[#CAD484]'
                                            }`}
                                    />
                                );
                            })}
                        </div>
                    </header>
                )}

                {/* Sub-step content */}
                <main>
                    {currentSubStep === "summary" && (
                        <PaymentSummary
                            email={formData.loginEmail}
                            userId={displayUserId ?? "Loading…"}
                            isFundraiserPaymentPage={isFundraiserPaymentPage}
                            unitCount={unitCount}
                            setUnitCount={setUnitCount}
                            unitPrice={unitPriceValue}
                            minInvestment={minInvestmentValue}
                            isBelowMinimum={isBelowMinimum}
                            formattedDate={formattedDate}
                            showError={showError}
                        />
                    )}
                    {currentSubStep === "investment-summary" && (
                        <InvestmentPaymentSummary
                            unitCount={checkoutOrder?.units ?? unitCount}
                            unitPrice={unitPriceValue}
                            userId={displayUserId ?? "Loading…"}
                            formattedDate={formattedDate}
                            platformFee={platformFee}
                            totalAmount={total}
                            subtotal={subtotal}
                        />
                    )}
                    {currentSubStep === "method" && (
                        <PaymentMethodSelect selectedMethod={method} onSelect={setMethod} />
                    )}
                    {currentSubStep === "details" && (
                        <PaymentCardDetails cardData={cardData} setCardData={setCardData} isFundraiserPaymentPage={isFundraiserPaymentPage} totalAmount={total} />
                    )}
                    {currentSubStep === "success" && (
                        <PaymentSuccessPage totalAmount={total} companyName={companyName!} />
                    )}
                </main>
            </div>

            {currentSubStep !== "success" && (
                <footer className="flex gap-4 mt-10">
                    <div className="flex-1">
                        <OnboardingButton
                            label={backLabel}
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
            )}
        </div>
    )
}
