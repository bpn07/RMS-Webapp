"use client";

import { useMemo, useState } from "react";
import "react-day-picker/dist/style.css";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/DatePicker";
import Image from "next/image";

const PREORDER_ITEMS = [
  { id: "laphing", name: "Laphing", price: 180, image: "/food.jpg" },
  { id: "pizza", name: "Mragertia Pizza", price: 450, image: "/food.jpg" },
  { id: "chowmein", name: "Egg Chowmein", price: 220, image: "/food.jpg" },
];

const OPENING_TIME = "10:00";
const CLOSING_TIME = "22:00";
const SLOT_INTERVAL = 15;
const SLOTS_PER_PAGE = 6;

function generateTimeSlots() {
  const slots: string[] = [];
  const [openH, openM] = OPENING_TIME.split(":").map(Number);
  const [closeH, closeM] = CLOSING_TIME.split(":").map(Number);
  let current = openH * 60 + openM;
  const end = closeH * 60 + closeM;
  while (current <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    current += SLOT_INTERVAL;
  }
  return slots;
}

export default function ReservationPage() {
  const [people, setPeople] = useState<number | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [agree, setAgree] = useState(false);
  const [preOrderEnabled, setPreOrderEnabled] = useState(false);
  const [preOrderOpen, setPreOrderOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    { id: string; quantity: number }[]
  >([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const getQuantity = (id: string) =>
    selectedItems.find((item) => item.id === id)?.quantity || 0;

  const increase = (id: string) => {
    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists)
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      return [...prev, { id, quantity: 1 }];
    });
  };

  const decrease = (id: string) => {
    setSelectedItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const [slotPage, setSlotPage] = useState(0);
  const totalPages = Math.ceil(timeSlots.length / SLOTS_PER_PAGE);
  const visibleSlots = timeSlots.slice(
    slotPage * SLOTS_PER_PAGE,
    slotPage * SLOTS_PER_PAGE + SLOTS_PER_PAGE,
  );

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!people || !date || !time) {
      setAlertType("error");
      setAlertMessage("Please fill all required fields.");
      setAlertOpen(true);
      return;
    }
    if (preOrderEnabled && selectedItems.length === 0) {
      setPreOrderOpen(true);
      return;
    }
    setAlertType("success");
    setAlertMessage(
      `Table for ${people} people\nDate: ${date}\nTime: ${time}\n${preOrderEnabled ? `Pre-order: ${selectedItems.map((i) => i.id).join(", ")}` : "No pre-order"}`,
    );
    setAlertOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* FULL-BLEED HERO IMAGE */}
      <div className="max-w-6xl mx-auto px-6 mt-4 mb-10">
        <div className="relative w-full h-85 md:h-115 rounded-3xl overflow-hidden bg-gray-100">
          <Image
            src="/food.jpg"
            alt="Restaurant ambiance"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

          {/* Hero text on image */}
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/90 mb-3 bg-white/10 backdrop-blur-sm inline-block px-3 py-1 rounded-full border border-white/20">
              Table Reservation
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mt-2">
              Reserve
              <br />
              <span className="text-primary">Your Table</span>
            </h1>
          </div>

          {/* Stats badge top-right */}
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-lg hidden md:flex gap-6">
            {[
              { value: "2 min", label: "To book" },
              { value: "0 wait", label: "Arrival" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-black text-primary leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row — mobile fallback + full row */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-3 gap-6 pt-2 border-t border-gray-100">
          {[
            { value: "2 min", label: "To reserve" },
            { value: "0 wait", label: "On arrival" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-2xl font-black text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid lg:grid-cols-5 gap-10">
        {/* LEFT — perks */}
        <div className="lg:col-span-2 space-y-4">
          {/* ATMOSPHERE IMAGE */}
          <div className="relative w-full h-52 rounded-3xl overflow-hidden bg-gray-100">
            <Image
              src="/food.jpg"
              alt="Restaurant interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-black text-lg leading-tight drop-shadow">
                Dine in
                <br />
                style
              </p>
            </div>
          </div>

          {/* FOOD STRIP — 3 small images */}
          <div className="grid grid-cols-3 gap-2">
            {["/food.jpg", "/food.jpg", "/food.jpg"].map((src, i) => (
              <div
                key={i}
                className="relative h-20 rounded-2xl overflow-hidden bg-gray-100"
              >
                <Image
                  src={src}
                  alt={`Featured dish ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Why choose us */}
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-7 space-y-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              Why people love it
            </p>
            <div className="space-y-3">
              {["No waiting time", "Faster service", "Pre-order meals"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100 shadow-xs"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      {item}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        />
                      </svg>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Offers */}
          <div className="rounded-3xl bg-primary p-7 text-white space-y-1">
            <p className="text-xs font-semibold tracking-widest uppercase opacity-70">
              Early Bird
            </p>
            <p className="text-xl font-black">20% off</p>
            <p className="text-sm opacity-80">Pre-orders before 6 PM</p>
          </div>

          <div className="rounded-3xl border border-primary/20 p-7 space-y-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              Weekend Special
            </p>
            <p className="text-xl font-black text-gray-900">Free dessert</p>
            <p className="text-sm text-muted-foreground">For tables of 4+</p>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="lg:col-span-3 lg:sticky lg:top-10 h-fit">
          <div className="rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 p-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-6">
              Book a table
            </p>

            <form onSubmit={handleReservation} className="space-y-6">
              {/* GUESTS */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                  Number of Guests
                </Label>
                <Select
                  value={people ? String(people) : undefined}
                  onValueChange={(value) => setPeople(Number(value))}
                >
                  <SelectTrigger className="w-full h-12 rounded-2xl border-gray-200 bg-gray-50 text-sm focus:ring-primary focus:border-primary">
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="max-h-60 overflow-y-auto">
                      {Array.from({ length: 200 }, (_, i) => i + 1).map(
                        (num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} {num === 1 ? "guest" : "guests"}
                          </SelectItem>
                        ),
                      )}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              {/* DATE */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                  Date
                </Label>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  disabled={{ before: new Date() }}
                  placeholder="Pick a date"
                />
              </div>

              {/* TIME */}
              <div className="space-y-3">
                <Label className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                  Select Time
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {visibleSlots.map((slot) => {
                    const isSelected = time === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`h-11 rounded-2xl text-sm font-semibold border transition-all duration-150
                          ${
                            isSelected
                              ? "bg-primary text-white border-primary shadow-md shadow-primary/20 scale-[1.02]"
                              : "bg-gray-50 border-gray-100 text-gray-700 hover:border-primary/40 hover:bg-primary/5"
                          }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    disabled={slotPage === 0}
                    onClick={() => setSlotPage((p) => p - 1)}
                    className="text-xs font-semibold text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:underline"
                  >
                    ← Prev
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {slotPage + 1} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={slotPage === totalPages - 1}
                    onClick={() => setSlotPage((p) => p + 1)}
                    className="text-xs font-semibold text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:underline"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* PRE-ORDER */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={preOrderEnabled}
                    onCheckedChange={(v) => {
                      const enabled = Boolean(v);
                      setPreOrderEnabled(enabled);
                      if (!enabled) setSelectedItems([]);
                    }}
                    className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Pre-order food
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Save time by ordering in advance
                    </p>
                  </div>
                </div>

                {preOrderEnabled && (
                  <button
                    type="button"
                    onClick={() => setPreOrderOpen(true)}
                    className="w-full h-10 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors duration-150"
                  >
                    {selectedItems.length > 0
                      ? `Edit Selection · ${selectedItems.length} item(s)`
                      : "Browse & Add Items"}
                  </button>
                )}
              </div>

              {/* AGREE */}
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={agree}
                  onCheckedChange={(v) => setAgree(Boolean(v))}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label className="text-xs text-muted-foreground cursor-pointer select-none">
                  I agree to the{" "}
                  <span className="text-primary font-medium underline underline-offset-2">
                    terms & conditions
                  </span>
                </label>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={!agree}
                className="w-full h-13 py-3.5 rounded-2xl bg-primary text-white text-sm font-bold tracking-wide
                  shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                  transition-all duration-200 active:scale-[0.98]"
              >
                Confirm Reservation →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* PRE-ORDER DIALOG */}
      <Dialog open={preOrderOpen} onOpenChange={setPreOrderOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              Pre-order
            </p>
            <DialogTitle className="text-xl font-black text-gray-900">
              Select Your Meals
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            {PREORDER_ITEMS.map((item) => {
              const quantity = getQuantity(item.id);
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 rounded-2xl p-4 border transition-colors
                    ${quantity > 0 ? "border-primary/30 bg-primary/5" : "border-gray-100 bg-gray-50"}`}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-100 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      height={56}
                      width={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-primary font-semibold mt-0.5">
                      Rs {item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => decrease(item.id)}
                      disabled={quantity === 0}
                      className="w-8 h-8 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-bold
                        hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => increase(item.id)}
                      className="w-8 h-8 rounded-xl bg-primary text-white text-sm font-bold
                        hover:brightness-110 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              disabled={selectedItems.length === 0}
              onClick={() => setPreOrderOpen(false)}
              className="w-full h-12 mt-2 rounded-2xl bg-primary text-white font-bold text-sm
                shadow-lg shadow-primary/20 hover:brightness-110
                disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Confirm Pre-order
              {selectedItems.length > 0 && ` · ${selectedItems.length} item(s)`}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ALERT DIALOG */}
      <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
        <DialogContent className="max-w-sm rounded-3xl border-0 shadow-2xl text-center">
          <DialogHeader>
            <div
              className={`w-14 h-14 rounded-2xl mx-auto mb-2 flex items-center justify-center
              ${alertType === "success" ? "bg-primary/10" : "bg-red-50"}`}
            >
              {alertType === "success" ? (
                <svg
                  width="24"
                  height="20"
                  viewBox="0 0 24 20"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M2 10L8.5 16.5L22 2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-red-500"
                >
                  <path
                    d="M12 8v5m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
            <DialogTitle
              className={`text-lg font-black ${alertType === "success" ? "text-gray-900" : "text-red-600"}`}
            >
              {alertType === "success" ? "You're all set!" : "Oops!"}
            </DialogTitle>
          </DialogHeader>
          <p className="whitespace-pre-line text-sm text-muted-foreground leading-relaxed">
            {alertMessage}
          </p>
          <button
            onClick={() => setAlertOpen(false)}
            className="mt-2 w-full h-11 rounded-2xl bg-primary text-white text-sm font-bold hover:brightness-110 transition-all"
          >
            {alertType === "success" ? "Done" : "Got it"}
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
