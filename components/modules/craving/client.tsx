"use client";

import { useState } from "react";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { RefreshCw, Sparkles, Loader2, AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useCravingForm } from "@/hooks/craving/use-craving-form";

import { useCredits } from "@/components/providers/credits-provider";
import { useIsPro } from "@/components/providers/subscription-provider";

import HungerLevelSelector from "@/components/modules/craving/hunger-level-selector";
import LocationSelector from "@/components/modules/craving/location-selector";
import { UpgradeModal } from "@/components/modules/shared/upgrade-modal";

import { snackSchema } from "@/types/schemas/ai-recommendations";
import LoaderAI from "../shared/loader-ai";

export default function CravingClient() {
  const {
    selectedLocation,
    setSelectedLocation,
    selectedHungerLevel,
    setSelectedHungerLevel,
  } = useCravingForm();
  const {
    object: recommendations,
    submit,
    clear,
    isLoading,
  } = useObject({
    api: "/api/recommendation",
    schema: snackSchema,
  });
  const isPro = useIsPro();
  const { hasCredits, decrementCredit } = useCredits();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const onSubmit = async () => {
    try {
      if (!selectedLocation || !selectedHungerLevel) {
        toast.error("No se puede analizar", {
          description:
            "Por favor, selecciona una ubicación y un nivel de hambre",
        });
        return;
      }
      if (!isPro && !hasCredits) {
        setShowUpgradeModal(true);
        return;
      }

      const now = new Date();

      submit({
        type: "snack",
        context: {
          purchaseLocation: selectedLocation,
          hungerLevel: selectedHungerLevel,
          currentHour: now.getHours(),
          lastMealTime: format(now, "HH:mm", { locale: es }),
        },
      });
      decrementCredit();
    } catch (error) {
      toast.error("Error al generar recomendaciones", {
        description: "Por favor, intenta nuevamente",
        action: {
          label: "Reintentar",
          onClick: () => onSubmit(),
        },
      });
    } finally {
      toast.dismiss();
    }
  };

  const onReset = () => {
    setSelectedLocation(null);
    setSelectedHungerLevel(null);
    clear();
  };

  if (isLoading) return <LoaderAI />;

  return (
    <>
      {!recommendations && (
        <>
          <LocationSelector
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            isLoading={isLoading}
          />

          <HungerLevelSelector
            selectedHungerLevel={selectedHungerLevel}
            onSelectHungerLevel={setSelectedHungerLevel}
            isLoading={isLoading}
          />

          <div className="mt-4 flex justify-center">
            <Button
              variant="default"
              className="w-full max-w-xs"
              onClick={onSubmit}
              disabled={
                isLoading ||
                selectedLocation === null ||
                selectedHungerLevel === null
              }
            >
              Analizar
            </Button>
          </div>
        </>
      )}

      {recommendations && (
        <div className="space-y-4">
          {recommendations?.recommendations?.map((recommendation, index) => (
            <Card
              key={index}
              className="animate-in fade-in slide-in-from-bottom-4 transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="">
                <div className="flex items-start gap-4">
                  <div className="text-2xl md:text-4xl">
                    {recommendation?.icon || "⏳"}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between">
                      <h3 className="text-foreground w-full max-w-xl text-sm font-semibold md:text-base">
                        {recommendation?.name}
                      </h3>
                      {recommendation?.price_range && (
                        <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                          {recommendation.price_range}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {recommendations?.tip && (
            <Alert
              variant="primary"
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <Sparkles />
              <AlertTitle>Recomendación:</AlertTitle>
              <AlertDescription>{recommendations.tip}</AlertDescription>
            </Alert>
          )}

          {recommendations?.avoid && (
            <Alert
              variant="destructive"
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <AlertTriangle />
              <AlertTitle>Evitar:</AlertTitle>
              <AlertDescription>{recommendations.avoid}</AlertDescription>
            </Alert>
          )}

          <div className="animate-in fade-in mt-8 text-center duration-500">
            <Button variant="outline" onClick={onReset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Recomendar nuevamente
            </Button>
          </div>
        </div>
      )}

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}
