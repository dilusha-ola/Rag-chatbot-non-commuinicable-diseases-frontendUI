import type { ChatSession } from '../types/chat';

interface ChatHistoryProps {
  sessions: ChatSession[];
  activeSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
}

export default function ChatHistory({ sessions, activeSessionId, onSessionSelect, onNewChat, onDeleteSession }: ChatHistoryProps) {
  // Show only the last 5 chats (most recent)
  const recentSessions = sessions.slice(-5).reverse();

  return (
    <div className="w-1/5 border-r-2 border-gray-400 px-4 flex flex-col">
      <div className="text-2xl font-bold my-4 mb-8">Chat History</div>
      
      <button
        onClick={onNewChat}
        className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-2 mb-4 text-white text-lg font-medium"
      >
        + New Chat
      </button>

      <div className="flex flex-col overflow-y-auto gap-2">
        {recentSessions.map((session) => (
          <div
            key={session.id}
            className={`rounded-md px-3 py-2.5 text-white text-base overflow-hidden flex items-center justify-between group ${
              activeSessionId === session.id ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            <button
              onClick={() => onSessionSelect(session.id)}
              className="flex-1 text-left truncate"
              title={session.title}
            >
              {session.title}
            </button>
            {sessions.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-red-300 flex-shrink-0"
                title="Delete chat"
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
