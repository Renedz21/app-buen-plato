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
    // Esto se ejecuta en el servidor y aprovecha el cache de React
    const { credits, resetTime } = await getCredits(userId, isPro);

    return (
        <CreditsProvider
            initialCredits={credits}
            initialResetTime={resetTime}
            userId={userId}
            isPro={isPro}
        >
            {children}
        </CreditsProvider>
    );
}

// Versión con Suspense boundary
export async function CreditsWrapperWithSuspense({
    children,
    userId,
    isPro,
}: CreditsWrapperProps) {
    const { credits, resetTime } = await getCredits(userId, isPro);

    return (
        <CreditsProvider
            initialCredits={credits}
            initialResetTime={resetTime}
            userId={userId}
            isPro={isPro}
        >
            {children}
        </CreditsProvider>
    );
}