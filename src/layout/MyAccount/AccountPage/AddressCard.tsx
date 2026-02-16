"use client";

import { useState, useRef } from "react";
import { Phone, FileText, MapPin, Pencil, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Address = {
  id: number;
  city: string;
  phone: string;
  note?: string;
};

export default function AddressCard() {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      city: "Kathmandu",
      phone: "+977 9812345678",
      note: "Call before arrival",
    },
    {
      id: 2,
      city: "Pokhara",
      phone: "+977 9801234567",
      note: "Leave at reception",
    },
  ]);

  const [draft, setDraft] = useState<Address>({
    id: 0,
    city: "",
    phone: "",
    note: "",
  });

  // Refs to scroll to
  const addressRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleSave = () => {
    const newId = editingId || Date.now();

    if (editingId) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId ? { ...draft, id: editingId } : addr,
        ),
      );
    } else {
      setAddresses((prev) => [...prev, { ...draft, id: newId }]);
    }

    setOpen(false);

    // Scroll to the new/edited address after state updates
    setTimeout(() => {
      addressRefs.current[newId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleEdit = (address: Address) => {
    setDraft(address);
    setEditingId(address.id);
    setOpen(true);
  };

  const handleAddNew = () => {
    setDraft({ id: 0, city: "", phone: "", note: "" });
    setEditingId(null);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAddNew}>Add New Address</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            ref={(el) => {
              addressRefs.current[address.id] = el;
            }}
            className="space-y-2 p-4 border rounded-lg"
          >
            {/* Map using city name */}
            {address.city && (
              <div className="w-full h-40 rounded-lg overflow-hidden border">
                <iframe
                  title={`Map for ${address.city}`}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    address.city,
                  )}&z=15&output=embed`}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-gray-800">
                <MapPin size={16} className="text-cyan-600" />
                {address.city}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="flex items-center gap-1 text-sm text-cyan-600 hover:underline cursor-pointer"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="flex items-center gap-1 text-sm text-red-600 hover:underline cursor-pointer"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={16} />
              {address.phone}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText size={16} />
              {address.note || "No rider directions"}
            </div>
          </div>
        ))}
      </div>

      {/* ===== Edit Dialog ===== */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Address" : "Add Address"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="City"
              value={draft.city}
              onChange={(e) => setDraft({ ...draft, city: e.target.value })}
            />

            <Input
              placeholder="Phone"
              value={draft.phone}
              onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
            />

            <Textarea
              value={draft.note}
              onChange={(e) => setDraft({ ...draft, note: e.target.value })}
              placeholder="e.g. Call before arrival"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
