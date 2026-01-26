"use client";

import { createContext, useContext, useState, useMemo, useTransition } from "react";
import { consumeCreditAction, refreshCreditsAction } from "@/lib/credits/actions";

interface CreditsContextValue {
  credits: number;
  hasCredits: boolean;
  resetTime: string | null;
  consumeCredit: () => Promise<boolean>;
  refresh: () => Promise<void>;
  isConsuming: boolean;
}

const CreditsContext = createContext<CreditsContextValue | undefined>(undefined);

interface CreditsProviderProps {
  children: React.ReactNode;
  initialCredits: number;
  initialResetTime: string | null;
  userId: string | null;
  isPro: boolean;
}

export function CreditsProvider({
  children,
  initialCredits,
  initialResetTime,
  userId,
  isPro,
}: CreditsProviderProps) {
  const [credits, setCredits] = useState(initialCredits);
  const [resetTime, setResetTime] = useState(initialResetTime);
  const [isPending, startTransition] = useTransition();

  const consumeCredit = async (): Promise<boolean> => {
    if (!userId) return false;
    if (isPro) return true;
    if (credits <= 0) return false;

    // Optimistic update
    const previousCredits = credits;
    setCredits((prev) => Math.max(0, prev - 1));

    try {
      const result = await consumeCreditAction(userId, isPro);

      if (!result.success) {
        // Revertir si falla
        setCredits(previousCredits);
        return false;
      }

      // Confirmar con el valor real
      setCredits(result.remaining);
      return true;
    } catch (error) {
      console.error("Error consuming credit:", error);
      // Revertir
      setCredits(previousCredits);
      return false;
    }
  };

  const refresh = async () => {
    if (!userId) return;

    startTransition(async () => {
      const result = await refreshCreditsAction(userId, isPro);
      setCredits(result.credits);
      setResetTime(result.resetTime);
    });
  };

  const hasCredits = useMemo(() => {
    if (isPro) return true;
    return credits > 0;
  }, [credits, isPro]);

  const value = useMemo(
    () => ({
      credits: isPro ? -1 : credits,
      hasCredits,
      resetTime,
      consumeCredit,
      refresh,
      isConsuming: isPending,
    }),
    [credits, hasCredits, resetTime, isPending, isPro]
  );

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits must be used within CreditsProvider");
  }
  return context;
}