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

interface MenuItemCardProps {
  item: MenuItem;
  horizontal?: boolean;
}

export function MenuItemCard({ item, horizontal = false }: MenuItemCardProps) {
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
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full shrink-0"
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={150}
            height={100}
            className="w-full h-28 object-cover rounded"
          />

          {item.description && (
            <p className="text-sm text-muted-foreground">{item.description}</p>
          )}

          {/* Price + Quantity */}
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

  const horizontalCard = (
    <div className="flex gap-2 sm:gap-3 rounded-lg border bg-white p-2 sm:p-3 hover:shadow-md transition-shadow">
      <Image
        src={item.image || "/placeholder.svg"}
        alt={item.name}
        width={100}
        height={100}
        className="rounded-lg object-cover shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-xs sm:text-sm line-clamp-2">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>

          {dialog}
        </div>
      </div>
    </div>
  );

  const verticalCard = (
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

  return horizontal ? horizontalCard : verticalCard;
}
