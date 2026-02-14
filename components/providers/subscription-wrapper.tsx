import { getSubscription } from "@/lib/subscription/server";
import { SubscriptionProvider } from "./subscription-provider";

interface SubscriptionWrapperProps {
  children: React.ReactNode;
  userId: string | null;
}

export async function SubscriptionWrapper({
  children,
  userId,
}: SubscriptionWrapperProps) {
  const { isPro } = await getSubscription(userId);

  return (
    <SubscriptionProvider initialIsPro={isPro}>
      {children}
    </SubscriptionProvider>
  );
}
