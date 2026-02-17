"use client"

import React from "react"
import ThemeDataProvider from "@/context/theme-data-provider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Footer } from "@/layout/MainLayout/Footer"
import { Navbar } from "@/layout/MainLayout/Navbar"


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <ThemeDataProvider>
                {/* <Toaster /> */}
                <Navbar />
                {children}
                <Footer />
            </ThemeDataProvider>
        </NextThemesProvider>
    )
}

export default MainLayout
