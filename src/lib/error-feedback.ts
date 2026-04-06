import { toast } from "sonner";
import { getApiErrorMessages } from "@/lib/api-error";

/**
 * Standardized API error toast:
 * - Primary message as title
 * - Extra messages (e.g. validation) as description
 */
export function showApiErrorToast(
  error: unknown,
  fallback = "Request failed"
): void {
  const messages = getApiErrorMessages(error, fallback);
  const primary = messages[0] ?? fallback;
  const extras = messages.slice(1, 4);

  if (extras.length === 0) {
    toast.error(primary);
    return;
  }

  toast.error(primary, {
    description: extras.join(" | "),
  });
}
