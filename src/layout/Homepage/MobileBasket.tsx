"use client";

import { useState } from "react";
import {
  ShoppingBasket,
  X,
  Clock,
  MapPin,
  MessageSquare,
  Tag,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket, BasketItem } from "@/hooks/useBasket";
import { restaurantData } from "@/lib/restuarant-data";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function MobileBasket() {
  const { items, getTotalPrice, getTotalItems, removeItem, updateQuantity } =
    useBasket();

  const [open, setOpen] = useState(false);

  const subtotal = getTotalPrice();
  const itemCount = getTotalItems();
  const deliveryFee = restaurantData.delivery.fee;

  const [orderType, setOrderType] = useState<"delivery" | "collection">(
    "delivery",
  );
  const [slotTime, setSlotTime] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");

  const appliedDeals: string[] = [];
  const allergens: string[] = [];

  if (items.length === 0) return null;

  return (
    <>
      {/* Bottom basket button */}
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

      {/* Sliding basket */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b shrink-0">
              <h2 className="text-lg font-semibold">Your Basket</h2>
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Items */}
              {items.map((item: BasketItem) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b pb-4"
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

              {/* Order Details */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  Order Details
                </h3>

                {/* Delivery / Collection */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderType("delivery")}
                    className={`py-2 rounded-lg text-sm font-medium ${
                      orderType === "delivery"
                        ? "bg-primary text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    onClick={() => setOrderType("collection")}
                    className={`py-2 rounded-lg text-sm font-medium ${
                      orderType === "collection"
                        ? "bg-primary text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    Collection
                  </button>
                </div>

                {/* Time */}
                <div>
                  <label className="text-xs font-semibold flex items-center gap-2 mb-1">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    Preferred Time
                  </label>
                  <input
                    aria-label="time"
                    type="time"
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                {/* Address */}
                {orderType === "delivery" && (
                  <div>
                    <label className="text-xs font-semibold flex items-center gap-2 mb-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Street, City"
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="text-xs font-semibold flex items-center gap-2 mb-1">
                    <MessageSquare className="h-3.5 w-3.5 text-primary" />
                    Special Instructions
                  </label>
                  <textarea
                    aria-label="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    rows={2}
                  />
                </div>

                {/* Promo Code */}
                <div>
                  <label className="text-xs font-semibold flex items-center gap-2 mb-1">
                    <Tag className="h-3.5 w-3.5 text-primary" />
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      aria-label="promo code"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 border rounded-lg px-3 py-2 text-sm"
                    />
                    <Button size="sm">Apply</Button>
                  </div>
                </div>

                {/* Deals Applied */}
                <div className="p-3 bg-muted rounded-lg text-xs">
                  ✓ Deals Applied {appliedDeals.join(", ")}
                </div>

                {/* Allergen Alert */}
                {allergens.length > 0 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                    ⚠️ {allergens.join(", ")}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-3 shrink-0">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>

              {orderType === "delivery" && (
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>£{deliveryFee.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  £
                  {(
                    subtotal + (orderType === "delivery" ? deliveryFee : 0)
                  ).toFixed(2)}
                </span>
              </div>

              <Button
                className="w-full bg-primary hover:bg-[#00b3a6] text-white"
                disabled={
                  subtotal < restaurantData.delivery.minimum &&
                  orderType === "delivery"
                }
              >
                <Link href="/checkout">
                  {subtotal < restaurantData.delivery.minimum &&
                  orderType === "delivery"
                    ? `Minimum order £${restaurantData.delivery.minimum.toFixed(2)}`
                    : "Proceed to Checkout →"}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
