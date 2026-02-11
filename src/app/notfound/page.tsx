"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* FULL WIDTH INTRO */}
      <section className="w-full bg-cyan-500 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-widest opacity-80">
            Error 404
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2">
            Page Not Found
          </h1>
          <p className="mt-4 max-w-xl mx-auto opacity-90">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 max-w-md w-full text-center space-y-6">
          <div className="text-cyan-500 text-6xl font-extrabold">404</div>

          <p className="text-muted-foreground text-sm">
            The link you followed may be broken, or the page may have been
            removed.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">Go Home</Link>
            </Button>

            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/reservation">Make a Reservation</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* FOOTER NOTE
      <footer className="py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Your Restaurant. All rights reserved.
      </footer> */}
    </div>
  );
}
