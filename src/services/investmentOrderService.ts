import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  CreateInvestmentOrderResponse,
  GetInvestmentOrderResponse,
  InitializeInvestmentPaymentResponse,
} from "@/types/investment-order";
import type { PaymentMethod } from "@/types/payment";
import { toApiError } from "@/lib/api-error";

async function createOrder(
  offeringId: number,
  units: number
): Promise<CreateInvestmentOrderResponse> {
  try {
    const res = await request.post<ApiResponse<CreateInvestmentOrderResponse>>(
      `/api/investments/${offeringId}/orders`,
      { units }
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getOrder(orderId: number): Promise<GetInvestmentOrderResponse> {
  try {
    const res = await request.get<ApiResponse<GetInvestmentOrderResponse>>(
      `/api/investments/orders/${orderId}`
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function initializePayment(
  orderId: number,
  channel: PaymentMethod
): Promise<InitializeInvestmentPaymentResponse> {
  try {
    const res = await request.post<ApiResponse<InitializeInvestmentPaymentResponse>>(
      `/api/investments/orders/${orderId}/pay`,
      { channel }
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function verifyPayment(orderId: number): Promise<GetInvestmentOrderResponse> {
  try {
    const res = await request.post<ApiResponse<GetInvestmentOrderResponse>>(
      `/api/investments/orders/${orderId}/verify`
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const investmentOrderService = {
  createOrder,
  getOrder,
  initializePayment,
  verifyPayment,
};

export default investmentOrderService;
