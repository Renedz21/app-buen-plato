import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { saveMenu } from "@/app/(dashboard)/(routes)/dashboard/menu/actions";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { menuSchema } from "@/types/schemas/ai-recommendations";
import { useIsPro } from "@/contexts/subscription-context";
import { useCredits } from "@/hooks/shared/use-credits";

interface MenuFormValues {
  entrada: string;
  plato: string;
}

export const useMenuOptimizer = () => {
  const [entradas, setEntradas] = useState<string[]>([]);
  const [platos, setPlatos] = useState<string[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const entradaForm = useForm<MenuFormValues>({
    defaultValues: { entrada: "" },
  });

  const platoForm = useForm<MenuFormValues>({
    defaultValues: { plato: "" },
  });

  const { object, submit, isLoading } = useObject({
    api: "/api/menu",
    schema: menuSchema,
  });

  const isPro = useIsPro();
  const { hasCredits, consumeCredit } = useCredits();

  const addEntrada = (entrada: string) => {
    const items = entrada
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (items.length > 0) {
      setEntradas((curr) => {
        const newItems = items.filter((item) => !curr.includes(item));
        if (newItems.length === 0) return curr;
        return [...curr, ...newItems];
      });
      entradaForm.setValue("entrada", "");
    }
  };

  const addPlato = (plato: string) => {
    const items = plato
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (items.length > 0) {
      setPlatos((curr) => {
        const newItems = items.filter((item) => !curr.includes(item));
        if (newItems.length === 0) return curr;
        return [...curr, ...newItems];
      });
      platoForm.setValue("plato", "");
    }
  };

  const removeEntrada = (entrada: string) => {
    setEntradas((curr) => curr.filter((e) => e !== entrada));
  };

  const removePlato = (plato: string) => {
    setPlatos((curr) => curr.filter((p) => p !== plato));
  };

  const handleSaveMenu = async (menuName: string) => {
    const trimmedName = menuName.trim();
    if (!trimmedName || entradas.length === 0 || platos.length === 0) {
      return false;
    }
    await saveMenu(trimmedName, entradas, platos);
    return true;
  };

  const handleAnalyzeMenu = useCallback(async () => {
    if (!isPro && !hasCredits) {
      setShowUpgradeModal(true);
      return;
    }

    if (!isPro) {
      await consumeCredit();
    }

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
  }, [isPro, hasCredits, consumeCredit, submit, entradas, platos]);

  const handleOpenSaveModal = useCallback(() => {
    setShowSaveModal(true);
  }, []);

  const handleCloseSaveModal = useCallback(() => {
    setShowSaveModal(false);
  }, []);

  const handleCloseUpgradeModal = useCallback(() => {
    setShowUpgradeModal(false);
  }, []);

  const reset = () => {
    setEntradas([]);
    setPlatos([]);
    entradaForm.setValue("entrada", "");
    platoForm.setValue("plato", "");
  };

  const canAnalyze = entradas.length >= 1 && platos.length >= 1;
  const canSaveMenu = object?.betterOption?.entrada && object?.betterOption?.plato;

  return {
    // Estado
    entradas,
    platos,
    object,
    isLoading,
    showUpgradeModal,
    showSaveModal,
    canAnalyze,
    canSaveMenu,
    // Formularios
    entradaForm,
    platoForm,
    // Acciones
    addEntrada,
    addPlato,
    removeEntrada,
    removePlato,
    handleAnalyzeMenu,
    handleOpenSaveModal,
    handleCloseSaveModal,
    handleCloseUpgradeModal,
    saveMenu: handleSaveMenu,
    reset,
  };
};
