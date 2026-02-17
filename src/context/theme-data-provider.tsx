"use client"
import FullPageLoader from "@/components/FullPageLoader";
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
    const [isLoading, setIsLoading] = useState(false);
    const { resolvedTheme: theme } = useTheme();

    useEffect(() => {
        if (!theme) return;
        const mode = theme === "dark" ? "dark" : "light";
        setIsLoading(true)
        localStorage.setItem("themeColor", themeColor);
        setGlobalColorTheme(mode, themeColor);
        setGlobalColorTheme(theme as "light" | "dark", themeColor);

        const timer = setTimeout(() => {
            setIsLoading(false);
            setIsMounted(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, [themeColor, theme]);

    if (!isMounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
            {isLoading && <FullPageLoader />}
            {children}
        </ThemeContext.Provider>
    )
}


export function useThemeContext() {
    return useContext(ThemeContext)
}