import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_PAYMENT_METHODS } from "@/constants";
import paymentMethodService from "@/services/paymentMethodService";
import type { AddPaymentMethodRequest } from "@/types/payment-method";

export function usePaymentMethods() {
  return useQuery({
    queryKey: CACHE_KEY_PAYMENT_METHODS,
    queryFn: () => paymentMethodService.listPaymentMethods(),
  });
}

export function useAddPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddPaymentMethodRequest) =>
      paymentMethodService.addPaymentMethod(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_PAYMENT_METHODS });
    },
  });
}

export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => paymentMethodService.setDefaultPaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_PAYMENT_METHODS });
    },
  });
}

export function useDeletePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => paymentMethodService.deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_PAYMENT_METHODS });
    },
  });
}
