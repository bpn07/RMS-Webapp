"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFirstTimePopup } from "@/hooks/useFirstTimePopup";

export function FirstTimePopup() {
  const { open, setOpen } = useFirstTimePopup("first_time_welcome_popup");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome 👋</DialogTitle>
          <DialogDescription>
            This is shown only once. You won’t see this again.
          </DialogDescription>
        </DialogHeader>

        <div className="text-sm text-muted-foreground">
          • Add items to cart • Adjust quantity • Checkout when ready
        </div>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
