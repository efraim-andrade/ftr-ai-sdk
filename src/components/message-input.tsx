"use client";

import { Send } from "lucide-react";
import { type ChangeEvent, type KeyboardEvent, useEffect, useRef } from "react";

interface MessageInputProps {
	value: string;
	onValueChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
	onSubmit: () => void;
	disabled: boolean;
}

export function MessageInput({
	value,
	onValueChange,
	onSubmit,
	disabled,
}: MessageInputProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
		if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
			e.preventDefault();
			onSubmit();
		}
	}

	useEffect(() => {
		if (!disabled) {
			textareaRef.current?.focus();
		}
	}, [disabled]);

	return (
		<form
			onSubmit={onSubmit}
			className="w-full max-w-3xl flex flex-col items-center gap-3"
		>
			<div className="w-full bg-zinc-950 border rounded-lg border-zinc-900 p-4 focus-within:border-zinc-800">
				<textarea
					name="message"
					id="message"
					placeholder="Ask something..."
					className="w-full resize-none min-h-16 outline-none disabled:opacity-50"
					value={value}
					onChange={onValueChange}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					ref={textareaRef}
					autoFocus
				/>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={disabled}
						className="px-3 py-1.5 text-sm rounded-md flex items-center gap-2 bg-white text-black font-medium cursor-pointer hover:opacity-80 disabled:opacity-50"
					>
						Send
						<Send className="size-3" />
					</button>
				</div>
			</div>
			<span className="text-xs text-zinc-600">
				Press <span className="text-zinc-500">⌘ + Enter</span> to send message.
			</span>
		</form>
	);
}
