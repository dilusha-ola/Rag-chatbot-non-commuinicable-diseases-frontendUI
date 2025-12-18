import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

function formatMessage(content: string) {
  // Split by double line breaks for paragraphs
  const sections = content.split(/\n\n+/);
  
  return sections.map((section, index) => {
    const trimmed = section.trim();
    if (!trimmed) return null;
    
    // Check if section contains bullet points
    const lines = trimmed.split('\n');
    const hasBullets = lines.some(line => /^[•\-\*]/.test(line.trim()));
    
    if (hasBullets) {
      return (
        <ul key={index} className="list-disc list-inside space-y-2 mb-4">
          {lines.map((line, i) => {
            const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
            if (!cleanLine) return null;
            return (
              <li key={i} className="leading-relaxed">
                {cleanLine.split('**').map((part, j) => 
                  j % 2 === 0 ? part : <strong key={j}>{part}</strong>
                )}
              </li>
            );
          })}
        </ul>
      );
    }
    
    // Regular paragraph with bold text support
    return (
      <p key={index} className="mb-4 leading-relaxed">
        {trimmed.split('**').map((part, i) => 
          i % 2 === 0 ? part : <strong key={i}>{part}</strong>
        )}
      </p>
    );
  });
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
      <div className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-base max-w-2xl">
        {formatMessage(message.content)}
      </div>
    </div>
  );
}
