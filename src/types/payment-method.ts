export type PaymentMethodType = "Bank" | "Card";

export interface PaymentMethodItem {
  id: number;
  type: PaymentMethodType;
  title: string;
  subtitle: string;
  isDefault: boolean;
  isVerified: boolean;
  addedAt: string;
}

export interface PaymentMethodsResponse {
  items: PaymentMethodItem[];
}

export interface AddPaymentMethodRequest {
  type: PaymentMethodType;
  title: string;
  providerName: string;
  last4: string;
  setAsDefault?: boolean;
}

export interface PaymentMethodResponse {
  item: PaymentMethodItem;
}
