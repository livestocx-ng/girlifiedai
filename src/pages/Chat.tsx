import {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {DashboardSidebar} from '@/components/DashboardSidebar';
import {ChatHeader} from '@/components/ChatHeader';
import {ChatMessage} from '@/components/ChatMessage';
import {ChatInput} from '@/components/ChatInput';
import {ScrollArea} from '@/components/ui/scroll-area';
import {useDemoConnection} from '@/hooks/useDemoConnection';
import {useLocation, useNavigate} from 'react-router-dom';

interface ChatNavigationState {
	initialPrompt?: string;
	assistantResponse?: string;
	submittedAt?: string;
	productSummary?: {
		productName?: string;
		productType?: string;
		targetCondition?: string;
	};
}

const DEMO_CHAT_STORAGE_KEY = 'girlified-demo-chat';

interface ChatSubmissionPayload {
	user: string;
	assistant: string;
	threadId?: string;
	rawResponse?: unknown;
	error?: boolean;
}

const ChatPage = () => {
	const [sessionId] = useState(() => `session_${Date.now()}`);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [conversations] = useState([
		{id: '1', title: 'Demo Conversation', timestamp: new Date()},
	]);
	const [activeConversationId, setActiveConversationId] = useState('1');

	const {messages, isConnected, addMessage} = useDemoConnection();
	const location = useLocation();
	const navigate = useNavigate();
	const hasInjectedPayload = useRef(false);

	useEffect(() => {
		if (isDarkMode) {
			//   document.documentElement.classList.add("dark");
		} else {
			//   document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	useEffect(() => {
		let payload: ChatNavigationState | null = null;

		const navigationState = location.state as ChatNavigationState | null;

		if (navigationState) {
			payload = navigationState;
			try {
				sessionStorage.setItem(
					DEMO_CHAT_STORAGE_KEY,
					JSON.stringify(navigationState)
				);
			} catch (error) {
				console.error('Failed to persist demo chat payload', error);
			}
			navigate(location.pathname, {replace: true});
		}

		if (!payload) {
			const stored = sessionStorage.getItem(DEMO_CHAT_STORAGE_KEY);
			if (stored) {
				try {
					payload = JSON.parse(stored) as ChatNavigationState;
				} catch (error) {
					console.warn(
						'Failed to parse stored demo chat payload',
						error
					);
					sessionStorage.removeItem(DEMO_CHAT_STORAGE_KEY);
				}
			}
		}

		if (!payload || hasInjectedPayload.current) {
			return;
		}

		const userPrompt = payload.initialPrompt?.trim();
		const assistantReply = payload.assistantResponse?.trim();

		if (userPrompt) {
			addMessage('user', userPrompt);
		}

		if (assistantReply) {
			addMessage('assistant', assistantReply);
		}

		hasInjectedPayload.current = true;
	}, [location.pathname, location.state, addMessage, navigate]);

	const handleNewConversation = () => {
		console.log('Creating new conversation');
	};

	const handleChatSubmission = useCallback(
		async ({user, assistant, threadId}: ChatSubmissionPayload) => {
			const trimmedUser = user.trim();
			if (trimmedUser) {
				addMessage('user', trimmedUser);
			}

			let assistantContent = assistant;
			if (threadId && !/Thread ID:/i.test(assistantContent)) {
				assistantContent = `Thread ID: ${threadId}\n\n${assistantContent}`;
			}

			if (assistantContent.trim()) {
				addMessage('assistant', assistantContent);
			}
		},
		[addMessage]
	);

	const derivedSessionId = useMemo(() => {
		const latestAssistantMessage = [...messages]
			.reverse()
			.find((message) => message.role === 'assistant');

		if (!latestAssistantMessage) {
			return null;
		}

		const match = latestAssistantMessage.content.match(
			/Thread ID:\s*([\w-]+)/i
		);
		return match ? match[1] : null;
	}, [messages]);

	const displaySessionId = derivedSessionId ?? sessionId;

	return (
		<div className='flex h-screen w-full bg-background'>
			<DashboardSidebar
				conversations={conversations}
				activeConversationId={activeConversationId}
				onConversationSelect={setActiveConversationId}
				onNewConversation={handleNewConversation}
				isDarkMode={isDarkMode}
				onToggleTheme={() => setIsDarkMode(!isDarkMode)}
			/>

			<div className='flex-1 flex flex-col'>
				<ChatHeader sessionId={displaySessionId} />

				<ScrollArea className='flex-1 px-4'>
					<div className='max-w-4xl mx-auto py-8'>
						{messages.length === 0 ? (
							<div className='flex items-center justify-center h-[50vh]'>
								<div className='text-center space-y-4'>
									<h2 className='text-2xl font-semibold text-foreground'>
										AI Dashboard
									</h2>
									<p className='text-muted-foreground max-w-md'>
										Connected to demo endpoint. Send a
										message to see live AI responses with
										ChatGPT-style typing animation.
									</p>
									<div className='flex items-center justify-center gap-2 text-sm'>
										<div
											className={`w-2 h-2 rounded-full ${
												isConnected
													? 'bg-green-500'
													: 'bg-red-500'
											}`}
										/>
										<span className='text-muted-foreground'>
											{isConnected
												? 'Connected'
												: 'Disconnected'}
										</span>
									</div>
								</div>
							</div>
						) : (
							<div className='space-y-4'>
								{messages.map((message) => (
									<ChatMessage
										key={message.id}
										role={message.role}
										content={message.content}
										isTyping={message.isTyping}
									/>
								))}
							</div>
						)}
					</div>
				</ScrollArea>

				<ChatInput
					onSendMessage={handleChatSubmission}
					disabled={!isConnected}
					threadId={displaySessionId}
				/>
			</div>
		</div>
	);
};

export default ChatPage;
