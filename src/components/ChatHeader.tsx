import { motion } from "framer-motion";
import { Hash } from "lucide-react";

interface ChatHeaderProps {
  sessionId: string;
}

export const ChatHeader = ({ sessionId }: ChatHeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-slate-300 backdrop-blur-sm sticky top-0 z-10"
    >
      <div className="px-6 py-4 flex items-center gap-2">
        <Hash className="w-5 h-5 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">Session ID</span>
          <span className="text-xs text-muted-foregroud font-mono">{sessionId}</span>
        </div>
      </div>
    </motion.header>
  );
};
