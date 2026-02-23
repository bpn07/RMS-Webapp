"use client";

import { useState } from "react";
import { ChevronRight, ShoppingCart } from "lucide-react";
import vouchers from "@/constants/voucher";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { GiftVoucherCard } from "@/app/gift-voucher/components/GiftVoucherCard";

export default function GiftVoucherHero() {
    const [showSummary, setShowSummary] = useState(false);
    const [selectedVouchers, setSelectedVouchers] = useState<
        Map<string, { amount: number; quantity: number }>
    >(new Map());

    const getTotalItems = () => {
        let total = 0;
        selectedVouchers.forEach(({ quantity }) => (total += quantity));
        return total;
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-primary/5 to-background pb-24">

            {/* HERO SECTION */}
            <div className="flex flex-col items-center justify-center pt-24 pb-12 text-center px-6">
                <h1 className="text-3xl md:text-5xl font-extrabold">
                    Gift a Culinary Experience
                </h1>

                <p className="mt-3 text-lg max-w-xl opacity-80">
                    Choose from our curated collection of dining vouchers and
                    create the perfect gift.
                </p>

                <Button
                    size="lg"
                    className="mt-6 rounded-full px-8"
                    onClick={() =>
                        document
                            .getElementById("vouchers")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    Explore Vouchers
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            {/* VOUCHER GRID */}
            <main
                id="vouchers"
                className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
            >
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        Our Voucher Collection
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Select your favorite and personalize the amount
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vouchers.map((voucher) => (
                        <GiftVoucherCard
                            key={voucher.id}
                            voucher={voucher}
                            setSelectedVouchers={setSelectedVouchers}
                            selectedVouchers={selectedVouchers}
                        />
                    ))}
                </div>
            </main>

            {/* FLOATING CART BUTTON */}
            <button
                onClick={() => setShowSummary(true)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-110 transition z-40"
            >
                <div className="relative">
                    <ShoppingCart size={22} />
                    {getTotalItems() > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                            {getTotalItems()}
                        </span>
                    )}
                </div>
            </button>

            {/* SUMMARY DIALOG */}
            <Dialog open={showSummary} onOpenChange={setShowSummary}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Order Summary</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 text-sm">
                        {selectedVouchers.size === 0 ? (
                            <p className="text-muted-foreground text-center py-8">
                                No vouchers selected yet.
                            </p>
                        ) : (
                            Array.from(selectedVouchers.entries()).map(
                                ([id, { amount, quantity }]) => (
                                    <div
                                        key={id}
                                        className="flex justify-between items-center border-b pb-2"
                                    >
                                        <div>
                                            <p className="font-medium">{id}</p>
                                            <p className="text-muted-foreground text-xs">
                                                Amount: Rs {amount}
                                            </p>
                                        </div>
                                        <span className="font-semibold">x{quantity}</span>
                                    </div>
                                )
                            )
                        )}
                    </div>

                    <Button
                        className="w-full mt-6"
                        disabled={selectedVouchers.size === 0}
                    >
                        Proceed to Checkout
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}