import type { github } from "@/lib/octokit";
import type { GetResponseTypeFromEndpointMethod } from "@octokit/types";

type GithubUser = GetResponseTypeFromEndpointMethod<
	typeof github.users.getByUsername
>["data"];

interface GithubProfileProps {
	user: GithubUser;
}

export function GithubProfile({ user }: GithubProfileProps) {
	console.log("👻 user:", user);
	return (
		<div className="bg-zinc-950 rounded-lg flex gap-3 p-6">
			<img
				src={user.avatar_url}
				alt={user.name ?? ""}
				className="size-10 rounded-full"
			/>

			<div className="flex flex-col gap-1">
				<span className="text-lg font-medium">{user.name || user.login}</span>
				<p className="text-sm text-zinc-400 leading-relaxed">{user.bio}</p>
			</div>
		</div>
	);
}
