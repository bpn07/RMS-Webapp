"use client";

import { useState, KeyboardEvent } from "react";
import { Mail, X } from "lucide-react";
// import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ForgotPasswordPopup } from "@/components/ForgotPassword";

type Alert = {
  id: number;
  type: "success" | "error";
  message: string;
};

export default function LoginWithEmail() {
  const [email, setEmail] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // const router = useRouter();
  let alertIdCounter = 0;

  const showAlert = (type: "success" | "error", message: string) => {
    const id = alertIdCounter++;
    setAlerts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 3000);
  };

  /** Continue with password button clicked */
  const handleContinueWithPassword = () => {
    if (!email) {
      showAlert("error", "Please enter your email first");
      return;
    }
    setShowPasswordInput(true);
  };

  /** Submit password */
  const handlePasswordSubmit = () => {
    if (!password) {
      showAlert("error", "Please enter your password");
      return;
    }
    showAlert("success", `Logged in with email: ${email}`);
    // router.push("/phoneverification");
  };

  /** Cancel password input */
  const handleCancelPassword = () => {
    setShowPasswordInput(false);
    setPassword("");
  };

  /** Magic link login */
  const handleMagicLink = () => {
    if (!email) {
      showAlert("error", "Please enter your email first");
      return;
    }
    showAlert("success", `Magic link sent to ${email}`);
    // router.push("/phoneverification");
  };

  /** Handle enter key press */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!showPasswordInput) {
        handleContinueWithPassword();
      } else {
        handlePasswordSubmit();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-lg relative">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Login with Email
        </h1>

        {/* Email Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Continue With Password */}
        {!showPasswordInput && (
          <button
            type="button"
            onClick={handleContinueWithPassword}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            Continue With Password
          </button>
        )}

        {/* Animated password input */}
        <AnimatePresence>
          {showPasswordInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col gap-3 mt-4 overflow-hidden"
            >
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <ForgotPasswordPopup />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePasswordSubmit}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Submit Password
                </button>
                <button
                  type="button"
                  onClick={handleCancelPassword}
                  className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue With Magic Link */}
        <button
          type="button"
          onClick={handleMagicLink}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          Continue With Magic Link
        </button>

        {/* Toast Alerts Queue */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className={`px-6 py-3 rounded-lg shadow-lg font-medium text-white text-center max-w-xs mx-auto ${
                  alert.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {alert.message}
                <X
                  className="inline ml-2 w-4 h-4 cursor-pointer"
                  onClick={() =>
                    setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
