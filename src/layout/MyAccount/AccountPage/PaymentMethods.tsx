// components/account/PaymentMethods.tsx
import Image from "next/image";

export default function PaymentMethods() {
  return (
    <section className="border rounded-xl p-4 space-y-3 bg-white">
      <h2 className="text-xl font-semibold">Payment methods</h2>

      <div className="flex items-center justify-between border rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Image src="/placeholder.png" alt="anything" width={30} height={30} />
          <div>
            <p className="font-medium">American Express</p>
            <p className="text-sm text-gray-500">Ending 1003</p>
          </div>
        </div>

        <button
          aria-label="Delete"
          className="text-red-500 hover:bg-gray-100 p-3 rounded-2xl"
        >
          DELETE
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Want to add a new card? Add it during checkout.
      </p>
    </section>
  );
}
