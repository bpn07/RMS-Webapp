"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CardInfo = {
  id: number;
  cardNumber: string;
  cardName: string;
};

export default function RewardsTab() {
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const handleAddCard = () => {
    if (!cardName || !cardNumber) return;
    setCards([
      ...cards,
      { id: Date.now(), cardName, cardNumber: cardNumber.replace(/\s/g, "") },
    ]);
    setCardName("");
    setCardNumber("");
  };

  return (
    <div className="space-y-6">
      {/* Add Card Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add Voucher Code/ Gift Card
        </h2>
        <div className="space-y-3">
          <Input
            placeholder="EG: BALLON"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <Button
            onClick={handleAddCard}
            className="bg-cyan-600 hover:bg-cyan-700 w-full"
          >
            Submit
          </Button>
        </div>
      </Card>

      {/* Added Cards Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Cards</h2>

        {cards.length === 0 ? (
          <p className="text-gray-500 text-center">
            No cards added. Please add a card to continue.
          </p>
        ) : (
          <div className="space-y-3 flex">
            {cards.map((c) => (
              <div
                key={c.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{c.cardName}</p>
                  <p className="text-sm text-gray-600">
                    **** **** **** {c.cardNumber.slice(-4)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
