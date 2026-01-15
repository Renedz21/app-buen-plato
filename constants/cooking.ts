export type Recipe = {
  id: string;
  name: string;
  time: string;
  portions: number;
  emoji: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tip: string;
};

export const recipes: Recipe[] = [
  {
    id: "lentejas",
    name: "Lentejas con Verduras",
    time: "45 min",
    portions: 4,
    emoji: "🍲",
    description: "Económico, nutritivo y perfecto para guardar",
    ingredients: [
      "1 taza de lentejas",
      "2 zanahorias picadas",
      "1 cebolla",
      "2 dientes de ajo",
      "1 papa mediana",
      "Sal, comino, laurel",
      "4 tazas de agua",
    ],
    steps: [
      "Lava las lentejas y ponlas a hervir con el agua y laurel",
      "Sofríe la cebolla y ajo, añade la zanahoria y papa",
      "Agrega el sofrito a las lentejas cuando estén medio cocidas",
      "Cocina 20 min más. Sazona al final",
    ],
    tip: "Guarda las porciones extra en recipientes separados para calentar fácil los próximos días.",
  },
  {
    id: "arroz-pollo",
    name: "Arroz con Pollo",
    time: "50 min",
    portions: 4,
    emoji: "🍗",
    description: "Clásico latinoamericano que rinde mucho",
    ingredients: [
      "2 tazas de arroz",
      "4 presas de pollo",
      "1 taza de arvejas",
      "1 zanahoria rallada",
      "1 cebolla, ajo, ají",
      "Culantro licuado",
      "Caldo de pollo",
    ],
    steps: [
      "Dora el pollo y reserva. En la misma olla sofríe cebolla, ajo y ají",
      "Agrega el culantro licuado y el arroz, mezcla bien",
      "Añade el caldo caliente (3 tazas), el pollo, arvejas y zanahoria",
      "Tapa y cocina a fuego bajo 25 min",
    ],
    tip: "Guarda las porciones extra en recipientes separados para calentar fácil los próximos días.",
  },
  {
    id: "chaufa-quinua",
    name: "Chaufa de Quinua",
    time: "30 min",
    portions: 3,
    emoji: "🥡",
    description: "Versión nutritiva del clásico con quinua",
    ingredients: [
      "1.5 tazas de quinua cocida (del día anterior)",
      "2 huevos",
      "1 taza de verduras mixtas",
      "3 cdas de sillao",
      "Aceite de ajonjolí",
      "Cebolla china picada",
    ],
    steps: [
      "Bate los huevos y hazlos revueltos, reserva",
      "Saltea las verduras a fuego alto",
      "Agrega la quinua fría y mezcla bien",
      "Añade sillao, huevo, aceite de ajonjolí y cebolla china",
    ],
    tip: "Guarda las porciones extra en recipientes separados para calentar fácil los próximos días.",
  },
  {
    id: "estofado",
    name: "Estofado de Pollo",
    time: "1 hora",
    portions: 4,
    emoji: "🥘",
    description: "Reconfortante y lleno de sabor",
    ingredients: [
      "1 kg de pollo en presas",
      "4 papas medianas",
      "2 zanahorias",
      "1 cebolla, ajo, ají panca",
      "1 taza de arvejas",
      "Caldo de pollo",
    ],
    steps: [
      "Dora el pollo y reserva",
      "Sofríe cebolla, ajo y ají panca hasta que dore",
      "Agrega caldo, pollo, papas y zanahorias",
      "Cocina tapado 40 min. Añade arvejas al final",
    ],
    tip: "Guarda las porciones extra en recipientes separados para calentar fácil los próximos días.",
  },
];
