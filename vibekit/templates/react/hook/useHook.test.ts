import { renderHook, act, waitFor } from '@testing-library/react';
import { {{HookName}} } from './{{HookName}}';

describe('{{HookName}}', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() => {{HookName}}());

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles loading state', async () => {
    const { result } = renderHook(() => {{HookName}}());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  // Add more tests here
});
