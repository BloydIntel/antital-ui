import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_WALLET_TRANSACTIONS } from "@/constants";
import { mapWalletTransactionToItem } from "@/lib/wallet-transaction-mappers";
import walletTransactionService from "@/services/walletTransactionService";
import type { WalletTransactionsQuery } from "@/types/wallet-transaction";

export function useWalletTransactions(query: WalletTransactionsQuery = {}) {
  return useQuery({
    queryKey: [...CACHE_KEY_WALLET_TRANSACTIONS, query],
    queryFn: async () => {
      const response = await walletTransactionService.listTransactions(query);
      return {
        ...response,
        items: response.items.map(mapWalletTransactionToItem),
      };
    },
  });
}
