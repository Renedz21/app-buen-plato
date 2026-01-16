import { useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";

interface CheckoutOptions {
  productId: string;
}

export function useCheckout() {
  const { user } = useAuth();

  const checkout = useCallback(
    ({ productId }: CheckoutOptions) => {
      if (!user?.id) {
        throw new Error("User must be logged in to checkout");
      }

      const params = new URLSearchParams({
        productId,
        metadata: JSON.stringify({ user_id: user.id }),
      });

      window.location.href = `/api/checkout?${params.toString()}`;
    },
    [user?.id],
  );

  return { checkout, isReady: !!user?.id };
}
