import { VoucherPersonalisation } from "@/types/voucher";
import { create } from "zustand";


// Define CartItem locally
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  personalisation: VoucherPersonalisation;
  // Add any other fields you need
};

type CartStore = {
  items: CartItem[];
  addVoucherToCart: (item: CartItem) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addVoucherToCart: (item) => {
    set((state) => ({
      items: [...state.items, item],
    }));
  },
}));
