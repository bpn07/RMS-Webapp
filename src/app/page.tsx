"use client";

import { RestaurantHero } from "@/layout/Homepage/HeroSection";
import { CategoryNav } from "@/layout/Homepage/MenuNav";
import { BasketSidebar } from "@/layout/Homepage/Cart";
import { MobileBasket } from "@/layout/Homepage/MobileBasket";
import { restaurantData } from "@/lib/restuarant-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PROMOTION_POPUPS } from "@/layout/Homepage/PromoPopups";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { MenuItemCard } from "@/layout/Homepage/MenuItems";
import { WelcomeModal } from "@/components/FirstTimePopup";
import RestaurantInfo from "@/layout/Homepage/Info";
import Image from "next/image";

export default function RestaurantPage() {
  const popularSection = restaurantData.categories.find(
    (cat) => cat.id === "popular-with-others",
  );
  const menuCategories = restaurantData.categories.filter(
    (cat) => cat.id !== "popular-with-others",
  );

  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 300;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const updateScrollButtons = () => {
    const el = sliderRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  return (
    <>
      <WelcomeModal />

      <div className="min-h-screen bg-primary-foreground pb-20 lg:pb-0">
        <main className="mx-auto max-w-7xl px-2 sm:px-4 py-4 sm:py-6">
          {/* Restaurant Hero and Info - responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
            <RestaurantHero
              imageUrl={restaurantData.heroImage}
              altText={`${restaurantData.name} food`}
            />
            <RestaurantInfo
              name={restaurantData.name}
              location={restaurantData.location}
              rating={restaurantData.rating}
              delivery={restaurantData.delivery}
            />
          </div>
        </main>

        <CategoryNav categories={menuCategories} />

        <div className="mx-auto max-w-7xl px-2 sm:px-4 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 sm:gap-8">
            <div className="space-y-8 sm:space-y-12">
              {/* Promotions */}
              <div className="relative">
                {/* LEFT ARROW */}
                {canScrollLeft && (
                  <button
                    aria-label="Scroll left"
                    onClick={() => scroll("left")}
                    className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-11 h-9 w-9 items-center justify-center rounded-full bg-background shadow-md border hover:bg-muted transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}

                {/* SLIDER */}
                <div
                  ref={sliderRef}
                  onScroll={updateScrollButtons}
                  className="flex gap-4 overflow-x-auto sm:overflow-x-hidden no-scrollbar pb-2 -mx-2 px-2 sm:mx-0 sm:px-0"
                >
                  {restaurantData.promotions.map((promo) => {
                    const popupContent =
                      promo.popupKey && PROMOTION_POPUPS[promo.popupKey]
                        ? PROMOTION_POPUPS[promo.popupKey]
                        : null;

                    const Card = (
                      <div
                        className={`group relative shrink-0 w-[70%] sm:w-24 md:min-w-70 sm:min-w-95 h-40 sm:h-48 rounded-2xl overflow-hidden shadow-md transition-all duration-300 ease-out ${popupContent ? "cursor-pointer" : "cursor-default"}`}
                      >
                        {/* ── Background ── */}
                        {promo.image ? (
                          <>
                            <div className="absolute inset-0">
                              <Image
                                src={promo.image}
                                alt={promo.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/10" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/80 to-primary/50" />
                            <div className="absolute -right-6 -top-6 w-40 h-40 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />
                            <div className="absolute -left-4 -bottom-8 w-28 h-28 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-110" />
                          </>
                        )}

                        <div className="relative z-10 flex flex-col justify-between h-full p-5 sm:p-6">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white ring-1 ring-white/30 shadow-lg">
                              {typeof promo.icon === "string" ? (
                                promo.icon
                              ) : promo.icon ? (
                                <promo.icon className="w-6 h-6" />
                              ) : null}
                            </span>
                            {popupContent && (
                              <span className="text-[10px] font-semibold text-white uppercase tracking-[0.15em]">
                                Tap to learn more
                              </span>
                            )}
                          </div>

                          <div>
                            <h3 className="font-bold text-base sm:text-lg text-white leading-tight tracking-tight drop-shadow-sm">
                              {promo.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed line-clamp-2 drop-shadow-sm">
                              {promo.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );

                    if (!popupContent) {
                      return <div key={promo.id}>{Card}</div>;
                    }

                    return (
                      <Dialog key={promo.id}>
                        <DialogTrigger asChild>{Card}</DialogTrigger>

                        <DialogContent className="w-[calc(100%-2rem)] max-w-lg p-0 overflow-hidden rounded-2xl border-0 shadow-2xl [&>button]:bg-blue-500 [&>button]:text-white [&>button]:rounded-full [&>button]:p-2">
                          <div className="relative w-full h-56 sm:h-64">
                            {promo.image ? (
                              <>
                                <Image
                                  src={promo.image}
                                  alt={promo.title}
                                  fill
                                  sizes="600px"
                                  className="object-cover"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                                <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent" />
                              </>
                            ) : (
                              <>
                                <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/80 to-primary/50" />
                                <div className="absolute -right-6 -bottom-6 w-70 h-70 rounded-full bg-white/10" />
                                <div className="absolute -left-4 -bottom-8 w-50 h-50 rounded-full bg-white/5" />
                              </>
                            )}

                            {/* Floating banner */}
                            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 flex items-end gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white ring-1 ring-white/30 shadow-lg">
                                {typeof promo.icon === "string" ? (
                                  promo.icon
                                ) : promo.icon ? (
                                  <promo.icon className="w-6 h-6" />
                                ) : null}
                              </span>

                              <div>
                                <DialogTitle className="text-white text-xl sm:text-2xl font-bold leading-tight drop-shadow-md m-0">
                                  {promo.title}
                                </DialogTitle>

                                <p className="text-white/80 text-xs sm:text-sm mt-0.5">
                                  Limited time offer
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="relative p-5 sm:p-6 bg-linear-to-b from-background to-muted/40">
                            {!promo.image && (
                              <DialogHeader className="mb-4">
                                <DialogTitle className="flex items-center gap-2.5 text-lg">
                                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white ring-1 ring-white/30 shadow-lg">
                                    {typeof promo.icon === "string" ? (
                                      promo.icon
                                    ) : promo.icon ? (
                                      <promo.icon className="text-blue-500 w-6 h-6" />
                                    ) : null}
                                  </span>
                                  {promo.title}
                                </DialogTitle>
                              </DialogHeader>
                            )}

                            {/* Content */}
                            <div className="text-md text-foreground leading-relaxed">
                              {popupContent}
                            </div>

                            <div className="mt-6 flex items-center justify-between gap-3">
                              <p className="text-xs text-muted-foreground">
                                *Terms & conditions apply
                              </p>

                              {promo.claimable && (
                                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white shadow-md hover:bg-primary/90 transition">
                                  Claim Offer
                                </button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    );
                  })}
                </div>

                {/* RIGHT ARROW */}
                {canScrollRight && (
                  <button
                    aria-label="Scroll right"
                    onClick={() => scroll("right")}
                    className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-11 h-9 w-9 items-center justify-center rounded-full bg-background shadow-md border hover:bg-muted transition-colors cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>

              {/* Popular items - horizontal scroll on mobile */}
              {popularSection && (
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                    {popularSection.name}
                  </h2>
                  <div className="flex item-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2">
                    {popularSection.items.map((item) => (
                      <div key={item.id}>
                        <MenuItemCard item={item} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Menu categories - stacked vertically */}
              {menuCategories.map((category) => (
                <section
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-32"
                >
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                    {category.name}
                  </h2>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {category.items.map((item) => (
                      <div key={item.id} className="w-full">
                        <MenuItemCard item={item} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Desktop basket sidebar */}
            <div className="hidden lg:block max-w-90 w-full">
              <BasketSidebar />
            </div>
          </div>
        </div>

        <MobileBasket />
      </div>
    </>
  );
}
