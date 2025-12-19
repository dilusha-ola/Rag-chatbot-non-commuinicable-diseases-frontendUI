import { describe, it, expect } from 'vitest';
import { storageService } from '../utils/storage';
import type { ChatSession } from '../types/chat';

describe('Storage Service', () => {
  const mockSession: ChatSession = {
    id: '1',
    title: 'Test Chat',
    messages: [
      {
        id: '1',
        content: 'Hello',
        role: 'user',
        timestamp: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should save sessions to localStorage', () => {
    storageService.saveSessions([mockSession]);
    const saved = localStorage.getItem('ncd-chat-sessions');
    expect(saved).toBeTruthy();
  });

  it('should load sessions from localStorage', () => {
    storageService.saveSessions([mockSession]);
    const loaded = storageService.loadSessions();
    expect(loaded).toHaveLength(1);
    expect(loaded![0].id).toBe('1');
    expect(loaded![0].title).toBe('Test Chat');
  });

  it('should return null when no sessions exist', () => {
    const loaded = storageService.loadSessions();
    expect(loaded).toBeNull();
  });

  it('should save active session ID', () => {
    storageService.saveActiveSessionId('123');
    const saved = localStorage.getItem('ncd-active-session');
    expect(saved).toBe('123');
  });

  it('should load active session ID', () => {
    storageService.saveActiveSessionId('456');
    const loaded = storageService.loadActiveSessionId();
    expect(loaded).toBe('456');
  });

  it('should clear all stored data', () => {
    storageService.saveSessions([mockSession]);
    storageService.saveActiveSessionId('1');
    storageService.clearAll();
    
    expect(localStorage.getItem('ncd-chat-sessions')).toBeNull();
    expect(localStorage.getItem('ncd-active-session')).toBeNull();
  });

  it('should handle date serialization correctly', () => {
    const now = new Date();
    const session: ChatSession = {
      ...mockSession,
      createdAt: now,
      updatedAt: now,
    };
    
    storageService.saveSessions([session]);
    const loaded = storageService.loadSessions();
    
    expect(loaded![0].createdAt).toBeInstanceOf(Date);
    expect(loaded![0].updatedAt).toBeInstanceOf(Date);
  });
});
