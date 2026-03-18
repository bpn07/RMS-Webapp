"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MenuItem } from "@/lib/restuarant-data";
import { BiSolidDish } from "react-icons/bi";
import { useBasket } from "@/hooks/useBasket";
import Image from "next/image";

interface RecommendedItemsProps {
    excludeIds: string[];
}

const popularItems: MenuItem[] = [
    {
        id: "pop1",
        name: "Cheese Pizza",
        price: 8.99,
        description: "Delicious cheese pizza with fresh toppings",
    },
    {
        id: "pop2",
        name: "Veggie Burger",
        price: 6.5,
        description: "Healthy veggie burger with lettuce and tomato",
    },
    {
        id: "pop3",
        name: "Chocolate Shake",
        price: 3.99,
        description: "Rich chocolate shake",
    },
];

export const RecommendedItems = ({ excludeIds }: RecommendedItemsProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const addItem = useBasket((state) => state.addItem);

    const filteredItems = popularItems.filter(
        (item) => !excludeIds.includes(item.id)
    );

    const scroll = (direction: "left" | "right") => {
        if (!sliderRef.current) return;

        const cardWidth =
            sliderRef.current.firstElementChild?.clientWidth || 300;

        sliderRef.current.scrollBy({
            left: direction === "left" ? -cardWidth : cardWidth,
            behavior: "smooth",
        });
    };

    const updateScroll = () => {
        const el = sliderRef.current;
        if (!el) return;

        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    useEffect(() => {
        updateScroll();
        window.addEventListener("resize", updateScroll);
        return () => window.removeEventListener("resize", updateScroll);
    }, []);

    if (filteredItems.length === 0) return null;

    return (
        <div className="mt-2 relative">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Recommended for you
            </h4>

            {/* LEFT ARROW */}
            {canScrollLeft && (
                <button
                    onClick={() => scroll("left")}
                    className="hidden sm:flex absolute top-1/2 -left-4 h-8 w-8 items-center justify-center rounded-full bg-background border shadow-md hover:shadow-2xl cursor-pointer transition-shadow ease-out duration-200"
                >
                    <ChevronLeft size={18} />
                </button>
            )}

            {/* SLIDER */}
            <div
                ref={sliderRef}
                onScroll={updateScroll}
                className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4"
            >
                {filteredItems.map((item) => (
                    <div key={item.id} className="w-full mx-auto shrink-0 snap-start">
                        <div className="flex gap-3 p-3 rounded-xl border bg-card hover:shadow-md transition w-full">
                            {/* Image */}
                            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-primary/10 flex items-center justify-center">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <BiSolidDish className="text-primary text-5xl" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-between flex-1 min-w-0">
                                <div>
                                    <p className="text-sm font-semibold text-foreground line-clamp-1">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm font-bold text-primary">
                                        £{item.price.toFixed(2)}
                                    </span>

                                    <button
                                        onClick={() => addItem(item)}
                                        className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center text-sm hover:scale-105 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT ARROW */}
            {canScrollRight && (
                <button
                    onClick={() => scroll("right")}
                    className="hidden sm:flex absolute top-1/2 -right-4 h-8 w-8 items-center justify-center rounded-full bg-background border shadow-md hover:shadow-2xl cursor-pointer transition-shadow ease-out duration-200"
                >
                    <ChevronRight size={18} />
                </button>
            )}
        </div>
    );
};