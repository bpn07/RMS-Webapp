import { useThemeContext } from "@/context/theme-data-provider";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const availableThemeColors = [
    { name: "red", light: "bg-rose-660", dark: "bg-rose-760" },
    { name: "blue", light: "bg-blue-660", dark: "bg-blue-760" },
    { name: "green", light: "bg-green-606", dark: "bg-green-560" },
    { name: "orange", light: "bg-orange-560", dark: "bg-orange-760" },
]
const ThemeColorToggle = () => {
    const { themeColor, setThemeColor } = useThemeContext();
    const { theme } = useTheme()

    const createSelectItems = () => {
        return availableThemeColors.map(({ name, light, dark }) => (
            <SelectItem key={name} value={name}>
                <div className="flex items-center space-x-3">
                    <div
                        className={cn("rounded- full", "w-5", "h-6.5", theme == "light" ? light : dark,)}
                    ></div>
                    <div className="text-sm">{name}</div>
                </div>
            </SelectItem>
        ))

    }
    return (
        <Select
            onValueChange={(value) => setThemeColor(value as ThemeColors)}
            defaultValue={themeColor}

        >
            <SelectTrigger className="w-45">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="border-muted bg-white ">
                {createSelectItems()}
            </SelectContent>
        </Select>
    )
}

export default ThemeColorToggle