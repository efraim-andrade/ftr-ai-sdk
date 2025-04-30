import { marked } from "marked";
import { memo, useId, useMemo } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export type MarkdownProps = {
	children: string;
	id?: string;
	className?: string;
	components?: Partial<Components>;
};

function parseMarkdownIntoBlocks(markdown: string): string[] {
	const tokens = marked.lexer(markdown);
	return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
	function MarkdownBlock({
		content,
	}: {
		content: string;
		components?: Partial<Components>;
		className?: string;
	}) {
		return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
	},
	function propsAreEqual(prevProps, nextProps) {
		return prevProps.content === nextProps.content;
	},
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

function MarkdownComponent({ children, id, className }: MarkdownProps) {
	const generatedId = useId();
	const blockId = id ?? generatedId;
	const blocks = useMemo(() => parseMarkdownIntoBlocks(children), [children]);

	return (
		<>
			{blocks.map((block, index) => (
				<MemoizedMarkdownBlock
					key={`${blockId}-block-${index}`}
					content={block}
					className={className}
				/>
			))}
		</>
	);
}

const Markdown = memo(MarkdownComponent);

Markdown.displayName = "Markdown";

export { Markdown };
