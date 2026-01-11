import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles, Loader2 } from "lucide-react";

interface RecommendationResultsProps {
  recommendations?: Array<
    | {
        name?: string;
        price_range?: string;
        reason?: string;
        icon?: string;
      }
    | undefined
  >;
  tip?: string;
  avoid?: string;
  onReset: () => void;
}

export default function RecommendationResults({
  recommendations,
  tip,
  avoid,
  onReset,
}: RecommendationResultsProps) {
  if (!recommendations && !tip && !avoid) {
    return null;
  }

  return (
    <div className="space-y-4">
      {recommendations?.map((recommendation, index) => (
        <Card
          key={index}
          className="animate-in fade-in slide-in-from-bottom-4 border-0 shadow-md transition-all duration-500 hover:shadow-lg"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="">
            <div className="flex items-start gap-4">
              <div className="text-2xl md:text-4xl">
                {recommendation?.icon || "⏳"}
              </div>
              <div className="flex-1">
                <div className="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between">
                  <h3 className="text-foreground font-semibold">
                    {recommendation?.name || (
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generando...
                      </span>
                    )}
                  </h3>
                  {recommendation?.price_range && (
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                      {recommendation.price_range}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mt-3 text-sm">
                  {recommendation?.reason || (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Analizando opciones...
                    </span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {tip && (
        <Alert
          variant="primary"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <Sparkles />
          <AlertTitle>Recomendación:</AlertTitle>
          <AlertDescription>{tip}</AlertDescription>
        </Alert>
      )}

      {avoid && (
        <Alert
          variant="destructive"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <AlertTitle>Evitar:</AlertTitle>
          <AlertDescription>{avoid}</AlertDescription>
        </Alert>
      )}

      <div className="animate-in fade-in mt-8 text-center duration-500">
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Cambiar lugar
        </Button>
      </div>
    </div>
  );
}
