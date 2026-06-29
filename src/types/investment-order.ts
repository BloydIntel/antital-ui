import type { PaymentMethod } from "@/types/payment";

export interface CreateInvestmentOrderResponse {
  orderId: number;
  offeringId: number;
  units: number;
  sharePrice: number;
  subtotal: number;
  platformFeePercent: number;
  platformFee: number;
  totalAmount: number;
  currency: string;
  status: string;
  minInvestment: number;
  maxInvestment: number;
  expiresAt: string;
}

export interface GetInvestmentOrderResponse {
  orderId: number;
  offeringId: number;
  units: number;
  sharePrice: number;
  subtotal: number;
  platformFeePercent: number;
  platformFee: number;
  totalAmount: number;
  currency: string;
  status: string;
  paystackReference: string | null;
  expiresAt: string | null;
  paidAt: string | null;
  investorHoldingId: number | null;
}

export interface InitializeInvestmentPaymentResponse {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
  publicKey: string;
}

export function mapPaymentMethodToChannel(method: PaymentMethod): PaymentMethod {
  return method;
}
