import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_FUNDRAISER_DOCUMENTS } from "@/constants";
import fundraiserDocumentsService from "@/services/fundraiserDocumentsService";
import type { UploadFundraiserDocumentInput } from "@/types/fundraiser-documents-api";
import { showApiErrorToast } from "@/lib/error-feedback";
import { toast } from "sonner";

export function useFundraiserDocuments(enabled = true) {
  return useQuery({
    queryKey: CACHE_KEY_FUNDRAISER_DOCUMENTS,
    queryFn: () => fundraiserDocumentsService.listDocuments(),
    enabled,
  });
}

export function useUploadFundraiserDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UploadFundraiserDocumentInput) =>
      fundraiserDocumentsService.uploadDocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_FUNDRAISER_DOCUMENTS });
      toast.success("Document uploaded");
    },
    onError: (error) => {
      showApiErrorToast(error, "Unable to upload document.");
    },
  });
}
