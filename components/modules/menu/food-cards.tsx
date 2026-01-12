"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  X,
  Plus,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { exampleEntradas, examplePlatos } from "@/constants/foods";
import { useMenuOptimizer } from "@/hooks/menu/use-menu-optimizer";
import SavedMenus from "./saved-menus";
import type { Tables } from "@/types/database.types";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { menuSchema } from "@/types/schemas/ai-recommendations";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FoodCards({
  savedMenus,
}: {
  savedMenus: Tables<"saved_menus">[];
}) {
  const { entradas, platos, addEntrada, addPlato, removeEntrada, removePlato } =
    useMenuOptimizer({ savedMenus });

  const { object, submit, isLoading, clear } = useObject({
    api: "/api/menu",
    schema: menuSchema,
  });

  const handleSubmit = async () => {
    console.log({ entradas, platos });
    submit({
      type: "menu",
      context: {
        currentHour: new Date().getHours(),
      },
      data: {
        entradas,
        platos,
      },
    });
  };

  return (
    <>
      {savedMenus.length > 0 && <SavedMenus savedMenus={savedMenus} />}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Entradas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              Entradas
              <span className="text-muted-foreground text-sm font-normal">
                ({entradas.length} agregadas)
              </span>
            </CardTitle>
            <CardDescription>¿Qué opciones de entrada hay hoy?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Added items */}
            <div className="flex flex-wrap gap-2">
              {entradas.map((item) => (
                <span
                  key={item}
                  className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm"
                >
                  {item}
                  <button
                    onClick={() => removeEntrada(item)}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ej: Sopa de pollo"
                //value={newEntrada}
                //onChange={(e) => setNewEntrada(e.target.value)}
                //onKeyDown={(e) => e.key === "Enter" && addEntrada()}
              />
              <Button
                size="icon"
                //onClick={() => addEntrada()}
                //disabled={!newEntrada.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick add examples */}
            {entradas.length === 0 && (
              <div className="pt-2">
                <p className="text-muted-foreground mb-2 text-xs">
                  O agrega rápido:
                </p>
                <div className="flex flex-wrap gap-1">
                  {exampleEntradas.map((item) => (
                    <button
                      key={item}
                      onClick={() => addEntrada(item)}
                      className="bg-muted hover:bg-muted/80 text-muted-foreground rounded-full px-2 py-1 text-xs"
                    >
                      + {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              Platos Fuertes
              <span className="text-muted-foreground text-sm font-normal">
                ({platos.length} agregados)
              </span>
            </CardTitle>
            <CardDescription>¿Cuáles son los platos del día?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Added items */}
            <div className="flex flex-wrap gap-2">
              {platos.map((item) => (
                <span
                  key={item}
                  className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm"
                >
                  {item}
                  <button
                    onClick={() => removePlato(item)}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ej: Arroz con pollo"
                //value={newPlato}
                //onChange={(e) => setNewPlato(e.target.value)}
                //onKeyDown={(e) => e.key === "Enter" && addPlato()}
              />
              <Button
                size="icon"
                //onClick={() => addPlato()}
                //disabled={!newPlato.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick add examples */}
            {platos.length === 0 && (
              <div className="pt-2">
                <p className="text-muted-foreground mb-2 text-xs">
                  O agrega rápido:
                </p>
                <div className="flex flex-wrap gap-1">
                  {examplePlatos.map((item) => (
                    <button
                      key={item}
                      onClick={() => addPlato(item)}
                      className="bg-muted hover:bg-muted/80 text-muted-foreground rounded-full px-2 py-1 text-xs"
                    >
                      + {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 text-center">
        <Button size="lg" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isLoading ? "Analizando..." : "Analizar"}
        </Button>
        <p className="text-muted-foreground mt-2 text-xs">
          Agrega al menos 1 entrada y 1 plato para analizar
        </p>
      </div>

      {object && (
        <Card className="animate-scale-in border-primary/30 mb-4 border-2">
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 hidden h-12 w-12 items-center justify-center rounded-xl md:flex">
                <CheckCircle className="text-primary h-6 w-6" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-foreground font-semibold">
                    Mi elección para ti
                  </h3>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground mb-1 text-xs">
                        Entrada
                      </p>
                      <p className="text-foreground font-medium">
                        {object.betterOption?.entrada}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1 text-xs">
                        Plato Fuerte
                      </p>
                      <p className="text-foreground font-medium">
                        {object.betterOption?.plato}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground">
                  {object.betterOption?.reason}
                </p>

                {/* Warning */}
                {object.warning && (
                  <Alert
                    variant="info"
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  >
                    <AlertTriangle />
                    <AlertTitle>Advertencia:</AlertTitle>
                    <AlertDescription>{object.warning}</AlertDescription>
                  </Alert>
                )}

                {/* Tip */}
                {object.tip && (
                  <Alert
                    variant="primary"
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  >
                    <Lightbulb />
                    <AlertTitle>Recomendación:</AlertTitle>
                    <AlertDescription>{object.tip}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
