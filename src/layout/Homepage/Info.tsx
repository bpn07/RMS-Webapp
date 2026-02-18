"use client";

import { useMemo, useState } from "react";
import {
  Star,
  Info,
  Bike,
  Receipt,
  Users,
  ChevronRight,
  Truck,
  MapPin,
  Store,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import Image from "next/image";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
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
  {
    id: "3",
    name: "Michael P.",
    rating: 5,
    comment: "Loved it, highly recommend!",
    date: "2025-12-15",
    avatar: "/food.jpg",
  },
];

type DialogKey = "allergens" | "delivery" | "pricing" | "reviews" | null;

interface RestaurantInfoProps {
  name: string;
  location: string;
  rating: {
    score: number;
    label: string;
    count: string;
  };
  delivery: {
    time: string;
    distance: string;
    fee: number;
    minimum: number;
  };
}

function InfoRow({
  icon: Icon,
  children,
  onClick,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-left w-full group transition-all hover:opacity-90 cursor-pointer"
    >
      <Icon className="h-5 w-5 text-muted-foreground transition-all duration-200 group-hover:scale-105 group-hover:text-primary" />

      <span className="flex-1 transition-colors duration-200 group-hover:text-primary">
        {children}
      </span>

      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
    </button>
  );
}

/* ================= MAIN ================= */

export function RestaurantInfo({
  name,
  location,
  rating,
  delivery,
}: RestaurantInfoProps) {
  const [activeDialog, setActiveDialog] = useState<DialogKey>(null);
  const [sortBy, setSortBy] = useState<"latest" | "highest" | "lowest">(
    "latest",
  );

  const addresses: string[] = [
    "123 Baker Street, London",
    "45 Oxford Road, Manchester",
    "10 Downing Street, London",
    "1 High Street, Birmingham",

  ];

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

  const generateTimeSlots = () => {
    const slots: string[] = [];
    const now = new Date();
    now.setSeconds(0, 0);
    let hour = now.getHours();
    let minutes = Math.ceil(now.getMinutes() / 15) * 15;

    for (let i = 0; i < 48; i++) {
      // 12 hours ahead
      if (minutes >= 60) {
        minutes = 0;
        hour++;
      }
      const h = hour % 24;
      const m = minutes;
      const formatted = `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}`;
      slots.push(formatted);
      minutes += 15;
    }
    return slots;
  };

  const timeOptions = generateTimeSlots();
  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);

  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (sortBy === "latest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return 0;
    });
  }, [sortBy]);

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const handleClose = (open: boolean) => !open && setActiveDialog(null);

  return (
    <>
      <div className="space-y-4">
        {/* Restaurant Name */}
        <h1 className="text-3xl font-bold text-foreground">
          {name} - {location}
        </h1>

        {/* Rating */}
        <InfoRow icon={Star} onClick={() => setActiveDialog("reviews")}>
          <div className="flex items-center gap-2">
            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`h-4 w-4 ${idx < Math.round(rating.score)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>

            {/* Score */}
            <span className="font-semibold">{rating.score.toFixed(1)}</span>

            {/* Reviews count */}
            <span className="text-sm text-muted-foreground">
              ({rating.count})
            </span>
          </div>
        </InfoRow>

        {/* Allergens */}
        <InfoRow icon={Info} onClick={() => setActiveDialog("allergens")}>
          Allergens and info
        </InfoRow>

        {/* Delivery */}
        <InfoRow icon={Bike} onClick={() => setActiveDialog("delivery")}>
          Deliver in {delivery.time} · {delivery.distance}
        </InfoRow>

        {/* Pricing */}
        <InfoRow icon={Receipt} onClick={() => setActiveDialog("pricing")}>
          {delivery.fee} delivery · {delivery.minimum} minimum · Fees apply
        </InfoRow>

        {/* Group Order */}
        <Button
          variant="ghost"
          className="gap-2 text-primary hover:text-primary hover:bg-primary-foreground p-0"
        >
          <Users className="h-5 w-5" />
          <span className="font-medium">Start group order</span>
        </Button>
      </div>

      <Dialog open={activeDialog === "allergens"} onOpenChange={handleClose}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Allergens & Store Information</DialogTitle>
            <DialogDescription>
              Important dietary, hygiene, and contact details for our customers
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <section className="space-y-3">
              <h4 className="font-semibold text-sm">
                Allergens & Dietary Information
              </h4>

              <p className="text-sm text-muted-foreground">
                This store provides comprehensive allergen information for
                customers with dietary restrictions or allergies.
              </p>

              <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-4">
                <li>Milk and dairy products</li>
                <li>Eggs</li>
                <li>Fish and shellfish</li>
                <li>Tree nuts and peanuts</li>
                <li>Wheat and gluten</li>
                <li>Soy</li>
              </ul>
            </section>

            <hr />

            <section className="space-y-3">
              <h4 className="font-semibold text-sm">Find Us</h4>

              <p className="text-sm text-muted-foreground">
                Visit us at our physical location.
              </p>

              <div className="w-full h-48 rounded-md overflow-hidden border">
                <iframe
                  title="Store Location"
                  src="https://www.google.com/maps?q=London&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </section>

            <hr />

            <section className="space-y-3">
              <h4 className="font-semibold text-sm">Food Hygiene Rating</h4>

              <p className="text-sm text-muted-foreground">
                We maintain high hygiene and food safety standards.
              </p>

              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐️⭐️⭐️⭐️⭐️</span>
                <span className="text-sm font-medium">5 / 5 – Excellent</span>
              </div>

              <p className="text-xs text-muted-foreground">
                Rated by the local food safety authority.
              </p>
            </section>

            <hr />

            <section className="space-y-3">
              <h4 className="font-semibold text-sm">Contact Us</h4>

              <p className="text-sm text-muted-foreground">
                Have questions about allergens or your order?
              </p>

              <div className="text-sm">
                <p className="font-medium">📞 Phone</p>
                <a href="tel:+441234567890" className="text-primary underline">
                  +44 1234 567 890
                </a>
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "delivery"} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Select order type, time, and address
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* ORDER TYPE */}
            <div className="flex gap-2">
              <Button
                variant={orderType === "delivery" ? "default" : "outline"}
                className="flex-1 gap-2"
                onClick={() => setOrderType("delivery")}
              >
                <Truck className="h-4 w-4" />
                Delivery
              </Button>

              <Button
                variant={orderType === "pickup" ? "default" : "outline"}
                className="flex-1 gap-2"
                onClick={() => setOrderType("pickup")}
              >
                <Store className="h-4 w-4" />
                Pickup
              </Button>
            </div>

            {/* TIME SELECTION */}
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">{selectedTime}</p>
                  <p className="text-sm text-muted-foreground">
                    {orderType === "delivery" ? "Delivery time" : "Pickup time"}
                  </p>
                </div>
              </div>

              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-auto">
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ADDRESS SELECTION */}
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <p className="font-semibold">
                    {orderType === "delivery"
                      ? "Delivery Address"
                      : "Pickup Address"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Choose your address
                  </p>
                </div>
              </div>

              <Select
                value={selectedAddress}
                onValueChange={setSelectedAddress}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select address" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-auto">
                  {addresses.map((addr) => (
                    <SelectItem key={addr} value={addr}>
                      {addr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ADDRESS SELECTION */}
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <p className="font-semibold">
                    {orderType === "delivery"
                      ? "Delivery Address"
                      : "Pickup Address"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Choose your address
                  </p>
                </div>
              </div>

              <Select
                value={selectedAddress}
                onValueChange={setSelectedAddress}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select address" />
                </SelectTrigger>
                <SelectContent>
                  {addresses.map((addr) => (
                    <SelectItem key={addr} value={addr}>
                      {addr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full mt-4">Confirm</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "pricing"} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pricing & Fees</DialogTitle>
            <DialogDescription>
              Delivery costs and order requirements
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Delivery Fee</span>
                <span className="font-semibold">{delivery.fee}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Minimum Order</span>
                <span className="font-semibold">{delivery.minimum}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Additional Fees</h4>
              <p className="text-sm text-muted-foreground">
                Service fees may apply during peak hours. Small order fees apply
                for orders under the minimum.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "reviews"} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Reviews</DialogTitle>
          </DialogHeader>

          {/* Average rating */}
          <div className="flex items-center gap-2 mt-2 mb-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`h-5 w-5 ${idx < Math.round(averageRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
                  }`}
              />
            ))}
            <span className="font-semibold">
              {averageRating.toFixed(1)} / 5
            </span>
          </div>

          {/* Sort / Filter */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={sortBy === "latest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("latest")}
            >
              Latest
            </Button>
            <Button
              variant={sortBy === "highest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("highest")}
            >
              Highest
            </Button>
            <Button
              variant={sortBy === "lowest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("lowest")}
            >
              Lowest
            </Button>
          </div>

          {/* Reviews list */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border p-3 rounded-lg bg-gray-50">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative w-10 h-10 shrink-0">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      fill
                      sizes="40px"
                      className="rounded-full object-cover border"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{review.name}</p>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`h-4 w-4 ${idx < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      {review.comment}
                    </p>

                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(review.date), "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
