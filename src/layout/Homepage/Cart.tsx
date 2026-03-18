"use client";

import {
  ShoppingBasket,
  Plus,
  Minus,
  X,
  MessageSquare,
  Tag,
  Package,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/hooks/useBasket";
import { restaurantData } from "@/lib/restuarant-data";
import { useState } from "react";
import Link from "next/link";
import { RecommendedItems } from "./RecommendedItems";

export function BasketSidebar() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } =
    useBasket();

  const subtotal = getTotalPrice();
  const deliveryFee = restaurantData.delivery.fee;
  const itemCount = getTotalItems();
  const [notes, setNotes] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [appliedDeals, setAppliedDeals] = useState<string[]>(["SPRING10"]);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [riderTip, setRiderTip] = useState<number>(0);

  const allergens: string[] = [];
  if (items.length === 0) {
    return (
      <div className="sticky top-38 w-full h-fit max-w-full">
        <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-white to-gray-50/50 p-12 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/5 blur-2xl rounded-full" />
              <ShoppingBasket
                className="relative h-20 w-20 text-primary animate-pulse"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-xl font-semibold text-primary mb-1">
                Your basket is empty
              </p>
              <p className="text-sm text-muted-foreground">
                Add items to get started
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="sticky top-38 w-full max-w-full max-h-[calc(100vh-10rem)]"
    >
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .basket-item {
          animation: slideIn 0.3s ease-out forwards;
        }

        .basket-item:hover {
          background: linear-linear(
            to right,
            rgba(0, 204, 188, 0.02),
            transparent
          );
        }

        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
          border-color: #00ccbc;
          box-shadow: 0 0 0 3px rgba(0, 204, 188, 0.1);
        }

        .promo-input:focus {
          border-color: #00ccbc;
        }

        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>

      <div
        className="rounded-2xl border border-gray-200 bg-white overflow-hidden flex flex-col shadow-lg shadow-gray-200/50 max-h-[calc(100vh-10rem)]"
      >
        {/* Basket Header */}
        <div className="p-5 border-b border-gray-100 bg-linear-to-br from-gray-50 to-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <ShoppingBasket
                  className="h-5 w-5 text-white"
                  strokeWidth={2}
                />
              </div>
              <div>
                <h2 className="font-bold text-lg text-primary">Your basket</h2>
                <p className="text-xs text-muted-foreground">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-custom">
          {/* Basket Items */}
          <div className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="px-5 py-2.5 basket-item transition-all duration-200"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs font-medium text-primary">
                      £{item.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-gray-50 rounded-full px-1 py-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 rounded-full hover:bg-white hover:shadow-sm transition-all"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-2.5 w-2.5" />
                    </Button>
                    <span className="font-semibold text-xs w-5 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 rounded-full hover:bg-white hover:shadow-sm transition-all"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                  <span className="font-bold text-sm ml-auto text-gray-900">
                    £{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Optional Recommended Items */}
                <div className="w-full">
                  <RecommendedItems excludeIds={items.map((i) => i.id)} />
                </div>
              </div>
            ))}
          </div>


        </div>

        {/* Totals and Checkout - Fixed at bottom */}
        <div className="py-3 px-5 bg-linear-to-br from-gray-50 to-white border-t border-gray-200 shrink-0 space-y-3">

          {/* Order Details */}
          <div className="border-gray-100 space-y-4 bg-linear-to-b from-gray-50/50 to-white rounded-xl">
            <button
              type="button"
              onClick={() => setOrderDetailsOpen((prev) => !prev)}
              className="w-full flex justify-between items-center text-sm font-bold text-gray-900 mb-2 cursor-pointer group"
            >
              <div className="flex items-center gap-2 group-hover:underline">
                <Package className="h-4 w-4 text-primary" />
                Order Details
              </div>
              <span className="text-primary">{orderDetailsOpen ? <ChevronDown /> : <ChevronUp />}</span>
            </button>

            {orderDetailsOpen && (
              <div className="space-y-4">
                {/* Order Notes */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5 text-primary" />
                    Special Instructions
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any allergies or preferences?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none placeholder:text-gray-400 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    rows={2}
                  />
                </div>

                {/* Allergens */}
                {allergens.length > 0 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-xs font-semibold text-red-800 mb-1">
                      ⚠️ Allergen Alert
                    </p>
                    <p className="text-xs text-red-700">{allergens.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Promo Code or Deals */}
          <div className="pt-3 border-t border-gray-200">
            {appliedDeals.length > 0 ? (
              <div className="p-5 bg-primary-foreground border border-border rounded-xl flex justify-between items-center">
                <div >
                  <p className="text-xs font-semibold text-primary mb-1">✓ Deals Applied</p>
                  <p className="text-xs text-primary">{appliedDeals.join(", ")}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAppliedDeals([])}
                  className="text-red-500 hover:bg-red-100 rounded-full p-1 transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : !showPromoInput ? (
              <button
                type="button"
                onClick={() => setShowPromoInput(true)}
                className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Tag className="h-3.5 w-3.5" />
                Have a promo code?
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm promo-input placeholder:text-gray-400 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={() => {
                    if (promoCode.trim()) {
                      setAppliedDeals([promoCode.trim()]);
                      setShowPromoInput(false);
                      setPromoCode("");
                    }
                  }}
                  className="text-white bg-green-500 hover:bg-green-600 p-1 transition-all cursor-pointer rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPromoInput(false);
                    setPromoCode("");
                  }}
                  className="text-white bg-red-500 hover:bg-red-600 p-1 transition-all cursor-pointer rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>

              </div>
            )}
          </div>

          <div className="pt-3 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>£{deliveryFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm mt-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Rider Tip</span>
                <button
                  type="button"
                  onClick={() => setRiderTip((prev) => Math.max(prev - 1, 0))}
                  className="cursor-pointer h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setRiderTip((prev) => prev + 1)}
                  className="cursor-pointer h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <span className="text-center font-medium">£{riderTip}.00</span>

            </div>
          </div>

          <div className="border-t border-gray-200">
            <div className="flex justify-between items-baseline py-2">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                £{(subtotal + deliveryFee + riderTip).toFixed(2)}
              </span>
            </div>

            <Button
              className="w-full h-12 bg-linear-to-r from-primary to-primary/20 hover:from-primary/5 hover:to-primary/10 text-white font-bold text-base rounded-xl shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
              disabled={
                subtotal < restaurantData.delivery.minimum
              }
            >
              <Link href="/checkout">
                {subtotal < restaurantData.delivery.minimum ?
                  `Minimum order £${restaurantData.delivery.minimum.toFixed(2)}`
                  : "Proceed to Checkout →"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
