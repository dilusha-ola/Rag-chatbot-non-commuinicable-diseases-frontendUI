import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <p className="bg-blue-500 rounded-lg px-4 py-2 text-white text-lg max-w-md">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start mb-4">
      <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white mr-3 flex-shrink-0">
        🤖
      </div>
      <p className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-lg max-w-2xl">
        {message.content}
      </p>
    </div>
  );
}
