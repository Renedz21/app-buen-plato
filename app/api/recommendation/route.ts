import {
  getPromptAndSchema,
  RecommendationRequest,
  snackSchema,
} from "@/types/schemas/ai-recommendations";

import { openai } from "@ai-sdk/openai";
import { streamText, Output } from "ai";
import { SYSTEM_PROMPT } from "@/constants/prompts";

export const maxDuration = 30;

export async function POST(req: Request) {
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
