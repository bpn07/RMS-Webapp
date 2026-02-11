"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PHHero() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSendOTP = () => {
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    alert(`OTP sent to ${phone}`);

    router.push("/phoneverification"); // replace with your route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Verify Your Phone
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 text-center">
          Enter your phone number and we’ll send you a verification code.
        </p>

        {/* Phone Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 234 567 8900"
            className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Continue / Send OTP Button */}
        <button
          type="button"
          onClick={handleSendOTP}
          className="w-full cursor-pointer bg-teal-500! hover:bg-teal-600! text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}
