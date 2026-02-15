import { useState } from "react";
import { useMediaQuery } from "@/hooks/shared/use-media-query";
import { useIsPro } from "@/components/providers/subscription-provider";
import { useCredits } from "@/components/providers/credits-provider";
import { recipeSchema } from "@/types/schemas/ai-recommendations";
import { experimental_useObject as useObject } from "@ai-sdk/react";

export default function useCooking() {
  const [open, setOpen] = useState(false);
  const [cookingExperience, setCookingExperience] = useState("beginner");
  const [budgetLevel, setBudgetLevel] = useState("medium");
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { object, submit, isLoading } = useObject({
    api: "/api/cooking",
    schema: recipeSchema,
  });

  const isPro = useIsPro();
  const { hasCredits, decrementCredit } = useCredits();

  const handleGenerateRecipe = async () => {
    if (!isPro && !hasCredits) {
      setShowUpgradeModal(true);
      setOpen(false);
      return;
    }

    submit({
      type: "recipe",
      context: {
        cookingExperience,
        budgetLevel,
        dietaryPreferences,
      },
    });
    decrementCredit();
    setOpen(false);
  };

  const togglePreference = (pref: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref],
    );
  };

  return {
    open,
    setOpen,
    cookingExperience,
    setCookingExperience,
    budgetLevel,
    setBudgetLevel,
    dietaryPreferences,
    showUpgradeModal,
    setShowUpgradeModal,
    isDesktop,
    handleGenerateRecipe,
    togglePreference,
    object,
    isLoading,
  };
}
