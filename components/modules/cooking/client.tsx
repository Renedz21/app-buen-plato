"use client";

import { Loader2 } from "lucide-react";

import { type Recipe, recipes } from "@/constants/cooking";
import { UpgradeModal } from "@/components/modules/shared/upgrade-modal";

import { Button } from "@/components/ui/button";
import Vault from "@/components/modules/shared/vault";
import CookingRecipeCard from "./cooking-recipe-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CookingSelection from "./cooking-selection";
import useCooking from "@/hooks/cooking/use-cooking";

export default function CookingClient() {
  const {
    budgetLevel,
    cookingExperience,
    dietaryPreferences,
    handleGenerateRecipe,
    isDesktop,
    isLoading,
    object,
    open,
    setBudgetLevel,
    setCookingExperience,
    setOpen,
    setShowUpgradeModal,
    showUpgradeModal,
    togglePreference,
  } = useCooking();
  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Generar Receta</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Crea tu Receta Personalizada</DialogTitle>
              <DialogDescription>
                Cuéntanos sobre ti para generar la receta perfecta
              </DialogDescription>
            </DialogHeader>
            <CookingSelection
              cookingExperience={cookingExperience}
              setCookingExperience={setCookingExperience}
              budgetLevel={budgetLevel}
              setBudgetLevel={setBudgetLevel}
              togglePreference={togglePreference}
              dietaryPreferences={dietaryPreferences}
            />
            <DialogFooter>
              <Button
                size="lg"
                className="gap-2"
                onClick={handleGenerateRecipe}
              >
                {isLoading ? "Generando..." : "Generar"}
                {isLoading && <Loader2 className="size-4 animate-spin" />}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="mb-6 flex w-full flex-1 justify-center">
          <Vault
            title="Crea tu Receta Personalizada"
            description="Cuéntanos sobre ti para generar la receta perfecta"
            footer={
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleGenerateRecipe}
              >
                {isLoading ? "Generando..." : "Generar"}
                {isLoading && <Loader2 className="size-4 animate-spin" />}
              </Button>
            }
            trigger={
              <Button size="lg" className="w-full gap-2">
                Generar Receta con IA
              </Button>
            }
            isOpen={open}
            onOpenChange={setOpen}
          >
            <div className="no-scrollbar space-y-6 overflow-y-auto px-4">
              <CookingSelection
                cookingExperience={cookingExperience}
                setCookingExperience={setCookingExperience}
                budgetLevel={budgetLevel}
                setBudgetLevel={setBudgetLevel}
                togglePreference={togglePreference}
                dietaryPreferences={dietaryPreferences}
              />
            </div>
          </Vault>
        </div>
      )}
      <div className="animate-in fade-in slide-in-from-bottom-5 grid grid-cols-1 gap-4 delay-150 duration-300 md:grid-cols-2">
        {recipes.map((recipe: Recipe) => (
          <CookingRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {isLoading && <div>Generando receta...</div>}

      {object && !isLoading && (
        <CookingRecipeCard recipe={object.recipe as Recipe} />
      )}

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}
