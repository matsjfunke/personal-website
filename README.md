# Personal Website

A Next.js website built with TypeScript and Tailwind CSS.

## Prerequisites

- **Node.js** 18+ - [Download here](https://nodejs.org/) or use homebrew `brew install node`
- **pnpm** - Install with `npm install -g pnpm`

## Getting Started

```bash
# Start development server (installs deps automatically)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Adding Dependencies

```bash
# Production dependency
pnpm add <package-name>

# Development dependency
pnpm add -D <package-name>
```

## Scripts

- `pnpm d` - Install deps & start dev server with Turbopack
- `pnpm dev` - Start dev server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check if files are properly formatted
- `pnpm typecheck` - Run TypeScript type checking

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Formatting**: [Prettier](https://prettier.io/) with import sorting
- **Code Quality**: [Husky](https://typicode.github.io/husky/)
