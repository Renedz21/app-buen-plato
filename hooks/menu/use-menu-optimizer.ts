import { useState } from "react";
import { useForm } from "react-hook-form";
import { saveMenu } from "@/app/(dashboard)/(routes)/dashboard/menu/actions";

interface MenuFormValues {
  entrada: string;
  plato: string;
}

export const useMenuOptimizer = () => {
  const [entradas, setEntradas] = useState<string[]>([]);
  const [platos, setPlatos] = useState<string[]>([]);

  const entradaForm = useForm<MenuFormValues>({
    defaultValues: { entrada: "" },
  });

  const platoForm = useForm<MenuFormValues>({
    defaultValues: { plato: "" },
  });

  const addEntrada = (entrada: string) => {
    const trimmed = entrada.trim();
    if (trimmed && !entradas.includes(trimmed)) {
      setEntradas([...entradas, trimmed]);
      entradaForm.reset();
    }
  };

  const addPlato = (plato: string) => {
    const trimmed = plato.trim();
    if (trimmed && !platos.includes(trimmed)) {
      setPlatos([...platos, trimmed]);
      platoForm.reset();
    }
  };

  const removeEntrada = (entrada: string) => {
    setEntradas(entradas.filter((e) => e !== entrada));
  };

  const removePlato = (plato: string) => {
    setPlatos(platos.filter((p) => p !== plato));
  };

  const handleSaveMenu = async (menuName: string) => {
    const trimmedName = menuName.trim();
    if (!trimmedName || entradas.length === 0 || platos.length === 0) {
      return false;
    }
    await saveMenu(trimmedName, entradas, platos);
    return true;
  };

  const reset = () => {
    setEntradas([]);
    setPlatos([]);
    entradaForm.reset();
    platoForm.reset();
  };

  return {
    entradas,
    platos,
    entradaForm,
    platoForm,
    addEntrada,
    addPlato,
    removeEntrada,
    removePlato,
    saveMenu: handleSaveMenu,
    reset,
  };
};
