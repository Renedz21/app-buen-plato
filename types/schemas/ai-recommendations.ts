import { z } from "zod";
import { LOCATION_DESCRIPTIONS } from "@/constants/prompts";

export interface RecommendationRequest {
  type: "snack" | "menu" | "recipe" | "breakfast" | "hydration";
  context: {
    currentHour?: number;
    hungerLevel?: "low" | "medium" | "high";
    lastMealTime?: string;
    dietaryPreferences?: string[];
    budgetLevel?: string;
    cookingExperience?: string;
    purchaseLocation?: "tambo" | "bodega" | "mercado" | "casa";
  };
  data?: any;
}

export const snackSchema = z.object({
  recommendations: z.array(
    z.object({
      name: z.string(),
      price_range: z.string(),
      reason: z.string(),
      icon: z.string(),
    }),
  ),
  tip: z.string(),
  avoid: z.string(),
});

export function buildSnackPrompt(
  context: RecommendationRequest["context"],
): string {
  const currentHour = context.currentHour ?? new Date().getHours();
  const location = context.purchaseLocation || "casa";
  const hungerLevel = context.hungerLevel || "medium";

  return `El usuario tiene hambre (nivel: ${hungerLevel}). 
Son las ${currentHour}:00 horas.
${context.lastMealTime ? `Última comida: ${context.lastMealTime}` : ""}

LUGAR DE COMPRA: ${location.toUpperCase()}
${LOCATION_DESCRIPTIONS[location] || ""}

Basándote en lo que REALMENTE está disponible en ese lugar, recomienda 3 opciones para comer ahora mismo.
Incluye precios aproximados en soles (S/).
Sé específico con productos reales que encontraría ahí.

IMPORTANTE: 
- Si el hambre es "low", sugiere opciones ligeras (fruta, agua, yogurt)
- Si el hambre es "medium", opciones moderadas (sándwich, galletas con yogurt)
- Si el hambre es "high", opciones más contundentes (sándwich doble, pan con huevo)`;
}

export function getPromptAndSchema(
  type: string,
  context: RecommendationRequest["context"],
  data?: any,
) {
  switch (type) {
    case "snack":
      return {
        prompt: buildSnackPrompt(context),
        schema: snackSchema,
      };
    default:
      throw new Error(`Unknown recommendation type: ${type}`);
  }
}
