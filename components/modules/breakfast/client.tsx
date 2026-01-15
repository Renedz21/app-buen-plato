import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Lightbulb, Sparkles } from "lucide-react";
import Link from "next/link";

export default function BreakfastClient() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card className="cursor-pointer transition-all hover:shadow-md">
        <Link href="/dashboard/breakfast/ingredients" prefetch={false}>
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
              <ChefHat className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-foreground mb-2 font-semibold">
              ¿Qué tienes en casa?
            </h3>
            <p className="text-muted-foreground text-sm">
              Indica tus ingredientes y te digo qué puedes preparar
            </p>
            <span className="bg-primary/10 text-primary mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs">
              <Sparkles className="h-3 w-3" />
              Recetas personalizadas con IA
            </span>
          </CardContent>
        </Link>
      </Card>
      <Card className="cursor-pointer transition-all hover:shadow-md">
        <Link href="/dashboard/breakfast/recipes" prefetch={false}>
          <CardContent className="p-6 text-center">
            <div className="bg-accent mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
              <Lightbulb className="text-secondary-foreground h-6 w-6" />
            </div>
            <h3 className="text-foreground mb-2 font-semibold">
              Ver todas las ideas
            </h3>
            <p className="text-muted-foreground text-sm">
              Mira opciones rápidas y elige la que puedas hacer
            </p>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}
