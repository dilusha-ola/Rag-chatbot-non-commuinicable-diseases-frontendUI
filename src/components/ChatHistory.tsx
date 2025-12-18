import type { ChatSession } from '../types/chat';

interface ChatHistoryProps {
  sessions: ChatSession[];
  activeSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
}

export default function ChatHistory({ sessions, activeSessionId, onSessionSelect, onNewChat }: ChatHistoryProps) {
  // Show only the last 5 chats (most recent)
  const recentSessions = sessions.slice(-5).reverse();

  return (
    <div className="w-1/5 border-r-2 border-gray-300 px-4 flex flex-col">
      <div className="text-2xl font-bold my-4 mb-8">Chat History</div>
      
      <button
        onClick={onNewChat}
        className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-2 mb-4 text-white text-lg font-medium"
      >
        + New Chat
      </button>

      <div className="flex flex-col overflow-y-auto gap-2">
        {recentSessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSessionSelect(session.id)}
            className={`rounded-md px-3 py-2.5 text-left text-white text-base overflow-hidden ${
              activeSessionId === session.id ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            title={session.title}
          >
            <div className="truncate">
              {session.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
