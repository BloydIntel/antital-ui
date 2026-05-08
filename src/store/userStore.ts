import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface UserData {
    userId: string | null
}

interface UserState extends UserData {
    setUserId: (id: string) => void
    clearUser: () => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userId: null,

            setUserId: (id) => set(() => ({ userId: id })),

            clearUser: () => set(() => ({ userId: null })),
        }),
        {
            // Unique name for the item in storage (required)
            name: 'user-auth-storage',
            // Optional: defaults to localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
)