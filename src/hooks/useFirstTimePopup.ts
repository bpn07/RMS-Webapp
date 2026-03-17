"use client";

import { useEffect, useState } from "react";

export function useFirstTimePopup(key: string) {
  const [open, setOpen] = useState(false);

useEffect(() => {
  const isFirst = !sessionStorage.getItem(key);

  if (isFirst) {
    setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(key, "true");
    }, 800);
  }
}, [key]);

  return { open, setOpen };
}
