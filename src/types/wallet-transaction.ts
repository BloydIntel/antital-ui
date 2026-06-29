export interface WalletTransactionItem {
  id: number;
  type: string;
  description: string;
  subDescription: string;
  amount: number;
  fees?: number | null;
  occurredAt: string;
  status: string;
  orderId: number;
  offeringSlug: string;
}

export interface WalletTransactionsResponse {
  items: WalletTransactionItem[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface WalletTransactionsQuery {
  page?: number;
  pageSize?: number;
  type?: string;
  status?: string;
  from?: string;
  to?: string;
}

export interface WalletTransactionBillTo {
  name: string;
  email: string;
  phone?: string | null;
}

export interface WalletTransactionDetails {
  type: string;
  status: string;
}

export interface WalletTransactionBreakdown {
  description: string;
  company: string;
  sector: string;
  units: number;
  pricePerUnit: number;
  subtotal: number;
  feePercentage: number;
  fees: number;
  totalAmount: number;
}

export interface WalletTransactionInvoice {
  invoiceId: number;
  invoiceDate: string;
  paymentDate: string;
  paymentMethod: string;
  paymentReference?: string | null;
  billTo: WalletTransactionBillTo;
  transactionDetails: WalletTransactionDetails;
  breakdown: WalletTransactionBreakdown;
}
