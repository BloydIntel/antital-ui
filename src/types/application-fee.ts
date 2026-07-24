export interface ApplicationFeeStatus {
  amount: number;
  currency: string;
  applicationFeePaid: boolean;
  paymentMethod: string | null;
  paymentReference: string | null;
  paymentStatus: string | null;
}

export interface InitializeApplicationFeePaymentResponse {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
  publicKey: string;
  amount: number;
  currency: string;
}
