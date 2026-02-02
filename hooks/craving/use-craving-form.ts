"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { useState } from "react";
import type { HungerLevel, LocationStores } from "@/constants/locations";
import { snackSchema } from "@/types/schemas/ai-recommendations";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
    const now = new Date();
    const promise = submit({
      type: "snack",
      context: {
        purchaseLocation: selectedLocation,
        hungerLevel: selectedHungerLevel,
        currentHour: now.getHours(),
        lastMealTime: format(now, "HH:mm", { locale: es }),
      },
    });

    return promise;
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
