import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface PendingOtpState {
    challengeId: string | null
    remember: boolean
    setPendingOtp: (challengeId: string, remember: boolean) => void
    clearPendingOtp: () => void
}

export const usePendingOtpStore = create<PendingOtpState>()(
    persist(
        (set) => ({
            challengeId: null,
            remember: false,
            setPendingOtp: (challengeId, remember) => set({ challengeId, remember }),
            clearPendingOtp: () => set({ challengeId: null, remember: false }),
        }),
        {
            name: "pending-admin-otp",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
