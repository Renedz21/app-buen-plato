import { openai } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { SYSTEM_PROMPT } from "@/constants/prompts";
import {
  getPromptAndSchema,
  type RecommendationRequest,
  snackSchema,
} from "@/types/schemas/ai-recommendations";

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
