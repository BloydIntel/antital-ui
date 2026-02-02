/**
 * Generic API response wrapper used by the backend.
 * All APIs return this shape; T is the payload type (Value).
 */
export interface ApiResponse<T> {
  value?: T;
  isSuccess: boolean;
  errors: string[];
  validationErrors: Record<string, string[]>;
  successes: string[];
}
