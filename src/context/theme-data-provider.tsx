"use client"
import setGlobalColorTheme from "@/lib/theme-colors";
import { ThemeProviderProps, useTheme } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext<ThemeColorStateParams>({

} as ThemeColorStateParams);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
    const getSavedThemeColor = () => {
        try {
            return (localStorage.getItem("themeColor") as ThemeColors) || "blue";
        } catch (error) {
            "blue" as ThemeColors
        }
    }

    const [themeColor, setThemeColor] = useState<ThemeColors>(getSavedThemeColor() as ThemeColors);
    const [isMounted, setIsMounted] = useState(false);
    const { resolvedTheme: theme } = useTheme();
    const mode = theme === "dark" ? "dark" : "light";

    useEffect(() => {
        if (!theme) return;

        setGlobalColorTheme(mode, themeColor);
        setGlobalColorTheme(theme as "light" | "dark", themeColor);
        setIsMounted(true);
    }, [themeColor, theme]);

    if (!isMounted) {
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