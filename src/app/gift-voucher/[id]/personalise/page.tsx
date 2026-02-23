"use client";

import { useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";
import vouchers from "@/constants/voucher";
import { VoucherPersonalisation } from "@/types/voucher";

const MESSAGE_LIMIT = 200;

export default function VoucherPersonalisationPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const voucher = vouchers.find((v) => v.id === id);

    const addVoucherToCart = useCartStore(
        (state) => state.addVoucherToCart
    );

    const [senderName, setSenderName] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [message, setMessage] = useState("");

    const [deliveryMethod, setDeliveryMethod] =
        useState<"email" | "post">("email");

    const [recipientEmail, setRecipientEmail] = useState("");
    const [postalOption, setPostalOption] = useState("");
    const [postRecipient, setPostRecipient] = useState("");
    const [postCode, setPostCode] = useState("");

    if (!voucher) return notFound();

    const isEmailValid =
        deliveryMethod === "email" &&
        recipientEmail.trim().length > 3;

    const isPostValid =
        deliveryMethod === "post" &&
        postalOption &&
        postRecipient.trim().length > 1 &&
        postCode.trim().length > 1;

    const isFormValid =
        senderName.trim().length > 1 &&
        recipientName.trim().length > 1 &&
        message.length <= MESSAGE_LIMIT &&
        (isEmailValid || isPostValid);


    const handleAddToCart = () => {
        if (!isFormValid) return;

        const deliveryDetails =
            deliveryMethod === "email"
                ? {
                    method: "email" as const,
                    recipientEmail,
                    scheduledDate: null,
                }
                : {
                    method: "post" as const,
                    postalOption,
                    recipientName: postRecipient,
                    postCode,
                };

        const personalisation: VoucherPersonalisation = {
            senderName,
            recipientName,
            message,
            delivery: deliveryDetails,
        };

        addVoucherToCart({
            id: voucher.id,
            name: voucher.name,
            price: voucher.minAmount,
            quantity: 1,
            personalisation,
        });

        router.push("/billing");
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-primary/5 to-background pt-28 pb-40">
            <div className="max-w-5xl mx-auto px-6 space-y-14">

                {/* HEADER */}
                <div className="text-center space-y-3">
                    <h1 className="text-4xl md:text-5xl font-serif font-light">
                        Personalise Your Voucher
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Add delivery details and a meaningful message.
                    </p>
                </div>

                {/* DELIVERY METHOD */}
                <Card className="rounded-3xl border shadow-sm">
                    <CardContent className="p-10 space-y-8">
                        <h2 className="text-2xl font-serif">
                            Delivery Method
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <button
                                type="button"
                                onClick={() => setDeliveryMethod("email")}
                                className={`rounded-2xl border p-6 text-left transition-all
                ${deliveryMethod === "email"
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]"
                                        : "bg-background hover:bg-muted"
                                    }`}
                            >
                                <h3 className="font-semibold text-lg">
                                    Email Delivery
                                </h3>
                                <p className="text-sm opacity-80 mt-1">
                                    Delivered instantly to recipient inbox.
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() => setDeliveryMethod("post")}
                                className={`rounded-2xl border p-6 text-left transition-all
                ${deliveryMethod === "post"
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]"
                                        : "bg-background hover:bg-muted"
                                    }`}
                            >
                                <h3 className="font-semibold text-lg">
                                    Postal Delivery
                                </h3>
                                <p className="text-sm opacity-80 mt-1">
                                    Beautifully printed & shipped.
                                </p>
                            </button>
                        </div>

                        {/* EMAIL FORM */}
                        {deliveryMethod === "email" && (
                            <div className="space-y-3 pt-4">
                                <Label>Recipient Email</Label>
                                <Input
                                    value={recipientEmail}
                                    onChange={(e) =>
                                        setRecipientEmail(e.target.value)
                                    }
                                    placeholder="recipient@email.com"
                                    className="rounded-xl"
                                />
                            </div>
                        )}

                        {/* POST FORM */}
                        {deliveryMethod === "post" && (
                            <div className="space-y-6 pt-4">
                                <div className="space-y-2">
                                    <Label>Postal Option</Label>
                                    <select
                                        value={postalOption}
                                        onChange={(e) =>
                                            setPostalOption(e.target.value)
                                        }
                                        className="w-full rounded-xl border p-3 bg-background focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Choose option</option>
                                        <option value="standard">
                                            Standard Post
                                        </option>
                                        <option value="express">
                                            Express Post
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Recipient Name</Label>
                                    <Input
                                        value={postRecipient}
                                        onChange={(e) =>
                                            setPostRecipient(e.target.value)
                                        }
                                        className="rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Post Code</Label>
                                    <Input
                                        value={postCode}
                                        onChange={(e) =>
                                            setPostCode(e.target.value)
                                        }
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* MESSAGE SECTION */}
                <Card className="rounded-3xl border shadow-sm">
                    <CardContent className="p-10 space-y-8">
                        <h2 className="text-2xl font-serif">
                            Personal Message
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Sender Name</Label>
                                <Input
                                    value={senderName}
                                    onChange={(e) =>
                                        setSenderName(e.target.value)
                                    }
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Recipient Name</Label>
                                <Input
                                    value={recipientName}
                                    onChange={(e) =>
                                        setRecipientName(e.target.value)
                                    }
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Message</Label>
                                <Textarea
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    rows={5}
                                    maxLength={MESSAGE_LIMIT}
                                    className="rounded-xl resize-none"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Make it heartfelt 💌</span>
                                    <span>
                                        {message.length}/{MESSAGE_LIMIT}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* STICKY CTA */}
            <div className="py-4">
                <div className="max-w-5xl mx-auto px-6 flex justify-end">
                    <Button
                        size="lg"
                        disabled={!isFormValid}
                        onClick={handleAddToCart}
                        className="rounded-full px-12 shadow-lg hover:scale-[1.02] transition"
                    >
                        Continue to Billing
                    </Button>
                </div>
            </div>
        </div>
    );
}