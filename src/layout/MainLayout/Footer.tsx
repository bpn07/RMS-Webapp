"use client";

import { Facebook, Twitter, Instagram, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpen(open === key ? null : key);
  };

  const discover = [
    "Investors",
    "About us",
    "Takeaway",
    "More",
    "Newsroom",
    "Engineering blog",
    "Design blog",
    "Gift Cards",
    "Students",
    "Careers",
    "Restaurant signup",
    "Become a rider",
    "Talent Directory",
  ];

  const legal = [
    "Terms and conditions",
    "Privacy",
    "Cookies",
    "Modern Slavery Statement",
    "Tax Strategy",
    "Section 172 Statement",
    "Public Authority Requests",
  ];

  const help = ["Contact", "FAQs", "Cuisines", "Brands"];

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="lg:hidden space-y-4">
          {[
            { key: "discover", title: "Discover", items: discover },
            { key: "legal", title: "Legal", items: legal },
            { key: "help", title: "Help", items: help },
          ].map((section) => (
            <div key={section.key} className="border-b border-gray-700">
              <button
                onClick={() => toggle(section.key)}
                className="w-full flex items-center justify-between py-4 text-white font-semibold"
              >
                {section.title}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    open === section.key ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === section.key && (
                <ul className="pb-4 pl-2 space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="block py-1 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* App Buttons */}
          <div className="pt-4 space-y-3">
            <a
              href="#"
              className="flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl"
            >
              <span className="text-sm font-medium">
                Download on the App Store
              </span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl"
            >
              <span className="text-sm font-medium">Get it on Google Play</span>
            </a>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-8 py-10">
          {/* Discover */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Discover</h3>
            <ul className="space-y-3 text-sm">
              {discover.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
              {legal.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Help</h3>
            <ul className="space-y-3 text-sm">
              {help.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Apps */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Take with you</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <span className="text-sm font-semibold">App Store</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <span className="text-sm font-semibold">Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-gray-500 text-sm">© {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}
