"use client";

import { GithubProfile } from "@/components/github-profile";
import { ToolLoading } from "@/components/tool-loading";
import { useChat } from "@ai-sdk/react";
import { Bot, User2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { ChatScrollToBottomButton } from "./chat-scroll-to-bottom-button";
import { Markdown } from "./markdown";
import { MessageInput } from "./message-input";

export function Chat() {
	const { messages, input, handleInputChange, handleSubmit, status } = useChat({
		api: "/api/ai",
	});

	const containerRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTo({
				top: containerRef.current.scrollHeight,
				behavior: "instant",
			});
		}
	}, []);

	// useEffect(() => {
	//   if (messages.length > 0 && status === 'streaming' && containerRef.current) {
	//     containerRef.current.scrollTo({
	//       top: containerRef.current.scrollHeight,
	//       behavior: "smooth",
	//     })
	//   }
	// }, [
	//   messages,
	//   status,
	// ])

	return (
		<>
			<div className="flex-1 relative">
				<div
					ref={containerRef}
					className="space-y-6 absolute inset-0 overflow-y-scroll scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-900 scrollbar-track-transparent"
				>
					{messages.map((message) => {
						return (
							<div className="flex items-start gap-3" key={message.id}>
								{message.role === "user" && (
									<div className="size-7 rounded-md bg-zinc-900 flex items-center justify-center">
										<User2 className="size-4 text-zinc-100" />
									</div>
								)}
								{message.role === "assistant" && (
									<div className="size-7 rounded-md bg-zinc-900 flex items-center justify-center">
										<Bot className="size-4 text-zinc-400" />
									</div>
								)}

								<div className="flex flex-col gap-4">
									{message.content && (
										<div className="flex-1 prose prose-invert prose-zinc prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs">
											<Markdown>{message.content}</Markdown>
										</div>
									)}

									{message.parts.map((part) => {
										if (part.type !== "tool-invocation") {
											return null;
										}

										if (part.toolInvocation.state === "call") {
											switch (part.toolInvocation.toolName) {
												case "githubProfile":
													return (
														<ToolLoading
															key={part.toolInvocation.toolCallId}
															text="Carregando informações do github..."
														/>
													);
												case "httpFetch":
													return (
														<ToolLoading
															key={part.toolInvocation.toolCallId}
															text="Realizando requisição http..."
														/>
													);
											}
										}

										if (part.toolInvocation.state === "result") {
											switch (part.toolInvocation.toolName) {
												case "githubProfile":
													return (
														<GithubProfile
															key={part.toolInvocation.toolCallId}
															user={part.toolInvocation.result.data}
														/>
													);
											}
										}
									})}
								</div>
							</div>
						);
					})}

					<div ref={bottomRef} />
				</div>

				<ChatScrollToBottomButton
					containerRef={containerRef}
					scrollRef={bottomRef}
				/>
			</div>

			<MessageInput
				disabled={status === "streaming" || status === "submitted"}
				value={input}
				onValueChange={handleInputChange}
				onSubmit={handleSubmit}
			/>
		</>
	);
}
