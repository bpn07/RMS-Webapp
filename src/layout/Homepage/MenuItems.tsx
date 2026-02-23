"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingBag, X, Clock, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { MenuItem } from "@/lib/restuarant-data";
import { useBasket } from "@/hooks/useBasket";
// import { BiSolidDish } from "react-icons/bi";
import { Button } from "@/components/ui/button";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const addItem = useBasket((state) => state.addItem);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(item);
    }
    setOpen(false);
    setQuantity(1);
  };

  // const ImagePlaceholder = () => (
  //   <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
  //     <BiSolidDish className="text-blue-200 text-5xl" />
  //   </div>
  // );

  return (
    <>
      <div
        className="group relative flex flex-row items-center gap-3 rounded-2xl bg-white border border-gray-100 p-3 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer w-full"
        onClick={() => setOpen(true)}
      >
        {/* Image */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-blue-50">
          {/* <ImagePlaceholder /> */}
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover z-10 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1 min-w-0 gap-0.5">
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-1">
            {item.name}
          </h3>

          {item.description && (
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-600">4.2</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>20–30m</span>
            </div>
          </div>
        </div>

        {/* Price + Add */}
        <div className="flex flex-col items-end justify-between h-full gap-2 shrink-0">
          <p className="font-bold text-sm text-gray-900">
            £{item.price.toFixed(2)}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 active:scale-90 text-white shadow-sm shadow-blue-200 transition-all duration-150"
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Dialog ── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>

        <DialogContent className="w-[92vw] max-w-sm rounded-2xl p-0 overflow-hidden border-0 shadow-2xl gap-0">
          {/* Image Section */}
          <div className="relative w-full h-48 sm:h-56 bg-blue-50">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover z-10"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />

            <Button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
            >
              <X className="h-4 w-4 text-gray-600" />
            </Button>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-5 flex flex-col gap-4">
            {/* REQUIRED FOR ACCESSIBILITY */}
            <DialogHeader className="space-y-1 text-left">
              <DialogTitle className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                {item.name}
              </DialogTitle>

              {item.description && (
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              )}
            </DialogHeader>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between">
              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                <button
                  aria-label="decrease quantity"
                  className="h-9 w-9 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors disabled:opacity-40"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>

                <span className="w-8 text-center text-sm font-semibold text-gray-900">
                  {quantity}
                </span>

                <button
                  aria-label="Increase quantity"
                  className="h-9 w-9 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add To Cart */}
              <button
                onClick={() => {
                  handleAddToCart();
                  setOpen(false);
                }}
                className="flex items-center gap-2 h-9 px-4 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all duration-150 shadow-sm shadow-blue-200"
              >
                <ShoppingBag className="h-4 w-4" />
                Add · £{(item.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
