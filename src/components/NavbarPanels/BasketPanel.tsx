"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface BasketDrawerProps {
  onClose: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function BasketDrawer({ onClose }: BasketDrawerProps) {
  const cartItems: CartItem[] = [];

  //   const total = cartItems.reduce(
  //     (sum, item) => sum + item.price * item.quantity,
  //     0
  //   );

  return (
    <aside className="fixed top-0 right-0 z-40 h-full w-full sm:w-100 bg-white shadow-xl animate-slideIn flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-semibold">Your Basket</h2>
        <Button variant="ghost" onClick={onClose}>
          <X className="h-5 w-5 text-gray-500" />
        </Button>
      </div>

      {/* Items */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-12">
            Your basket is empty.
          </p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="rounded object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-500">
                  ${item.price} × {item.quantity}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {/* <div className="border-t px-4 py-4">
        <div className="flex justify-between font-medium text-gray-800 mb-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button className="w-full bg-primary hover:bg-[#00b3a9] text-white">
          Checkout
        </Button>
      </div> */}
    </aside>
  );
}
