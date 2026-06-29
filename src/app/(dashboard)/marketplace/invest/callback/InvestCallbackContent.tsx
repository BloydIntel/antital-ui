"use client";

import { PaymentSuccessPage } from "@/components/marketplace/organisms/PaymentSuccessPage";
import investmentOrderService from "@/services/investmentOrderService";
import investmentService from "@/services/investmentService";
import {
  clearCheckoutOrderId,
  parseOrderIdFromPaystackReference,
  readCheckoutOrderId,
} from "@/lib/investment-checkout";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const PAID_STATUS = "Paid";
const FAILED_STATUSES = new Set(["Failed", "Expired", "Cancelled"]);

export function InvestCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = useMemo(() => {
    const fromSession = readCheckoutOrderId();
    if (fromSession) return fromSession;

    const reference = searchParams.get("reference") ?? searchParams.get("trxref");
    return parseOrderIdFromPaystackReference(reference);
  }, [searchParams]);

  const orderQuery = useQuery({
    queryKey: ["investment-order-callback", orderId],
    queryFn: async () => {
      try {
        return await investmentOrderService.verifyPayment(orderId!);
      } catch {
        // Payment may still be pending; fall back to polling order status.
        return investmentOrderService.getOrder(orderId!);
      }
    },
    enabled: orderId != null,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (!status || status === PAID_STATUS || FAILED_STATUSES.has(status)) {
        return false;
      }
      return 2000;
    },
  });

  const offeringQuery = useQuery({
    queryKey: ["investment-order-offering", orderQuery.data?.offeringId],
    queryFn: () => investmentService.getShell(String(orderQuery.data!.offeringId)),
    enabled: orderQuery.data?.status === PAID_STATUS,
  });

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <p className="text-[#2C2C2C] text-lg">We could not find your payment reference.</p>
          <button
            type="button"
            className="text-[#7BA147] underline"
            onClick={() => router.push("/marketplace")}
          >
            Back to marketplace
          </button>
        </div>
      </div>
    );
  }

  if (orderQuery.isLoading || !orderQuery.data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-[#505050]">Confirming your payment…</p>
      </div>
    );
  }

  if (orderQuery.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <p className="text-[#2C2C2C] text-lg">Unable to confirm your payment right now.</p>
          <button
            type="button"
            className="text-[#7BA147] underline"
            onClick={() => orderQuery.refetch()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const order = orderQuery.data;

  if (order.status === PAID_STATUS) {
    clearCheckoutOrderId();
    const companyName = offeringQuery.data?.offering.name ?? `Offering #${order.offeringId}`;
    return (
      <PaymentSuccessPage
        totalAmount={order.totalAmount}
        companyName={companyName}
      />
    );
  }

  if (FAILED_STATUSES.has(order.status)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <p className="text-[#2C2C2C] text-lg">Payment was not completed.</p>
          <p className="text-[#505050]">Order status: {order.status}</p>
          <button
            type="button"
            className="text-[#7BA147] underline"
            onClick={() => router.push("/marketplace")}
          >
            Back to marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <p className="text-[#505050]">Waiting for Paystack confirmation…</p>
    </div>
  );
}
