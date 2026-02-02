"use client";

import { createContext, useContext, useMemo } from "react";

interface SubscriptionContextValue {
  isPro: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(
  undefined,
);

interface SubscriptionProviderProps {
  children: React.ReactNode;
  initialIsPro: boolean;
}

export function SubscriptionProvider({
  children,
  initialIsPro,
}: SubscriptionProviderProps) {
  const value = useMemo(() => ({ isPro: initialIsPro }), [initialIsPro]);

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider",
    );
  }
  return context;
}

export function useIsPro() {
  const context = useContext(SubscriptionContext);
  return context?.isPro ?? false;
}
