"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { MenuItem } from "@/lib/restuarant-data";
import { useBasket } from "@/hooks/useBasket";
import { BiSolidDish, BiSolidStar } from "react-icons/bi";
import { LuClock2 } from "react-icons/lu";

interface MenuItemCardProps {
  item: MenuItem;
  isHorizontal?: boolean;
}

export function MenuItemCard({ item, isHorizontal = false }: MenuItemCardProps) {
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

  const dialog = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          <div className="rounded-lg object-cover w-full h-52 bg-gray-200 overflow-hidden">
            {/* <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={100}
          height={100}
          className="object-cover w-full"
        /> */}
            <div className="w-full h-full flex items-center justify-center">
              <BiSolidDish size={100} className="text-gray-400" />
            </div>
          </div>

          {item.description && (
            <p className="text-sm text-muted-foreground">{item.description}</p>
          )}

          <div className="flex items-center justify-between">
            <p className="font-medium text-base">£{item.price.toFixed(2)}</p>

            <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-5 text-center text-sm font-medium">
                {quantity}
              </span>

              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const verticalCard = (
    <div className="w-60 h-fit flex flex-col rounded-2xl bg-white p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full h-44 rounded-xl overflow-hidden shrink-0">
        {/* <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        /> */}
        <div className="w-full h-full flex bg-gray-200 items-center justify-center">
          <BiSolidDish size={100} className="text-gray-400" />
        </div>
      </div>

      <div className="mt-3 flex flex-col flex-1">
        <h3 className="font-semibold text-sm leading-tight line-clamp-1 min-h-5">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mt-1 h-9">
            <span className="w-full h-full my-auto">
            {item.description}
          </span>
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <BiSolidStar className="text-yellow-500 text-xs" />
            <span>4.2</span>
          </div>

          <div className="flex items-center gap-1">
            <LuClock2 className="text-xs" />
            <span>20-30 mins</span>
          </div>
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <p className="font-bold text-sm">£{item.price.toFixed(2)}</p>

          <Button
            size="sm"
            className="rounded-full px-4 text-xs font-medium"
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </div>
      </div>

      {dialog}
    </div>
  );

  const horizontalCard = (
    <div className="flex flex-col rounded-lg border h-60 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <Image
        src={item.image || "/placeholder.svg"}
        alt={item.name}
        width={200}
        height={150}
        className="w-full h-28 sm:h-32 object-cover"
      />
      <div className="p-2 sm:p-3 flex flex-col flex-1">
        <h3 className="font-medium text-xs sm:text-sm line-clamp-2">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3">
          <p className="font-medium text-sm">£{item.price.toFixed(2)}</p>

          {dialog}
        </div>
      </div>
    </div>
  );

  return isHorizontal ? horizontalCard : verticalCard;
}
