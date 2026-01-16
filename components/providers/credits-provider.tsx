"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { CreditsContext } from "@/contexts/credits-context";
import type { UserCredits } from "@/types/credits";

const supabase = createClient();

interface CreditsProviderProps {
  children: React.ReactNode;
  userId: string | null;
  isPro: boolean;
}

export function CreditsProvider({
  children,
  userId,
  isPro,
}: CreditsProviderProps) {
  const [credits, setCredits] = useState<number>(5);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCredits = useCallback(async () => {
    if (!userId) {
      setCredits(5);
      setIsLoading(false);
      return;
    }

    // Pro users have unlimited credits
    if (isPro) {
      setCredits(-1); // -1 indicates unlimited
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("user_credits")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching credits:", error);
      setCredits(0);
      setIsLoading(false);
      return;
    }

    // Initialize if doesn't exist
    if (!data) {
      const { data: newCredits } = await supabase
        .from("user_credits")
        .insert({
          user_id: userId,
          credits_remaining: 5,
          last_reset_date: today,
        })
        .select()
        .single();

      setCredits(newCredits?.credits_remaining ?? 5);
      setIsLoading(false);
      return;
    }

    // Check if needs reset
    if (data.last_reset_date !== today) {
      const { data: resetData } = await supabase
        .from("user_credits")
        .update({
          credits_remaining: 5,
          last_reset_date: today,
        })
        .eq("user_id", userId)
        .select()
        .single();

      setCredits(resetData?.credits_remaining ?? 5);
    } else {
      setCredits(data.credits_remaining);
    }

    setIsLoading(false);
  }, [userId, isPro]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  // Real-time subscription to credit changes
  useEffect(() => {
    if (!userId || isPro) return;

    const channel = supabase
      .channel(`credits:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_credits",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            setCredits(5);
          } else {
            const newData = payload.new as UserCredits;
            setCredits(newData.credits_remaining);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, isPro]);

  const consumeCredit = useCallback(async (): Promise<boolean> => {
    if (!userId) return false;
    if (isPro) return true; // Pro users always have credits

    // Optimistic update
    setCredits((prev) => Math.max(0, prev - 1));

    return true;
  }, [userId, isPro]);

  const hasCredits = useMemo(() => {
    if (isPro) return true;
    return credits > 0;
  }, [credits, isPro]);

  const value = useMemo(
    () => ({
      credits: isPro ? -1 : credits,
      isLoading,
      hasCredits,
      consumeCredit,
      refetch: fetchCredits,
    }),
    [credits, isLoading, hasCredits, consumeCredit, fetchCredits, isPro],
  );

  return (
    <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>
  );
}
