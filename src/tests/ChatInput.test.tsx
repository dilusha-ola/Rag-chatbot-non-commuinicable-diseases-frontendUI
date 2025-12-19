import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput from '../components/ChatInput';

describe('ChatInput Component', () => {
  it('should render input field', () => {
    render(<ChatInput onSendMessage={vi.fn()} disabled={false} />);
    const input = screen.getByPlaceholderText(/ask a question/i);
    expect(input).toBeInTheDocument();
  });

  it('should call onSendMessage when form is submitted', () => {
    const mockSendMessage = vi.fn();
    render(<ChatInput onSendMessage={mockSendMessage} disabled={false} />);
    
    const input = screen.getByPlaceholderText(/ask a question/i);
    const form = input.closest('form')!;
    
    fireEvent.change(input, { target: { value: 'What is diabetes?' } });
    fireEvent.submit(form);
    
    expect(mockSendMessage).toHaveBeenCalledWith('What is diabetes?');
  });

  it('should clear input after submission', () => {
    render(<ChatInput onSendMessage={vi.fn()} disabled={false} />);
    
    const input = screen.getByPlaceholderText(/ask a question/i) as HTMLInputElement;
    const form = input.closest('form')!;
    
    fireEvent.change(input, { target: { value: 'Test question' } });
    fireEvent.submit(form);
    
    expect(input.value).toBe('');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<ChatInput onSendMessage={vi.fn()} disabled={true} />);
    
    const input = screen.getByPlaceholderText(/ask a question/i);
    expect(input).toBeDisabled();
  });

  it('should not submit empty messages', () => {
    const mockSendMessage = vi.fn();
    render(<ChatInput onSendMessage={mockSendMessage} disabled={false} />);
    
    const input = screen.getByPlaceholderText(/ask a question/i);
    const form = input.closest('form')!;
    
    fireEvent.submit(form);
    
    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});
