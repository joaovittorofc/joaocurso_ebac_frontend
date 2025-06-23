# João Vittor's Digital Experience Website

A modern, responsive website built with Next.js, featuring an interactive onboarding funnel and multilingual support (English, Portuguese, Spanish).

## 🚀 Quick Start

### Prerequisites

- **Bun** >= 1.0.0 (recommended) or **Node.js** >= 18.0.0
- **Git**

### Local Development with Bun (Recommended)

1. **Install Bun** (if not already installed):
   \`\`\`bash
   curl -fsSL https://bun.sh/install | bash
   \`\`\`

2. **Clone and setup the project**:
   \`\`\`bash
   git clone <your-repo-url>
   cd joao-vittor-website
   bun install
   \`\`\`

3. **Start development server**:
   \`\`\`bash
   bun dev
   # or
   bun run dev:bun
   \`\`\`

4. **Open your browser** and navigate to `http://localhost:3000`

### Fallback: Local Development with Node.js

If Bun is not available or compatible:

1. **Install Node.js** >= 18.0.0 from [nodejs.org](https://nodejs.org/)

2. **Setup the project**:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start development server**:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

## 🏗️ Building for Production

### With Bun
\`\`\`bash
bun run build
bun start
\`\`\`

### With Node.js (Fallback)
\`\`\`bash
npm run build
npm start
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment with Bun:

1. **Connect your repository** to Vercel
2. **Vercel will automatically detect** the `vercel.json` configuration
3. **Deploy** - Vercel will use Bun for faster builds

#### Manual Deployment
\`\`\`bash
# Install Vercel CLI
bun add -g vercel
# or npm install -g vercel

# Deploy
vercel --prod
\`\`\`

### Other Platforms

For other deployment platforms, use the Node.js fallback:

\`\`\`bash
npm run build:fallback
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
joao-vittor-website/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── onboarding/        # Onboarding funnel components
│   ├── sections/          # Page sections
│   ├── ui/               # Reusable UI components
│   └── ...
├── contexts/             # React contexts
│   └── language-context.tsx
├── public/               # Static assets
├── vercel.json          # Vercel deployment config
├── package.json         # Dependencies and scripts
└── README.md           # This file
\`\`\`

## 🌟 Features

- **Interactive Onboarding Funnel** - Gamified user introduction
- **Multilingual Support** - English, Portuguese, Spanish
- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Clean, professional design
- **Performance Optimized** - Fast loading and smooth animations
- **SEO Ready** - Optimized for search engines

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start development server with Bun |
| `bun run build` | Build for production with Bun |
| `npm run dev` | Start development server with Node.js |
| `npm run build:fallback` | Build for production with Node.js |
| `bun run lint` | Run ESLint |
| `bun run type-check` | Run TypeScript type checking |
| `bun run clean` | Clean build artifacts and cache |

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

\`\`\`env
# Optional: Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1

# Add your environment variables here
# NEXT_PUBLIC_API_URL=https://api.example.com
\`\`\`

### Vercel Configuration

The `vercel.json` file includes:
- **Bun build commands** for faster builds
- **Security headers** for enhanced security
- **Routing configuration** for SPA behavior
- **Performance optimizations**

## 🐛 Troubleshooting

### Bun Issues

If you encounter issues with Bun:

1. **Update Bun** to the latest version:
   \`\`\`bash
   bun upgrade
   \`\`\`

2. **Clear cache** and reinstall:
   \`\`\`bash
   rm -rf node_modules bun.lockb
   bun install
   \`\`\`

3. **Use Node.js fallback**:
   \`\`\`bash
   npm run install:fallback
   npm run build:fallback
   \`\`\`

### Common Issues

- **Build fails on Vercel**: Check the build logs and ensure all dependencies are properly listed
- **Styling issues**: Verify Tailwind CSS is properly configured
- **TypeScript errors**: Run `bun run type-check` to identify issues

## 📦 Dependencies

### Core Dependencies
- **Next.js 14** - React framework
- **React 18** - UI library
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Development Dependencies
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review the [Vercel documentation](https://vercel.com/docs)
3. Check [Bun documentation](https://bun.sh/docs)
4. Open an issue in the repository

---

**Built with ❤️ using Bun, Next.js, and modern web technologies.**
