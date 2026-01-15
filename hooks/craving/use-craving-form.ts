"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { useState } from "react";
import type { HungerLevel, LocationStores } from "@/constants/locations";
import { snackSchema } from "@/types/schemas/ai-recommendations";

export function useCravingForm() {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationStores | null>(null);
  const [selectedHungerLevel, setSelectedHungerLevel] =
    useState<HungerLevel | null>(null);

  const { object, submit, isLoading, clear } = useObject({
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
    clear();
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
