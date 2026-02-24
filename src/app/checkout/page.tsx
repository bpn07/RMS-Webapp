"use client";

import { useRouter } from "next/navigation";
import { useBasket } from "@/hooks/useBasket";
import { restaurantData } from "@/lib/restuarant-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Truck, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, getTotalItems } = useBasket();

  const subtotal = getTotalPrice();
  const itemCount = getTotalItems();
  const deliveryFee = restaurantData.delivery.fee;

  const orderType: "delivery" | "collection" = "delivery";
  const slotTime = "";
  const address = "";
  const notes = "";

  const total = subtotal + (orderType === "delivery" ? deliveryFee : 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-xl font-semibold mb-4">Your basket is empty</h2>
        <Button onClick={() => router.push("/")}>Go Back to Menu</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <h1 className="text-lg font-bold">
            Checkout ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h1>

          <div />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* LEFT: Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Order Summary
            </h2>

            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        £{item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="font-bold">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
            <h2 className="font-semibold text-lg mb-4">Delivery Details</h2>

            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span className="capitalize">{orderType}</span>
            </div>

            {slotTime && (
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>{slotTime}</span>
              </div>
            )}

            {orderType === "delivery" && address && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{address}</span>
              </div>
            )}

            {notes && (
              <div className="text-sm text-muted-foreground border-t pt-3">
                <strong>Notes:</strong> {notes}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Price Summary */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit space-y-4">
          <h2 className="font-semibold text-lg">Payment Summary</h2>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span>
              {orderType === "delivery" ? `£${deliveryFee.toFixed(2)}` : "Free"}
            </span>
          </div>

          <div className="border-t pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>

          <Button
            className="w-full mt-4 bg-primary hover:bg-[#00b3a6] text-white"
            disabled={
              subtotal < restaurantData.delivery.minimum &&
              orderType === "delivery"
            }
          >
            {subtotal < restaurantData.delivery.minimum &&
            orderType === "delivery"
              ? `Minimum order £${restaurantData.delivery.minimum.toFixed(2)}`
              : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
