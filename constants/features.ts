import { Utensils, ChefHat, Clock, Droplets } from "lucide-react";

export type Feature = "menu" | "sos" | "cooking" | "breakfast" | "hydration";

export const features = [
  {
    id: "menu" as Feature,
    icon: Utensils,
    title: "Optimizador de Menú",
    description: "Decide mejor el menú del día",
    color: "bg-primary/10 text-primary dark:bg-primary/15",
    isEnabled: true,
  },
  {
    id: "cooking" as Feature,
    icon: ChefHat,
    title: "Cocina para 2 Días",
    description: "Recetas simples que duran",
    color: "bg-primary/10 text-primary dark:bg-primary/15",
    isEnabled: true,
  },
  {
    id: "breakfast" as Feature,
    icon: Clock,
    title: "Desayuno en 5 Min",
    description: "Ideas rápidas para la mañana",
    color: "bg-primary/10 text-primary dark:bg-primary/15",
    isEnabled: true,
  },
  {
    id: "hydration" as Feature,
    icon: Droplets,
    title: "Hidratación",
    description: "Recordatorios para tomar agua",
    color: "bg-primary/10 text-primary dark:bg-primary/15",
    isEnabled: false,
  },
];
