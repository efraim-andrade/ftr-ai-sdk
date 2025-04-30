import { Loader2 } from "lucide-react";

export function ToolLoading({ text }: { text: string }) {
	return (
		<div className="px-3 py-1 rounded-full text-sm bg-zinc-900 text-white flex items-center gap-2">
			<Loader2 className="size-3 animate-spin" />
			<span>{text}</span>
		</div>
	);
}
