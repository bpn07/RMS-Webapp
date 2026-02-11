"use client";

import { useEffect, useState } from "react";

export function useFirstTimePopup(key: string) {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;

    return !localStorage.getItem(key);
  });

  useEffect(() => {
    if (open) {
      localStorage.setItem(key, "true");
    }
  }, [open, key]);

  return { open, setOpen };
}
