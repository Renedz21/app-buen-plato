import { getCredits } from "@/lib/credits/server";
import { CreditsProvider } from "./credits-provider";

interface CreditsWrapperProps {
  children: React.ReactNode;
  userId: string | null;
  isPro: boolean;
}

export async function CreditsWrapper({
  children,
  userId,
  isPro,
}: CreditsWrapperProps) {
  const { credits } = await getCredits(userId, isPro);

  return (
    <CreditsProvider initialCredits={credits} userId={userId} isPro={isPro}>
      {children}
    </CreditsProvider>
  );
}
