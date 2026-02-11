"use client";

import { ShoppingBasket, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/hooks/useBasket";
import { restaurantData } from "@/lib/restuarant-data";

export function BasketSidebar() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } =
    useBasket();

  const subtotal = getTotalPrice();
  const deliveryFee = restaurantData.delivery.fee;
  const total = subtotal + deliveryFee;
  const itemCount = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="sticky top-34 w-full h-fit max-w-full overflow-hidden">
        <div className="rounded-lg border bg-white p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <ShoppingBasket className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-600">
              Your basket is empty
            </p>
          </div>
        </div>
        <Button
          disabled
          className="w-full mt-4 h-12 bg-gray-300 text-gray-500 hover:bg-gray-300"
        >
          Go to checkout
        </Button>
      </div>
    );
  }

  return (
    <div className="sticky top-30 w-full h-fit">
      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Your basket</h2>
            <span className="text-sm text-muted-foreground">
              {itemCount} items
            </span>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="p-4 border-b last:border-b-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex-1 min-w-0">{item.name}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    £{item.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => removeItem(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-medium text-sm min-w-5 text-center">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <span className="font-medium text-sm ml-auto">
                  £{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery</span>
            <span>£{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-2 border-t">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
          <Button
            className="w-full mt-4 h-12 bg-[#00ccbc] hover:bg-[#00b3a6] text-white"
            disabled={subtotal < restaurantData.delivery.minimum}
          >
            {subtotal < restaurantData.delivery.minimum
              ? `Minimum order £${restaurantData.delivery.minimum.toFixed(2)}`
              : "Go to checkout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
