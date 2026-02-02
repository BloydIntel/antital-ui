/**
 * Error thrown when an API response has isSuccess: false.
 * Preserves errors and validationErrors so the UI can show
 * general and field-specific messages.
 */
export class ApiError extends Error {
  readonly errors: string[];
  readonly validationErrors: Record<string, string[]>;

  constructor(
    message: string,
    errors: string[] = [],
    validationErrors: Record<string, string[]> = {}
  ) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
    this.validationErrors = validationErrors;
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
    const direct = this.validationErrors[field]?.[0];
    if (direct) return direct;
    const pascal = field.charAt(0).toUpperCase() + field.slice(1);
    return this.validationErrors[pascal]?.[0];
  }
}
