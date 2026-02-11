"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const PREORDER_ITEMS = [
  "Laphing",
  "Aloo Chop",
  "Egg Chowmein",
  "Mragertia Pizza",
  "Potato Mozarella Corndog",
  "Hot Lemon",
  "Coke",
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
  const [people, setPeople] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [agree, setAgree] = useState(false);

  const [preOrderEnabled, setPreOrderEnabled] = useState(false);
  const [preOrderOpen, setPreOrderOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

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
    <div className="min-h-screen pb-12 space-y-12">
      {/* INTRO */}
      <section className="bg-cyan-600 text-white p-8 md:p-16 rounded-b-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          Reserve Your Table
        </h1>
        <p className="mt-3 text-lg max-w-xl opacity-90">
          Book your table and optionally pre-order food for a seamless visit.
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-4">
        {/* IMAGE */}
        <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
          <Image
            src="/food.jpg"
            alt="Reservation"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* FORM */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
          <form onSubmit={handleReservation} className="space-y-6">
            {/* PEOPLE */}
            <div className="space-y-2">
              <Label>Number of people</Label>
              <Select value={people} onValueChange={setPeople}>
                <SelectTrigger>
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1} people
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* DATE */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* TIME SLOTS */}
            <div className="space-y-3">
              <Label>Select Time</Label>

              <div className="grid grid-cols-3 gap-3">
                {visibleSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={`rounded-lg border py-2 text-sm font-medium transition
                      ${
                        time === slot
                          ? "bg-cyan-600 text-white"
                          : "bg-cyan-50 hover:bg-cyan-100"
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={slotPage === 0}
                  onClick={() => setSlotPage((p) => p - 1)}
                >
                  Previous
                </Button>
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
            <div className="flex items-center gap-3">
              <Checkbox
                checked={preOrderEnabled}
                onCheckedChange={(v) => {
                  setPreOrderEnabled(Boolean(v));
                  setPreOrderOpen(Boolean(v));
                  setSelectedItems([]);
                }}
              />
              <Label>Pre-order food</Label>
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
              className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
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

          <div className="space-y-3">
            {PREORDER_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Checkbox
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => toggleItem(item)}
                />
                <span>{item}</span>
              </div>
            ))}

            <Button
              className="w-full mt-4"
              onClick={() => selectedItems.length && setPreOrderOpen(false)}
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
