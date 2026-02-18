"use client"
import setGlobalColorTheme from "@/lib/theme-colors";
import { ThemeProviderProps, useTheme } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeColorStateParams, ThemeColors } from "@/types/theme-types";

const ThemeContext = createContext<ThemeColorStateParams>({

} as ThemeColorStateParams);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
    const getSavedThemeColor = () => {
        try {
            return (localStorage.getItem("themeColor") as ThemeColors) || "blue";
        } catch {
            return "blue" as ThemeColors
        }
    }

    const [themeColor, setThemeColor] = useState<ThemeColors>(() => getSavedThemeColor());
    const { resolvedTheme: theme } = useTheme();


    useEffect(() => {
        if (!theme) return;
        const mode = theme === "dark" ? "dark" : "light";
        localStorage.setItem("themeColor", themeColor);
        setGlobalColorTheme(mode, themeColor);
        setGlobalColorTheme(theme as "light" | "dark", themeColor);
    }, [themeColor, theme]);



    if (!theme) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeContext.Provider>
    )
}


export function useThemeContext() {
    return useContext(ThemeContext)
}