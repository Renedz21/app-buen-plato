import { CustomerPortal } from "@polar-sh/nextjs";
import { createClient } from "@/lib/supabase/server";

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
  getCustomerId: async (req) => {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      throw new Error("Usuario no autenticado");
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("polar_customer_id")
      .eq("user_id", user.id)
      .single();

    if (!subscription?.polar_customer_id) {
      throw new Error("No se encontró el customer_id de Polar");
    }

    return subscription.polar_customer_id;
  },
});
