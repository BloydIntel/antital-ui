"use client"

import { useState } from "react"
import { AlertTriangle, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useOnboardingStore } from "@/store/onboardingStore"
import { useUserStore } from "@/store/userStore"
import { useCurrentUser } from "@/hooks/use-current-user"
import { getUserIdFromAccessToken } from "@/lib/jwt"
import { tokenStorage } from "@/lib/token-storage"
import authService from "@/services/authService"
import userService from "@/services/userService"
import { ApiError } from "@/lib/api-error"
import { toast } from "sonner"

interface OnboardingDeleteAccountActionProps {
  className?: string
  showIcon?: boolean
}

export function OnboardingDeleteAccountAction({
  className = "",
  showIcon = false,
}: OnboardingDeleteAccountActionProps) {
  const router = useRouter()
  const emailVerified = useOnboardingStore((state) => state.emailVerified)
  const setEmailVerified = useOnboardingStore((state) => state.setEmailVerified)
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding)
  const investorUserType = useOnboardingStore((state) => state.investorUserType)
  const formData = useOnboardingStore((state) => state.formData)
  const updateFormData = useOnboardingStore((state) => state.updateFormData)
  const storeEmail = useUserStore((state) => state.emailAddress)
  const { data: currentUser } = useCurrentUser()

  const [showDialog, setShowDialog] = useState(false)
  const [deleteOtp, setDeleteOtp] = useState("")
  const [dialogStep, setDialogStep] = useState<"confirm" | "otp">("confirm")
  const [isRequestingDeleteOtp, setIsRequestingDeleteOtp] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const isBusy = isRequestingDeleteOtp || isDeleting || isRedirecting

  const formEmail = (
    investorUserType === "individual"
      ? formData.email
      : formData.loginEmail || formData.email
  )?.trim()

  const verificationEmail = (
    formEmail ||
    storeEmail?.trim() ||
    currentUser?.email?.trim() ||
    ""
  )

  const resolveVerificationEmail = async (): Promise<string | null> => {
    if (verificationEmail) return verificationEmail

    const userId = getUserIdFromAccessToken(tokenStorage.getAccessToken())
    if (userId == null) return null

    try {
      const profile = await userService.getById(userId)
      const email = profile.email?.trim()
      if (!email) return null

      useUserStore.getState().updateProfile({ emailAddress: email })
      if (investorUserType === "individual") {
        updateFormData({ email })
      } else {
        updateFormData({ loginEmail: email, email })
      }
      return email
    } catch {
      return null
    }
  }

  const closeDialog = () => {
    if (isBusy) return
    setShowDialog(false)
    setDialogStep("confirm")
    setDeleteOtp("")
  }

  const forceCloseDialog = () => {
    setShowDialog(false)
    setDialogStep("confirm")
    setDeleteOtp("")
  }

  const finalizeDelete = () => {
    setIsRedirecting(true)
    forceCloseDialog()
    tokenStorage.clear()

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("user-auth-storage")
      toast.success("Account deleted.")
      window.location.replace("/sign-in")
      return
    }

    setEmailVerified(false)
    resetOnboarding()
    useUserStore.getState().clearUser()
    toast.success("Account deleted.")
    router.replace("/sign-in")
  }

  const handleVerifiedDelete = async () => {
    const userId = getUserIdFromAccessToken(tokenStorage.getAccessToken())
    if (userId == null) {
      toast.error("Unable to determine user id.")
      return
    }

    setIsDeleting(true)
    try {
      await authService.deleteAccount(userId)
      finalizeDelete()
    } catch (error) {
      if (error instanceof ApiError) toast.error(error.primaryMessage)
      else if (error instanceof Error) toast.error(error.message)
      else toast.error("Unable to delete account.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleRequestDeleteOtp = async () => {
    setIsRequestingDeleteOtp(true)
    try {
      const email = await resolveVerificationEmail()
      if (!email) {
        toast.error("Email address is missing. Go back and complete account details.")
        return
      }

      await authService.requestUnverifiedOtp({ email })
      toast.success("OTP sent to your email.")
      setDialogStep("otp")
    } catch (error) {
      if (error instanceof ApiError) toast.error(error.primaryMessage)
      else if (error instanceof Error) toast.error(error.message)
      else toast.error("Unable to send OTP.")
    } finally {
      setIsRequestingDeleteOtp(false)
    }
  }

  const handleUnverifiedDelete = async () => {
    const email = await resolveVerificationEmail()
    if (!email) {
      toast.error("Email address is missing. Go back and complete account details.")
      return
    }

    if (!/^\d{6}$/.test(deleteOtp)) {
      toast.error("Enter a valid 6-digit OTP.")
      return
    }

    setIsDeleting(true)
    try {
      await authService.deleteUnverified({ email, otp: deleteOtp })
      finalizeDelete()
    } catch (error) {
      if (error instanceof ApiError) toast.error(error.primaryMessage)
      else if (error instanceof Error) toast.error(error.message)
      else toast.error("Unable to delete account.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDialog(true)}
        disabled={isBusy}
        className={className}
      >
        {showIcon ? <Trash2 className="h-4 w-4" /> : null}
        {isBusy ? "Processing…" : "Delete account"}
      </button>

      <Dialog open={showDialog} onOpenChange={(open) => { if (!isBusy) setShowDialog(open) }}>
        <DialogContent
          className="sm:max-w-md lg:left-[calc(50%+10rem)]"
          overlayClassName="lg:left-[24rem]"
          showCloseButton={!isBusy}
        >
          <DialogHeader>
            <DialogTitle>
              {emailVerified || dialogStep === "confirm" ? "Delete Account" : "Enter OTP"}
            </DialogTitle>
            <DialogDescription>
              {emailVerified
                ? "This permanently deletes your account and onboarding data. Because you are already signed in, this flow currently uses your authenticated session instead of a separate email OTP."
                : dialogStep === "confirm"
                  ? "We'll send a one-time password to your email before deletion. This action cannot be undone."
                  : "Enter the 6-digit OTP sent to your email to confirm deletion."}
            </DialogDescription>
          </DialogHeader>

          {emailVerified ? (
            <div className="rounded-lg border border-[#F5C2C7] bg-[#FFF5F5] p-4 text-sm text-[#8B1E2D]">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>You will lose access to your account, onboarding progress, and related data.</p>
              </div>
            </div>
          ) : null}

          {!emailVerified && dialogStep === "otp" ? (
            <div className="space-y-2">
              <Input
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={deleteOtp}
                onChange={(event) =>
                  setDeleteOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter 6-digit OTP"
                disabled={isBusy}
              />
              <button
                type="button"
                onClick={handleRequestDeleteOtp}
                disabled={isBusy}
                className="text-sm text-[#3B73B5] hover:underline disabled:opacity-60"
              >
                Resend OTP
              </button>
            </div>
          ) : null}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeDialog}
              disabled={isBusy}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            {emailVerified ? (
              <Button
                onClick={handleVerifiedDelete}
                disabled={isBusy}
                className="cursor-pointer bg-[#D4001A] hover:bg-[#B00016]"
              >
                {isDeleting ? "Deleting…" : "Delete Account"}
              </Button>
            ) : dialogStep === "confirm" ? (
              <Button
                onClick={handleRequestDeleteOtp}
                disabled={isBusy}
                className="cursor-pointer bg-[#D4001A] hover:bg-[#B00016]"
              >
                {isRequestingDeleteOtp ? "Sending OTP…" : "Send OTP"}
              </Button>
            ) : (
              <Button
                onClick={handleUnverifiedDelete}
                disabled={isBusy}
                className="cursor-pointer bg-[#D4001A] hover:bg-[#B00016]"
              >
                {isDeleting ? "Deleting…" : "Delete Account"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
