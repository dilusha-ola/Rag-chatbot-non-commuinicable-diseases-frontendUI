import type { ChatSession } from '../types/chat';

const STORAGE_KEY = 'ncd-chat-sessions';
const ACTIVE_SESSION_KEY = 'ncd-active-session';

/**
 * Storage utility for persisting chat sessions to localStorage
 */
export const storageService = {
  /**
   * Save sessions to localStorage
   */
  saveSessions(sessions: ChatSession[]): void {
    try {
      const serialized = JSON.stringify(sessions);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Error saving sessions to localStorage:', error);
    }
  },

  /**
   * Load sessions from localStorage
   */
  loadSessions(): ChatSession[] | null {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        return null;
      }

      const sessions = JSON.parse(serialized);
      
      // Convert date strings back to Date objects
      return sessions.map((session: ChatSession) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));
    } catch (error) {
      console.error('Error loading sessions from localStorage:', error);
      return null;
    }
  },

  /**
   * Save active session ID
   */
  saveActiveSessionId(sessionId: string): void {
    try {
      localStorage.setItem(ACTIVE_SESSION_KEY, sessionId);
    } catch (error) {
      console.error('Error saving active session ID:', error);
    }
  },

  /**
   * Load active session ID
   */
  loadActiveSessionId(): string | null {
    try {
      return localStorage.getItem(ACTIVE_SESSION_KEY);
    } catch (error) {
      console.error('Error loading active session ID:', error);
      return null;
    }
  },

  /**
   * Clear all stored data
   */
  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
