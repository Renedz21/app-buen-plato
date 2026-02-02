import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export interface SubscriptionInfo {
  isPro: boolean;
  isCanceled: boolean;
}

/**
 * Obtiene el estado de suscripción del usuario desde el servidor.
 * Usa React.cache() para deduplicar dentro del mismo request (render).
 *
 * Un usuario es "Pro" si:
 * - status === "active"
 * - status === "canceled" pero current_period_end está en el futuro
 *   (pagó hasta fin de periodo)
 */
export const getSubscription = cache(
  async (userId: string | null): Promise<SubscriptionInfo> => {
    if (!userId) {
      return { isPro: false, isCanceled: false };
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("subscriptions")
      .select("status, current_period_end")
      .eq("user_id", userId)
      .single();

    // PGRST116 = no rows found (usuario sin suscripción)
    if (error && error.code !== "PGRST116") {
      console.error("Error fetching subscription:", error);
    }

    if (!data) {
      return { isPro: false, isCanceled: false };
    }

    const isActive = data.status === "active";
    const isCanceledButActive =
      data.status === "canceled" &&
      data.current_period_end != null &&
      new Date(data.current_period_end) > new Date();

    return {
      isPro: isActive || isCanceledButActive,
      isCanceled: data.status === "canceled",
    };
  },
);
