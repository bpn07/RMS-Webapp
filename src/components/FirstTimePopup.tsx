"use client";

import { useState, useRef } from "react";
import { X, Calendar, ShoppingBag, Check, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useFirstTimePopup } from "@/hooks/useFirstTimePopup";

const OFFERS = [
  {
    id: "order",
    title: "Order Food 🍔",
    description: "Get your favorite meals delivered fast and fresh to your doorstep.",
    offer: "20% OFF on first order",
    code: "WELCOME20",
    cta: "Order Now",
    photo: "/images/deals/order-deal.jpg",
    enable_online_order: true,
    enable_reservation: false,
  },
  {
    id: "reservation",
    title: "Book a Table 🪑",
    description: "Reserve your table in advance and enjoy a special welcome treat.",
    offer: "Free dessert on booking",
    code: "DINEFREE",
    cta: "Reserve Table",
    photo: "/images/deals/reservation-deal.jpg",
    enable_online_order: false,
    enable_reservation: true,
  },
  {
    id: "dinein",
    title: "Dine-In 🍽️",
    description: "Walk in and enjoy the cozy ambiance with priority seating.",
    offer: "Priority seating available",
    code: null,
    cta: "Explore Menu",
    photo: "/images/deals/dine-deal.jpg",
    enable_online_order: false,
    enable_reservation: false,
  },
];

export function WelcomeModal() {
  const { open, setOpen } = useFirstTimePopup("welcome_offer");
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({ left: width * index, behavior: "smooth" });
    setCurrent(index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-50 max-w-2xl w-full bg-card rounded-2xl shadow-2xl overflow-hidden animate-in fade-in scale-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 rounded-full bg-destructive hover:bg-destructive/50 p-1 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5 text-destructive-foreground" />
        </button>

        {/* Slider */}
        <div ref={sliderRef} className="flex overflow-hidden scroll-smooth w-full">
          {OFFERS.map((item) => (
            <div key={item.id} className="min-w-full flex flex-col md:flex-row">
              {/* Image */}
              {item.photo && (
                <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-100 flex items-center justify-center overflow-hidden">
                  <Image src={item.photo} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-between w-full md:w-1/2 text-foreground">
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
                    Kathmandu - Modern Nepali Experience
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold mt-2 leading-snug">{item.title}</h2>
                  <p className="text-sm mt-2 line-clamp-3 text-muted-foreground">{item.description}</p>
                  <div className="mt-2 text-sm font-medium text-secondary-foreground">{item.offer}</div>
                  {item.code && (
                    <span className="inline-block mt-1 text-xs px-2.5 py-1 rounded-md border border-border">
                      {item.code}
                    </span>
                  )}

                  {/* Features */}
                  <div className="mt-4 space-y-2">
                    {item.enable_online_order && (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm text-secondary-foreground">Order online seamlessly</span>
                      </div>
                    )}
                    {item.enable_reservation && (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm text-secondary-foreground">Reserve your table easily</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3 mt-4">
                  {item.enable_online_order && (
                    <Link href="/order" onClick={() => setOpen(false)}>
                      <Button className="w-full py-2.5 sm:py-3 bg-primary hover:bg-primary-foreground text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2 transition-all">
                        <ShoppingBag className="w-5 h-5" /> {item.cta}
                      </Button>
                    </Link>
                  )}
                  {item.enable_reservation && (
                    <Link href="/reservation" onClick={() => setOpen(false)}>
                      <Button className="w-full py-2.5 sm:py-3 bg-secondary hover:bg-secondary-foreground text-secondary-foreground font-semibold rounded-lg flex items-center justify-center gap-2 transition-all">
                        <Calendar className="w-5 h-5" /> {item.cta}
                      </Button>
                    </Link>
                  )}
                  {!item.enable_online_order && !item.enable_reservation && (
                    <Button className="w-full py-2.5 sm:py-3 bg-muted hover:bg-accent text-foreground font-semibold rounded-lg flex items-center justify-center gap-2 transition-all" onClick={() => setOpen(false)}>
                      {item.cta}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute -bottom-2 right-0 left-0 z-10 flex justify-center gap-2 py-3">
          {OFFERS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 w-2 rounded-full transition-all ${current === i ? "bg-primary w-4" : "bg-muted border"}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button onClick={() => scrollToIndex(Math.max(0, current - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-card border rounded-full p-1 shadow z-10 cursor-pointer">
          <ChevronLeft className="text-primary" />
        </button>
        <button onClick={() => scrollToIndex(Math.min(OFFERS.length - 1, current + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-card border rounded-full p-1 shadow z-10 cursor-pointer">
          <ChevronRight className="text-primary" />
        </button>
      </div>
    </div>
  );
}