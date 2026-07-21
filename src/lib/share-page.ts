import { toast } from "sonner";

export async function shareCurrentPage(title?: string): Promise<void> {
  if (typeof window === "undefined") return;

  const url = window.location.href;
  const shareTitle = title ?? document.title;

  if (navigator.share) {
    try {
      await navigator.share({ url, title: shareTitle });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  } catch {
    toast.error("Unable to share this page");
  }
}
