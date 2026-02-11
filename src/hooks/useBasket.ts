"use client";

import { create } from "zustand";
import type { MenuItem } from "@/lib/restuarant-data";

export interface BasketItem extends MenuItem {
  quantity: number;
}

interface BasketStore {
  items: BasketItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearBasket: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useBasket = create<BasketStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((i) => i.id !== itemId),
        };
      }
      return {
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        ),
      };
    }),
  clearBasket: () => set({ items: [] }),
  getTotalItems: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },
  getTotalPrice: () => {
    const state = get();
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
