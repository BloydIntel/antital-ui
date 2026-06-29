import type { TransactionItem } from "@/data/transactionsMockData";
import type { WalletTransactionItem } from "@/types/wallet-transaction";

export function mapWalletTransactionToItem(
  transaction: WalletTransactionItem
): TransactionItem {
  const occurred = new Date(transaction.occurredAt);

  return {
    id: String(transaction.id),
    type: transaction.type as TransactionItem["type"],
    description: transaction.description,
    subDescription: transaction.subDescription,
    amount: transaction.amount,
    fees: transaction.fees ?? undefined,
    date: occurred.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    timeStamp: occurred.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    status: transaction.status as TransactionItem["status"],
  };
}
