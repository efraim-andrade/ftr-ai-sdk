import { githubProfile } from "@/ai/tools/github-profile";
import { httpFetch } from "@/ai/tools/http-fetch";
import type { ToolCallUnion, ToolResultUnion } from "ai";

export const tools = {
	githubProfile,
	httpFetch,
};

export type AIToolSet = ToolCallUnion<typeof tools>;
export type AIToolResult = ToolResultUnion<typeof tools>;
