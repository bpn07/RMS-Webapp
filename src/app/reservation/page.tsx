"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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
  {
    id: "laphing",
    name: "Laphing",
    price: 180,
    image: "https://dps.dpschool.edu.np/pgm/wp-content/uploads/sites/5/2023/04/laphing.jpg",
  },
  {
    id: "pizza",
    name: "Mragertia Pizza",
    price: 450,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP0HbRY0SsECXq3XHqjXUBw3CqK1VfE5PX1w&s",
  },
  {
    id: "chowmein",
    name: "Egg Chowmein",
    price: 220,
    image: "https://i.ytimg.com/vi/XsCh1DrvBw4/maxresdefault.jpg",
  },
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

  const getQuantity = (id: string) =>
    selectedItems.find((item) => item.id === id)?.quantity || 0;

  const increase = (id: string) => {
    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const decrease = (id: string) => {
    setSelectedItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };


  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const [slotPage, setSlotPage] = useState(0);
  const totalPages = Math.ceil(timeSlots.length / SLOTS_PER_PAGE);

  const visibleSlots = timeSlots.slice(
    slotPage * SLOTS_PER_PAGE,
    slotPage * SLOTS_PER_PAGE + SLOTS_PER_PAGE
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
      `Table for ${people} people
Date: ${date}
Time: ${time}
${preOrderEnabled ? `Pre-order: ${selectedItems.join(", ")}` : "No pre-order"}`
    );
    setAlertOpen(true);
  };


  return (
    <div className="min-h-screen bg-linear-to-b from-primary/5 to-background pb-24">
      <div className="flex flex-col items-center justify-center pt-24 mb-18">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          Reserve Your Table
        </h1>
        <p className="mt-3 text-lg max-w-xl opacity-90 ">
          Book your table and optionally pre-order food for a seamless visit.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE – Offers */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            Deals & Offers
          </h2>

          <div className="space-y-4">
            <div className="border rounded-2xl p-6 bg-background">
              <p className="text-sm font-medium text-primary">
                Early Bird
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                20% off pre-orders before 6 PM
              </p>
            </div>

            <div className="border rounded-2xl p-6 bg-background">
              <p className="text-sm font-medium text-primary">
                Weekend Special
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Free dessert for tables of 4+
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – Booking */}
        <div className="bg-background rounded-3xl shadow-lg p-8 space-y-8">
          <form onSubmit={handleReservation} className="space-y-6">
            {/* PEOPLE */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Number of guests
              </Label>

              <Select
                value={people ? String(people) : undefined}
                onValueChange={(value) => setPeople(Number(value))}
              >
                <SelectTrigger
                  className="w-full min-h-12 rounded-2xl border text-sm font-medium bg-white! hover:border-primary/40 focus:ring-2 focus:ring-primary/30 transition-all"
                >
                  <SelectValue placeholder="Select no. of people" />
                </SelectTrigger>

                <SelectContent className="rounded-2xl p-1">
                  <div className="max-h-60 overflow-y-auto">
                    {Array.from({ length: 200 }, (_, i) => i + 1).map((num) => (
                      <SelectItem
                        key={num}
                        value={String(num)}
                        className="text-sm py-2"
                      >
                        {num} {num === 1 ? "guest" : "guests"}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>

            {/* DATE */}
            <div className="space-y-2">
              <Label>Date</Label>
              <DatePicker
                value={date}
                onChange={setDate}
                disabled={{ before: new Date() }}
                placeholder="Pick a date"
              />
            </div>

            {/* TIME SLOTS */}
            <div className="space-y-3">
              <Label>Select Time</Label>

              <div className="grid grid-cols-3 gap-3 h-24">
                {visibleSlots.map((slot) => {
                  const isSelected = time === slot;

                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`h-12 rounded-2xl border text-sm font-semibold transition-all duration-200
                         ${isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                          : "bg-background hover:bg-primary/10 hover:border-primary/40"
                        }
                          `}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={slotPage === 0}
                  onClick={() => setSlotPage((p) => p - 1)}
                >
                  Prev
                </Button>

                <span className="text-sm text-muted-foreground">
                  {slotPage + 1} / {totalPages}
                </span>

                <Button
                  type="button"
                  variant="outline"
                  disabled={slotPage === totalPages - 1}
                  onClick={() => setSlotPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>

            {/* PREORDER */}
            {/* PREORDER */}
            <div className="border rounded-2xl p-4 space-y-4 bg-muted/20">
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={preOrderEnabled}
                  onCheckedChange={(v) => {
                    const enabled = Boolean(v);
                    setPreOrderEnabled(enabled);
                    if (!enabled) setSelectedItems([]);
                  }}
                  className="mt-1"
                />
                <div >
                  <p className="font-semibold">Pre-order food</p>
                  <p className="text-xs text-muted-foreground">
                    Optional - skip and order later
                  </p>
                </div>


              </div>

              {preOrderEnabled && (
                <div className="space-y-3">
                  {selectedItems.length > 0 ? (
                    <div className="text-sm text-muted-foreground">
                      Selected: {selectedItems.length} item
                      {selectedItems.length > 1 && "s"}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No items selected
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setPreOrderOpen(true)}
                  >
                    {selectedItems.length > 0 ? "Edit Selection" : "Add Items"}
                  </Button>
                </div>
              )}
            </div>


            {/* AGREE */}
            <div className="flex items-center gap-3 pt-4">
              <Checkbox
                checked={agree}
                onCheckedChange={(v) => setAgree(Boolean(v))}
              />
              <Label className="text-sm">
                I agree to the terms & conditions
              </Label>
            </div>

            <Button
              type="submit"
              disabled={!agree}
              className="w-full disabled:opacity-50"
            >
              Confirm Reservation
            </Button>
          </form>
        </div>
      </div>

      {/* PREORDER DIALOG */}
      <Dialog open={preOrderOpen} onOpenChange={setPreOrderOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pre-order Menu</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {PREORDER_ITEMS.map((item) => {
              const quantity = getQuantity(item.id);

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border rounded-2xl p-3"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Rs {item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => decrease(item.id)}
                      disabled={quantity === 0}
                    >
                      -
                    </Button>

                    <span className="w-6 text-center font-medium">
                      {quantity}
                    </span>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => increase(item.id)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              );
            })}

            <Button
              className="w-full mt-4"
              disabled={selectedItems.length === 0}
              onClick={() => setPreOrderOpen(false)}
            >
              Confirm Pre-order
            </Button>
          </div>

        </DialogContent>
      </Dialog>

      {/* ALERT */}
      <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className={
                alertType === "success" ? "text-green-600" : "text-red-600"
              }
            >
              {alertType === "success"
                ? "Reservation Confirmed "
                : "Error "}
            </DialogTitle>
          </DialogHeader>

          <p className="whitespace-pre-line text-sm">{alertMessage}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
