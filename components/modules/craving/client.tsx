"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCravingForm } from "@/hooks/craving/use-craving-form";
import LocationSelector from "@/components/modules/craving/location-selector";
import HungerLevelSelector from "@/components/modules/craving/hunger-level-selector";
import RecommendationResults from "@/components/modules/craving/recommendation-results";

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

  return (
    <>
      <LocationSelector
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      />

      <HungerLevelSelector
        selectedHungerLevel={selectedHungerLevel}
        onSelectHungerLevel={setSelectedHungerLevel}
      />

      <div className="mt-4 flex justify-center">
        <Button
          variant="default"
          className="w-full max-w-xs"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Analizar
        </Button>
      </div>

      <RecommendationResults
        recommendations={recommendations?.recommendations}
        tip={recommendations?.tip}
        avoid={recommendations?.avoid}
        onReset={resetForm}
      />
    </>
  );
}
