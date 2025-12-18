import { ChatSession } from '../types/chat';

interface ChatHistoryProps {
  sessions: ChatSession[];
  activeSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
}

export default function ChatHistory({ sessions, activeSessionId, onSessionSelect, onNewChat }: ChatHistoryProps) {
  return (
    <div className="w-1/5 border-r-2 border-gray-300 pl-20 flex flex-col">
      <div className="text-2xl font-bold mx-8 my-4 mb-8">Chat History</div>
      
      <button
        onClick={onNewChat}
        className="bg-green-500 hover:bg-green-600 rounded-md px-2 py-2 mb-4 mr-16 text-white text-xl"
      >
        + New Chat
      </button>

      <div className="flex flex-col overflow-y-auto">
        {sessions.map((session, index) => (
          <button
            key={session.id}
            onClick={() => onSessionSelect(session.id)}
            className={`rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ${
              activeSessionId === session.id ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {session.title || `Chat ${index + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
}
