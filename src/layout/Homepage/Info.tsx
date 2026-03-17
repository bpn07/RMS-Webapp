"use client";

import { useMemo, useState } from "react";
import {
  Star,
  Bike,
  Receipt,
  Truck,
  MapPin,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import Image from "next/image";
import OrderDetailsForm from "./OrderDetailsForm";

type OrderType = "delivery" | "collection" | "dinein";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

interface Props {
  name: string;
  location: string;
  rating: {
    score: number;
    count: string;
  };
  delivery: {
    time: string;
    distance: string;
    fee: number;
    minimum: number;
  };
}

const reviews: Review[] = [
  {
    id: "1",
    name: "John D.",
    rating: 5,
    comment: "Amazing food and service!",
    date: "2025-12-20",
    avatar: "/food.jpg",
  },
  {
    id: "2",
    name: "Sarah K.",
    rating: 4,
    comment: "Very good experience.",
    date: "2025-12-18",
    avatar: "/food.jpg",
  },
];

export default function RestaurantInfo({
  name,
  location,
  rating,
  delivery,
}: Props) {
  const [dialog, setDialog] = useState<null | "reviews" | "order">(null);
  const [step, setStep] = useState<"type" | "details">("type");
  const [orderType, setOrderType] = useState<OrderType>("delivery");

  const avg = useMemo(() => {
    return reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
        <p className="text-sm text-muted-foreground">{location}</p>
      </div>

      {/* QUICK INFO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card onClick={() => setDialog("order")}>
          <div className="flex items-center justify-between">
            {orderType === "delivery" && (
              <Truck className="h-4 w-4 text-primary" />
            )}
            {orderType === "collection" && (
              <Store className="h-4 w-4 text-primary" />
            )}
            {orderType === "dinein" && (
              <MapPin className="h-4 w-4 text-primary" />
            )}
          </div>

          <div className="text-base font-semibold capitalize">
            {orderType}
          </div>
          <p className="text-xs text-muted-foreground">
            Click to change
          </p>
        </Card>

        <Card onClick={() => setDialog("reviews")}>
          <Star className="h-4 w-4 text-yellow-500" />
          <div className="text-base font-semibold">
            {rating.score.toFixed(1)}
          </div>
          <p className="text-xs text-muted-foreground">
            {rating.count} reviews
          </p>
        </Card>

        <Card>
          <Bike className="h-4 w-4 text-primary" />
          <div className="text-base font-semibold">
            {delivery.time}
          </div>
          <p className="text-xs text-muted-foreground">
            {delivery.distance}
          </p>
        </Card>

        <Card>
          <Receipt className="h-4 w-4 text-primary" />
          <div className="text-base font-semibold">
            ${delivery.fee}
          </div>
          <p className="text-xs text-muted-foreground">
            Delivery fee
          </p>
        </Card>
      </div>

      {/* ACTIONS
      <div className="flex gap-3">
        <Button className="flex-1">Start Order</Button>
        <Button variant="outline" className="flex-1 gap-2">
          <Users className="h-4 w-4" /> Group Order
        </Button>
      </div> */}

      {/* REVIEWS */}
      <Dialog open={dialog === "reviews"} onOpenChange={() => setDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reviews</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-semibold">{avg.toFixed(1)}</span>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {reviews.map((r) => (
              <div key={r.id} className="flex gap-3">
                <Image
                  src={r.avatar || "/placeholder.svg"}
                  alt={r.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {r.comment}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(r.date), "dd MMM")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ORDER MODAL */}
      <Dialog
        open={dialog === "order"}
        onOpenChange={(open) => {
          if (!open) {
            setStep("type");
          }
          setDialog(open ? "order" : null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {step === "type" ? "Order Type" : "Order Details"}
            </DialogTitle>
          </DialogHeader>

          {/* STEP 1 */}
          {step === "type" && (
            <>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "delivery", icon: Truck },
                  { key: "collection", icon: Store },
                  { key: "dinein", icon: MapPin },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setOrderType(item.key as OrderType)}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition ${orderType === item.key
                      ? "bg-primary text-white"
                      : "hover:bg-muted"
                      }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="capitalize text-sm">{item.key}</span>
                  </button>
                ))}
              </div>

              <Button
                className="w-full mt-4"
                onClick={() => setStep("details")}
              >
                Continue
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {step === "details" && (
            <OrderDetailsForm
              orderType={orderType}
              onConfirm={() => {
                setStep("type");
                setDialog(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Card({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-2xl bg-white border shadow-sm hover:shadow-md transition text-left space-y-1"
    >
      {children}
    </button>
  );
}
