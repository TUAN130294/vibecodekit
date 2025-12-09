#!/usr/bin/env node

/**
 * Setup a new project from Universal Kit
 * Usage: node scripts/setup-new-project.js <project-name>
 * Example: node scripts/setup-new-project.js antigravity
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
  console.error('❌ Error: Project name is required');
  console.log('\nUsage: node scripts/setup-new-project.js <project-name>');
  console.log('Example: node scripts/setup-new-project.js antigravity\n');
  process.exit(1);
}

// Validate project name (npm package name rules)
if (!/^[a-z0-9-]+$/.test(projectName)) {
  console.error('❌ Error: Project name must be lowercase, alphanumeric, and hyphens only');
  console.log('Example: antigravity, my-app, project-123\n');
  process.exit(1);
}

console.log(`\n🚀 Setting up new project: ${projectName}\n`);

// Step 1: Update package.json
console.log('📝 Step 1: Updating package.json...');
const pkgPath = './package.json';
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.name = projectName;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log(`   ✅ Updated package.json name -> ${projectName}`);
} else {
  console.error('   ❌ package.json not found!');
  process.exit(1);
}

// Step 2: Update README
console.log('\n📝 Step 2: Updating README.md...');
const readmePath = './README.md';
if (fs.existsSync(readmePath)) {
  let readme = fs.readFileSync(readmePath, 'utf-8');
  // Update title
  readme = readme.replace(/^# .*/m, `# ${projectName}`);
  // Update project name references
  readme = readme.replace(/automation-data-analytics-platform/g, projectName);
  readme = readme.replace(/Universal Kit/g, projectName);
  fs.writeFileSync(readmePath, readme);
  console.log('   ✅ Updated README.md');
} else {
  console.log('   ⚠️  README.md not found, skipping...');
}

// Step 3: Update docker-compose.yml
console.log('\n📝 Step 3: Updating docker-compose.yml...');
const composePath = './docker-compose.yml';
if (fs.existsSync(composePath)) {
  let compose = fs.readFileSync(composePath, 'utf-8');
  compose = compose.replace(/automation-data-analytics-platform/g, projectName);
  compose = compose.replace(/api-server/g, `${projectName}-api`);
  compose = compose.replace(/myapp/g, projectName);
  fs.writeFileSync(composePath, compose);
  console.log('   ✅ Updated docker-compose.yml');
} else {
  console.log('   ⚠️  docker-compose.yml not found, skipping...');
}

// Step 4: Update .env.example
console.log('\n📝 Step 4: Updating .env.example...');
const envExamplePath = './.env.example';
if (fs.existsSync(envExamplePath)) {
  let envExample = fs.readFileSync(envExamplePath, 'utf-8');
  envExample = envExample.replace(/myapp/g, projectName);
  fs.writeFileSync(envExamplePath, envExample);
  console.log('   ✅ Updated .env.example');
} else {
  console.log('   ⚠️  .env.example not found, skipping...');
}

// Step 5: Update next.config.cjs (if exists)
console.log('\n📝 Step 5: Checking Next.js config...');
const nextConfigPath = './next.config.cjs';
if (fs.existsSync(nextConfigPath)) {
  console.log('   ✅ Next.js config found');
} else {
  console.log('   ⚠️  next.config.cjs not found, skipping...');
}

// Step 6: Update memory-bank files
console.log('\n📝 Step 6: Updating memory-bank files...');
const memoryBankPath = './memory-bank';
if (fs.existsSync(memoryBankPath)) {
  const files = ['project-brief.md', 'decisions.md', 'progress.md'];
  files.forEach(file => {
    const filePath = path.join(memoryBankPath, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      content = content.replace(/automation-data-analytics-platform/g, projectName);
      content = content.replace(/Universal Kit/g, projectName);
      fs.writeFileSync(filePath, content);
      console.log(`   ✅ Updated ${file}`);
    }
  });
} else {
  console.log('   ⚠️  memory-bank folder not found, skipping...');
}

// Step 7: Update vercel.json (if exists)
console.log('\n📝 Step 7: Checking Vercel config...');
const vercelPath = './vercel.json';
if (fs.existsSync(vercelPath)) {
  console.log('   ✅ vercel.json found');
} else {
  console.log('   ⚠️  vercel.json not found, skipping...');
}

// Summary
console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║                                                            ║');
console.log('║                  ✅ Setup Complete! ✅                     ║');
console.log('║                                                            ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

console.log(`📋 Project "${projectName}" has been configured!\n`);

console.log('🚀 Next steps:\n');
console.log('1. Review and update configuration files:');
console.log('   - package.json');
console.log('   - README.md');
console.log('   - .env.example (copy to .env and fill in values)');
console.log('   - memory-bank/*.md\n');

console.log('2. Install dependencies:');
console.log('   npm install\n');

console.log('3. Configure your project:');
console.log('   npm run init\n');

console.log('4. Start development:');
console.log('   npm run dev:web\n');

console.log('💡 Tip: You can also use the web UI at http://localhost:3000/kit-guide');
console.log('   to customize your project configuration!\n');

