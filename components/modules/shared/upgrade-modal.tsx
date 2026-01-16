"use client";

import { useState } from "react";
import { Zap, Clock, Crown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleUpgrade = () => {
    setIsNavigating(true);
    router.push("/upgrade");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
            <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
          </div>
          <DialogTitle className="text-center text-xl">
            ¡Has agotado tus intentos diarios!
          </DialogTitle>
          <DialogDescription className="text-center">
            Ya usaste tus 5 intentos gratuitos de hoy. Puedes esperar hasta
            mañana o actualizar a Pro para acceso ilimitado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium text-sm">Esperar hasta mañana</p>
                <p className="text-muted-foreground text-xs">
                  Tus intentos se resetean automáticamente a medianoche
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-primary bg-primary/5 p-3">
              <Crown className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-sm">Actualizar a Pro</p>
                <p className="text-muted-foreground text-xs">
                  Acceso ilimitado a todas las funcionalidades con IA
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Esperar
            </Button>
            <Button
              className="flex-1"
              onClick={handleUpgrade}
              disabled={isNavigating}
            >
              {isNavigating ? "Redirigiendo..." : "Actualizar a Pro"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
