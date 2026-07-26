"use client";

import { Lightbulb, User, Smile, Camera, CheckCircle2, Loader2 } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useState } from "react";
import onboardingService from "@/services/onboardingService";
import { showApiErrorToast } from "@/lib/error-feedback";
import { createDojahReferenceId, openDojahWidget } from "@/lib/dojah-widget";
import { toast } from "sonner";

const instructions = [
  {
    id: 1,
    icon: <Lightbulb size={20} className="text-[#1B1B1B]" />,
    text: "Ensure adequate lighting and avoid obstructions",
  },
  {
    id: 2,
    icon: <User size={20} className="text-[#1B1B1B]" />,
    text: "Keep your face fully visible",
  },
  {
    id: 3,
    icon: <Smile size={20} className="text-[#1B1B1B]" />,
    text: "Follow the on-screen liveness prompts (e.g. turn your head)",
  },
];

export function SelfieUpload({ showErrors }: { showErrors: boolean }) {
  const { formData, updateFormData } = useOnboardingStore();
  const selfieCompleted = formData.kycData.selfieCompleted;
  const selfiePathOrKey = formData.kycData.selfiePathOrKey;
  const [isLaunching, setIsLaunching] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSelfie = async () => {
    if (isLaunching || isConfirming) return;

    setIsLaunching(true);
    try {
      const config = await onboardingService.getDojahWidgetConfig();
      if (!config.enabled) {
        toast.error("Selfie verification is not enabled yet.");
        return;
      }
      if (!config.appId || !config.publicKey || !config.widgetId) {
        toast.error("Dojah widget is not configured.");
        return;
      }

      const referenceId = createDojahReferenceId();

      await openDojahWidget({
        app_id: config.appId,
        p_key: config.publicKey,
        type: "custom",
        reference_id: referenceId,
        config: { widget_id: config.widgetId },
        metadata: { source: "antital-onboarding-selfie" },
        user_data: {
          first_name: formData.firstName || undefined,
          last_name: formData.lastName || undefined,
          email: formData.email || undefined,
          residence_country: "NG",
        },
        onSuccess: (response) => {
          void (async () => {
            const confirmedReference =
              (typeof response.reference_id === "string" && response.reference_id) ||
              referenceId;

            setIsConfirming(true);
            try {
              const confirmed = await onboardingService.confirmSelfieVerification(
                confirmedReference
              );
              updateFormData({
                kycData: {
                  selfiePathOrKey: confirmed.referenceId,
                  selfieCompleted: true,
                  selfie: null,
                },
              });
              toast.success("Selfie verification completed.");
            } catch (error) {
              showApiErrorToast(error, "Unable to confirm selfie verification.");
            } finally {
              setIsConfirming(false);
            }
          })();
        },
        onError: () => {
          toast.error("Selfie verification failed. Please try again.");
        },
        onClose: () => {
          // Abandoned — leave state unchanged.
        },
      });
    } catch (error) {
      showApiErrorToast(error, "Unable to start selfie verification.");
    } finally {
      setIsLaunching(false);
    }
  };

  const busy = isLaunching || isConfirming;

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4">
        {instructions.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#F4F5F7] rounded-lg shrink-0">
              {item.icon}
            </div>
            <p className="text-[#505050] text-sm md:text-base font-normal">{item.text}</p>
          </div>
        ))}
      </div>

      {busy ? (
        <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Loader2 className="text-blue-600 w-5 h-5 animate-spin" />
          <p className="text-blue-700 text-sm">
            {isConfirming ? "Confirming selfie with Dojah…" : "Opening live selfie check…"}
          </p>
        </div>
      ) : selfieCompleted ? (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="text-green-600 w-5 h-5" />
          <p className="text-green-700 text-sm">
            Live selfie verified
            {selfiePathOrKey ? (
              <>
                {" "}
                (<b className="break-all">{selfiePathOrKey}</b>)
              </>
            ) : null}
          </p>
        </div>
      ) : showErrors ? (
        <p className="text-red-500 text-sm font-medium">
          Please complete the live selfie verification to continue.
        </p>
      ) : null}

      <div className="w-full mt-8">
        <OnboardingButton
          label={selfieCompleted ? "Retake Live Selfie" : "Take Live Selfie"}
          variant="solid"
          icon={<Camera size={20} />}
          onClick={() => {
            void handleSelfie();
          }}
          disabled={busy}
          loading={busy}
          className="w-full"
        />
      </div>
    </div>
  );
}
