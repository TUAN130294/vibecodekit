import { logger } from './utils/logger';

// Placeholder worker entrypoint
const run = async () => {
  logger.info('Worker started (stub)');
};

run().catch((err) => {
  logger.error('Worker failed', { error: err.message });
  process.exit(1);
});

