import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiService } from '../services/api';

describe('API Service', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should send a message successfully', async () => {
    const mockResponse = {
      answer: 'This is a test answer',
    };

    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.sendMessage({ question: 'What is diabetes?' });

    expect(result.answer).toBe('This is a test answer');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/chat'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('should throw error on failed request', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
      json: async () => ({ detail: 'Server error' }),
    });

    await expect(apiService.sendMessage({ question: 'test' })).rejects.toThrow();
  });

  it('should perform health check', async () => {
    const mockResponse = {
      status: 'healthy',
      message: 'Chatbot is ready',
    };

    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.healthCheck();

    expect(result.status).toBe('healthy');
    expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining('/health'));
  });

  it('should test connection', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
    });

    const result = await apiService.testConnection();

    expect(result).toBe(true);
  });

  it('should return false on connection failure', async () => {
    (globalThis.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const result = await apiService.testConnection();

    expect(result).toBe(false);
  });
});
