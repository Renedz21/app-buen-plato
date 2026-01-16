"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveMenu } from "@/app/(dashboard)/(routes)/dashboard/menu/actions";
import { useRouter } from "next/navigation";

interface SaveMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  entrada: string;
  plato: string;
}

export function SaveMenuModal({
  isOpen,
  onClose,
  entrada,
  plato,
}: SaveMenuModalProps) {
  const router = useRouter();
  const [menuName, setMenuName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    const trimmedName = menuName.trim();
    
    if (!trimmedName) {
      setError("El nombre es requerido");
      return;
    }

    if (!entrada || !plato) {
      setError("Datos incompletos para guardar");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await saveMenu(trimmedName, [entrada], [plato]);
      router.refresh();
      setMenuName("");
      onClose();
    } catch (err) {
      setError("Error al guardar el menú. Intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (!isSaving) {
      setMenuName("");
      setError("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Save className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Guardar Menú
          </DialogTitle>
          <DialogDescription className="text-center">
            Dale un nombre a este menú para encontrarlo fácilmente después
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="menu-name">Nombre del menú</Label>
            <Input
              id="menu-name"
              placeholder="Ej: Mi menú favorito"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              disabled={isSaving}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isSaving) {
                  handleSave();
                }
              }}
            />
            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-muted-foreground mb-3 text-xs font-medium">
              Vista previa del menú
            </p>
            <div className="space-y-2">
              <div>
                <p className="text-muted-foreground text-xs">Entrada</p>
                <p className="text-foreground font-medium text-sm">{entrada}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Plato Fuerte</p>
                <p className="text-foreground font-medium text-sm">{plato}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSaving ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
