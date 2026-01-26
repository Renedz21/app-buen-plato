import Navbar from "@/components/modules/shared/navbar";
import { CreditsWrapper } from "@/components/providers/credits-wrapper";
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

  // Verificar si el usuario es Pro
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", user?.id)
    .single();

  const isPro = subscription?.status === "active";

  return (
    <section className="bg-background grid min-h-dvh grid-rows-[auto_1fr]">
      <CreditsWrapper userId={user?.id ?? null} isPro={isPro}>
        <Navbar email={user?.email ?? ""} isPro={isPro} />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          {children}
        </main>
      </CreditsWrapper>
    </section>
  );
}
