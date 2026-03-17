import { Button } from "@/components/ui/button";
import { useState } from "react";

type OrderType = "delivery" | "collection" | "dinein";

type OrderDetailsFormProps = {
    orderType: OrderType;
    onConfirm?: () => void;
};

export default function OrderDetailsForm({ orderType, onConfirm }: OrderDetailsFormProps) {
    const [table, setTable] = useState("");
    const [address, setAddress] = useState("");
    const [time, setTime] = useState("");

    return (
        <div className="space-y-4">
            {/* DELIVERY */}
            {orderType === "delivery" && (
                <>
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Delivery Address</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter address"
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Delivery Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </>
            )}

            {/* COLLECTION */}
            {orderType === "collection" && (
                <div className="space-y-1">
                    <label className="text-sm font-medium">Pickup Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            )}

            {/* DINE-IN */}
            {orderType === "dinein" && (
                <div className="space-y-1">
                    <label className="text-sm font-medium">Table Number</label>
                    <input
                        type="number"
                        value={table}
                        onChange={(e) => setTable(e.target.value)}
                        placeholder="Enter table number"
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            )}

            <Button
                className="w-full mt-4"
                onClick={() => {
                    if (onConfirm) onConfirm(); 
                }}
            >
                Confirm
            </Button>
        </div>
    );
}