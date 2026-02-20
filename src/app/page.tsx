"use client";

import { RestaurantHero } from "@/layout/Homepage/HeroSection";
import { RestaurantInfo } from "@/layout/Homepage/Info";
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
import { FirstTimePopup } from "@/components/FirstTimePopup";
import { MenuItemCard } from "@/layout/Homepage/MenuItems";

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
      <FirstTimePopup />

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
                    className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-11 h-8 w-8 items-center justify-center rounded-full bg-background shadow border hover:bg-muted"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}

                {/* SLIDER */}
                <div
                  ref={sliderRef}
                  onScroll={updateScrollButtons}
                  className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2 sm:mx-0 sm:px-0"
                >
                  {restaurantData.promotions.map((promo) => {
                    const popupContent =
                      promo.popupKey && PROMOTION_POPUPS[promo.popupKey]
                        ? PROMOTION_POPUPS[promo.popupKey]
                        : null;

                    const Card = (
                      <div
                        className={`group relative min-w-65 sm:min-w-75 rounded-2xl 
                                    bg-linear-to-br from-primary-foreground to-primary/10
                                    border border-secondary
                                    p-4 sm:p-5 flex gap-4
                                    shadow-sm hover:shadow-lg
                                    transition-all duration-300 ease-out hover:bg-primary/20
                                    ${popupContent ? "cursor-pointer hover:-translate-y-1" : "cursor-default"}`}
                      >
                        {/* Icon */}
                        <div
                          className="relative z-10 flex h-12 w-12 items-center justify-center 
                                     rounded-xl bg-primary-foreground text-neutral-700 text-xl shrink-0
                                     transition-transform duration-300 group-hover:scale-105"
                        >
                          {promo.icon}
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className="font-medium text-sm sm:text-base text-primary tracking-tight">
                            {promo.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-relaxed whitespace-pre-line">
                            {promo.description}
                          </p>
                        </div>
                      </div>
                    );

                    if (!popupContent) {
                      return <div key={promo.id}>{Card}</div>;
                    }

                    return (
                      <Dialog key={promo.id}>
                        <DialogTrigger asChild>{Card}</DialogTrigger>

                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{promo.title}</DialogTitle>
                          </DialogHeader>

                          {popupContent}
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
                    className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full bg-white shadow border hover:bg-muted"
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
                  <div className="w-full space-y-2 sm:space-y-3 flex flex-wrap items-start gap-8">
                    {category.items.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
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
