"use client";

import { useState } from "react";

export default function DeleteAccount() {
  const [confirmText, setConfirmText] = useState("");

  const isConfirmed = confirmText === "DELETE";
  return (
    <section className="border rounded-xl p-4 space-y-3 bg-white">
      <h2 className="text-xl font-semibold">Password</h2>

      <p className="text-sm text-gray-600">
        To submit a request for us to delete your account, type “DELETE” in the
        box below.
      </p>
      <p className="text-sm text-gray-600">
        Once you’ve submitted your request you’ll no longer be able to log in,
        access your credit, or restore your account.
      </p>
      <p className="text-sm text-gray-500">
        We’ll delete your account and associated personal data within one month,
        and in line with our Privacy Policy. Deleting your account is permanent.
      </p>

      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500">Type DELETE to confirm:</p>

        <input
          type="text"
          aria-label="Confirm deletion"
          placeholder="Type 'DELETE' to confirm"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />

        <button
          disabled={!isConfirmed}
          className={`px-4 py-2 rounded-lg text-white transition ${
            isConfirmed
              ? "bg-red-600 hover:bg-red-700 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Permanently Delete Account
        </button>
      </div>
    </section>
  );
}
