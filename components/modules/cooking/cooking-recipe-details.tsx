import type { Recipe } from "@/constants/cooking";
import { Clock, Copy, Lightbulb, Sparkles, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { memo } from "react";

type CookingRecipeDetailsProps = {
  recipe: Recipe;
};

export default memo(function CookingRecipeDetails({
  recipe,
}: CookingRecipeDetailsProps) {
  return (
    <div className="space-y-8 md:space-y-6">
      <div className="text-center">
        <div className="mb-4 text-4xl md:text-6xl">{recipe?.emoji}</div>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-foreground text-base font-bold md:text-2xl">
            {recipe?.name}
          </h1>
        </div>
        <div className="text-muted-foreground mt-2 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1 text-sm md:text-base">
            <Clock className="h-4 w-4" /> {recipe?.time}
          </span>
          <span className="flex items-center gap-1 text-sm md:text-base">
            <Users className="h-4 w-4" /> {recipe?.portions} porciones
          </span>
        </div>
      </div>

      <Card className="gap-2 border-none p-0 shadow-none md:gap-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base md:text-lg">
            Ingredientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recipe?.ingredients.map((ing, i) => (
              <li
                key={i}
                className="text-foreground flex items-center gap-2 text-sm md:text-base"
              >
                <div className="bg-primary h-2 w-2 rounded-full" />
                {ing}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="gap-2 border-none p-0 shadow-none md:gap-6">
        <CardHeader>
          <CardTitle className="text-lg">Preparación</CardTitle>
          <CardDescription>Pasos simplificados</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {recipe?.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold md:text-base">
                  {i + 1}
                </div>
                <p className="text-foreground pt-1 text-sm md:text-base">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Alert variant="primary" className="mt-6">
        <Lightbulb />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>{recipe?.tip}</AlertDescription>
      </Alert>
    </div>
  );
});
