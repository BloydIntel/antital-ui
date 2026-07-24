import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  ApplicationFeeStatus,
  InitializeApplicationFeePaymentResponse,
} from "@/types/application-fee";
import type { PaymentMethod } from "@/types/payment";
import { toApiError } from "@/lib/api-error";

async function getApplicationFee(): Promise<ApplicationFeeStatus> {
  try {
    const res = await request.get<ApiResponse<ApplicationFeeStatus>>(
      "/api/onboarding/application-fee"
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function initializePayment(
  channel: PaymentMethod
): Promise<InitializeApplicationFeePaymentResponse> {
  try {
    const res = await request.post<ApiResponse<InitializeApplicationFeePaymentResponse>>(
      "/api/onboarding/application-fee/pay",
      { channel }
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function verifyPayment(
  reference?: string | null
): Promise<ApplicationFeeStatus> {
  try {
    const res = await request.post<ApiResponse<ApplicationFeeStatus>>(
      "/api/onboarding/application-fee/verify",
      reference ? { reference } : {}
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const applicationFeeService = {
  getApplicationFee,
  initializePayment,
  verifyPayment,
};

export default applicationFeeService;
