"use client";

import { useState } from "react";
import { Clock, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteSavedMenu } from "@/app/(dashboard)/(routes)/dashboard/menu/actions";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [menuToDelete, setMenuToDelete] = useState<SavedMenu | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
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
            className="hover:border-primary/50 group transition-colors"
          >
            <CardContent>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-foreground font-medium">
                      {menu.name}
                    </h3>
                    {menu.use_count > 0 && (
                      <span className="text-primary shrink-0 text-xs">
                        {menu.use_count} {menu.use_count === 1 ? "uso" : "usos"}
                      </span>
                    )}
                  </div>
                  
                  <div className="bg-muted/50 space-y-2 rounded-lg p-3">
                    <div>
                      <p className="text-muted-foreground text-xs">Entrada</p>
                      <p className="text-foreground mt-0.5 text-sm">
                        {menu.entradas[0]}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Plato Fuerte</p>
                      <p className="text-foreground mt-0.5 text-sm">
                        {menu.platos[0]}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => setMenuToDelete(menu)}
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

      <AlertDialog open={!!menuToDelete} onOpenChange={() => setMenuToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <AlertDialogTitle className="text-center">
              ¿Eliminar menú?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Estás a punto de eliminar "{menuToDelete?.name}". Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
              onClick={async (e) => {
                e.preventDefault();
                if (!menuToDelete) return;
                
                setIsDeleting(true);
                try {
                  await deleteSavedMenu(menuToDelete.id);
                  router.refresh();
                  setMenuToDelete(null);
                } catch (error) {
                  console.error("Error al eliminar el menú:", error);
                } finally {
                  setIsDeleting(false);
                }
              }}
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
