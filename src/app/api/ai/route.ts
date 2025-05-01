import { openrouter } from "@/ai/open-router";
import { tools } from "@/ai/tools";
import { streamText } from "ai";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const { messages } = await request.json();

	const result = streamText({
		model: openrouter.chat("openai/gpt-4o"),
		tools,
		messages,
		maxSteps: 5,
		system:
			"Sempre responda em markdown sem aspas no início ou fim da mensagem.",
	});

	return result.toDataStreamResponse();
}
