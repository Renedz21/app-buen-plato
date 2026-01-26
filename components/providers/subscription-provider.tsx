"use client";


import { useEffect, useState, useMemo, useCallback, createContext, useContext } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Subscription } from "@/types/subscription";

import type { SubscriptionContextValue } from "@/types/subscription";

const supabase = createClient();

interface SubscriptionProviderProps {
  children: React.ReactNode;
  userId: string | null;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

function isSubscriptionActive(subscription: Subscription | null): boolean {
  if (!subscription) return false;
  if (subscription.status === "active") return true;

  // Cancelado pero aún en periodo válido
  if (subscription.status === "canceled" && subscription.current_period_end) {
    return new Date(subscription.current_period_end) > new Date();
  }

  return false;
}

export function SubscriptionProvider({
  children,
  userId,
}: SubscriptionProviderProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    if (!userId) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .single();

    // PGRST116 = no rows found (esperado para usuarios nuevos)
    if (error && error.code !== "PGRST116") {
      console.error("Error fetching subscription:", error);
    }

    setSubscription(data as Subscription | null);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`subscription:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "subscriptions",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setSubscription(
            payload.eventType === "DELETE" ? null : (payload.new as Subscription),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const isPro = useMemo(() => isSubscriptionActive(subscription), [subscription]);

  const value = useMemo(
    () => ({ subscription, isPro, isLoading, refetch: fetchSubscription }),
    [subscription, isPro, isLoading, fetchSubscription],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}

export function useIsPro() {
  const context = useContext(SubscriptionContext);
  return context?.isPro ?? false;
}

