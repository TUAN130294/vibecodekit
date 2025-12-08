import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  region: process.env.REGION || 'id-jakarta',
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  corsOrigins: (process.env.CORS_ORIGINS || '').split(',').filter(Boolean)
};

