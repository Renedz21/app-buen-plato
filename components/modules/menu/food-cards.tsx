"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exampleEntradas, examplePlatos } from "@/constants/foods";
import { useMenuOptimizer } from "@/hooks/menu/use-menu-optimizer";
import SavedMenus from "./saved-menus";
import MenuItemCard from "./menu-item-card";
import type { Tables } from "@/types/database.types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UpgradeModal } from "@/components/modules/shared/upgrade-modal";
import { SaveMenuModal } from "./save-menu-modal";

export default function FoodCards({
  savedMenus,
}: {
  savedMenus: Tables<"saved_menus">[];
}) {
  const {
    entradas,
    platos,
    object,
    isLoading,
    showUpgradeModal,
    showSaveModal,
    canAnalyze,
    canSaveMenu,
    entradaForm,
    platoForm,
    addEntrada,
    addPlato,
    removeEntrada,
    removePlato,
    handleAnalyzeMenu,
    handleOpenSaveModal,
    handleCloseSaveModal,
    handleCloseUpgradeModal,
  } = useMenuOptimizer();

  return (
    <>
      {savedMenus.length > 0 && <SavedMenus savedMenus={savedMenus} />}
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <MenuItemCard
          title="Entradas"
          description="¿Qué opciones de entrada hay hoy?"
          items={entradas}
          onAdd={addEntrada}
          onRemove={removeEntrada}
          form={entradaForm}
          fieldName="entrada"
          placeholder="Ej: Sopa de pollo, Ensalada César, Ceviche"
          examples={exampleEntradas}
          isLoading={isLoading}
        />

        <MenuItemCard
          title="Platos Fuertes"
          description="¿Cuáles son los platos del día?"
          items={platos}
          onAdd={addPlato}
          onRemove={removePlato}
          form={platoForm}
          fieldName="plato"
          placeholder="Ej: Arroz con pollo, Lomo saltado, Pasta carbonara"
          examples={examplePlatos}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-6 text-center">
        <Button 
          size="lg" 
          onClick={handleAnalyzeMenu} 
          disabled={isLoading || !canAnalyze}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Analizando..." : "Analizar menú"}
        </Button>
        <p className="text-muted-foreground mt-2 text-xs">
          Agrega al menos 1 entrada y 1 plato para analizar el menú
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
                <h3 className="text-foreground font-semibold">
                  Mi elección para ti
                </h3>

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

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={handleOpenSaveModal}
                    disabled={!canSaveMenu}
                  >
                    Guardar menú
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={handleCloseUpgradeModal}
      />

      {canSaveMenu && object?.betterOption?.entrada && object?.betterOption?.plato && (
        <SaveMenuModal
          isOpen={showSaveModal}
          onClose={handleCloseSaveModal}
          entrada={object.betterOption.entrada}
          plato={object.betterOption.plato}
        />
      )}
    </>
  );
}
