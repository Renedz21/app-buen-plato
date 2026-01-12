import { useState, useCallback } from 'react';
import type { Tables } from '@/types/database.types';
//import { useSavedMenus } from '@/hooks/useSavedMenus';
//import { useSubscription } from '@/hooks/useSubscription';
//import { useAIRecommendation } from '@/hooks/useAIRecommendation';
import { useAuth } from '@/contexts/auth-context';
import { saveMenu } from '@/app/(dashboard)/(routes)/dashboard/menu/actions';

interface AIMenuAutoRecommendation {
    selectedCombo: {
        entrada: string;
        plato: string;
    };
    reason: string;
    alternatives: Array<{
        entrada: string;
        plato: string;
        reason: string;
    }>;
    warning: string | null;
    tip: string;
}

// Image analysis response
interface MenuImageAnalysis {
    entradas: string[];
    platos: string[];
    confidence: 'high' | 'medium' | 'low';
    message: string;
}


type MenuItems = {
    entradas: string[];
    platos: string[];
};

type MenuOptimizerState = MenuItems & {
    aiRecommendation: AIMenuAutoRecommendation | null;
    currentMenuId: string | null;
    imageAnalyzing: boolean;
};

export const useMenuOptimizer = ({ savedMenus }: { savedMenus: Tables<'saved_menus'>[] }) => {
    const { user } = useAuth();
    /*const { savedMenus, loading: menusLoading, saveMenu, deleteMenu, incrementUseCount } = useSavedMenus();
    const { isPremium, loading: subLoading } = useSubscription();
    const { loading: aiLoading, getRecommendation } = useAIRecommendation<AIMenuAutoRecommendation>('menu');*/

    const [state, setState] = useState<MenuOptimizerState>({
        entradas: [],
        platos: [],
        aiRecommendation: null,
        currentMenuId: null,
        imageAnalyzing: false,
    });

    const canAnalyze = state.entradas.length >= 1 && state.platos.length >= 1;
    //const isLoading = menusLoading || subLoading || aiLoading || state.imageAnalyzing;

    // Helpers para manipular items
    const addItem = useCallback((type: 'entradas' | 'platos', item: string) => {
        const trimmedItem = item.trim();
        if (!trimmedItem) return false;

        setState((prev) => {
            const items = prev[type];
            if (items.includes(trimmedItem)) return prev;

            return {
                ...prev,
                [type]: [...items, trimmedItem],
            };
        });
        return true;
    }, []);

    const removeItem = useCallback((type: 'entradas' | 'platos', item: string) => {
        setState((prev) => ({
            ...prev,
            [type]: prev[type].filter((i) => i !== item),
        }));
    }, []);

    const addEntrada = useCallback((item: string) => addItem('entradas', item), [addItem]);
    const addPlato = useCallback((item: string) => addItem('platos', item), [addItem]);
    const removeEntrada = useCallback((item: string) => removeItem('entradas', item), [removeItem]);
    const removePlato = useCallback((item: string) => removeItem('platos', item), [removeItem]);

    const handleSaveMenu = useCallback(
        async (menuName: string) => {
            const trimmedName = menuName.trim();
            if (!trimmedName || state.entradas.length === 0 || state.platos.length === 0) {
                return false;
            }

            await saveMenu(trimmedName, state.entradas, state.platos);
            return true;
        },
        []
    );


    const reset = useCallback(() => {
        setState({
            entradas: [],
            platos: [],
            aiRecommendation: null,
            currentMenuId: null,
            imageAnalyzing: false,
        });
    }, []);

    return {
        // Estado
        entradas: state.entradas,
        platos: state.platos,
        aiRecommendation: state.aiRecommendation,
        currentMenuId: state.currentMenuId,

        // Flags
        canAnalyze,
        imageAnalyzing: state.imageAnalyzing,

        // Acciones de items
        addEntrada,
        addPlato,
        removeEntrada,
        removePlato,

        // Acciones de menús
        saveMenu: handleSaveMenu,

        // Navegación
        reset,
    };
};