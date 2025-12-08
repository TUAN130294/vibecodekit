#!/usr/bin/env node

/**
 * Universal Kit Initializer
 * Smart CLI to configure your project based on your needs
 *
 * Usage: npm run init
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Color codes for terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
};

const config = {
  mode: 'lite', // lite | pro
  needsPython: false,
  needsN8n: false,
  needsRedis: false,
  needsAI: false,
  needsBI: false,
  deployment: 'serverless', // serverless | docker | aws
  database: 'supabase', // supabase | neon | postgres | mongodb
};

function print(text, color = 'reset') {
  console.log(`${colors[color]}${text}${colors.reset}`);
}

function printHeader() {
  console.clear();
  print('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  print('║                                                            ║', 'cyan');
  print('║          🚀 Universal Kit - Smart Initializer 🚀          ║', 'cyan');
  print('║                                                            ║', 'cyan');
  print('║     Biến kit thành LEGO - Chỉ lấy những gì bạn cần!      ║', 'cyan');
  print('║                                                            ║', 'cyan');
  print('╚════════════════════════════════════════════════════════╝\n', 'cyan');
}

function ask(question) {
  return new Promise((resolve) => {
    rl.question(`${colors.bright}${question}${colors.reset} `, resolve);
  });
}

async function selectMode() {
  print('\n📦 Bước 1: Chọn chế độ khởi tạo\n', 'magenta');
  print('1. Lite Mode (Khuyến nghị cho mới bắt đầu)', 'green');
  print('   → Next.js + Serverless Database (Deploy miễn phí trên Vercel)', 'reset');
  print('   → Chi phí: $0/tháng, nâng cấp được sau', 'reset');
  print('   → Tốc độ setup: 5 phút\n', 'reset');

  print('2. Pro Mode (Đầy đủ tính năng)', 'blue');
  print('   → Next.js + Node.js + Python + n8n + Redis + Docker', 'reset');
  print('   → Chi phí: $20-50/tháng (self-hosted) hoặc $60-180/tháng (AWS)', 'reset');
  print('   → Tốc độ setup: 15-20 phút\n', 'reset');

  const choice = await ask('Chọn mode (1 = Lite, 2 = Pro): ');

  if (choice === '2') {
    config.mode = 'pro';
    config.needsRedis = true;
    print('\n✅ Đã chọn Pro Mode - Full stack power!\n', 'green');
    return true;
  } else {
    config.mode = 'lite';
    print('\n✅ Đã chọn Lite Mode - Serverless first!\n', 'green');
    return false;
  }
}

async function askFeatures() {
  print('\n🎯 Bước 2: Tính năng bạn cần (có thể bỏ qua và thêm sau)\n', 'magenta');

  // Python/Automation
  const python = await ask('Bạn có cần Python workers để tự động hóa? (y/n): ');
  config.needsPython = python.toLowerCase() === 'y';

  // n8n
  const n8n = await ask('Bạn có cần n8n (No-code automation)? (y/n): ');
  config.needsN8n = n8n.toLowerCase() === 'y';

  // AI Features
  const ai = await ask('Bạn có cần AI Chatbot/RAG features? (y/n): ');
  config.needsAI = ai.toLowerCase() === 'y';

  // BI Dashboard
  const bi = await ask('Bạn có cần BI Dashboard/Analytics? (y/n): ');
  config.needsBI = bi.toLowerCase() === 'y';

  print('\n', 'reset');
}

async function selectDeployment() {
  if (config.mode === 'lite') {
    print('\n☁️ Bước 3: Chọn platform deploy\n', 'magenta');
    print('1. Vercel + Supabase (Miễn phí - Khuyến nghị)', 'green');
    print('   → Không cần server, tự động scale', 'reset');
    print('   → Free tier: Đủ cho 100k requests/tháng\n', 'reset');

    print('2. Vercel + Neon (Postgres serverless)', 'blue');
    print('   → Nếu bạn thích Postgres hơn\n', 'reset');

    print('3. Self-hosted Docker (Cần server riêng)', 'yellow');
    print('   → Chi phí: $5-20/tháng VPS\n', 'reset');

    const choice = await ask('Chọn deployment (1/2/3): ');

    if (choice === '2') {
      config.deployment = 'serverless';
      config.database = 'neon';
    } else if (choice === '3') {
      config.deployment = 'docker';
      config.database = 'postgres';
    } else {
      config.deployment = 'serverless';
      config.database = 'supabase';
    }
  } else {
    // Pro mode
    print('\n☁️ Bước 3: Chọn deployment strategy\n', 'magenta');
    print('1. Self-hosted Docker (Tiết kiệm nhất)', 'green');
    print('2. AWS Elastic Beanstalk (Dễ nhất)', 'blue');
    print('3. AWS ECS + Fargate (Production-ready)', 'yellow');

    const choice = await ask('Chọn deployment (1/2/3): ');

    if (choice === '2') {
      config.deployment = 'aws-eb';
    } else if (choice === '3') {
      config.deployment = 'aws-ecs';
    } else {
      config.deployment = 'docker';
    }

    config.database = 'postgres';
  }

  print(`\n✅ Deploy: ${config.deployment}, Database: ${config.database}\n`, 'green');
}

function generateDockerCompose() {
  if (config.mode === 'lite' && config.deployment === 'serverless') {
    // No docker-compose needed for serverless
    return;
  }

  const services = [];

  // Always include app and postgres in Pro mode
  if (config.mode === 'pro' || config.deployment === 'docker') {
    services.push('app', 'postgres');
  }

  if (config.needsRedis) services.push('redis');
  if (config.needsPython) services.push('python-worker');
  if (config.needsN8n) services.push('n8n');

  const dockerCompose = `# Generated by Universal Kit Init
# Mode: ${config.mode}
# Selected services: ${services.join(', ')}

version: '3.8'

services:
${services.includes('postgres') ? `
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: changeme
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 10s
      timeout: 5s
      retries: 5
` : ''}
${services.includes('redis') ? `
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
` : ''}
${services.includes('app') ? `
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://admin:changeme@postgres:5432/myapp
      ${config.needsRedis ? 'REDIS_URL: redis://redis:6379' : ''}
    depends_on:
      ${services.includes('postgres') ? '- postgres' : ''}
      ${services.includes('redis') ? '- redis' : ''}
    volumes:
      - .:/app
      - /app/node_modules
` : ''}
${services.includes('python-worker') ? `
  python-worker:
    build:
      context: ./services/python-worker
    environment:
      DATABASE_URL: postgresql://admin:changeme@postgres:5432/myapp
    depends_on:
      - postgres
    volumes:
      - ./services/python-worker:/app
` : ''}
${services.includes('n8n') ? `
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=changeme
    volumes:
      - n8n_data:/home/node/.n8n
` : ''}

volumes:
${services.includes('postgres') ? '  postgres_data:' : ''}
${services.includes('redis') ? '  redis_data:' : ''}
${services.includes('n8n') ? '  n8n_data:' : ''}
`;

  fs.writeFileSync('docker-compose.yml', dockerCompose);
  print('✅ Created docker-compose.yml', 'green');
}

function generateEnvFile() {
  let envContent = `# Generated by Universal Kit Init
# Mode: ${config.mode}

NODE_ENV=development
PORT=3000

# Database
`;

  if (config.database === 'supabase') {
    envContent += `# Supabase (Get from https://supabase.com)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
`;
  } else if (config.database === 'neon') {
    envContent += `# Neon (Get from https://neon.tech)
DATABASE_URL=postgresql://[user]:[password]@[endpoint].neon.tech/[database]
`;
  } else {
    envContent += `# PostgreSQL
DATABASE_URL=postgresql://admin:changeme@localhost:5432/myapp
`;
  }

  if (config.needsRedis) {
    if (config.mode === 'lite') {
      envContent += `\n# Redis (Upstash - Get from https://upstash.com)
REDIS_URL=https://your-endpoint.upstash.io
REDIS_TOKEN=your-token
`;
    } else {
      envContent += `\n# Redis
REDIS_URL=redis://localhost:6379
`;
    }
  }

  if (config.needsAI) {
    envContent += `\n# OpenAI (Get from https://platform.openai.com)
OPENAI_API_KEY=sk-...
`;
  }

  fs.writeFileSync('.env.example', envContent);

  if (!fs.existsSync('.env')) {
    fs.writeFileSync('.env', envContent);
    print('✅ Created .env file', 'green');
  }
  print('✅ Created .env.example', 'green');
}

function cleanupUnusedFiles() {
  print('\n🧹 Cleaning up unused files...', 'yellow');

  const toRemove = [];

  if (!config.needsPython) {
    toRemove.push('services/python-worker');
  }

  if (!config.needsAI) {
    toRemove.push('templates/protected-code/bot-template.ts');
    toRemove.push('.cursor/rules/ai-chatbot-rules.md');
  }

  if (config.mode === 'lite' && config.deployment === 'serverless') {
    toRemove.push('Dockerfile');
  }

  toRemove.forEach(item => {
    const fullPath = path.join(process.cwd(), item);
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        print(`  🗑️  Removed ${item}/`, 'yellow');
      } else {
        fs.unlinkSync(fullPath);
        print(`  🗑️  Removed ${item}`, 'yellow');
      }
    }
  });
}

function generateVercelConfig() {
  if (config.deployment !== 'serverless') return;

  const vercelConfig = {
    buildCommand: "npm run build",
    outputDirectory: ".next",
    framework: "nextjs",
    installCommand: "npm install"
  };

  fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
  print('✅ Created vercel.json', 'green');
}

function updatePackageJson() {
  const packagePath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packagePath)) return;

  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

  // Add deployment scripts based on mode
  if (config.deployment === 'serverless') {
    pkg.scripts = pkg.scripts || {};
    pkg.scripts['deploy:vercel'] = 'vercel --prod';
    pkg.scripts['dev:serverless'] = 'vercel dev';
  }

  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
  print('✅ Updated package.json', 'green');
}

function printSummary() {
  print('\n╔════════════════════════════════════════════════════════════╗', 'green');
  print('║                                                            ║', 'green');
  print('║                  ✅ Setup Complete! ✅                     ║', 'green');
  print('║                                                            ║', 'green');
  print('╚════════════════════════════════════════════════════════╝\n', 'green');

  print('📋 Configuration Summary:\n', 'bright');
  print(`   Mode: ${config.mode === 'lite' ? 'Lite (Serverless)' : 'Pro (Full Stack)'}`, 'cyan');
  print(`   Deployment: ${config.deployment}`, 'cyan');
  print(`   Database: ${config.database}`, 'cyan');
  print(`   Python: ${config.needsPython ? '✅' : '❌'}`, 'cyan');
  print(`   n8n: ${config.needsN8n ? '✅' : '❌'}`, 'cyan');
  print(`   AI Features: ${config.needsAI ? '✅' : '❌'}`, 'cyan');
  print(`   BI Dashboard: ${config.needsBI ? '✅' : '❌'}`, 'cyan');

  print('\n🚀 Next Steps:\n', 'bright');

  if (config.deployment === 'serverless') {
    print('1. Tạo tài khoản miễn phí:', 'yellow');
    if (config.database === 'supabase') {
      print('   → https://supabase.com (Database)', 'reset');
    } else if (config.database === 'neon') {
      print('   → https://neon.tech (Database)', 'reset');
    }
    print('   → https://vercel.com (Hosting)', 'reset');
    print('\n2. Copy credentials vào file .env\n', 'yellow');
    print('3. Chạy development:', 'yellow');
    print('   npm run dev\n', 'green');
    print('4. Deploy lên production:', 'yellow');
    print('   npm run deploy:vercel\n', 'green');
  } else {
    print('1. Setup database:', 'yellow');
    print('   docker-compose up -d postgres', 'green');
    print('\n2. Chạy migrations:', 'yellow');
    print('   npm run db:migrate\n', 'green');
    print('3. Start development:', 'yellow');
    print('   npm run dev\n', 'green');
  }

  print('📚 Documentation:', 'bright');
  print('   → Quick Start: docs/quick-start.md', 'reset');
  if (config.mode === 'lite') {
    print('   → Serverless Guide: docs/serverless-deployment.md', 'reset');
    print('   → Upgrade to Pro: docs/lite-to-pro-upgrade.md', 'reset');
  } else {
    print('   → Docker Guide: docs/docker-setup.md', 'reset');
  }

  print('\n💡 Tip: Bạn có thể nâng cấp từ Lite → Pro bất kỳ lúc nào!', 'yellow');
  print('    Chạy lại: npm run init\n', 'yellow');
}

async function main() {
  printHeader();

  // Step 1: Choose mode
  const isPro = await selectMode();

  // Step 2: Select features (skip some in lite mode)
  if (isPro) {
    await askFeatures();
  } else {
    // In lite mode, only ask for AI features
    const ai = await ask('\n🤖 Bạn có cần AI Chatbot features? (y/n): ');
    config.needsAI = ai.toLowerCase() === 'y';
  }

  // Step 3: Select deployment
  await selectDeployment();

  // Confirm
  print('\n⚙️  Đang cấu hình project...', 'cyan');
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate files
  print('\n📝 Generating configuration files...\n', 'bright');
  generateDockerCompose();
  generateEnvFile();
  generateVercelConfig();
  updatePackageJson();

  // Cleanup
  if (config.mode === 'lite') {
    cleanupUnusedFiles();
  }

  // Save config
  fs.writeFileSync('.kit-config.json', JSON.stringify(config, null, 2));
  print('✅ Saved configuration to .kit-config.json', 'green');

  // Summary
  printSummary();

  rl.close();
}

// Run
main().catch(error => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});
