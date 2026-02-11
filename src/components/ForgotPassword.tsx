"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ForgotPasswordPopup() {
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (cooldown > 0) return;

    console.log("Send reset link to:", email);

    setSuccess(true);
    setCooldown(30);
  };

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEmail("");
      setSuccess(false);
      setCooldown(0);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <a className="text-sm italic hover:underline flex justify-end cursor-pointer">
          Forgot Password?
        </a>
      </DialogTrigger>

      <DialogContent className="bg-white p-6 rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Reset Your Password
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Enter your email address and we’ll send you instructions to reset
            your password.
          </p>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {success && (
            <p className="text-sm text-green-600">
              Reset link sent successfully to your email.
            </p>
          )}
        </div>

        <DialogFooter className="mt-4 flex">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={cooldown > 0 || !email}
          >
            {cooldown > 0 ? `Resend in ${cooldown} sec` : "Send Reset Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
