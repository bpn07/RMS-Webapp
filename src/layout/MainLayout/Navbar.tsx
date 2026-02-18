"use client";

import { Heart, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/hooks/useBasket";
import Link from "next/link";
import { useState } from "react";
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
    <>
      <header className="border-b bg-white sticky top-0 z-30">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-lg sm:text-xl font-bold text-primary">
              Kathmandu
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="h-10 w-full rounded-md border bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Wishlist */}
            <Button
              type="button"
              aria-label="Open wishlist"
              variant="ghost"
              size="sm"
              onClick={() => setWishlistOpen(true)}
              className="px-2 sm:px-4"
            >
              <Heart className="h-4 w-4 text-primary" />
            </Button>

            {/* Cart */}
            <Button
              type="button"
              aria-label="Open basket"
              variant="ghost"
              size="sm"
              onClick={() => setBasketOpen(true)}
              className="relative px-2 sm:px-4"
            >
              <ShoppingBag className="h-4 w-4 text-primary" />
              {cartCount > 0 && (
                <span className="ml-1 text-sm font-medium">{cartCount}</span>
              )}
            </Button>

            {/* Mobile Search */}
            <Button
              type="button"
              aria-label="Open search"
              variant="ghost"
              size="sm"
              className="md:hidden px-2"
              onClick={() => setMobileSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <ThemeColorToggle />
            <ThemeModeToggle />

            <Link href={"/reservation"} className="text-sm hover:text-primary">Reserve Table</Link>
            {/* Account Dropdown (All Screens) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  aria-label="Open account menu"
                  variant="ghost"
                  size="sm"
                  className="gap-2 px-2 sm:px-4"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-56 rounded-lg bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 p-1"
              >
                {navItems.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className="px-4 py-3 rounded-md text-gray-700 hover:bg-primary/10 hover:text-primary focus:bg-primary/20 focus:text-primary transition-colors"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}

                <div className="border-t border-gray-200 my-1" />

                <DropdownMenuItem
                  asChild
                  className="px-4 py-3 rounded-md text-red-600 hover:bg-red-50 focus:bg-red-100"
                >
                  <button
                    type="button"
                    aria-label="Logout"
                    className="w-full text-left"
                    onClick={() => console.log("Logout clicked")}
                  >
                    Logout
                  </button>
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
                className="h-11 w-full rounded-md border bg-background pl-9 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="button"
                aria-label="Close search"
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
