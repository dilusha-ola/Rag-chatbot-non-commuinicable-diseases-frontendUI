import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatHistory from '../components/ChatHistory';
import type { ChatSession } from '../types/chat';

describe('ChatHistory Component', () => {
  const mockSessions: ChatSession[] = [
    {
      id: '1',
      title: 'Diabetes Questions',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Heart Disease Info',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  it('should render chat sessions', () => {
    render(
      <ChatHistory
        sessions={mockSessions}
        activeSessionId="1"
        onSessionSelect={() => {}}
        onNewChat={() => {}}
        onDeleteSession={() => {}}
      />
    );

    expect(screen.getByText('Diabetes Questions')).toBeInTheDocument();
    expect(screen.getByText('Heart Disease Info')).toBeInTheDocument();
  });

  it('should call onNewChat when new chat button is clicked', async () => {
    const mockNewChat = vi.fn();
    const user = userEvent.setup();

    render(
      <ChatHistory
        sessions={mockSessions}
        activeSessionId="1"
        onSessionSelect={() => {}}
        onNewChat={mockNewChat}
        onDeleteSession={() => {}}
      />
    );

    await user.click(screen.getByText('+ New Chat'));
    expect(mockNewChat).toHaveBeenCalled();
  });

  it('should call onSessionSelect when a session is clicked', async () => {
    const mockSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <ChatHistory
        sessions={mockSessions}
        activeSessionId="1"
        onSessionSelect={mockSelect}
        onNewChat={() => {}}
        onDeleteSession={() => {}}
      />
    );

    await user.click(screen.getByText('Heart Disease Info'));
    expect(mockSelect).toHaveBeenCalledWith('2');
  });

  it('should show delete button only when there are multiple sessions', () => {
    const { container } = render(
      <ChatHistory
        sessions={mockSessions}
        activeSessionId="1"
        onSessionSelect={() => {}}
        onNewChat={() => {}}
        onDeleteSession={() => {}}
      />
    );

    // Check that delete buttons exist
    const deleteButtons = container.querySelectorAll('button[title="Delete chat"]');
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  it('should not show delete button when only one session', () => {
    const singleSession = [mockSessions[0]];
    const { container } = render(
      <ChatHistory
        sessions={singleSession}
        activeSessionId="1"
        onSessionSelect={() => {}}
        onNewChat={() => {}}
        onDeleteSession={() => {}}
      />
    );

    const deleteButtons = container.querySelectorAll('button[title="Delete chat"]');
    expect(deleteButtons.length).toBe(0);
  });
});
