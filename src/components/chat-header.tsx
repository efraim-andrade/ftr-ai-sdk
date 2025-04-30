import { MoreHorizontal } from "lucide-react";

export function ChatHeader() {
	return (
		<div className="border-b bg-zinc-950 border-zinc-900 px-5 py-4 flex items-center justify-between self-stretch">
			<span className="text-sm text-zinc-100">
				How to create Next.js applications with TypeScript
			</span>

			<button className="uppercase rounded-md flex items-center justify-center text-zinc-400 font-medium border border-zinc-800 size-6 cursor-pointer hover:bg-zinc-900">
				<MoreHorizontal className="size-4" />
				<span className="sr-only">Chat actions</span>
			</button>
		</div>
	);
}
