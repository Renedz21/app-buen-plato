import { Button } from "@/components/ui/button";
import { Utensils, Apple, ChefHat, Clock, Droplets } from "lucide-react";
import Link from "next/link";

type Feature = "menu" | "sos" | "cooking" | "breakfast" | "hydration";

const features = [
  {
    id: "menu" as Feature,
    icon: Utensils,
    title: "Optimizador de Menú",
    description: "Elige la mejor combinación del menú del día",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "sos" as Feature,
    icon: Apple,
    title: "SOS Antojos",
    description: "Sugerencias rápidas cuando tienes hambre",
    color: "bg-success/10 text-success",
  },
  {
    id: "cooking" as Feature,
    icon: ChefHat,
    title: "Cocina para 2 Días",
    description: "Recetas simples que duran",
    color: "bg-warning/10 text-warning-foreground",
  },
  {
    id: "breakfast" as Feature,
    icon: Clock,
    title: "Desayuno en 5 Min",
    description: "Ideas rápidas para la mañana",
    color: "bg-accent text-accent-foreground",
  },
  {
    id: "hydration" as Feature,
    icon: Droplets,
    title: "Hidratación",
    description: "Recordatorios para tomar agua",
    color: "bg-secondary text-secondary-foreground",
  },
];

export default function QuickOptions() {
  return (
    <>
      {/* Welcome */}
      <div className="animate-fade-in mb-8">
        <h1 className="text-foreground text-2xl font-bold md:text-3xl">
          ¡Hola! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          ¿Qué te gustaría hacer hoy?
        </p>
      </div>

      {/* Quick Action - SOS Antojos */}
      <Button
        className="animate-fade-in group mb-8 h-24 w-full justify-start rounded-2xl py-14"
        style={{ animationDelay: "0.1s" }}
        asChild
      >
        <Link href="/dashboard/sos-craving" prefetch={false}>
          <div className="flex items-center gap-4">
            <div className="bg-primary-foreground/20 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-105">
              <Apple className="size-8" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">¿Tienes hambre?</h2>
              <p className="text-primary-foreground/80 text-lg">
                Te doy sugerencias saludables al instante
              </p>
            </div>
          </div>
        </Link>
      </Button>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {features
          .filter((f) => f.id !== "sos")
          .map((feature, index) => (
            <Button
              key={feature.id}
              className="animate-fade-in group h-[90px] justify-start rounded-2xl p-5 transition-all hover:shadow-md"
              variant="outline"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              asChild
            >
              <Link href={`/dashboard/${feature.id}`} prefetch={false}>
                <div className="flex items-start gap-4">
                  <div
                    className={`h-12 w-12 ${feature.color} flex items-center justify-center rounded-xl transition-transform group-hover:scale-105`}
                  >
                    <feature.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
      </div>
    </>
  );
}
