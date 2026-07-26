import axios from "axios";

type ApiEnvelopeLike = {
  isSuccess?: boolean;
  errors?: string[];
  validationErrors?: Record<string, string[]>;
  title?: string;
  detail?: string;
};

/**
 * Error thrown when an API response has isSuccess: false.
 * Preserves errors and validationErrors so the UI can show
 * general and field-specific messages.
 */
export class ApiError extends Error {
  readonly errors: string[];
  readonly validationErrors: Record<string, string[]>;
  readonly status?: number;

  constructor(
    message: string,
    errors: string[] = [],
    validationErrors: Record<string, string[]> = {},
    status?: number
  ) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
    this.validationErrors = validationErrors;
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * First general error message, or the generic message.
   */
  get primaryMessage(): string {
    return this.errors[0] ?? this.message;
  }

  /**
   * Get validation message for a field (supports camelCase lookup).
   * e.g. getFieldError("email") checks "email" and "Email".
   */
  getFieldError(field: string): string | undefined {
    const candidates = [
      field,
      field.charAt(0).toUpperCase() + field.slice(1),
      `kycPayload.${field}`,
      `KycPayload.${field.charAt(0).toUpperCase() + field.slice(1)}`,
      `kycPayload${field.charAt(0).toUpperCase() + field.slice(1)}`,
    ];

    for (const key of candidates) {
      const message = this.validationErrors[key]?.[0];
      if (message) return message;
    }

    const lowerField = field.toLowerCase();
    for (const [key, messages] of Object.entries(this.validationErrors)) {
      if (key.toLowerCase() === lowerField || key.toLowerCase().endsWith(`.${lowerField}`)) {
        return messages[0];
      }
    }

    return undefined;
  }

  /**
   * Flatten validation errors in object order.
   */
  getValidationMessages(): string[] {
    return Object.values(this.validationErrors).flat();
  }

  /**
   * Combined API messages (validation first, then general errors).
   */
  getAllMessages(): string[] {
    const messages = [...this.getValidationMessages(), ...this.errors];
    return [...new Set(messages)].filter(Boolean);
  }
}

function readEnvelope(data: unknown): ApiEnvelopeLike | null {
  if (!data || typeof data !== "object") return null;
  return data as ApiEnvelopeLike;
}

/**
 * Convert unknown thrown errors into ApiError when possible.
 * Handles:
 * - already-thrown ApiError
 * - Axios HTTP errors whose response body uses API envelope shape
 * - RFC7807 style title/detail fallbacks
 */
export function toApiError(error: unknown): Error {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const envelope = readEnvelope(error.response?.data);
    if (envelope) {
      const validationErrors = envelope.validationErrors ?? {};
      const validationMessages = Object.values(validationErrors).flat();
      const errors = envelope.errors ?? [];
      const message =
        validationMessages[0] ??
        errors[0] ??
        envelope.detail ??
        envelope.title ??
        error.message;

      return new ApiError(message, errors, validationErrors, status);
    }
    return new ApiError(error.message, [], {}, status);
  }

  if (error instanceof Error) return error;
  return new Error("Request failed");
}

export function getApiErrorMessages(
  error: unknown,
  fallback = "Request failed"
): string[] {
  const normalized = toApiError(error);
  if (normalized instanceof ApiError) {
    const messages = normalized.getAllMessages();
    return messages.length > 0 ? messages : [normalized.message || fallback];
  }
  return [normalized.message || fallback];
}

export function getApiPrimaryMessage(
  error: unknown,
  fallback = "Request failed"
): string {
  return getApiErrorMessages(error, fallback)[0] ?? fallback;
}

export function isApiErrorStatus(error: unknown, status: number): boolean {
  const normalized = toApiError(error);
  return normalized instanceof ApiError && normalized.status === status;
}
