import {useState, FormEvent, KeyboardEvent} from 'react';
import axios from 'axios';
import {Send, Loader2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';

interface ChatSubmissionPayload {
	user: string;
	assistant: string;
	threadId?: string;
	rawResponse?: unknown;
	error?: boolean;
}

interface ChatInputProps {
	onSendMessage: (payload: ChatSubmissionPayload) => Promise<void> | void;
	disabled?: boolean;
	threadId?: string;
}

export const ChatInput = ({
	onSendMessage,
	disabled,
	threadId,
}: ChatInputProps) => {
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submitMessage = async () => {
		const trimmed = message.trim();
		if (!trimmed || disabled || isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		try {
			const config = {params: {threadId, query: message}};
			const response = await axios.post(
				'https://venille-api.livestocx.xyz/v1/auth/generate-girlified-ai-chat-report',
				{prompt: trimmed},
				config
			);

			const formattedReport =
				typeof response.data === 'string'
					? response.data
					: JSON.stringify(response.data, null, 2);

			await onSendMessage({
				user: trimmed,
				assistant: formattedReport,
				threadId,
				rawResponse: response.data,
			});
			setMessage('');
		} catch (error) {
			console.error('Failed to submit chat message', error);
			await onSendMessage({
				user: trimmed,
				assistant:
					'We were unable to generate a response right now. Please try again shortly.',
				threadId,
				error: true,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await submitMessage();
	};

	const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			await submitMessage();
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='border-t border-slate-300 backdrop-blur-sm p-4'
		>
			<div className='max-w-4xl mx-auto flex gap-3'>
				<Textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder='Type your message...'
					disabled={disabled || isSubmitting}
					className='min-h-[60px] max-h-[200px] resize-none rounded-xl bg-background border-input shadow-sm'
				/>
				<Button
					type='submit'
					disabled={!message.trim() || disabled || isSubmitting}
					size='icon'
					className='h-[60px] w-[60px] rounded-xl bg-primary hover:bg-primary/90 shadow-sm'
				>
					{isSubmitting ? (
						<Loader2 className='w-5 h-5 animate-spin' />
					) : (
						<Send className='w-5 h-5' />
					)}
				</Button>
			</div>
		</form>
	);
};
