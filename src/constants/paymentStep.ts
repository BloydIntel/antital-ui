import { PaymentSubStep } from "@/types/payment"

export const PAYMENT_SUBSTEPS: readonly PaymentSubStep[] = [
    "summary",
    "investment-summary",
    "method",
    "details",
    "success"
] as const;