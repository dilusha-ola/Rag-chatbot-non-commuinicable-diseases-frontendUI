import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatMessage from '../components/ChatMessage';
import type { Message } from '../types/chat';

describe('ChatMessage Component', () => {
  const userMessage: Message = {
    id: '1',
    content: 'Hello, how are you?',
    role: 'user',
    timestamp: new Date(),
  };

  const assistantMessage: Message = {
    id: '2',
    content: 'I am doing well, thank you!',
    role: 'assistant',
    timestamp: new Date(),
  };

  it('should render user message correctly', () => {
    render(<ChatMessage message={userMessage} />);
    expect(screen.getByText('Hello, how are you?')).toBeInTheDocument();
  });

  it('should render assistant message correctly', () => {
    render(<ChatMessage message={assistantMessage} />);
    expect(screen.getByText('I am doing well, thank you!')).toBeInTheDocument();
  });

  it('should display user icon for user messages', () => {
    render(<ChatMessage message={userMessage} />);
    expect(screen.getByText('👤')).toBeInTheDocument();
  });

  it('should display bot icon for assistant messages', () => {
    render(<ChatMessage message={assistantMessage} />);
    expect(screen.getByText('🤖')).toBeInTheDocument();
  });
});
