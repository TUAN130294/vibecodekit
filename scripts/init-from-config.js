#!/usr/bin/env node

/**
 * Initialize project from saved config file
 * Usage: node scripts/init-from-config.js [config-file]
 * Default: kit-config.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const configFile = process.argv[2] || 'kit-config.json';

if (!fs.existsSync(configFile)) {
  console.error(`❌ Config file not found: ${configFile}`);
  console.log('💡 Please save your configuration first from the web UI.');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));

console.log('\n🚀 Initializing project from saved configuration...\n');
console.log('📋 Configuration:');
console.log(`   Database: ${config.database}`);
console.log(`   API Style: ${config.apiStyle}`);
console.log(`   Deployment: ${config.deployment}`);
console.log(`   Features: ${config.features.join(', ')}\n`);

// Map web UI config to init script config format
const initConfig = {
  mode: config.deployment.includes('Docker') || config.deployment.includes('AWS') ? 'pro' : 'lite',
  backend: config.apiStyle === 'REST API' ? 'nextjs-api' : 
           config.apiStyle === 'GraphQL' ? 'nextjs-api' : 'hybrid',
  needsPython: config.features.includes('Automation (n8n)'),
  needsN8n: config.features.includes('Automation (n8n)'),
  needsRedis: config.deployment.includes('Docker') || config.deployment.includes('AWS'),
  needsAI: config.features.includes('AI Chatbot'),
  needsBI: config.features.includes('BI Dashboard'),
  deployment: config.deployment.includes('Docker') ? 'docker' :
               config.deployment.includes('AWS') ? 'aws-eb' : 'serverless',
  database: config.database.includes('PostgreSQL') ? 
            (config.database.includes('Prisma') ? 'postgres' : 'postgres') :
            config.database.includes('MongoDB') ? 'mongodb' : 'supabase',
};

// Save config for init script
fs.writeFileSync('.kit-config.json', JSON.stringify(initConfig, null, 2));

console.log('✅ Config mapped and saved to .kit-config.json');
console.log('\n⚙️  Running init script...\n');

try {
  // Run the actual init script (it will read .kit-config.json)
  // But we need to modify init.js to accept non-interactive mode
  // For now, just show what would be configured
  console.log('📝 Would configure:');
  console.log(`   Mode: ${initConfig.mode}`);
  console.log(`   Backend: ${initConfig.backend}`);
  console.log(`   Deployment: ${initConfig.deployment}`);
  console.log(`   Database: ${initConfig.database}`);
  console.log(`   Python: ${initConfig.needsPython ? 'Yes' : 'No'}`);
  console.log(`   n8n: ${initConfig.needsN8n ? 'Yes' : 'No'}`);
  console.log(`   Redis: ${initConfig.needsRedis ? 'Yes' : 'No'}`);
  console.log(`   AI: ${initConfig.needsAI ? 'Yes' : 'No'}`);
  console.log(`   BI: ${initConfig.needsBI ? 'Yes' : 'No'}\n`);
  
  console.log('💡 Note: Full init script requires interactive mode.');
  console.log('   Run: npm run init\n');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

