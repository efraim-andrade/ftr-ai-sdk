function ChatHistoryItem({
	isActive = false,
}: {
	isActive?: boolean;
}) {
	return (
		<button
			type="button"
			data-active={isActive}
			className="truncate w-full text-left text-sm px-2.5 py-2 rounded-md cursor-pointer text-zinc-100 data-active:bg-zinc-900 hover:bg-zinc-900"
		>
			How to create Next.js applications...
		</button>
	);
}

export function ChatHistory() {
	return (
		<div className="-mx-2.5 space-y-1">
			<ChatHistoryItem isActive />
			<ChatHistoryItem />
			<ChatHistoryItem />
			<ChatHistoryItem />
			<ChatHistoryItem />
			<ChatHistoryItem />
			<ChatHistoryItem />
			<ChatHistoryItem />
		</div>
	);
}
