import { Utensils, ChefHat, Clock, Droplets } from "lucide-react";

export type Feature = "menu" | "sos" | "cooking" | "breakfast" | "hydration";

export const features = [
  {
    id: "menu" as Feature,
    icon: Utensils,
    title: "Optimizador de Menú",
    description: "Elige la mejor combinación del menú del día",
    color: "bg-primary/10 text-primary",
    isEnabled: true,
  },
  {
    id: "cooking" as Feature,
    icon: ChefHat,
    title: "Cocina para 2 Días",
    description: "Recetas simples que duran",
    color: "bg-secondary/70 text-secondary-foreground",
    isEnabled: true,
  },
  {
    id: "breakfast" as Feature,
    icon: Clock,
    title: "Desayuno en 5 Min",
    description: "Ideas rápidas para la mañana",
    color: "bg-accent/70 text-accent-foreground",
    isEnabled: true,
  },
  {
    id: "hydration" as Feature,
    icon: Droplets,
    title: "Hidratación",
    description: "Recordatorios para tomar agua",
    color: "bg-secondary/70 text-secondary-foreground",
    isEnabled: false,
  },
];
