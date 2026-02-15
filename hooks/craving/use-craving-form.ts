"use client";

import { useState } from "react";
import type { HungerLevel, LocationStores } from "@/constants/locations";

export function useCravingForm() {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationStores | null>(null);
  const [selectedHungerLevel, setSelectedHungerLevel] =
    useState<HungerLevel | null>(null);

  const resetForm = () => {
    setSelectedLocation(null);
    setSelectedHungerLevel(null);
  };

  return {
    selectedLocation,
    setSelectedLocation,
    selectedHungerLevel,
    setSelectedHungerLevel,
    resetForm,
  };
}
