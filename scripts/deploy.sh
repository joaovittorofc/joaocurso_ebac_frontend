#!/bin/bash

# Deployment script for João Vittor's website
# Supports both Bun and Node.js fallback

set -e

echo "🚀 Starting deployment process..."

# Check if Bun is available
if command -v bun &> /dev/null; then
    echo "✅ Bun detected - using Bun for build"
    
    # Install dependencies with Bun
    echo "📦 Installing dependencies with Bun..."
    bun install
    
    # Build with Bun
    echo "🏗️ Building with Bun..."
    bun run build
    
    echo "✅ Build completed successfully with Bun!"
    
elif command -v npm &> /dev/null; then
    echo "⚠️ Bun not found - falling back to npm"
    
    # Install dependencies with npm
    echo "📦 Installing dependencies with npm..."
    npm install
    
    # Build with npm
    echo "🏗️ Building with npm..."
    npm run build
    
    echo "✅ Build completed successfully with npm!"
    
else
    echo "❌ Error: Neither Bun nor npm found. Please install one of them."
    exit 1
fi

echo "🎉 Deployment preparation complete!"
echo "📁 Build output is ready in the .next directory"
