import { Plus } from "lucide-react";
import { ChatHistory } from "./chat-history";

export function Sidebar() {
	return (
		<aside className="bg-zinc-950 h-dvh border-r border-zinc-900 p-4 space-y-4">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium text-zinc-400 tracking-tight">
					Recent chats
				</span>

				<button
					className="uppercase rounded-md text-sm flex items-center justify-center text-zinc-400 font-medium border border-zinc-800 size-6 cursor-pointer hover:bg-zinc-900"
					type="button"
				>
					<Plus className="size-4" />
					<span className="sr-only">New chat</span>
				</button>
			</div>

			<ChatHistory />
		</aside>
	);
}
