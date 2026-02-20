"use client";

import { Gift, Heart, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/hooks/useBasket";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WishlistDrawer from "@/components/NavbarPanels/WishlistPanel";
import BasketDrawer from "@/components/NavbarPanels/BasketPanel";
import ThemeColorToggle from "@/components/ThemeColorToggle";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import Image from "next/image";

interface HeaderProps {
  searchPlaceholder?: string;
}

const navItems = [
  { href: "/myaccount", label: "Account details" },
  { href: "/order", label: "Order history" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar({ searchPlaceholder = "Search" }: HeaderProps) {
  const cartCount = useBasket((state) => state.getTotalItems());

  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <React.Fragment>
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur-2xl shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-12">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/40 border">
                <Image
                  src="data:image/png;base64,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"
                  alt="Kathmandu Logo"
                  height={100}
                  width={100}
                  className="h-8 w-8 object-contain"
                />
              </div>

              <span className="text-2xl font-semibold tracking-tight text-primary">
                Kathmandu
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
              <Link
                href="/"
                className="relative group text-foreground/60 hover:text-primary transition"
              >
                Menu
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/reservation"
                className="relative group text-foreground/60 hover:text-primary transition"
              >
                Reserve Table
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </nav>
          </div>

          {/* CENTER SEARCH */}
          <div className="relative hidden md:block w-full max-w-lg">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="h-11 w-full rounded-full border border-border bg-muted/30 pl-10 pr-5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
            />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">

            <Button
              type="button"
              aria-label="Open wishlist"
              variant="ghost"
              size="sm"
              onClick={() => setWishlistOpen(true)}
              className="px-2 sm:px-4"
            >              <Heart className="h-4 w-4 text-primary" />
            </Button>

            <Button
              type="button"
              aria-label="Open basket"
              variant="ghost"
              size="sm"
              onClick={() => setBasketOpen(true)}
              className="relative px-2 sm:px-4"
            >              <ShoppingBag className="h-4 w-4 text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
            <Link href={"/gift-voucher"}>
              <Gift className="h-4 w-4 text-primary" />
            </Link>

            <div className="ml-2 h-6 w-px bg-border hidden md:block" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted/40">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-60 rounded-2xl border bg-background shadow-xl p-3"
              >
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="rounded-lg">
                    <Link href={item.href} className="px-3 py-2">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                <div className="border-t my-3" />
                <div className="px-3">
                  <span className="text-sm">Theme:</span>
                  <div className="flex items-center justify-between gap-4 text-sm mt-2">
                    <ThemeColorToggle />
                    <ThemeModeToggle />
                  </div>
                </div>

                <div className="border-t my-3" />

                <DropdownMenuItem className="rounded-lg text-destructive px-3 py-2">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>


      {/* Wishlist Drawer */}
      {wishlistOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setWishlistOpen(false)}
          />
          <WishlistDrawer onClose={() => setWishlistOpen(false)} />
        </>
      )}

      {/* Basket Drawer */}
      {basketOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setBasketOpen(false)}
          />
          <BasketDrawer onClose={() => setBasketOpen(false)} />
        </>
      )}

      {/* Mobile Search */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md md:hidden">
          <div className="border-b p-4">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-full border bg-muted/40 pl-9 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="absolute right-3 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
