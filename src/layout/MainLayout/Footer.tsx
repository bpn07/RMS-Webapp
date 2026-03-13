"use client";

import {
  Facebook,
  Instagram,
  Twitter,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpen(open === key ? null : key);
  };

  const company = ["About Us", "Careers", "Press", "Blog", "Gift Cards"];

  const partners = [
    "Add your restaurant",
    "Become a delivery partner",
    "Restaurant dashboard",
    "Partner support",
  ];

  const cuisines = [
    "Pizza",
    "Burgers",
    "Sushi",
    "Chinese",
    "Indian",
    "Nepali",
    "Italian",
  ];

  const support = ["Help Center", "Contact", "FAQs", "Report issue"];

  const sections = [
    { key: "company", title: "Company", items: company },
    { key: "partners", title: "Partners", items: partners },
    { key: "cuisines", title: "Popular Cuisines", items: cuisines },
    { key: "support", title: "Support", items: support },
  ];

  return (
    <footer className="bg-background text-muted-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* MOBILE ACCORDION */}
        <div className="lg:hidden space-y-4">
          {sections.map((section) => (
            <div key={section.key} className="border-b border-border">
              <button
                onClick={() => toggle(section.key)}
                className="w-full flex items-center justify-between py-4 text-foreground font-semibold"
              >
                {section.title}

                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    open === section.key ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === section.key && (
                <ul className="pb-4 space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="block hover:text-foreground transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden lg:grid grid-cols-5 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-foreground text-2xl font-bold mb-4">
              Kathmandu
            </h2>

            <p className="text-sm leading-relaxed">
              Discover the best food & drinks in your city. Order your
              favourite meals from top restaurants delivered fast to
              your doorstep.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Kathmandu, Nepal
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +977 9800000000
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                support@kathmandu.com
              </div>
            </div>
          </div>

          {/* FOOTER SECTIONS */}
          {sections.map((section) => (
            <div key={section.key}>
              <h3 className="text-foreground font-semibold mb-4">
                {section.title}
              </h3>

              <ul className="space-y-3 text-sm">
                {section.items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* SOCIAL */}
          <div className="flex gap-5">
            <Link href="#">
              <Facebook className="w-5 h-5 hover:text-primary transition-colors" />
            </Link>

            <Link href="#">
              <Twitter className="w-5 h-5 hover:text-primary transition-colors" />
            </Link>

            <Link href="#">
              <Instagram className="w-5 h-5 hover:text-primary transition-colors" />
            </Link>
          </div>

          {/* COPYRIGHT */}
          <p className="text-sm">
            © {currentYear} Kathmandu. All rights reserved.
          </p>

          {/* LEGAL */}
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>

            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>

            <Link href="#" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}