import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type UserType = "individual" | "corporate" | "fundraiser"

export interface UserData {
    userId: string | null
    firstName: string | null
    lastName: string | null
    emailAddress: string | null
    streetAddress: string | null
    city: string | null
    state: string | null
    profilePictureUrl: string | null
    userType: UserType
    isKycCompleted: boolean
}

interface UserState extends UserData {
    setUserId: (id: string) => void
    updateProfile: (data: Partial<Omit<UserData, 'userId'>>) => void
    clearUser: () => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            // Initial States
            userId: null,
            firstName: null,
            lastName: null,
            emailAddress: null,
            streetAddress: null,
            city: null,
            state: null,
            profilePictureUrl: null,
            userType: "fundraiser",
            isKycCompleted: false,

            setUserId: (id) => set(() => ({ userId: id })),

            updateProfile: (data) => set((state) => ({ ...state, ...data })),

            clearUser: () => set(() => ({
                userId: null,
                firstName: null,
                lastName: null,
                emailAddress: null,
                streetAddress: null,
                city: null,
                state: null,
                profilePictureUrl: null,
                userType: "fundraiser",
                isKycCompleted: false,
            })),
        }),
        {
            name: 'user-auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)