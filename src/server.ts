import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const server = app.listen(env.port, () => {
  logger.info(`Server listening on port ${env.port}`, {
    env: env.nodeEnv,
    region: env.region
  });
});

// Graceful shutdown
const shutdown = () => {
  logger.info('Shutting down server');
  server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

