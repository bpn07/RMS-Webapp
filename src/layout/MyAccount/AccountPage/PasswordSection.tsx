"use client";

import { useState } from "react";

export default function PasswordSection() {
  const [password, setPassword] = useState("");

  const isValid = password.length >= 8;

  return (
    <section className="border rounded-xl p-4 space-y-3 bg-white">
      <h2 className="text-xl font-semibold">Password</h2>

      <p className="text-sm text-gray-600">
        Enter your current password to change it.
      </p>

      <div className="flex gap-3">
        <input
          type="password"
          aria-label="Current password"
          placeholder="Current password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
        />

        <button
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg transition
            ${
              isValid
                ? "bg-cyan-600 text-white hover:bg-cyan-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Edit password
        </button>
      </div>

      {!isValid && password.length > 0 && (
        <p className="text-sm text-red-500">
          Password must be at least 8 characters
        </p>
      )}
    </section>
  );
}
