export type LocationStores = "tambo" | "bodega" | "mercado" | "casa";
export type HungerLevel = "low" | "medium" | "high";

export const locations: Record<
  LocationStores,
  { label: string; description: string }
> = {
  tambo: {
    label: "Tambo / Oxxo",
    description: "Tienda de conveniencia",
  },
  bodega: {
    label: "Bodega",
    description: "Tienda de barrio",
  },
  mercado: {
    label: "Mercado",
    description: "Mercado local",
  },
  casa: {
    label: "En casa",
    description: "Lo que ya tengo",
  },
};

export const hungerLevels: Record<HungerLevel, string> = {
  low: "Poca hambre (0-3)",
  medium: "Normal (4-7)",
  high: "Mucha hambre (8-10)",
};
