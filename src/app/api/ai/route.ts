import { openrouter } from "@/ai/open-router";
import { generateObject } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
	const result = await generateObject({
		schema: z.object({
			en: z.string().describe("Tradução para inglês"),
			fr: z.string().describe("Tradução para francês"),
			es: z.string().describe("Tradução para espanhol"),
		}),
		model: openrouter.chat("openai/gpt-4o"),
		prompt: 'Traduza "hello world" para diferentes idiomas!',
		system:
			"Você é uma AI especializada em tradução, sempre retorne de maneira mais sucinta possível",
	});

	return NextResponse.json({ message: result.object });
}
