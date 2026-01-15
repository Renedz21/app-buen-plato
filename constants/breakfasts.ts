export type Breakfast = {
  id: string;
  name: string;
  time: string;
  image: string;
  requiredIngredients: string[];
  optionalIngredients: string[];
  ingredients: string[];
  steps: string[];
};

export const breakfasts: Breakfast[] = [
  {
    id: "avena",
    name: "Avena con Fruta",
    time: "3 min",
    image: "🥣",
    requiredIngredients: ["Avena", "Leche"],
    optionalIngredients: ["Plátano", "Manzana", "Miel"],
    ingredients: [
      "1/2 taza avena",
      "1 taza agua/leche",
      "Fruta picada",
      "Miel (opcional)",
    ],
    steps: [
      "Pon la avena con el líquido en el microondas 2 min",
      "Revuelve y agrega la fruta",
      "Endulza si quieres. ¡Listo!",
    ],
  },
  {
    id: "huevos",
    name: "Huevos Revueltos",
    time: "5 min",
    image: "🍳",
    requiredIngredients: ["Huevos"],
    optionalIngredients: ["Pan", "Mantequilla"],
    ingredients: ["2 huevos", "Sal", "Pan (opcional)"],
    steps: [
      "Bate los huevos con un poco de sal",
      "Cocina en sartén a fuego medio revolviendo",
      "Retira cuando estén cremosos. Acompaña con pan",
    ],
  },
  {
    id: "tostada-palta",
    name: "Tostada con Palta",
    time: "3 min",
    image: "🥑",
    requiredIngredients: ["Pan", "Palta"],
    optionalIngredients: ["Huevos"],
    ingredients: ["1 pan integral", "1/2 palta", "Sal, limón"],
    steps: [
      "Tuesta el pan",
      "Aplasta la palta con tenedor, agrega sal y limón",
      "Unta sobre el pan",
    ],
  },
  {
    id: "yogurt-granola",
    name: "Yogurt con Granola",
    time: "1 min",
    image: "🥛",
    requiredIngredients: ["Yogurt", "Granola"],
    optionalIngredients: ["Plátano", "Miel"],
    ingredients: ["1 yogurt natural", "3 cdas de granola", "Fruta opcional"],
    steps: [
      "Sirve el yogurt en un bowl",
      "Agrega la granola encima",
      "Añade fruta si tienes. ¡Listo!",
    ],
  },
  {
    id: "batido",
    name: "Batido Energético",
    time: "4 min",
    image: "🍌",
    requiredIngredients: ["Plátano", "Leche"],
    optionalIngredients: ["Avena", "Miel"],
    ingredients: [
      "1 plátano",
      "1 taza de leche",
      "1 cda de avena",
      "Miel opcional",
    ],
    steps: [
      "Pon todo en la licuadora",
      "Licúa 30 segundos",
      "Sirve y llévalo contigo si vas apurado",
    ],
  },
  {
    id: "pan-huevo",
    name: "Pan con Huevo",
    time: "5 min",
    image: "🍞",
    requiredIngredients: ["Pan", "Huevos"],
    optionalIngredients: ["Mantequilla", "Queso"],
    ingredients: ["2 panes", "1 huevo frito", "Sal"],
    steps: [
      "Fríe el huevo en sartén",
      "Tuesta el pan si quieres",
      "Arma tu sándwich. ¡Clásico y efectivo!",
    ],
  },
];

// Common ingredients with categories - now mutable for custom additions
export const defaultIngredients: Record<string, string[]> = {
  Básicos: ["Huevos", "Pan", "Leche", "Mantequilla"],
  Frutas: ["Plátano", "Manzana", "Naranja", "Palta"],
  Cereales: ["Avena", "Granola", "Cereal"],
  Lácteos: ["Yogurt", "Queso"],
  Otros: ["Miel", "Café", "Chocolate"],
};
