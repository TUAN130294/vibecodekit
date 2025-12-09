#!/usr/bin/env node
/**
 * Warn (non-blocking) if staged code changes do not include memory-bank updates.
 * Keeps Active Context System in sync by nudging contributors before commit.
 */
import { execSync } from 'child_process';

function getStagedFiles() {
  try {
    const raw = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim();
    return raw ? raw.split('\n').filter(Boolean) : [];
  } catch (err) {
    console.warn('[verify-memory] Unable to read staged files (is git available?)');
    return [];
  }
}

function run() {
  const staged = getStagedFiles();
  if (!staged.length) {
    return;
  }

  const memoryTouched = staged.some(path => path.startsWith('vibekit/memory-bank/'));
  const codeTouched = staged.filter(
    path =>
      !path.startsWith('vibekit/memory-bank/') &&
      !path.startsWith('vibekit/.githooks/') &&
      !path.startsWith('vibekit/scripts/') &&
      !path.startsWith('vibekit/docs/') &&
      !path.startsWith('README')
  );

  if (codeTouched.length && !memoryTouched) {
    console.warn('\n[memory-bank] Detected staged code changes without progress update.');
    console.warn(
      '- Please open and update vibekit/memory-bank/progress.md (status, checkboxes, last updated).'
    );
    console.warn('- Re-stage after updating to keep Active Context in sync.\n');
  }
}

run();

