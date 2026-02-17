"use client";

import { useEffect, useState } from "react";
import type { MenuCategory } from "@/lib/restuarant-data";

interface CategoryNavProps {
  categories: MenuCategory[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id || "",
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map((cat) => ({
        id: cat.id,
        element: document.getElementById(cat.id),
      }));

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveCategory(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 128;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="border-t border-b bg-white sticky top-16 z-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-4 sm:gap-6 overflow-x-auto px-2 sm:px-4 py-3 sm:py-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className={`whitespace-nowrap font-medium text-sm sm:text-base hover:opacity-80 transition-opacity cursor-pointer ${
                activeCategory === category.id
                  ? "text-white bg-[#00ccbc] py-1 px-3 rounded-full"
                  : "text-gray-700 hover:underline hover:text-[#00ccbc]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
