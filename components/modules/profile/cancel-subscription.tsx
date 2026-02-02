"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatDateLong } from "@/lib/format-date";

interface CancelSubscriptionProps {
  subscriptionId: string;
  currentPeriodEnd: string | null;
}

export function CancelSubscription({
  subscriptionId,
  currentPeriodEnd,
}: CancelSubscriptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al cancelar la suscripción");
      }

      toast.success("Suscripción cancelada correctamente");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error al cancelar la suscripción",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground h-auto p-0 text-sm underline-offset-4 hover:bg-transparent hover:underline"
        >
          Cancelar suscripción
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Cancelar suscripción Pro?</AlertDialogTitle>
          <AlertDialogDescription>
            Tu suscripción se cancelará, pero seguirás teniendo acceso a las
            funciones Pro hasta el{" "}
            <span className="text-foreground font-medium">
              {formatDateLong(currentPeriodEnd)}
            </span>
            . Después de esa fecha, tu cuenta volverá al plan gratuito con 5
            consultas diarias.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Mantener suscripción
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cancelar suscripción
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
