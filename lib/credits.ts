import { createClient } from "@/lib/supabase/server";
import type { CreditValidationResult } from "@/types/credits";
import { isAfter, addHours } from "date-fns";

export async function validateAndConsumeCredit(
    userId: string,
    isPro: boolean,
): Promise<CreditValidationResult> {
    // Pro users have unlimited access
    if (isPro) {
        return { allowed: true, remaining: -1 };
    }

    const supabase = await createClient();
    const now = new Date();

    // Get current credits
    const { data: existingCredits } = await supabase
        .from("user_credits")
        .select("*")
        .eq("user_id", userId)
        .single();

    console.log({ existingCredits });

    // Initialize credits if user doesn't have a record yet
    if (!existingCredits) {
        console.log("Creating new credits");
        const { data: newCredits, error: insertError } = await supabase
            .from("user_credits")
            .insert({
                user_id: userId,
                credits_remaining: 5,
                last_reset_timestamp: now.toISOString(),
            })
            .select()
            .single();

        if (insertError) {
            console.error("Error creating user credits:", insertError);
            return { allowed: false, remaining: 0, needsUpgrade: true };
        }

        // Consume 1 credit atomically using RPC
        const { data: remainingCredits, error: consumeError } = await supabase.rpc(
            "consume_credit_24h",
            { p_user_id: userId }
        );

        if (consumeError) {
            console.error("Error consuming initial credit:", consumeError);
            return { allowed: false, remaining: 0, needsUpgrade: true };
        }

        return { allowed: true, remaining: remainingCredits ?? 4 };
    }

    // Check if 24 hours have passed since last reset
    const lastResetDate = new Date(existingCredits.last_reset_timestamp);
    const resetTime = addHours(lastResetDate, 24);
    const needsReset = isAfter(now, resetTime);

    console.log({
        lastResetDate: lastResetDate.toISOString(),
        resetTime: resetTime.toISOString(),
        now: now.toISOString(),
        needsReset
    });

    if (needsReset) {
        // Reset to 5 credits
        const { data: resetCredits, error: resetError } = await supabase
            .from("user_credits")
            .update({
                credits_remaining: 5,
                last_reset_timestamp: now.toISOString(),
            })
            .eq("user_id", userId)
            .select()
            .single();

        if (resetError) {
            console.error("Error resetting credits:", resetError);
            return { allowed: false, remaining: 0, needsUpgrade: true };
        }

        // Consume 1 credit atomically
        const { data: remainingCredits, error: consumeError } = await supabase.rpc(
            "consume_credit_24h",
            { p_user_id: userId }
        );

        if (consumeError) {
            console.error("Error consuming credit after reset:", consumeError);
            return { allowed: false, remaining: 0, needsUpgrade: true };
        }

        return { allowed: true, remaining: remainingCredits ?? 4 };
    }

    // No reset needed, check if we have credits
    if (existingCredits.credits_remaining <= 0) {
        return { allowed: false, remaining: 0, needsUpgrade: true };
    }

    // Consume 1 credit atomically using RPC
    const { data: remainingCredits, error: consumeError } = await supabase.rpc(
        "consume_credit_24h",
        { p_user_id: userId }
    );

    if (consumeError) {
        console.error("Error consuming credit:", consumeError);
        return { allowed: false, remaining: 0, needsUpgrade: true };
    }

    if (remainingCredits === null || remainingCredits < 0) {
        return { allowed: false, remaining: 0, needsUpgrade: true };
    }

    return { allowed: true, remaining: remainingCredits };
}

export async function getUserCredits(userId: string): Promise<number> {
    const supabase = await createClient();
    const now = new Date();

    const { data } = await supabase
        .from("user_credits")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (!data) {
        // Initialize if doesn't exist
        const { data: newCredits } = await supabase
            .from("user_credits")
            .insert({
                user_id: userId,
                credits_remaining: 5,
                last_reset_timestamp: now.toISOString(),
            })
            .select()
            .single();

        return newCredits?.credits_remaining ?? 5;
    }

    // Check if 24 hours have passed
    const lastResetDate = new Date(data.last_reset_timestamp);
    const resetTime = addHours(lastResetDate, 24);
    const needsReset = isAfter(now, resetTime);

    if (needsReset) {
        const { data: resetData } = await supabase
            .from("user_credits")
            .update({
                credits_remaining: 5,
                last_reset_timestamp: now.toISOString(),
            })
            .eq("user_id", userId)
            .select()
            .single();

        return resetData?.credits_remaining ?? 5;
    }

    return data.credits_remaining;
}

export async function getTimeUntilReset(userId: string): Promise<Date | null> {
    const supabase = await createClient();

    const { data } = await supabase
        .from("user_credits")
        .select("last_reset_timestamp")
        .eq("user_id", userId)
        .single();

    if (!data) return null;

    const lastResetDate = new Date(data.last_reset_timestamp);
    return addHours(lastResetDate, 24);
}