#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Kheti Mitra Backend...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file from template...');
    fs.copyFileSync(path.join(__dirname, 'env.example'), envPath);
    console.log('✅ .env file created. Please update it with your configuration.\n');
} else {
    console.log('✅ .env file already exists.\n');
}

// Create uploads directory
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    console.log('📁 Creating uploads directory...');
    fs.mkdirSync(uploadsPath, { recursive: true });
    fs.mkdirSync(path.join(uploadsPath, 'pest-images'), { recursive: true });
    console.log('✅ Uploads directory created.\n');
} else {
    console.log('✅ Uploads directory already exists.\n');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('📦 Installing dependencies...');
    console.log('   Run: npm install\n');
} else {
    console.log('✅ Dependencies already installed.\n');
}

console.log('🎯 Next steps:');
console.log('1. Update .env file with your configuration');
console.log('2. Run: npm install (if not done already)');
console.log('3. Set up your Supabase project and run the database schema');
console.log('4. Run: npm run dev');
console.log('\n📚 Check README.md for detailed setup instructions.\n');

console.log('🌟 Backend setup complete! Happy coding! 🚀');
