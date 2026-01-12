import { Clock, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SavedMenu = {
  id: string;
  name: string;
  entradas: string[];
  platos: string[];
  use_count: number;
};

export default function SavedMenus({
  savedMenus,
}: {
  savedMenus: SavedMenu[];
}) {
  return (
    <div className="mb-6">
      <h2 className="text-foreground mb-3 flex items-center gap-2 text-lg font-semibold">
        <Clock className="text-primary h-5 w-5" />
        Tus menús guardados
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {savedMenus.slice(0, 4).map((menu) => (
          <Card
            key={menu.id}
            className="hover:border-primary/50 group cursor-pointer transition-colors"
            //onClick={() => loadSavedMenu(menu)}
          >
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground truncate font-medium">
                    {menu.name}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {menu.entradas.length} entradas · {menu.platos.length}{" "}
                    platos
                  </p>
                  {menu.use_count > 0 && (
                    <p className="text-primary mt-1 text-xs">
                      Usado {menu.use_count}{" "}
                      {menu.use_count === 1 ? "vez" : "veces"}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="text-destructive h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {savedMenus.length > 4 && (
        <p className="text-muted-foreground mt-2 text-center text-sm">
          +{savedMenus.length - 4} menús más
        </p>
      )}
    </div>
  );
}
