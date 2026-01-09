"use client"

import * as React from "react"
import { ThemeProviderContext } from "@/contexts/theme-context"
import { IS_DEVELOPMENT } from "@/config/env"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  
  const [theme, setTheme] = React.useState<Theme>(
    () => {
      // In production, force light mode
      if (!IS_DEVELOPMENT) {
        return "light"
      }
      // In development, use stored theme or default
      return (typeof window !== "undefined" && localStorage.getItem(storageKey) as Theme) || defaultTheme
    }
  )

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const root = window.document.documentElement

    const applyTheme = () => {
      root.classList.remove("light", "dark")

      // In production, always use light mode
      if (!IS_DEVELOPMENT) {
        root.classList.add("light")
        return
      }

      // In development, apply theme normally
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light"

        root.classList.add(systemTheme)
      } else {
        root.classList.add(theme)
      }
    }

    applyTheme()

    // Listen for system theme changes (only in development)
    if (IS_DEVELOPMENT && theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => applyTheme()
      
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme])

  const value = {
    theme: IS_DEVELOPMENT ? theme : "light",
    setTheme: (newTheme: Theme) => {
      // Only allow theme changes in development
      if (!IS_DEVELOPMENT) {
        // In production, theme changes are disabled and silently ignored.
        // This is intentional because:
        // 1. The theme toggle UI is already hidden in production (see mode-toggle.tsx)
        // 2. Production builds should always use light mode for consistency
        // 3. No user-facing UI should trigger this in production
        // If you need to debug theme changes, check that NODE_ENV is set to "development"
        return
      }
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, newTheme)
      }
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
