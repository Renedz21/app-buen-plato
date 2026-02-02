"use client";

import { Fragment, useState } from "react";
import useIngredients from "@/hooks/breakfast/use-ingredients";
import { experimental_useObject as useObject } from "@ai-sdk/react";

import {
  ChefHat,
  ChevronRight,
  Clock,
  Lightbulb,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Breakfast, defaultIngredients } from "@/constants/breakfasts";
import CardDetails from "../breakfast/card-details";
import { breakfastSchema } from "@/types/schemas/ai-recommendations";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useIsPro } from "@/components/providers/subscription-provider";
import { useCredits } from "@/components/providers/credits-provider";
import { UpgradeModal } from "@/components/modules/shared/upgrade-modal";
import BackButton from "../shared/back-button";

export default function IngredientsClient() {
  const {
    addIngredient,
    handleAddIngredients,
    handleInputChange,
    handleKeyDown,
    handleRemoveSelectedIngredient,
    inputValue,
    selectedIngredients,
  } = useIngredients();

  const { object, submit, isLoading } = useObject({
    api: "/api/breakfast",
    schema: breakfastSchema,
  });

  const isPro = useIsPro();
  const { hasCredits, decrementCredit } = useCredits();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleSubmit = async () => {
    if (!isPro && !hasCredits) {
      setShowUpgradeModal(true);
      return;
    }

    decrementCredit();
    console.log(selectedIngredients);
    submit({
      type: "breakfast",
      context: {
        currentHour: new Date().getHours(),
      },
      data: {
        ingredients: selectedIngredients,
      },
    });
  };

  return (
    <>
      <BackButton />
      {selectedIngredients.length > 0 && (
        <Card className="mb-6 gap-4 py-4">
          <CardHeader className="gap-0 px-4 md:px-6">
            <CardTitle>
              Ingredientes seleccionados ({selectedIngredients.length}):
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 px-4 md:px-6">
            {selectedIngredients.map((ing) => (
              <div
                key={ing}
                className="bg-primary/10 text-primary flex items-center gap-2 rounded-full px-3 py-1"
              >
                <span className="text-sm">{ing}</span>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => handleRemoveSelectedIngredient(ing)}
                  className="hover:bg-primary/20 text-primary rounded-full p-0.5 transition-colors"
                >
                  <X className="text-primary" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {Object.keys(defaultIngredients).map((category) => (
          <Fragment key={category}>
            <p className="text-muted-foreground text-sm font-medium">
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {defaultIngredients[category].map((ingredient) => (
                <Button
                  key={ingredient}
                  size="sm"
                  variant="outline"
                  className={cn(
                    "bg-secondary text-secondary-foreground hover:bg-primary/80 hover:border-primary dark:bg-secondary/80 dark:text-secondary-foreground/80 dark:hover:bg-primary/80 dark:hover:border-primary border-none hover:cursor-pointer hover:text-white dark:hover:text-white",
                    selectedIngredients.includes(ingredient) &&
                      "bg-primary dark:bg-primary/80 text-white dark:text-white",
                  )}
                  onClick={() => addIngredient(ingredient)}
                >
                  {ingredient}
                </Button>
              ))}
            </div>
          </Fragment>
        ))}

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">
            Tienes algo más que agregar?
          </p>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Escribe ingredientes (separa con comas para agregar varios)"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleAddIngredients}
              disabled={!inputValue.trim()}
              size="icon"
              className="shrink-0"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="my-8 text-center">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <ChefHat />
              {isLoading ? "Analizando..." : "Ver qué puedo hacer"}
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4">
        {object && (
          <>
            <Alert
              variant="primary"
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <Lightbulb />
              <AlertTitle>
                Hola! Te comparto algunas recetas posibles:
              </AlertTitle>
              <AlertDescription>{object.message}</AlertDescription>
            </Alert>
            {object.recipes?.length &&
              object.recipes.map((recipe) => (
                <CardDetails
                  key={recipe?.name || ""}
                  breakfast={recipe as unknown as Breakfast}
                  trigger={
                    <Card className="cursor-pointer p-0 transition-all hover:shadow-md">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="text-4xl">{recipe?.emoji}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-foreground font-semibold">
                              {recipe?.name}
                            </h3>
                          </div>
                          <div className="text-muted-foreground flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            {recipe?.time}
                          </div>
                        </div>
                        <ChevronRight className="text-muted-foreground h-5 w-5" />
                      </CardContent>
                    </Card>
                  }
                  title={recipe?.name || ""}
                  icon={recipe?.emoji || ""}
                  relativeTime={recipe?.time || ""}
                  ingredients={
                    (recipe?.ingredients || []) as unknown as string[]
                  }
                  steps={(recipe?.steps || []) as unknown as string[]}
                />
              ))}

            <Alert
              variant="destructive"
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <AlertTitle>No se puede hacer:</AlertTitle>
              <AlertDescription>{object.cantMake}</AlertDescription>
            </Alert>
          </>
        )}
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}
