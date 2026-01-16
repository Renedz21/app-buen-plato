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
  betterOption: z.object({
    entrada: z.string().nullable(),
    plato: z.string().nullable(),
    reason: z.string(),
  }),
  warning: z.string().nullable(),
  tip: z.string(),
});

export const breakfastSchema = z.object({
  recipes: z.array(
    z.object({
      name: z.string(),
      time: z.string(),
      emoji: z.string(),
      ingredients: z.array(z.string()).nullable(),
      steps: z.array(z.string()).nullable(),
      tip: z.string(),
    }),
  ),
  message: z.string(),
  cantMake: z.string(),
});

export const recipeSchema = z.object({
  recipe: z.object({
    id: z.string(),
    name: z.string(),
    time: z.string(),
    portions: z.number(),
    emoji: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string()),
    tip: z.string(),
  }),
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

export function buildMenuPrompt(
  context: RecommendationRequest["context"],
  data: any,
): string {
  const currentHour = context.currentHour ?? new Date().getHours();
  const userEntradas = data?.entradas || [];
  const userPlatos = data?.platos || [];

  return `El usuario está eligiendo su almuerzo del menú del día en Perú.
Son las ${currentHour}:00 horas.

OPCIONES DEL MENÚ DE HOY (ingresadas por el usuario):
Entradas disponibles: ${userEntradas.join(", ") || "ninguna"}
Platos disponibles: ${userPlatos.join(", ") || "ninguno"}

Analiza esta combinación considerando:
1. Comodidad para la tarde (evitar sensación de pesadez)
2. Variedad de opciones
3. Si es muy abundante o muy ligera
4. Si hay mejor opción entre las disponibles

IMPORTANTE: 
- Solo sugiere opciones que EXISTAN en la lista del usuario
- Si la combinación es buena, dilo claramente
- Si hay algo mejor disponible, indica cuál y por qué
- Considera que el usuario trabaja y necesita sentirse satisfecho sin pesadez`;
}

export function buildRecipePrompt(
  context: RecommendationRequest["context"],
): string {
  return `El usuario quiere una receta simple, económica y que dure varios días.
Nivel de experiencia cocinando: ${context.cookingExperience || "beginner"}
Presupuesto: ${context.budgetLevel || "medium"}
${context.dietaryPreferences?.length ? `Preferencias alimentarias: ${context.dietaryPreferences.join(", ")}` : ""}

Genera una receta que sea:
- Fácil de preparar
- Económica con ingredientes accesibles en Perú/Latinoamérica
- Que rinda para 3-4 porciones
- Que se conserve bien 2 días
- Práctica para la rutina del usuario`;
}

export function buildBreakfastPrompt(
  context: RecommendationRequest["context"],
  data: any,
): string {
  const currentHour = context.currentHour ?? new Date().getHours();
  const availableIngredients = data?.ingredients || [];
  const timeAvailable = data?.timeAvailable || "5 minutos";

  return `El usuario quiere preparar un desayuno rápido con lo que tiene en casa.
Son las ${currentHour}:00 horas.
Tiempo disponible: ${timeAvailable}

INGREDIENTES QUE TIENE EL USUARIO:
${availableIngredients.join(", ") || "No especificados"}

Genera 2-3 recetas de desayuno RÁPIDAS y FACTIBLES con esos ingredientes.
Cada receta debe:
- Usar SOLO ingredientes que el usuario tiene (o que son básicos como sal, agua)
- Prepararse en 5 minutos o menos
- Ser práctica para un trabajador apurado
- Tener instrucciones simples y claras

IMPORTANTE:
- Si los ingredientes son muy limitados, sugiere opciones creativas pero realistas
- No asumas ingredientes que no mencionó
- Si no puede hacer mucho, dilo honestamente y sugiere qué conseguir
- Enfócate en practicidad y velocidad de preparación`;
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
    case "recipe":
      return {
        prompt: buildRecipePrompt(context),
        schema: recipeSchema,
      };
    case "breakfast":
      return {
        prompt: buildBreakfastPrompt(context, data),
        schema: breakfastSchema,
      };
    default:
      throw new Error(`Unknown recommendation type: ${type}`);
  }
}
