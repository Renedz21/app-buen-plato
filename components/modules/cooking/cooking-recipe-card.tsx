import { Card, CardContent } from "@/components/ui/card";
import type { Recipe } from "@/constants/cooking";
import { Clock, Users } from "lucide-react";
import { memo } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CookingRecipeDetails from "./cooking-recipe-details";
import { ScrollArea } from "@/components/ui/scroll-area";

type CookingRecipeCardProps = {
  recipe: Recipe;
};

export default memo(function CookingRecipeCard({
  recipe,
}: CookingRecipeCardProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="hover:bg-primary/10 transition-all duration-300 hover:cursor-pointer hover:shadow-md">
            <CardContent>
              <div className="mb-3 text-4xl">{recipe.emoji}</div>
              <h3 className="text-foreground font-semibold">{recipe.name}</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {recipe.description}
              </p>
              <div className="text-muted-foreground mt-3 flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {recipe.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {recipe.portions} porciones
                </span>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="flex max-h-[min(640px,80vh)] flex-col gap-0 px-2 py-6 sm:max-w-2xl md:p-6">
          <ScrollArea className="flex max-h-full flex-col overflow-hidden">
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className="sr-only">{recipe.name}</DialogTitle>
            </DialogHeader>
            <CookingRecipeDetails recipe={recipe} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
});
