"use client";

import { Sparkles, Star, Zap, Shield, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PremiumBannerProps {
  className?: string;
  onSubscribe?: () => void;
}

export default function PremiumBanner({
  className,
  onSubscribe,
}: PremiumBannerProps) {
  const handleSubscribe = () => {
    // Por ahora solo muestra un console.log, la funcionalidad se implementará después
    console.log("Suscribirse a Premium");
    onSubscribe?.();
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/30",
        className
      )}
    >
      {/* Efecto de brillo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
      
      {/* Contenido */}
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Lado izquierdo: Información */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Badge Premium */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1">
              <Crown className="h-4 w-4 fill-primary text-primary" />
              <span className="text-primary text-sm font-semibold">Premium</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500" />
            </div>
          </div>

          {/* Título y descripción */}
          <div className="space-y-2">
            <h3 className="text-foreground text-2xl font-bold">
              Desbloquea el poder de{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                BuenPlato Premium
              </span>
            </h3>
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
              Accede a recomendaciones ilimitadas, sugerencias personalizadas avanzadas
              y funciones exclusivas para encontrar el plato perfecto en cada momento.
            </p>
          </div>

          {/* Lista de beneficios */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <div className="bg-primary/10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md">
                <Zap className="text-primary h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">
                  Recomendaciones ilimitadas
                </p>
                <p className="text-muted-foreground text-xs">
                  Sin límites diarios
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="bg-primary/10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md">
                <Sparkles className="text-primary h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">
                  IA avanzada personalizada
                </p>
                <p className="text-muted-foreground text-xs">
                  Aprende tus preferencias
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="bg-primary/10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md">
                <Shield className="text-primary h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">
                  Soporte prioritario
                </p>
                <p className="text-muted-foreground text-xs">
                  Atención 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho: Botón de acción */}
        <div className="flex shrink-0 flex-col items-center gap-3 md:items-end">
          <Button
            onClick={handleSubscribe}
            size="lg"
            className="group/btn relative w-full overflow-hidden bg-gradient-to-r from-primary to-primary/90 font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg md:w-auto md:min-w-[200px]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Suscribirse ahora
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
          </Button>
          <p className="text-muted-foreground text-center text-xs md:text-right">
            Cancela en cualquier momento
          </p>
        </div>
      </div>
    </div>
  );
}
