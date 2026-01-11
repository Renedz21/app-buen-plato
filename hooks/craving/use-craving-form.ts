"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { snackSchema } from "@/types/schemas/ai-recommendations";
import type { HungerLevel, LocationStores } from "@/constants/locations";

export function useCravingForm() {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationStores | null>(null);
  const [selectedHungerLevel, setSelectedHungerLevel] =
    useState<HungerLevel | null>(null);

  const { object, submit, isLoading } = useObject({
    api: "/api/recommendation",
    schema: snackSchema,
  });

  const handleSubmit = async () => {
    submit({
      type: "snack",
      context: {
        purchaseLocation: selectedLocation,
        hungerLevel: selectedHungerLevel,
        currentHour: new Date().getHours(),
        lastMealTime: new Date().toLocaleTimeString(),
      },
    });
  };

  const resetForm = () => {
    setSelectedLocation(null);
    setSelectedHungerLevel(null);
  };

  return {
    selectedLocation,
    setSelectedLocation,
    selectedHungerLevel,
    setSelectedHungerLevel,
    recommendations: object,
    isLoading,
    handleSubmit,
    resetForm,
  };
}
