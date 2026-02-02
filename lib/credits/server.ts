import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

const FREE_CREDITS_LIMIT = 5;

// Cache de React para deduplicate requests dentro del mismo render
export const getCredits = cache(
  async (userId: string | null, isPro: boolean) => {
    // Usuarios Pro tienen créditos ilimitados
    if (isPro) {
      return {
        credits: -1,
        resetTime: null,
      };
    }

    if (!userId) {
      return {
        credits: FREE_CREDITS_LIMIT,
        resetTime: null,
      };
    }

    const supabase = await createClient();

    try {
      // Usar la función RPC que maneja el reset automáticamente
      const { data: creditsData, error: rpcError } = await supabase.rpc(
        "check_and_reset_credits",
        { p_user_id: userId },
      );

      if (rpcError) {
        console.error("Error fetching credits with RPC:", rpcError);

        // Fallback: leer directamente de la tabla
        const { data, error } = await supabase
          .from("user_credits")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error) {
          // Si no existe, inicializar
          if (error.code === "PGRST116") {
            const { data: newCredits } = await supabase
              .from("user_credits")
              .insert({
                user_id: userId,
                credits_remaining: FREE_CREDITS_LIMIT,
                last_reset_timestamp: new Date().toISOString(),
              })
              .select()
              .single();

            return {
              credits: newCredits?.credits_remaining ?? FREE_CREDITS_LIMIT,
              resetTime: newCredits?.last_reset_timestamp
                ? new Date(
                    new Date(newCredits.last_reset_timestamp).getTime() +
                      24 * 60 * 60 * 1000,
                  ).toISOString()
                : null,
            };
          }

          throw error;
        }

        return {
          credits: data.credits_remaining,
          resetTime: data.last_reset_timestamp
            ? new Date(
                new Date(data.last_reset_timestamp).getTime() +
                  24 * 60 * 60 * 1000,
              ).toISOString()
            : null,
        };
      }

      // La función RPC retorna un array con un objeto
      if (creditsData && creditsData.length > 0) {
        const creditInfo = creditsData[0];
        return {
          credits: creditInfo.credits_remaining,
          resetTime: creditInfo.next_reset,
        };
      }

      // Si no hay datos, inicializar
      const { data: newCredits } = await supabase
        .from("user_credits")
        .insert({
          user_id: userId,
          credits_remaining: FREE_CREDITS_LIMIT,
          last_reset_timestamp: new Date().toISOString(),
        })
        .select()
        .single();

      return {
        credits: newCredits?.credits_remaining ?? FREE_CREDITS_LIMIT,
        resetTime: newCredits?.last_reset_timestamp
          ? new Date(
              new Date(newCredits.last_reset_timestamp).getTime() +
                24 * 60 * 60 * 1000,
            ).toISOString()
          : null,
      };
    } catch (error) {
      console.error("Error in getCredits:", error);
      return {
        credits: 0,
        resetTime: null,
      };
    }
  },
);
