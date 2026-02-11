"use client";

import { Heart, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/hooks/useBasket";
import Link from "next/link";
import { useState } from "react";
import WishlistDrawer from "./NavbarPanels/WishlistPanel";
import BasketDrawer from "./NavbarPanels/BasketPanel";
import AccountDrawer from "./NavbarPanels/AccountPanel";

interface HeaderProps {
  searchPlaceholder?: string;
}

export function Navbar({ searchPlaceholder = "Search" }: HeaderProps) {
  const cartCount = useBasket((state) => state.getTotalItems());
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-20">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4">
          {/* Logo */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Link href="/">
              <span className="text-lg sm:text-xl font-bold text-[#00ccbc]">
                Kathmandu
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="h-10 w-full rounded-md border bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setWishlistOpen(true)}
              className="gap-1 sm:gap-2 px-2 sm:px-4"
            >
              <Heart className="h-4 w-4 text-[#00ccbc]" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 sm:gap-2 px-2 sm:px-4"
              onClick={() => setBasketOpen(true)}
            >
              <ShoppingBag className="h-4 w-4 text-[#00ccbc]" />
              <span className="font-medium">{cartCount}</span>
            </Button>

            {/* 🔍 Mobile Search Icon */}

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden px-2"
              onClick={() => setMobileSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Login Icon */}

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden px-2"
              onClick={() => setAccountOpen(true)}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Desktop Login */}
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hidden lg:flex"
              >
                <User className="h-4 w-4" />
                <span>Sign up or log in</span>
              </Button>
            </Link>

            {/* Account (Tablet+) */}

            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hidden sm:flex"
              onClick={() => setAccountOpen(true)}
            >
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </Button>
          </div>
        </div>
      </header>

      {wishlistOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 bg-black/40 z-30"
          />

          {/* Drawer */}
          <WishlistDrawer onClose={() => setWishlistOpen(false)} />
        </>
      )}

      {basketOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setBasketOpen(false)}
          />
          <BasketDrawer onClose={() => setBasketOpen(false)} />
        </>
      )}

      {accountOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setAccountOpen(false)}
          />
          <AccountDrawer onClose={() => setAccountOpen(false)} />
        </>
      )}

      {mobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="absolute top-0 left-0 right-0 border-b bg-background p-3">
            <div className="relative flex items-center gap-2">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />

              <input
                autoFocus
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-md border bg-background pl-9 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
              />

              <button
                aria-label="CLose Modal"
                onClick={() => setMobileSearchOpen(false)}
                className="absolute right-3 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
