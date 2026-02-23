"use client"

import setGlobalColorTheme from "@/lib/theme-colors"
import { ThemeProviderProps, useTheme } from "next-themes"
import { createContext, useContext, useEffect, useState } from "react"
import { ThemeColorStateParams, ThemeColors } from "@/types/theme-types"

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams
)

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const { resolvedTheme } = useTheme()

  const [themeColor, setThemeColor] = useState<ThemeColors>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("themeColor") as ThemeColors) || "blue"
    }
    return "blue"
  })

  useEffect(() => {
    if (!resolvedTheme) return

    const mode = resolvedTheme === "dark" ? "dark" : "light"

    localStorage.setItem("themeColor", themeColor)
    setGlobalColorTheme(mode, themeColor)
  }, [themeColor, resolvedTheme])

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  return useContext(ThemeContext)
}