import { getHealth } from './healthService';

describe('healthService', () => {
  it('returns ok status and uptime', () => {
    const result = getHealth();
    expect(result.status).toBe('ok');
    expect(result.uptime).toBeGreaterThanOrEqual(0);
  });
});

