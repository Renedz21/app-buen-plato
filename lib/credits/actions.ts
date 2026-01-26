"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface ConsumeResult {
    success: boolean;
    remaining: number;
    error?: string;
}

export async function consumeCreditAction(
    userId: string,
    isPro: boolean,
    path?: string // Path opcional para revalidar
): Promise<ConsumeResult> {
    // Usuarios Pro siempre tienen acceso
    if (isPro) {
        return { success: true, remaining: -1 };
    }

    if (!userId) {
        return {
            success: false,
            remaining: 0,
            error: "User ID required"
        };
    }

    const supabase = await createClient();

    try {
        // Usar la función RPC que maneja reset y consumo atómicamente
        const { data: remainingCredits, error: rpcError } = await supabase.rpc(
            "consume_credit_24h",
            { p_user_id: userId }
        );

        if (rpcError) {
            console.error("Error consuming credit:", rpcError);
            return {
                success: false,
                remaining: 0,
                error: "Failed to consume credit",
            };
        }

        // La función RPC retorna el número de créditos restantes
        if (remainingCredits === null || remainingCredits < 0) {
            return {
                success: false,
                remaining: 0,
                error: "No credits available",
            };
        }

        // Revalidar el path si se proporciona
        if (path) {
            revalidatePath(path);
        }

        return {
            success: true,
            remaining: remainingCredits,
        };
    } catch (error) {
        console.error("Error in consumeCreditAction:", error);
        return {
            success: false,
            remaining: 0,
            error: "Unexpected error",
        };
    }
}

export async function refreshCreditsAction(userId: string, isPro: boolean) {
    if (isPro) {
        return { credits: -1, resetTime: null };
    }

    if (!userId) {
        return { credits: 5, resetTime: null };
    }

    const supabase = await createClient();

    const { data: creditsData } = await supabase.rpc(
        "check_and_reset_credits",
        { p_user_id: userId }
    );

    if (creditsData && creditsData.length > 0) {
        return {
            credits: creditsData[0].credits_remaining,
            resetTime: creditsData[0].next_reset,
        };
    }

    return { credits: 0, resetTime: null };
}