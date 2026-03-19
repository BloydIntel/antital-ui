import { PaymentSubStep } from "@/types/payment"

export const PAYMENT_SUBSTEPS: readonly PaymentSubStep[] = [
    "summary",
    "method",
    "details"
] as const;
