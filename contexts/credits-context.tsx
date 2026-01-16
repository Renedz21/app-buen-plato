"use client";

import { createContext, useContext } from "react";
import type { CreditsContextValue } from "@/types/credits";

export const CreditsContext = createContext<CreditsContextValue | undefined>(
  undefined,
);

export function useCredits(): CreditsContextValue {
  const context = useContext(CreditsContext);

  if (!context) {
    throw new Error("useCredits must be used within a CreditsProvider");
  }

  return context;
}
