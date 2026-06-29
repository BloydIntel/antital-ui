import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  AddPaymentMethodRequest,
  PaymentMethodResponse,
  PaymentMethodsResponse,
} from "@/types/payment-method";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/investors/me/payment-methods";

async function listPaymentMethods(): Promise<PaymentMethodsResponse> {
  try {
    const res = await request.get<ApiResponse<PaymentMethodsResponse>>(BASE);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function addPaymentMethod(
  payload: AddPaymentMethodRequest
): Promise<PaymentMethodResponse> {
  try {
    const res = await request.post<ApiResponse<PaymentMethodResponse>>(BASE, payload);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function setDefaultPaymentMethod(id: number): Promise<PaymentMethodResponse> {
  try {
    const res = await request.patch<ApiResponse<PaymentMethodResponse>>(
      `${BASE}/${id}/default`
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function deletePaymentMethod(id: number): Promise<void> {
  try {
    const res = await request.delete<ApiResponse<unknown>>(`${BASE}/${id}`);
    unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const paymentMethodService = {
  listPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  deletePaymentMethod,
};

export default paymentMethodService;
