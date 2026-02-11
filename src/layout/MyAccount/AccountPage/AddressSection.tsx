// components/account/AddressSection.tsx
import AddressCard from "./AddressCard";

export default function AddressSection() {
  return (
    <section className="border rounded-xl p-4 space-y-3 bg-white">
      <h2 className="text-xl font-semibold">Saved Addresses</h2>
      <AddressCard />
    </section>
  );
}
