#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log('🏛️  Welcome to create-govuk-personal!');
  console.log('Creating a personal website with the GOV.UK Design System\n');

  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Project name:',
      initial: 'my-govuk-site',
      validate: value => value.length > 0 ? true : 'Project name is required'
    },
    {
      type: 'text',
      name: 'authorName',
      message: 'Your name (for package.json):',
      initial: 'Your Name'
    },
    {
      type: 'text',
      name: 'description',
      message: 'Project description:',
      initial: 'A personal website using the GOV.UK Design System'
    },
    {
      type: 'confirm',
      name: 'useGit',
      message: 'Initialize git repository?',
      initial: true
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: 'Install dependencies?',
      initial: true
    }
  ]);

  if (!response.projectName) {
    console.log('❌ Project creation cancelled');
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), response.projectName);
  const templateDir = path.join(__dirname, 'template');

  // Check if directory already exists
  if (fs.existsSync(targetDir)) {
    console.error(`❌ Directory ${response.projectName} already exists!`);
    process.exit(1);
  }

  console.log(`\n📁 Creating project in ${targetDir}...`);

  // Copy template files
  copyDir(templateDir, targetDir);

  // Update package.json with user input
  const packageJsonPath = path.join(targetDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  packageJson.name = response.projectName;
  packageJson.description = response.description;
  packageJson.author = response.authorName;
  packageJson.version = '0.0.1';
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log('✅ Project files copied');

  // Initialize git if requested
  if (response.useGit) {
    try {
      const { execSync } = await import('child_process');
      execSync('git init', { cwd: targetDir, stdio: 'ignore' });
      console.log('✅ Git repository initialized');
    } catch (error) {
      console.log('⚠️  Could not initialize git repository');
    }
  }

  // Install dependencies if requested
  if (response.installDeps) {
    console.log('\n📦 Installing dependencies...');
    try {
      const { execSync } = await import('child_process');
      execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
      console.log('✅ Dependencies installed');
    } catch (error) {
      console.log('⚠️  Could not install dependencies. Run `npm install` manually.');
    }
  }

  console.log('\n🎉 Project created successfully!');
  console.log('\nNext steps:');
  console.log(`  cd ${response.projectName}`);
  if (!response.installDeps) {
    console.log('  npm install');
  }
  console.log('  npm run dev');
  console.log('\n📖 Read the documentation: https://github.com/leowilkin/govuk-personal');
  console.log('💝 Show some love to GDS: https://github.com/alphagov');
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

main().catch(error => {
  console.error('❌ Error creating project:', error);
  process.exit(1);
});
