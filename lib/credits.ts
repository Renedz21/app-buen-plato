import { createClient } from "@/lib/supabase/server";
import type { CreditValidationResult } from "@/types/credits";

export async function validateAndConsumeCredit(
    userId: string,
    isPro: boolean,
): Promise<CreditValidationResult> {
    // Pro users have unlimited access
    if (isPro) {
        return { allowed: true, remaining: -1 };
    }

    const supabase = await createClient();
    const today = new Date().toISOString().split("T")[0];

    // Upsert: create if not exists, return current state
    const { data: existingCredits } = await supabase
        .from("user_credits")
        .select("*")
        .eq("user_id", userId)
        .single();

    // Initialize credits if user doesn't have a record yet
    if (!existingCredits) {
        const { data: newCredits, error: insertError } = await supabase
            .from("user_credits")
            .insert({
                user_id: userId,
                credits_remaining: 4, // Start with 4 since we're consuming 1 now
                last_reset_date: today,
            })
            .select()
            .single();

        if (insertError) {
            console.error("Error creating user credits:", insertError);
            return { allowed: false, remaining: 0, needsUpgrade: true };
        }

        return { allowed: true, remaining: newCredits.credits_remaining };
    }

    // Check if we need to reset (new day)
    const needsReset = existingCredits.last_reset_date !== today;

    if (needsReset) {
        // Reset to 5 and consume 1 (leaving 4)
        const { data: resetCredits, error: resetError } = await supabase
            .from("user_credits")
            .update({
                credits_remaining: 4,
                last_reset_date: today,
            })
            .eq("user_id", userId)
            .select()
            .single();

        if (resetError) {
            console.error("Error resetting credits:", resetError);
            return { allowed: false, remaining: 0, needsUpgrade: true };
        }

        return { allowed: true, remaining: resetCredits.credits_remaining };
    }

    // No reset needed, check if we have credits
    if (existingCredits.credits_remaining <= 0) {
        return { allowed: false, remaining: 0, needsUpgrade: true };
    }

    // Consume 1 credit atomically
    const { data: updatedCredits, error: updateError } = await supabase
        .from("user_credits")
        .update({
            credits_remaining: existingCredits.credits_remaining - 1,
        })
        .eq("user_id", userId)
        .select()
        .single();

    if (updateError) {
        console.error("Error consuming credit:", updateError);
        return { allowed: false, remaining: 0, needsUpgrade: true };
    }

    return { allowed: true, remaining: updatedCredits.credits_remaining };
}

export async function getUserCredits(userId: string): Promise<number> {
    const supabase = await createClient();
    const today = new Date().toISOString().split("T")[0];

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
                last_reset_date: today,
            })
            .select()
            .single();

        return newCredits?.credits_remaining ?? 5;
    }

    // Check if needs reset
    if (data.last_reset_date !== today) {
        const { data: resetData } = await supabase
            .from("user_credits")
            .update({
                credits_remaining: 5,
                last_reset_date: today,
            })
            .eq("user_id", userId)
            .select()
            .single();

        return resetData?.credits_remaining ?? 5;
    }

    return data.credits_remaining;
}
