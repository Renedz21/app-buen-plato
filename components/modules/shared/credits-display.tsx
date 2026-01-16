"use client";

import { Zap } from "lucide-react";
import { useCredits } from "@/hooks/shared/use-credits";
import { useIsPro } from "@/contexts/subscription-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CreditsDisplay() {
  const { credits, isLoading } = useCredits();
  const isPro = useIsPro();

  if (isPro || isLoading) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      className="bg-muted inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm"
      asChild
    >
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
    </Button>
  );
}
