"use client";

import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AccountDrawerProps {
  onClose: () => void;
}

export default function AccountDrawer({ onClose }: AccountDrawerProps) {
  return (
    <aside className="fixed top-0 right-0 z-40 h-full w-full sm:w-105 bg-white shadow-xl animate-slideIn flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-semibold">My Account</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation List */}
      <nav className="px-4 py-4 space-y-1">
        {[
          { href: "/myaccount", label: "Account details" },
          { href: "/order", label: "Order history" },
          { href: "/faq", label: "FAQ" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {item.label}
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>
        ))}

        {/* Logout */}
        <button
          onClick={() => {
            onClose();
            console.log("logout");
          }}
          className="w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer – Country & Language */}
      <div className="border-t px-4 py-4 space-y-4">
        <div>
          <Select defaultValue="np">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="np">Nepal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </aside>
  );
}
