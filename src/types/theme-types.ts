type ThemeColors = "blue" | "red" | "orange" | "green"
interface ThemeColorStateParams{
    themeColor: ThemeColors;
    setThemeColor : React.Dispatch<React.SetStateAction<ThemeColors>>
}