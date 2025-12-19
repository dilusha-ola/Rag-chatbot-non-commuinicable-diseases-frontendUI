import { useState, useEffect } from 'react';
import ChatHistory from './components/ChatHistory';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ReferencePanel from './components/ReferencePanel';
import type { ChatSession, Message } from './types/chat';
import { apiService } from './services/api';
import { storageService } from './utils/storage';

function App() {
  // State management
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    // Load from localStorage on initial render
    const savedSessions = storageService.loadSessions();
    if (savedSessions && savedSessions.length > 0) {
      return savedSessions;
    }
    // Default session if nothing saved
    return [
      {
        id: '1',
        title: 'New Chat',
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });
  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    // Load active session ID from localStorage
    const savedActiveId = storageService.loadActiveSessionId();
    if (savedActiveId) {
      return savedActiveId;
    }
    return '1';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    storageService.saveSessions(sessions);
  }, [sessions]);

  // Save active session ID whenever it changes
  useEffect(() => {
    storageService.saveActiveSessionId(activeSessionId);
  }, [activeSessionId]);

  // Get active session
  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  // Handler for sending a message
  const handleSendMessage = async (content: string) => {
    setError(null);
    setIsLoading(true);

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    // Add user message to active session
    setSessions(prev =>
      prev.map(session =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: [...session.messages, newMessage],
              updatedAt: new Date(),
              title: session.messages.length === 0 ? content.substring(0, 30) + '...' : session.title,
            }
          : session
      )
    );

    try {
      // Call the API
      const response = await apiService.sendMessage({ question: content });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        role: 'assistant',
        timestamp: new Date(),
      };

      // Add assistant response to active session
      setSessions(prev =>
        prev.map(session =>
          session.id === activeSessionId
            ? {
                ...session,
                messages: [...session.messages, assistantMessage],
                updatedAt: new Date(),
              }
            : session
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response from server';
      setError(errorMessage);

      // Add error message to chat
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: `⚠️ Error: ${errorMessage}. Please make sure the backend server is running at ${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}`,
        role: 'assistant',
        timestamp: new Date(),
      };

      setSessions(prev =>
        prev.map(session =>
          session.id === activeSessionId
            ? {
                ...session,
                messages: [...session.messages, errorMsg],
                updatedAt: new Date(),
              }
            : session
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for creating a new chat
  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(newSession.id);
    setError(null);
  };

  // Handler for selecting a session
  const handleSessionSelect = (sessionId: string) => {
    setActiveSessionId(sessionId);
    setError(null);
  };

  // Handler for deleting a session
  const handleDeleteSession = (sessionId: string) => {
    // Don't delete if it's the only session
    if (sessions.length === 1) {
      return;
    }

    // Filter out the deleted session
    setSessions(prev => prev.filter(session => session.id !== sessionId));

    // If we deleted the active session, switch to another one
    if (activeSessionId === sessionId) {
      const remainingSessions = sessions.filter(s => s.id !== sessionId);
      if (remainingSessions.length > 0) {
        setActiveSessionId(remainingSessions[remainingSessions.length - 1].id);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-200">
        {/* Header */}
        <div className="text-3xl text-white font-bold bg-blue-500 px-8 py-4 flex justify-center items-center gap-3">
          <span className="text-4xl">🏥</span>
          NCD Health Assistant
        </div>

        {/* Body */}
        <div className="flex w-full min-h-screen">
          {/* Chat History Sidebar */}
          <ChatHistory
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSessionSelect={handleSessionSelect}
            onNewChat={handleNewChat}
            onDeleteSession={handleDeleteSession}
          />

          {/* Chat Area */}
          <div className="w-3/5 border-r-2 border-gray-400 px-8 flex flex-col">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="text-2xl font-bold mx-8 my-4 flex justify-center text-blue-500">
                Welcome to NCD Health Assistant! How can I assist you today?
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-8 my-4">
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto mt-8">
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-start mb-4">
                  <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white mr-3 flex-shrink-0">
                    🤖
                  </div>
                  <p className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-lg">
                    Thinking...
                  </p>
                </div>
              )}
            </div>

            {/* Input Box */}
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>

          {/* References Panel */}
          <ReferencePanel references={[]} />
        </div>
      </div>
    </>
  );
}

export default App;