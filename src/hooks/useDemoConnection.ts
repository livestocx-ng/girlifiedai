import {useState, useEffect, useCallback} from 'react';

export interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	timestamp: Date;
	isTyping?: boolean;
}

// This hook manages the connection to the demo endpoint
// TODO: Replace mock implementation with real API integration to https://ai.girlified.com.ng/demo
export const useDemoConnection = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isConnected, setIsConnected] = useState(false);

	// Initialize connection - TODO: Implement actual connection logic
	useEffect(() => {
		// Simulate connection
		setTimeout(() => setIsConnected(true), 1000);

		// TODO: Implement WebSocket connection or polling to demo endpoint
		// Example:
		// const ws = new WebSocket('wss://ai.girlified.com.ng/demo/ws');
		// ws.onmessage = (event) => {
		//   const response = JSON.parse(event.data);
		//   addMessage('assistant', response.content, true);
		// };

		return () => {
			// TODO: Cleanup connection
			setIsConnected(false);
		};
	}, []);

	const addMessage = useCallback(
		(
			role: 'user' | 'assistant',
			content: string,
			isTyping: boolean = false
		) => {
			const newMessage: Message = {
				id: `msg_${Date.now()}_${Math.random()}`,
				role,
				content,
				timestamp: new Date(),
				isTyping,
			};
			setMessages((prev) => [...prev, newMessage]);
		},
		[]
	);

	return {
		messages,
		isConnected,
		addMessage,
	};
};
