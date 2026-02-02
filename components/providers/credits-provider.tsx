"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

interface CreditsContextValue {
  credits: number;
  hasCredits: boolean;
  decrementCredit: () => void;
}

const CreditsContext = createContext<CreditsContextValue | undefined>(
  undefined,
);

interface CreditsProviderProps {
  children: React.ReactNode;
  initialCredits: number;
  userId: string | null;
  isPro: boolean;
}

export function CreditsProvider({
  children,
  initialCredits,
  userId,
  isPro,
}: CreditsProviderProps) {
  const [credits, setCredits] = useState(initialCredits);

  const decrementCredit = useCallback(() => {
    if (isPro) return;
    setCredits((prev) => Math.max(0, prev - 1));
  }, [isPro]);

  const hasCredits = useMemo(() => {
    if (isPro) return true;
    return credits > 0;
  }, [credits, isPro]);

  const value = useMemo(
    () => ({
      credits: isPro ? -1 : credits,
      hasCredits,
      decrementCredit,
    }),
    [credits, hasCredits, decrementCredit, isPro],
  );

  return (
    <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits must be used within CreditsProvider");
  }
  return context;
}
