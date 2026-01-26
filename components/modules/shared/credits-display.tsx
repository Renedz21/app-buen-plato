import Link from "next/link";
import { Crown, Zap } from "lucide-react";
import { useCredits } from "@/components/providers/credits-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CreditsDisplay({ isPro }: { isPro: boolean }) {
  const { credits } = useCredits();

  return (
    <Button
      variant="ghost"
      className={cn("bg-muted inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm", isPro && "bg-primary/10 text-primary")}
      asChild={!isPro}
    >
      {isPro ? (
        <>
          <Crown className="h-4 w-4 text-primary" />
          <span className="font-medium">Pro</span>
        </>
      ) : (
        <Link href="/upgrade" prefetch>
          <Zap
            className={cn(
              "h-4 w-4",
              credits <= 1
                ? "text-red-500"
                : credits <= 2
                  ? "text-yellow-500"
                  : "text-green-500",
            )}
          />
          <span className="font-medium">{credits}/5 intentos hoy</span>
        </Link>
      )}
    </Button>
  );
}
