import Navbar from "@/components/modules/shared/navbar";
import { CreditsWrapper } from "@/components/providers/credits-wrapper";
import { SubscriptionWrapper } from "@/components/providers/subscription-wrapper";
import { getSubscription } from "@/lib/subscription/server";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return null;
  }

  // React.cache() deduplica: SubscriptionWrapper llama getSubscription
  // internamente pero es un cache hit (mismos args, mismo request)
  const { isPro, isCanceled } = await getSubscription(user.id);

  return (
    <section className="bg-background grid min-h-dvh grid-rows-[auto_1fr]">
      <SubscriptionWrapper userId={user.id}>
        <CreditsWrapper userId={user.id} isPro={isPro}>
          <Navbar
            email={user?.email ?? ""}
            isPro={isPro}
            isCanceled={isCanceled}
          />
          <main className="container mx-auto max-w-4xl px-4 py-8">
            {children}
          </main>
        </CreditsWrapper>
      </SubscriptionWrapper>
    </section>
  );
}
