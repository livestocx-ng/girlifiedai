import {motion} from 'framer-motion';
import {MessageSquare, Plus, Settings, Moon, Sun} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import {useState} from 'react';

interface Conversation {
	id: string;
	title: string;
	timestamp: Date;
}

interface DashboardSidebarProps {
	conversations: Conversation[];
	activeConversationId: string;
	onConversationSelect: (id: string) => void;
	onNewConversation: () => void;
	isDarkMode: boolean;
	onToggleTheme: () => void;
}

export const DashboardSidebar = ({
	conversations,
	activeConversationId,
	onConversationSelect,
	onNewConversation,
	isDarkMode,
	onToggleTheme,
}: DashboardSidebarProps) => {
	return (
		<motion.aside
			initial={{x: -300}}
			animate={{x: 0}}
			className='w-64 bg-sideba border-r border-slate-300 flex flex-col h-screen'
		>
			<div className='p-4 border-b border-slate-300'>
				<Button
					onClick={onNewConversation}
					className='w-full justify-start gap-2 bg-orange-500 hover:bg-sidebar-accent/80 text-sidebar-accent-foreground'
				>
					<Plus className='w-4 h-4' />
					New Chat
				</Button>
			</div>

			<ScrollArea className='flex-1 px-2 py-4'>
				<div className='space-y-1'>
					{conversations.map((conversation) => (
						<Button
							key={conversation.id}
							variant='ghost'
							className={`w-full justify-start gap-3 px-3 py-2 h-auto ${
								activeConversationId === conversation.id
									? 'bg-slate-600 hover:bg-slate-800 border-0 text-sidebar-accent-foreground'
									: 'text-sidebar-foreground hover:bg-slate-800'
							}`}
							onClick={() =>
								onConversationSelect(conversation.id)
							}
						>
							<MessageSquare className='w-4 h-4 flex-shrink-0' />
							<span className='truncate text-left text-sm'>
								{conversation.title}
							</span>
						</Button>
					))}
				</div>
			</ScrollArea>

			<div className='p-4 border-t border-slate-300 space-y-2'>
			
				<Button
					variant='ghost'
					className='w-full justify-start gap-3'
				>
					<Settings className='w-4 h-4' />
					<span className='text-sm'>Settings</span>
				</Button>
			</div>
		</motion.aside>
	);
};
