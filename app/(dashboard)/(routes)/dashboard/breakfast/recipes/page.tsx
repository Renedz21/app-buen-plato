import { breakfasts } from "@/constants/breakfasts";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Clock, Info } from "lucide-react";
import CardDetails from "@/components/modules/breakfast/card-details";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import BackButton from "@/components/modules/shared/back-button";

export default function BreakfastRecipesPage() {
  return (
    <>
      <BackButton />

      <Alert variant="info" className="mb-8">
        <Info className="h-4 w-4" />
        <AlertTitle>Recetas actualizadas</AlertTitle>
        <AlertDescription>
          Estas recetas se actualizaran cada semana para que siempre tengas
          nuevas opciones.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {breakfasts.map((breakfast) => (
          <CardDetails
            key={breakfast.name || breakfast.id}
            breakfast={breakfast}
            trigger={
              <Card className="cursor-pointer p-0 transition-all hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="text-4xl">{breakfast.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-foreground font-semibold">
                        {breakfast.name}
                      </h3>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3" />
                      {breakfast.time}
                    </div>
                  </div>
                  <ChevronRight className="text-muted-foreground h-5 w-5" />
                </CardContent>
              </Card>
            }
            title={breakfast.name}
            icon={breakfast.image}
            relativeTime={breakfast.time}
            ingredients={breakfast.ingredients}
            steps={breakfast.steps}
          />
        ))}
      </div>
    </>
  );
}
