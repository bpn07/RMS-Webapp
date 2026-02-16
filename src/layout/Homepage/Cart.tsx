"use client";

import {
  ShoppingBasket,
  Plus,
  Minus,
  X,
  Clock,
  MapPin,
  MessageSquare,
  Tag,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/hooks/useBasket";
import { restaurantData } from "@/lib/restuarant-data";
import { useState } from "react";

export function BasketSidebar() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } =
    useBasket();

  const subtotal = getTotalPrice();
  const deliveryFee = restaurantData.delivery.fee;
  const itemCount = getTotalItems();

  const [orderType, setOrderType] = useState<"delivery" | "collection">(
    "delivery",
  );
  const [slotTime, setSlotTime] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [allergens, setAllergens] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedDeals, setAppliedDeals] = useState<string[]>([]);

  if (items.length === 0) {
    return (
      <div className="sticky top-34 w-full h-fit max-w-full">
        <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-white to-gray-50/50 p-12 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-[#00ccbc]/20 to-[#00b3a6]/20 blur-2xl rounded-full" />
              <ShoppingBasket
                className="relative h-20 w-20 text-gray-300"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800 mb-1">
                Your basket is empty
              </p>
              <p className="text-sm text-gray-500">Add items to get started</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="sticky top-30 w-full max-w-full"
      style={{ maxHeight: "calc(100vh - 8rem)" }}
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
        className="rounded-2xl border border-gray-200 bg-white overflow-hidden flex flex-col shadow-lg shadow-gray-200/50"
        style={{ maxHeight: "calc(100vh - 8rem)" }}
      >
        {/* Basket Header */}
        <div className="p-5 border-b border-gray-100 bg-linear-to-br from-gray-50 to-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-linear-to-br from-[#00ccbc] to-[#00b3a6] flex items-center justify-center shadow-sm">
                <ShoppingBasket
                  className="h-5 w-5 text-white"
                  strokeWidth={2}
                />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">Your basket</h2>
                <p className="text-xs text-gray-500">
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
                className="p-5 basket-item transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-sm font-medium text-[#00ccbc] mt-1">
                      £{item.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white hover:shadow-sm transition-all"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="font-semibold text-sm min-w-7 text-center text-gray-900">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white hover:shadow-sm transition-all"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <span className="font-bold text-sm ml-auto text-gray-900">
                    £{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Options */}
          <div className="p-5 border-t border-gray-100 space-y-4 bg-linear-to-b from-gray-50/50 to-white">
            <h3 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-[#00ccbc]" />
              Order Details
            </h3>

            {/* Delivery / Collection */}
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-2 flex uppercase tracking-wide">
                Order Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOrderType("delivery")}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    orderType === "delivery"
                      ? "bg-linear-to-br from-[#00ccbc] to-[#00b3a6] text-white shadow-md shadow-[#00ccbc]/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setOrderType("collection")}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    orderType === "collection"
                      ? "bg-linear-to-br from-[#00ccbc] to-[#00b3a6] text-white shadow-md shadow-[#00ccbc]/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Collection
                </button>
              </div>
            </div>

            {/* Slot Time */}
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-2  uppercase tracking-wide flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#00ccbc]" />
                Preferred Time
              </label>
              <input
                aria-label="time"
                type="time"
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm transition-all focus:border-[#00ccbc] focus:ring-2 focus:ring-[#00ccbc]/20"
              />
            </div>

            {/* Delivery Address */}
            {orderType === "delivery" && (
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2  uppercase tracking-wide flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#00ccbc]" />
                  Delivery Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Street, City, Postcode"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder:text-gray-400 transition-all focus:border-[#00ccbc] focus:ring-2 focus:ring-[#00ccbc]/20"
                />
              </div>
            )}

            {/* Order Notes */}
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-2  uppercase tracking-wide flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5 text-[#00ccbc]" />
                Special Instructions
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any allergies or preferences?"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none placeholder:text-gray-400 transition-all focus:border-[#00ccbc] focus:ring-2 focus:ring-[#00ccbc]/20"
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

            {/* Promo Code */}
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-2  uppercase tracking-wide flex items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-[#00ccbc]" />
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm promo-input placeholder:text-gray-400 transition-all focus:border-[#00ccbc] focus:ring-2 focus:ring-[#00ccbc]/20"
                />
                <Button className="h-auto px-5 py-2.5 text-sm font-semibold bg-linear-to-br from-[#00ccbc] to-[#00b3a6] hover:from-[#00b3a6] hover:to-[#009e92] rounded-xl shadow-sm transition-all">
                  Apply
                </Button>
              </div>
            </div>

            {/* Applied Deals */}
            {appliedDeals.length > 0 && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-xs font-semibold text-green-800 mb-1">
                  ✓ Deals Applied
                </p>
                <p className="text-xs text-green-700">
                  {appliedDeals.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Totals and Checkout - Fixed at bottom */}
        <div className="p-5 bg-linear-to-br from-gray-50 to-white border-t border-gray-200 shrink-0 space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Fee</span>
              <span className="font-medium">
                {orderType === "delivery"
                  ? `£${deliveryFee.toFixed(2)}`
                  : "Free"}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                £
                {(
                  subtotal + (orderType === "delivery" ? deliveryFee : 0)
                ).toFixed(2)}
              </span>
            </div>

            <Button
              className="w-full h-12 bg-linear-to-r from-[#00ccbc] to-[#00b3a6] hover:from-[#00b3a6] hover:to-[#009e92] text-white font-bold text-base rounded-xl shadow-lg shadow-[#00ccbc]/30 transition-all hover:shadow-xl hover:shadow-[#00ccbc]/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
              disabled={
                subtotal < restaurantData.delivery.minimum &&
                orderType === "delivery"
              }
            >
              {subtotal < restaurantData.delivery.minimum &&
              orderType === "delivery"
                ? `Minimum order £${restaurantData.delivery.minimum.toFixed(2)}`
                : "Proceed to Checkout →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
