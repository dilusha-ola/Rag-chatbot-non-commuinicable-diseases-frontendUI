import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

function formatMessage(content: string) {
  // Split by double line breaks for sections
  const sections = content.split(/\n\n+/);
  
  return sections.map((section, index) => {
    const trimmed = section.trim();
    if (!trimmed) return null;
    
    // Check if this is a section header (ends with : and first letter is capitalized)
    const lines = trimmed.split('\n');
    const firstLine = lines[0];
    
    // Detect headers: starts with capital, ends with colon, relatively short
    if (lines.length > 1 && firstLine.match(/^[A-Z][^:]{3,50}:$/) && !firstLine.startsWith('•')) {
      return (
        <div key={index} className="mb-3">
          <h3 className="font-bold text-gray-900 mb-2">{firstLine}</h3>
          <ul className="space-y-1.5 ml-4">
            {lines.slice(1).map((line, i) => {
              const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
              if (!cleanLine) return null;
              return (
                <li key={i} className="leading-relaxed text-gray-800 list-disc">
                  {cleanLine}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    
    // Single line that's a header
    if (firstLine.match(/^[A-Z][^:]{3,50}:$/) && lines.length === 1) {
      return (
        <h3 key={index} className="font-bold text-gray-900 mt-3 mb-2">
          {firstLine}
        </h3>
      );
    }
    
    // Check if section contains bullet points
    const hasBullets = lines.some(line => /^[•\-\*]/.test(line.trim()));
    
    if (hasBullets) {
      return (
        <ul key={index} className="space-y-1.5 mb-3 ml-4">
          {lines.map((line, i) => {
            const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
            if (!cleanLine) return null;
            return (
              <li key={i} className="leading-relaxed text-gray-800 list-disc">
                {cleanLine}
              </li>
            );
          })}
        </ul>
      );
    }
    
    // Regular paragraph
    return (
      <p key={index} className="mb-3 leading-relaxed text-gray-800">
        {trimmed}
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
        <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white ml-3 flex-shrink-0">
          👤
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start mb-4">
      <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white mr-3 flex-shrink-0">
        🤖
      </div>
      <div className="bg-white border border-gray-300 rounded-lg px-5 py-4 text-gray-800 text-base max-w-2xl">
        {formatMessage(message.content)}
      </div>
    </div>
  );
}
