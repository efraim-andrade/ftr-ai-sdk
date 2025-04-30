import { Chat } from "@/components/chat";

export default function Home() {
	return (
		<main className="max-w-3xl w-full mx-auto flex flex-col gap-6 justify-between py-6 relative h-dvh">
			<Chat />
		</main>
	);
}
