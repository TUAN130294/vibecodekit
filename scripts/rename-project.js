#!/usr/bin/env node
import fs from 'fs';

const newName = process.argv[2];
if (!newName) {
  console.error('Usage: node scripts/rename-project.js <new-project-name>');
  process.exit(1);
}

// update package.json name and README title if present
const pkgPath = './package.json';
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.name = newName;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log(`Updated package.json name -> ${newName}`);
}

const readmePath = './README.md';
if (fs.existsSync(readmePath)) {
  const readme = fs.readFileSync(readmePath, 'utf-8');
  const updated = readme.replace(/^# .*/m, `# ${newName}`);
  fs.writeFileSync(readmePath, updated);
  console.log('Updated README title');
}

const composePath = './docker-compose.yml';
if (fs.existsSync(composePath)) {
  const compose = fs.readFileSync(composePath, 'utf-8');
  const updated = compose.replace(/api-server/g, `${newName}-api`);
  fs.writeFileSync(composePath, updated);
  console.log('Updated docker-compose container name references');
}

console.log('Done. Please review other files (memory-bank, .env) for project-specific values.');

