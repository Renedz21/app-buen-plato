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

export const menuSchema = z.object({
  evaluation: z.object({
    type: z.enum(["excellent", "good", "heavy", "ok"]),
    message: z.string(),
  }),
  betterOption: z
    .object({
      entrada: z.string().nullable(),
      plato: z.string().nullable(),
      reason: z.string(),
    }),
  warning: z.string().nullable(),
  tip: z.string(),
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

export function buildMenuPrompt(context: RecommendationRequest["context"], data: any): string {
  const currentHour = context.currentHour ?? new Date().getHours();
  const userEntradas = data?.entradas || [];
  const userPlatos = data?.platos || [];

  return `El usuario está eligiendo su almuerzo del menú del día en Perú.
Son las ${currentHour}:00 horas.

OPCIONES DEL MENÚ DE HOY (ingresadas por el usuario):
Entradas disponibles: ${userEntradas.join(", ") || "ninguna"}
Platos disponibles: ${userPlatos.join(", ") || "ninguno"}

Analiza esta combinación considerando:
1. Digestión para la tarde (evitar somnolencia post-almuerzo)
2. Nutrición balanceada
3. Si es muy pesada o muy ligera
4. Si hay mejor opción entre las disponibles

IMPORTANTE: 
- Solo sugiere opciones que EXISTAN en la lista del usuario
- Si la combinación es buena, dilo claramente
- Si hay algo mejor disponible, indica cuál y por qué
- Considera que el usuario trabaja y necesita energía sin pesadez`;
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
    case "menu":
      return {
        prompt: buildMenuPrompt(context, data),
        schema: menuSchema,
      };
    default:
      throw new Error(`Unknown recommendation type: ${type}`);
  }
}
