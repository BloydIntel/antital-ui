import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_WALLET_TRANSACTIONS } from "@/constants";
import walletTransactionService from "@/services/walletTransactionService";

export function useWalletTransaction(transactionId?: number) {
  return useQuery({
    queryKey: [...CACHE_KEY_WALLET_TRANSACTIONS, "detail", transactionId],
    queryFn: () => walletTransactionService.getTransaction(transactionId!),
    enabled: Number.isFinite(transactionId) && transactionId! > 0,
  });
}
