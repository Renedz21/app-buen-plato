"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { CreditsContext } from "@/contexts/credits-context";
import type { UserCredits } from "@/types/credits";

const supabase = createClient();
const FREE_CREDITS_LIMIT = 5;

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
  const [credits, setCredits] = useState<number>(FREE_CREDITS_LIMIT);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCredits = useCallback(async () => {
    if (!userId) {
      setCredits(FREE_CREDITS_LIMIT);
      setIsLoading(false);
      return;
    }

    // Usuarios Pro tiene creditos ilimitados
    if (isPro) {
      setCredits(-1); // -1 indica ilimitado
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

    // Inicializa si no existe
    if (!data) {
      const { data: newCredits, error: insertError } = await supabase
        .from("user_credits")
        .insert({
          user_id: userId,
          credits_remaining: FREE_CREDITS_LIMIT,
          last_reset_date: today,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Error creating credits record:", insertError);
        setCredits(0);
      } else {
        setCredits(newCredits?.credits_remaining ?? FREE_CREDITS_LIMIT);
      }
      setIsLoading(false);
      return;
    }

    // Verifica si necesita un reseteo
    if (data.last_reset_date !== today) {
      const { data: resetData, error: resetError } = await supabase
        .from("user_credits")
        .update({
          credits_remaining: FREE_CREDITS_LIMIT,
          last_reset_date: today,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .select()
        .single();

      if (resetError) {
        console.error("Error resetting credits:", resetError);
        setCredits(data.credits_remaining);
      } else {
        setCredits(resetData?.credits_remaining ?? FREE_CREDITS_LIMIT);
      }
    } else {
      setCredits(data.credits_remaining);
    }

    setIsLoading(false);
  }, [userId, isPro]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

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
            setCredits(FREE_CREDITS_LIMIT);
          } else {
            const newData = payload.new as UserCredits;
            const today = new Date().toISOString().split("T")[0];
            
            // Si cambió la fecha, resetear
            if (newData.last_reset_date !== today) {
              setCredits(FREE_CREDITS_LIMIT);
            } else {
              setCredits(newData.credits_remaining);
            }
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
    if (isPro) return true; // Usuarios Pro siempre tienen creditos

    // Verificar que tiene créditos disponibles
    if (credits <= 0) {
      return false;
    }

    // Optimistic update
    const newCredits = Math.max(0, credits - 1);
    setCredits(newCredits);

    try {
      const { data, error } = await supabase
        .from("user_credits")
        .update({
          credits_remaining: newCredits,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .select()
        .single();

      if (error) {
        console.error("Error consuming credit:", error);
        // Revertir el cambio optimista
        setCredits(credits);
        return false;
      }

      // Confirmar con el valor real de la DB
      setCredits(data.credits_remaining);
      return true;
    } catch (error) {
      console.error("Error consuming credit:", error);
      // Revertir el cambio optimista
      setCredits(credits);
      return false;
    }
  }, [userId, isPro, credits]);

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
