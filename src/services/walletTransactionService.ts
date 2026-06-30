import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  WalletTransactionInvoice,
  WalletTransactionsQuery,
  WalletTransactionsResponse,
} from "@/types/wallet-transaction";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/investors/me/wallet/transactions";

async function listTransactions(
  query: WalletTransactionsQuery = {}
): Promise<WalletTransactionsResponse> {
  try {
    const res = await request.get<ApiResponse<WalletTransactionsResponse>>(BASE, {
      params: query,
    });
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getTransaction(transactionId: number): Promise<WalletTransactionInvoice> {
  try {
    const res = await request.get<ApiResponse<WalletTransactionInvoice>>(
      `${BASE}/${transactionId}`
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const walletTransactionService = {
  listTransactions,
  getTransaction,
};

export default walletTransactionService;
