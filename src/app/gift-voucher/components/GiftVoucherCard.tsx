"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Voucher } from "@/constants/voucher";

interface GiftVoucherCardProps {
  voucher: Voucher;
  selectedVouchers: Map<
    string,
    { amount: number; quantity: number }
  >;
  setSelectedVouchers: React.Dispatch<
    React.SetStateAction<
      Map<string, { amount: number; quantity: number }>
    >
  >;
}

export function GiftVoucherCard({
  voucher,
  setSelectedVouchers,
}: GiftVoucherCardProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const presetAmounts = [25, 50, 100];

  const handleSelect = (amount: number) => {
    setSelectedAmount(amount);

    setSelectedVouchers((prev) => {
      const newMap = new Map(prev);

      const existing = newMap.get(voucher.id);

      if (existing) {
        newMap.set(voucher.id, {
          amount,
          quantity: existing.quantity + 1,
        });
      } else {
        newMap.set(voucher.id, {
          amount,
          quantity: 1,
        });
      }

      return newMap;
    });
  };

  return (
    <div className="rounded-3xl bg-background border shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col">
      
      {/* Image */}
      <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-muted mb-4">
        {voucher.image && (
          <Image
            src={voucher.image}
            alt={voucher.name}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <p className="text-xs uppercase tracking-wide text-primary font-medium">
          Monetary Voucher
        </p>

        <h3 className="text-lg font-semibold mt-1">
          {voucher.name}
        </h3>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {voucher.description}
        </p>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span>
            From{" "}
            <span className="font-semibold">
              £{voucher.minAmount.toFixed(2)}
            </span>
          </span>

          <Link
            href={`/gift-voucher/${voucher.id}`}
            className="text-primary font-medium hover:underline"
          >
            Read More
          </Link>
        </div>

        {/* Dropdown */}
        <div className="mt-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="w-full rounded-full"
              >
                {selectedAmount
                  ? `Selected: £${selectedAmount}`
                  : "Choose Amount"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48">
              {presetAmounts.map((amount) => (
                <DropdownMenuItem
                  key={amount}
                  onSelect={() => handleSelect(amount)}
                >
                  £{amount}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}