"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FoodOption {
  id: string;
  name: string;
  price: number;
}

interface FoodSection {
  id: string;
  name: string;
  options: FoodOption[];
  required?: boolean;
}

// Example lunch sections with prices
const lunchSections: FoodSection[] = [
  {
    id: "main",
    name: "Main Dish",
    options: [
      { id: "chicken", name: "Grilled Chicken", price: 8.5 },
      { id: "beef", name: "Beef Steak", price: 10 },
      { id: "veggie", name: "Vegetarian Pasta", price: 7.5 },
    ],
    required: true,
  },
  {
    id: "side",
    name: "Side Dish",
    options: [
      { id: "salad", name: "Garden Salad", price: 3 },
      { id: "fries", name: "French Fries", price: 2.5 },
      { id: "rice", name: "Steamed Rice", price: 2 },
    ],
    required: true,
  },
  {
    id: "drink",
    name: "Drink",
    options: [
      { id: "water", name: "Water", price: 1 },
      { id: "juice", name: "Orange Juice", price: 2 },
      { id: "soda", name: "Soda", price: 1.5 },
    ],
  },
];

export default function LunchSelector() {
  const [open, setOpen] = useState(false);

  // Store selected items per section
  const [selections, setSelections] = useState<Record<string, Set<string>>>(
    () =>
      lunchSections.reduce((acc, section) => {
        acc[section.id] = new Set<string>();
        return acc;
      }, {} as Record<string, Set<string>>)
  );

  const toggleSelection = (sectionId: string, optionId: string) => {
    setSelections((prev) => {
      const updated = new Set(prev[sectionId]);
      if (updated.has(optionId)) updated.delete(optionId);
      else updated.add(optionId);
      return { ...prev, [sectionId]: updated };
    });
  };

  // Check if all required sections have at least 1 selected
  const allRequiredSelected = lunchSections
    .filter((s) => s.required)
    .every((s) => selections[s.id].size > 0);

  // Calculate total price
  const totalPrice = useMemo(() => {
    let total = 0;
    lunchSections.forEach((section) => {
      selections[section.id].forEach((id) => {
        const item = section.options.find((o) => o.id === id);
        if (item) total += item.price;
      });
    });
    return total;
  }, [selections]);

  return (
    <div className="p-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Select Your Lunch</Button>
        </DialogTrigger>

        <DialogContent className="max-w-md h-[80vh] flex flex-col">
          {/* Header with title, description, and close button */}
          <DialogHeader className="sticky top-0 bg-white z-20">
            <DialogTitle>Select Your Lunch</DialogTitle>
            <DialogDescription>
              Choose items (required sections must have at least one selection)
            </DialogDescription>
          </DialogHeader>

          {/* Top bar with total price */}
          <div className="p-3 bg-gray-100 rounded-lg flex justify-between items-center sticky top-18 z-10">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">£{totalPrice.toFixed(2)}</span>
          </div>

          {/* Scrollable sections */}
          <div className="flex-1 overflow-y-auto mt-2 space-y-6 relative">
            {lunchSections.map((section) => (
              <div key={section.id} className="space-y-2">
                <p className="font-semibold">{section.name}</p>
                <div className="flex flex-col gap-2">
                  {section.options.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={selections[section.id].has(opt.id)}
                        onCheckedChange={() =>
                          toggleSelection(section.id, opt.id)
                        }
                      />
                      <span className="flex-1">{opt.name}</span>
                      <span className="font-medium">
                        £{opt.price.toFixed(2)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Confirm button at the end */}
            <div className="mt-4">
              <Button
                className="w-full"
                disabled={!allRequiredSelected}
                onClick={() => {
                  console.log("Selected items:", selections);
                  setOpen(false);
                }}
              >
                Confirm Selection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
