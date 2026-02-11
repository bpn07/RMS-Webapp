import type { MenuItem } from "@/lib/restuarant-data";

export interface CartItem extends MenuItem {
  quantity: number;
  note?: string;
  allergens?: string[];
  options?: Record<string, string>;
}
