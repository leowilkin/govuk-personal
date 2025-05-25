#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔄 Syncing template with main project...');

// Files and directories to exclude from sync
const excludeList = [
  '.git',
  'node_modules', 
  'template',
  '.astro',
  'index.js',
  'sync-template.js',
  'PUBLISHING.md',
  'package-lock.json',
  '.env',
  'dist'
];

function shouldExclude(name) {
  return excludeList.includes(name);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (shouldExclude(entry.name)) {
      continue;
    }

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ✓ ${entry.name}`);
    }
  }
}

// Clear template directory first
const templateDir = path.join(__dirname, 'template');
if (fs.existsSync(templateDir)) {
  fs.rmSync(templateDir, { recursive: true });
}

// Copy files
copyDir(__dirname, templateDir);

// Update template package.json
const templatePackageJson = path.join(templateDir, 'package.json');
const packageData = {
  "name": "govuk-personal-site",
  "version": "0.0.1", 
  "description": "A personal website using the GOV.UK Design System",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build", 
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^5.8.0",
    "govuk-frontend": "^5.10.1",
    "nunjucks": "^3.2.4",
    "sass": "^1.89.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.3",
    "@types/node": "^22.0.0",
    "typescript": "^5.6.2"
  }
};

fs.writeFileSync(templatePackageJson, JSON.stringify(packageData, null, 2));

console.log('✅ Template sync complete!');
console.log('\nNext steps:');
console.log('1. Test the create script: node index.js');
console.log('2. Update version if needed: npm version patch');
console.log('3. Publish: npm publish');
