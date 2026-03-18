"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import type { MenuCategory } from "@/lib/restuarant-data";

interface CategoryNavProps {
  categories: MenuCategory[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id || "",
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

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

  // Auto-scroll active button into view
  useEffect(() => {
    const activeButton = buttonRefs.current[activeCategory];
    const container = containerRef.current;

    if (activeButton && container) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 160;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setDropdownOpen(false);
    }
  };

  return (
    <div className="border-t border-b bg-primary-foreground sticky top-20 md:top-20 z-20">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-2 sm:px-4">
        {/* Hamburger / Dropdown for small screens */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`p-2 rounded-md cursor-pointer ${dropdownOpen ? "text-primary" : "text-gray-700 hover:text-primary "}`}
          >
            <Menu />
          </button>

          {dropdownOpen && (
            <div className="absolute left-10 top-0 w-48 bg-white shadow-lg rounded-lg z-30 overflow-hidden">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`cursor-pointer w-full text-left px-4 py-2 text-sm font-medium  ${activeCategory === category.id ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100 hover:text-black"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Horizontal scroll for larger screens */}
        <div
          ref={containerRef}
          className="hidden md:flex gap-4 sm:gap-6 overflow-x-auto py-3 sm:py-4 flex-1 no-scrollbar"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              ref={(el) => {
                buttonRefs.current[category.id] = el;
              }}
              onClick={() => scrollToCategory(category.id)}
              className={`whitespace-nowrap font-medium text-sm sm:text-base hover:opacity-80 transition-opacity cursor-pointer ${activeCategory === category.id
                ? "text-white bg-primary py-1 px-3 rounded-full"
                : "text-gray-700 hover:underline hover:text-primary"
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