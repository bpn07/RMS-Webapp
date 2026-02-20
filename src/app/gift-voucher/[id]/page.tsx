"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import vouchers from "@/constants/voucher";
import { useCartStore } from "@/store/cartStore";
import { VoucherPersonalisation } from "@/types/voucher";

export default function VoucherDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const unwrappedParams = use(params);
    const voucherId = unwrappedParams.id;
    const router = useRouter();

    const voucher = vouchers.find((v) => v.id === voucherId);
    const otherVouchers = vouchers.filter((v) => v.id !== voucherId);

    const [amount, setAmount] = useState<number>(voucher?.minAmount || 0);
    const [quantity, setQuantity] = useState<number>(1);
    const [showModal, setShowModal] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const addVoucherToCart = useCartStore(
        (state) => state.addVoucherToCart
    );

    if (!voucher) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-2xl text-muted-foreground">
                    Voucher not found.
                </p>
            </div>
        );
    }

    const handleContinue = () => {
        addVoucherToCart({
            id: voucher.id,
            name: voucher.name,
            price: amount,
            quantity,
            personalisation: {} as VoucherPersonalisation,
        });
        setIsAdded(true);
        setTimeout(() => {
            setShowModal(false);
            setIsAdded(false);
            router.push(`/gift-voucher/${voucher.id}/personalise`);
        }, 1200);
    };

    return (
        <div className="bg-background text-foreground min-h-screen px-6 py-16 mt-20">
            {/* Back */}
            <div className="max-w-6xl mx-auto mb-10">
                <Link
                    href="/voucher"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition"
                >
                    <ChevronLeft size={18} />
                    Back to Vouchers
                </Link>
            </div>

            {/* Main Section */}
            <div className="max-w-6xl mx-auto mb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Image */}
                    <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                        <Image
                            src={"https://corbridgelarder.co.uk/cdn/shop/products/CORBRIDGE-LARDER-VOUCHER-ARTWORK_800x.jpg?v=1638888491"}
                            alt={voucher.name}
                            width={700}
                            height={500}
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    {/* Content */}
                    <div>
                        <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-semibold mb-6">
                            Premium Experience
                        </span>

                        <h1 className="text-5xl font-serif font-light mb-4">
                            {voucher.name}
                        </h1>

                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            {voucher.description}
                        </p>

                        <div className="bg-linear-to-r from-primary to-primary/80 text-primary-foreground inline-block px-6 py-4 rounded-xl mb-10 shadow-lg">
                            <p className="text-sm opacity-90">Minimum Value</p>
                            <p className="text-3xl font-bold">£{voucher.minAmount}</p>
                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-3"
                        >
                            <ShoppingCart size={20} />
                            Personalise & Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="max-w-6xl mx-auto mb-20 bg-muted/40 p-10 rounded-2xl">
                <h2 className="text-3xl font-serif mb-8">About This Voucher</h2>
                <div className="space-y-4">
                    {voucher.longDescription.map((paragraph: string, idx: number) => (
                        <p key={idx} className="text-muted-foreground leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>

            {/* Related */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-serif mb-10">
                    You might also like
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherVouchers.map((v) => (
                        <Link
                            key={v.id}
                            href={`/gift-voucher/${v.id}`}
                            className="group border rounded-2xl overflow-hidden bg-card hover:shadow-2xl transition-all"
                        >
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={"https://corbridgelarder.co.uk/cdn/shop/products/CORBRIDGE-LARDER-VOUCHER-ARTWORK_800x.jpg?v=1638888491"}
                                    alt={v.name}
                                    width={600}
                                    height={400}
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-6 bg-linear-to-br from-primary to-primary/80 text-primary-foreground">
                                <h3 className="text-lg font-serif mb-2">
                                    {v.name}
                                </h3>
                                <p className="text-sm opacity-90 mb-4">
                                    {v.description}
                                </p>
                                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                                    From £{v.minAmount}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 px-4">
                    <div className="bg-card text-card-foreground p-10 rounded-3xl w-full max-w-md shadow-2xl border">
                        {!isAdded ? (
                            <>
                                <h2 className="text-3xl font-serif mb-8">
                                    Personalise Your Voucher
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Voucher Value (£)
                                        </label>
                                        <select
                                            value={amount}
                                            onChange={(e) =>
                                                setAmount(Number(e.target.value))
                                            }
                                            className="w-full border rounded-lg p-3 bg-background focus:ring-2 focus:ring-primary"
                                        >
                                            {[25, 50, 75, 100].map((value) => (
                                                <option key={value} value={value}>
                                                    £{value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(
                                                    Math.max(1, Number(e.target.value))
                                                )
                                            }
                                            className="w-full border rounded-lg p-3 bg-background focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-10">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-3 rounded-lg bg-muted hover:opacity-80 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleContinue}
                                        className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-[1.03] transition"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check size={32} className="text-primary" />
                                </div>
                                <h3 className="text-2xl font-serif mb-2">
                                    Added to Cart!
                                </h3>
                                <p className="text-muted-foreground">
                                    Redirecting...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}