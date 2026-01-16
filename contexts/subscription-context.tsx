"use client";

import { createContext, useContext } from "react";
import type { SubscriptionContextValue } from "@/types/subscription";

export const SubscriptionContext = createContext<
  SubscriptionContextValue | undefined
>(undefined);

export function useSubscription(): SubscriptionContextValue {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider",
    );
  }

  return context;
}

/** Retorna false si no hay contexto (seguro fuera del provider) */
export function useIsPro(): boolean {
  const context = useContext(SubscriptionContext);
  return context?.isPro ?? false;
}
