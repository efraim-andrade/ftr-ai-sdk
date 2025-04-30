import { openrouter } from "@/ai/open-router";
import { streamText, tool } from "ai";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
	const { messages } = await request.json();

	const result = streamText({
		model: openrouter.chat("openai/gpt-4o"),
		tools: {
			profileAndUrls: tool({
				description:
					"Essa ferramenta serve para buscar dados do perfil de um usuário no Github ou acessar URLs da API para outras informações do usuário como lista de organizações, repositórios, eventos, seguidores, seguindo, etc...",
				parameters: z.object({
					username: z.string().describe("Username do usuário do Github"),
				}),
				execute: async ({ username }) => {
					const response = await fetch(
						`https://api.github.com/users/${username}`,
					);
					const data = await response.json();

					return JSON.stringify(data);
				},
			}),

			fetchHTTP: tool({
				description:
					"Essa ferramenta serve para realizar um requisição HTTP, em uma URL especificada e acessar sua resposta",
				parameters: z.object({
					url: z.string().url().describe("URL a ser requisitada"),
				}),
				execute: async ({ url }) => {
					const response = await fetch(url);
					const data = await response.json();

					return JSON.stringify(data);
				},
			}),
		},
		messages,
		maxSteps: 5,
		system:
			"Sempre responda em markdown sem aspas no início ou fim da mensagem.",

		onStepFinish: ({ toolResults }) => {
			console.log("tool results:", toolResults);
		},
	});

	return result.toDataStreamResponse();
}
