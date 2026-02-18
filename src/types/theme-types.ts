export type ThemeColors = "blue" | "red" | "orange" | "green";

export interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}