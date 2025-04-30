export function GithubProfile() {
	return (
		<div className="bg-zinc-950 rounded-lg flex gap-3 p-6">
			<img
				src="https://github.com/efraim-andraed.png"
				alt="Diego Fernandes"
				className="size-10 rounded-full"
			/>

			<div className="flex flex-col gap-1">
				<span className="text-lg font-medium">Diego Fernandes</span>
				<p className="text-sm text-zinc-400 leading-relaxed">
					CTO at @Rocketseat. Passionate about education and changing people's
					lives through programming.
				</p>
			</div>
		</div>
	);
}
