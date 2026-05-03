export type PaymentSubStep = "summary" | "investment-summary" | "method" | "details" | "success";

export type PaymentMethod = "card" | "transfer" | "opay";

export interface ApplicationFee {
    amount: number
    currency: string
}

export interface UserPaymentInfo {
    email: string
    date: string
}

export interface CardFormData {
    nameOnCard: string
    cardNumber: string
    expiry: string
    cvv: string
}
