import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface NotificationSettings {
    email: boolean
    newListings: boolean
    watchlistDeadlines: boolean
    investmentReminders: boolean
    activityFeeds: boolean
    portfolioUpdates: boolean
}

interface NotificationState {
    settings: NotificationSettings
    toggleSetting: (key: keyof NotificationSettings) => void
    setAllSettings: (settings: Partial<NotificationSettings>) => void
}

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set) => ({
            settings: {
                email: false,
                newListings: true,
                watchlistDeadlines: true,
                investmentReminders: true,
                activityFeeds: false,
                portfolioUpdates: true,
            },
            toggleSetting: (key) =>
                set((state) => ({
                    settings: {
                        ...state.settings,
                        [key]: !state.settings[key],
                    },
                })),
            setAllSettings: (newSettings) =>
                set((state) => ({
                    settings: {
                        ...state.settings,
                        ...newSettings,
                    },
                })),
        }),
        {
            name: 'user-notification-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)