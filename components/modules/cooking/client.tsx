"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { ChefHat, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Recipe, recipes } from "@/constants/cooking";
import { recipeSchema } from "@/types/schemas/ai-recommendations";

import CookingRecipeCard from "./cooking-recipe-card";

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Principiante", emoji: "👶" },
  { value: "intermediate", label: "Intermedio", emoji: "👨‍🍳" },
  { value: "advanced", label: "Avanzado", emoji: "⭐" },
] as const;

const BUDGET_LEVELS = [
  { value: "low", label: "Económico", emoji: "💰" },
  { value: "medium", label: "Moderado", emoji: "💵" },
  { value: "high", label: "Flexible", emoji: "💸" },
] as const;

const DIETARY_PREFERENCES = [
  { value: "vegetariano", label: "Vegetariano", emoji: "🥬" },
  { value: "vegano", label: "Vegano", emoji: "🌱" },
  { value: "sin-gluten", label: "Sin Gluten", emoji: "🌾" },
  { value: "sin-lactosa", label: "Sin Lactosa", emoji: "🥛" },
  { value: "bajo-en-sodio", label: "Bajo en Sodio", emoji: "🧂" },
] as const;

export default function CookingClient() {
  const [open, setOpen] = useState(false);
  const [cookingExperience, setCookingExperience] = useState("beginner");
  const [budgetLevel, setBudgetLevel] = useState("medium");
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);

  const { object, submit, isLoading } = useObject({
    api: "/api/cooking",
    schema: recipeSchema,
  });

  const handleGenerateRecipe = () => {
    submit({
      type: "recipe",
      context: {
        cookingExperience,
        budgetLevel,
        dietaryPreferences,
      },
    });
    setOpen(false);
  };

  const togglePreference = (pref: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref],
    );
  };

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              {isLoading ? "Generando..." : "Generar Receta con IA"}
              {isLoading && <Loader2 className="size-4 animate-spin" />}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <ChefHat className="size-6" />
                Crea tu Receta Personalizada
              </DialogTitle>
              <DialogDescription>
                Cuéntanos sobre ti para generar la receta perfecta
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  ¿Cuánta experiencia tienes cocinando?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setCookingExperience(level.value)}
                      className={`hover:border-primary/50 flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                        cookingExperience === level.value
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <span className="text-2xl">{level.emoji}</span>
                      <span className="text-sm font-medium">{level.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">
                  ¿Cuál es tu presupuesto?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {BUDGET_LEVELS.map((budget) => (
                    <button
                      key={budget.value}
                      type="button"
                      onClick={() => setBudgetLevel(budget.value)}
                      className={`hover:border-primary/50 flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                        budgetLevel === budget.value
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <span className="text-2xl">{budget.emoji}</span>
                      <span className="text-sm font-medium">
                        {budget.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Preferencias dietéticas (opcional)
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {DIETARY_PREFERENCES.map((pref) => (
                    <button
                      key={pref.value}
                      type="button"
                      onClick={() => togglePreference(pref.value)}
                      className={`hover:border-primary/50 flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-all ${
                        dietaryPreferences.includes(pref.value)
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <span className="text-xl">{pref.emoji}</span>
                      <span className="text-sm">{pref.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button onClick={handleGenerateRecipe} disabled={isLoading}>
                {isLoading ? "Generando..." : "Generar Receta"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-5 grid grid-cols-1 gap-4 delay-150 duration-300 md:grid-cols-2">
        {recipes.map((recipe: Recipe) => (
          <CookingRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {isLoading && <div>Generando receta...</div>}

      {object && !isLoading && (
        <CookingRecipeCard recipe={object.recipe as Recipe} />
      )}
    </>
  );
}
