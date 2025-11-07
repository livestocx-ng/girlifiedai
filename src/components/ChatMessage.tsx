import {motion} from 'framer-motion';
import {User, Bot} from 'lucide-react';
import {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
	role: 'user' | 'assistant';
	content: string;
	isTyping?: boolean;
}

export const ChatMessage = ({
	role,
	content,
	isTyping = false,
}: ChatMessageProps) => {
	const [displayedContent, setDisplayedContent] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (isTyping && currentIndex < content.length) {
			const timeout = setTimeout(() => {
				setDisplayedContent(content.slice(0, currentIndex + 1));
				setCurrentIndex(currentIndex + 1);
			}, 20);
			return () => clearTimeout(timeout);
		} else if (!isTyping) {
			setDisplayedContent(content);
		}
	}, [content, currentIndex, isTyping]);

	const cleanedContent = content
		// Remove "Thread ID: ..." line
		.replace(/Thread ID:.*\n?/gi, '')
		// Remove "Approval Rating (...)" line
		.replace(/Approval Rating\s*\(\d+–100\)\s*\n?/gi, '')
		// Trim extra newlines
		.trim();

	return (
		<motion.div
			initial={{opacity: 0, y: 10}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.3}}
			className={`flex gap-2 p-4 ${
				role === 'assistant' ? 'bg-mute/10 rounded-sm' : ''
			}`}
		>
			<div
				className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
					role === 'assistant' ? 'bg-primary' : 'bg-secondary'
				}`}
			>
				{role === 'assistant' ? (
					<Bot className='w-5 h-5 text-primary-foreground' />
				) : (
					<User className='w-5 h-5 text-secondary-foreground' />
				)}
			</div>
			<div className='flex-1 space-y-2 overflow-hidden'>
				<div className='font-semibold text-sm text-foreground'>
					{role === 'assistant' ? 'AI Assistant' : 'You'}
				</div>
				<div className='text-foreground/90 leading-relaxed whitespace-pre-wrap break-words text-[13px]'>
					{isTyping ? (
						<>
							{displayedContent}
							{currentIndex < cleanedContent.length && (
								<span className='inline-block w-1 h-4 ml-1 bg-primary animate-pulse' />
							)}
						</>
					) : role === 'assistant' ? (
						<div className='prose prose-sm  max-w-none text-foreground/90'>
							<ReactMarkdown>{cleanedContent}</ReactMarkdown>
						</div>
					) : (
						cleanedContent
					)}
				</div>
			</div>
		</motion.div>
	);
};
