import { openai } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { SYSTEM_PROMPT } from "@/constants/prompts";
import {
  getPromptAndSchema,
  type RecommendationRequest,
  snackSchema,
} from "@/types/schemas/ai-recommendations";
import { createClient } from "@/lib/supabase/server";
import { validateAndConsumeCredit } from "@/lib/credits";

export const maxDuration = 30;

export async function POST(req: Request) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check subscription status
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user.id)
    .single();

  const isPro = Boolean(
    subscription?.status === "active" || 
    (subscription?.status === "canceled" && 
     subscription.current_period_end && 
     new Date(subscription.current_period_end) > new Date())
  );

  // Validate and consume credit
  const { allowed, remaining } = await validateAndConsumeCredit(user.id, isPro);
  
  if (!allowed) {
    return Response.json(
      { error: "NO_CREDITS", remaining: 0, needsUpgrade: true },
      { status: 402 }
    );
  }

  const { type, context, data }: RecommendationRequest = await req.json();

  const { prompt, schema } = getPromptAndSchema(type, context, data);

  const result = streamText({
    model: openai("gpt-5-mini"),
    system: SYSTEM_PROMPT,
    prompt,
    output: Output.object({ schema: snackSchema }),
  });

  return result.toTextStreamResponse();
}
