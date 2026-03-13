export type PaymentSubStep = "summary" | "method" | "details";

export type PaymentMethod = "card" | "transfer" | "opay";

export interface ApplicationFee {
    amount: number
    currency: "NGN"
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
