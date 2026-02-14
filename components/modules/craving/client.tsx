"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCravingForm } from "@/hooks/craving/use-craving-form";
import LocationSelector from "@/components/modules/craving/location-selector";
import HungerLevelSelector from "@/components/modules/craving/hunger-level-selector";
import RecommendationResults from "@/components/modules/craving/recommendation-results";
import { useCredits } from "@/components/providers/credits-provider";
import { UpgradeModal } from "@/components/modules/shared/upgrade-modal";
import { toast } from "sonner";
import { useIsPro } from "@/components/providers/subscription-provider";

export default function CravingClient() {
  const {
    selectedLocation,
    setSelectedLocation,
    selectedHungerLevel,
    setSelectedHungerLevel,
    recommendations,
    isLoading,
    handleSubmit,
    resetForm,
  } = useCravingForm();
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

      decrementCredit();
      const promise = handleSubmit();

      toast.promise(promise, {
        loading: "Analizando...",
        success: "Analizado correctamente",
        error: "No se puede analizar",
      });
    } catch (error) {
      toast.error("Error al analizar", {
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

  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
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
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isLoading ? "Analizando..." : "Analizar"}
            </Button>
          </div>
        </>
      )}

      {!isLoading && (
        <RecommendationResults
          recommendations={recommendations?.recommendations}
          tip={recommendations?.tip}
          avoid={recommendations?.avoid}
          onReset={resetForm}
        />
      )}

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}
