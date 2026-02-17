"use client";

import { useState } from "react";
import { ShoppingBasket, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket, BasketItem } from "@/hooks/useBasket";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function MobileBasket() {
  const { items, getTotalPrice, getTotalItems, removeItem, updateQuantity } =
    useBasket();
  const [open, setOpen] = useState(false);

  const subtotal = getTotalPrice();
  const itemCount = getTotalItems();

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile basket button */}
      <Button
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden w-full h-16 rounded-none bg-primary hover:bg-[#00b3a6] text-white flex items-center justify-between px-6"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-3">
          <ShoppingBasket className="h-5 w-5" />
          <span className="font-semibold">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold">View basket</span>
          <span className="font-bold">£{subtotal.toFixed(2)}</span>
        </div>
      </Button>

      {/* Full-screen sliding basket */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Basket</h2>
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="h-8 w-8 p-0 flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Basket items */}
            <div className="p-4 space-y-4">
              {items.map((item: BasketItem) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        £{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="font-medium">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">£{subtotal.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-primary hover:bg-[#00b3a6] text-white">
                Checkout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
