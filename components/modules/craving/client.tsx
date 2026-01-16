"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCravingForm } from "@/hooks/craving/use-craving-form";
import LocationSelector from "@/components/modules/craving/location-selector";
import HungerLevelSelector from "@/components/modules/craving/hunger-level-selector";
import RecommendationResults from "@/components/modules/craving/recommendation-results";
import { useSubscription } from "@/contexts/subscription-context";
import { useCredits } from "@/hooks/shared/use-credits";
import { UpgradeModal } from "@/components/modules/shared/upgrade-modal";

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
  const { isPro, isLoading: isLoadingSubscription } = useSubscription();
  const { hasCredits, consumeCredit } = useCredits();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  if (isLoadingSubscription) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  const onSubmit = async () => {
    if (!isPro && !hasCredits) {
      setShowUpgradeModal(true);
      return;
    }

    if (!isPro) {
      await consumeCredit();
    }

    handleSubmit();
  };

  return (
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
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isLoading ? "Analizando..." : "Analizar"}
        </Button>
      </div>

      <RecommendationResults
        recommendations={recommendations?.recommendations}
        tip={recommendations?.tip}
        avoid={recommendations?.avoid}
        onReset={resetForm}
      />

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}
