import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CACHE_KEY_FUNDRAISER_INVESTOR_ANALYTICS,
  CACHE_KEY_FUNDRAISER_INVESTOR_MESSAGES,
  CACHE_KEY_FUNDRAISER_QII,
} from "@/constants";
import fundraiserInvestorsService from "@/services/fundraiserInvestorsService";
import type {
  ReplyFundraiserInvestorMessageRequest,
  UpdateFundraiserInvestorMessageRequest,
} from "@/types/fundraiser-investors-api";
import { showApiErrorToast } from "@/lib/error-feedback";
import { toast } from "sonner";

export function useFundraiserQiiParticipation(enabled = true) {
  return useQuery({
    queryKey: CACHE_KEY_FUNDRAISER_QII,
    queryFn: () => fundraiserInvestorsService.getQiiParticipation(),
    enabled,
  });
}

export function useFundraiserInvestorMessages(
  status: "all" | "answered" | "unanswered" = "all",
  enabled = true
) {
  return useQuery({
    queryKey: [...CACHE_KEY_FUNDRAISER_INVESTOR_MESSAGES, status],
    queryFn: () => fundraiserInvestorsService.listMessages({ status }),
    enabled,
  });
}

export function useFundraiserInvestorAnalytics(enabled = true) {
  return useQuery({
    queryKey: CACHE_KEY_FUNDRAISER_INVESTOR_ANALYTICS,
    queryFn: () => fundraiserInvestorsService.getAnalytics(),
    enabled,
  });
}

function invalidateInvestorInbox(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: CACHE_KEY_FUNDRAISER_INVESTOR_MESSAGES });
  queryClient.invalidateQueries({ queryKey: CACHE_KEY_FUNDRAISER_INVESTOR_ANALYTICS });
}

export function useReplyFundraiserInvestorMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      messageId,
      payload,
    }: {
      messageId: number;
      payload: ReplyFundraiserInvestorMessageRequest;
    }) => fundraiserInvestorsService.replyMessage(messageId, payload),
    onSuccess: () => {
      invalidateInvestorInbox(queryClient);
      toast.success("Reply sent");
    },
    onError: (error) => {
      showApiErrorToast(error, "Unable to send reply.");
    },
  });
}

export function useUpdateFundraiserInvestorMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      messageId,
      payload,
    }: {
      messageId: number;
      payload: UpdateFundraiserInvestorMessageRequest;
    }) => fundraiserInvestorsService.updateMessage(messageId, payload),
    onSuccess: () => {
      invalidateInvestorInbox(queryClient);
      toast.success("Message updated");
    },
    onError: (error) => {
      showApiErrorToast(error, "Unable to update message.");
    },
  });
}
