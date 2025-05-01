import { setTimeout } from "node:timers/promises";
import { github } from "@/lib/octokit";
import { tool } from "ai";
import { z } from "zod";

export const githubProfile = tool({
	description:
		"Essa ferramenta serve para buscar dados do perfil de um usuário no Github ou acessar URLs da API para outras informações do usuário como lista de organizações, repositórios, eventos, seguidores, seguindo, etc...",
	parameters: z.object({
		username: z.string().describe("Username do usuário do Github"),
	}),
	execute: async ({ username }) => {
		await setTimeout(2000);

		const data = await github.users.getByUsername({ username });

		return data;
	},
});
