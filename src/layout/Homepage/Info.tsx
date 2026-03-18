// Modernized Modals & Layout
import { useMemo, useState } from "react";
import {
  Star,
  Bike,
  Truck,
  MapPin,
  Store,
  Info,
  CheckCircle,
  AlertTriangle,
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
    address: string;
    time: string;
    distance: string;
    fee: number;
    minimum: number;
  };
}

const reviews: Review[] = [
  { id: "1", name: "John D.", rating: 5, comment: "Amazing food and service!", date: "2025-12-20", avatar: "/food.jpg" },
  { id: "2", name: "Sarah K.", rating: 4, comment: "Very good experience.", date: "2025-12-18", avatar: "/food.jpg" },
];

export default function RestaurantInfo({ name, location, rating, delivery }: Props) {
  const [dialog, setDialog] = useState<null | "reviews" | "order" | "deliveryInfo" | "allergens">(null);
  const [step, setStep] = useState<"type" | "details">("type");
  const [orderType, setOrderType] = useState<OrderType>("delivery");

  const avg = useMemo(() => reviews.reduce((a, b) => a + b.rating, 0) / reviews.length, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-sm text-muted-foreground">{location}</p>
      </div>

      {/* QUICK INFO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card onClick={() => setDialog("order")}>
          <div className="flex items-center gap-2">
            {orderType === "delivery" && <Truck className="h-5 w-5 text-primary" />}
            {orderType === "collection" && <Store className="h-5 w-5 text-primary" />}
            {orderType === "dinein" && <MapPin className="h-5 w-5 text-primary" />}
            <span className="text-base font-semibold capitalize">{orderType}</span>
          </div>
          <p className="text-xs text-muted-foreground">Click to change</p>
        </Card>

        <Card onClick={() => setDialog("reviews")}>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-semibold">{rating.score.toFixed(1)}</span>
          </div>
          <p className="text-xs text-muted-foreground">{rating.count} reviews</p>
        </Card>

        <Card onClick={() => setDialog("deliveryInfo")}>
          <div className="flex items-center gap-2">
            <Bike className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold">{delivery.time}</span>
          </div>
          <p className="text-xs text-muted-foreground">{delivery.distance} • Fee: ${delivery.fee}</p>
        </Card>

        <Card onClick={() => setDialog("allergens")}>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold">Allergens & Hygiene</span>
          </div>
          <p className="text-xs text-muted-foreground">Click for more info</p>
        </Card>
      </div>

      {/* REVIEWS MODAL */}
      <Dialog open={dialog === "reviews"} onOpenChange={() => setDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Reviews</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2 mb-4">
            <Star className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-bold">{avg.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {reviews.map((r) => (
              <div key={r.id} className="flex gap-3 bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="w-14 h-14 overflow-hidden rounded-full">
                  <Image src={r.avatar || "/placeholder.svg"} alt={r.name} width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{r.name}</p>
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">{r.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.comment}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(r.date), "dd MMM yyyy")}</p>
                </div>
              </div>
            ))}
          </div>

          <Button className="mt-4 w-full" onClick={() => setDialog(null)}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* DELIVERY INFO MODAL */}
      <Dialog open={dialog === "deliveryInfo"} onOpenChange={() => setDialog(null)}>
        <DialogContent className="max-w-md space-y-4">
          <DialogHeader>
            <DialogTitle>Delivery Information</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-2">
            <InfoRow label="Address" value={delivery.address} />
            <InfoRow label="Distance" value={delivery.distance} />
            <InfoRow label="Estimated Time" value={delivery.time} />
            <InfoRow label="Delivery Fee" value={`$${delivery.fee}`} />
            <InfoRow label="Minimum Order" value={`$${delivery.minimum}`} />
          </div>

          <Button className="mt-4 w-full" onClick={() => setDialog(null)}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* ALLERGENS & HYGIENE MODAL */}
      <Dialog open={dialog === "allergens"} onOpenChange={() => setDialog(null)}>
        <DialogContent className="max-w-md space-y-4">
          <DialogHeader>
            <DialogTitle>Allergens & Hygiene</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <p className="font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Common Allergens
            </p>
            <ul className="grid grid-cols-2 gap-1 list-disc list-inside text-sm text-muted-foreground">
              {["Gluten", "Crustaceans", "Eggs", "Fish", "Peanuts", "Soybeans", "Milk", "Tree nuts", "Celery", "Mustard", "Sesame seeds", "Sulphur dioxide", "Lupin", "Molluscs"].map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> Hygiene Rating
            </p>
            <p>5/5 (FSA standard)</p>
            <p className="text-xs text-muted-foreground">
              This rating follows the Food Standards Agency (FSA) hygiene guidelines for safe food handling.
            </p>
          </div>

          <Button className="mt-4 w-full" onClick={() => setDialog(null)}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* ORDER MODAL */}
      <Dialog open={dialog === "order"} onOpenChange={(open) => {
        if (!open) setStep("type");
        setDialog(open ? "order" : null);
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{step === "type" ? "Select Order Type" : "Enter Details"}</DialogTitle>
          </DialogHeader>

          {step === "type" ? (
            <div className="grid grid-cols-3 gap-3">
              {["delivery", "collection", "dinein"].map((type) => {
                const Icon = type === "delivery" ? Truck : type === "collection" ? Store : MapPin;
                return (
                  <button
                    key={type}
                    onClick={() => setOrderType(type as OrderType)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition ${orderType === type ? "bg-primary text-white" : "hover:bg-muted"
                      }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="capitalize">{type}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <OrderDetailsForm
              orderType={orderType}
              onConfirm={() => {
                setStep("type");
                setDialog(null);
              }}
            />
          )}

          {step === "type" && (
            <Button className="w-full mt-4" onClick={() => setStep("details")}>Continue</Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="font-medium">{label}</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}

function Card({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-2xl bg-white border shadow-sm hover:shadow-md transition text-left space-y-1"
    >
      {children}
    </button>
  );
}