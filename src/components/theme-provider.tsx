"use client"

import * as React from "react"
import { ThemeProviderContext } from "@/contexts/theme-context"

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
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  const [theme, setTheme] = React.useState<Theme>(
    () => {
      // In production, force light mode
      if (!isDevelopment) {
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
      if (!isDevelopment) {
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
    if (isDevelopment && theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => applyTheme()
      
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, isDevelopment])

  const value = {
    theme: isDevelopment ? theme : "light",
    setTheme: (newTheme: Theme) => {
      // Only allow theme changes in development
      if (!isDevelopment) {
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
