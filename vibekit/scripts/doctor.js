#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import net from 'net';

const requiredEnv = ['DATABASE_URL', 'JWT_SECRET'];
const optionalEnv = ['REDIS_URL', 'CORS_ORIGINS', 'STRIPE_KEY', 'STRIPE_WEBHOOK_SECRET', 'SENDGRID_API_KEY', 'RESEND_API_KEY'];
const envCandidates = ['.env', '.env.local', '.env.staging', '.env.prod', '.env.example'];
const portsToCheck = [
  { name: 'API', port: 3000 },
  { name: 'Postgres', port: 5432 },
  { name: 'Redis', port: 6379 }
];

const envPath = ['.env.local', '.env'].find(p => fs.existsSync(p)) || '.env.example';
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';

function checkEnv() {
  const missing = requiredEnv.filter(key => !envContent.includes(key));
  return { missing, checked: requiredEnv.length };
}

const secretPatterns = [
  /sk-[\w-]{20,}/i, // Stripe/OpenAI-style tokens
  /AIza[0-9A-Za-z\-_]{25,}/, // Google API keys
  /-----BEGIN (?:RSA|OPENAI|PRIVATE) KEY-----/,
  /(xox[baprs]-[0-9A-Za-z-]{20,})/ // Slack tokens
];

function findSecretLeaks(paths) {
  const warnings = [];
  for (const candidate of paths) {
    if (!fs.existsSync(candidate)) continue;
    const content = fs.readFileSync(candidate, 'utf-8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.startsWith('#') || !line.includes('=')) return;
      if (line.includes('<') || line.includes('YOUR_')) return;
      secretPatterns.forEach(pattern => {
        if (pattern.test(line)) {
          warnings.push({ file: candidate, line: idx + 1, sample: line.trim() });
        }
      });
    });
  }
  return warnings;
}

function checkPort(port) {
  return new Promise(resolve => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port, '0.0.0.0');
  });
}

async function main() {
  console.log(`Doctor: checking env (${envPath})...`);
  const envCheck = checkEnv();
  if (envCheck.missing.length) {
    console.log(`Missing required env: ${envCheck.missing.join(', ')}`);
  } else {
    console.log('Env OK (required keys found).');
  }
  const presentOptional = optionalEnv.filter(key => envContent.includes(key));
  console.log(`Optional env present: ${presentOptional.join(', ') || 'none'}`);

  console.log('Doctor: scanning env files for obvious secrets...');
  const secretFindings = findSecretLeaks(envCandidates);
  if (secretFindings.length) {
    console.warn('Potential secrets detected (please move to .env.* and gitignore properly):');
    secretFindings.forEach(item =>
      console.warn(`- ${item.file}:${item.line} -> ${item.sample.slice(0, 80)}`)
    );
  } else {
    console.log('Secret scan: no obvious secrets found in env files.');
  }

  console.log('Doctor: checking ports...');
  for (const p of portsToCheck) {
    const free = await checkPort(p.port);
    console.log(`${p.name} port ${p.port}: ${free ? 'free/usable' : 'in use'}`);
  }

  console.log('Doctor: testing DB connectivity (if DATABASE_URL present)...');
  if (!envContent.includes('DATABASE_URL')) {
    console.log('Skip DB check (no DATABASE_URL).');
  } else {
    try {
      execSync('node -e "require(\'pg\').Client({connectionString: process.env.DATABASE_URL}).connect().then(c=>c.end())"', {
        stdio: 'ignore',
        env: { ...process.env }
      });
      console.log('DB connection: OK');
    } catch (err) {
      console.log('DB connection: FAILED (check DATABASE_URL and network)');
    }
  }

  console.log('Doctor: done.');
}

main();

