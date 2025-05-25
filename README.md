# Personal Website

A place to share my notes / references, books general stuff i'm passionate about.

**Tech Stack**:

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MDX](https://img.shields.io/badge/mdx-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Scripts](#scripts)
- [Adding Dependencies](#adding-dependencies)
- [Content Management](#content-management)

## Getting Started

Ensure you have the following tools installed on your system before proceeding:

- **Node.js 18+** - Check by running `node --version`
  - [Download here](https://nodejs.org/) or use homebrew `brew install node`
- **pnpm** - Check by running `pnpm --version`
  - Install with `npm install -g pnpm`

```bash
# Start development server (installs deps automatically)
pnpm d
```

Once the development server is running, you can access the application at:

- **Website**: Open [http://localhost:3000](http://localhost:3000) to view the site

## Development Guidelines

### Where to Put Files

- **React Components** → `src/components/`
- **Custom Hooks** → `src/hooks/`
- **Business Logic / Utilities** → `src/lib/`
- **Type Definitions** → `src/types/`
- **Content management / Static Data** → `src/data/`
- **Pages** → `src/app/`
- **MDX Content** → `content/`
- **Images/Assets** → `public/page-which-uses-asset/`

### Naming Conventions

- **Components**: PascalCase (`CommandPalette.tsx`)
- **Hooks**: camelCase with `use` prefix (`useGlobalShortcuts.ts`)
- **Utilities**: camelCase (`searchContent.ts`)
- **Types**: PascalCase (`SearchableItem.ts`)
- **Constants**: UPPER_SNAKE_CASE

## Scripts

Available commands for development and deployment:

- `pnpm d` - Install deps & start dev server with Turbopack
- `pnpm dev` - Start dev server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check if files are properly formatted
- `pnpm typecheck` - Run TypeScript type checking

## Adding Dependencies

```bash
# Production dependency
pnpm add <package-name>

# Development dependency
pnpm add -D <package-name>
```

## Content Management

This website uses a static data approach for content management, with all content defined in TypeScript files in `src/data/`:

### Static Data Structure

- **`compendiums.ts`** - Technical guides and references metadata

  - Each compendium has: `title`, `description`, `date`, `author`, and `slug`
  - Actual content stored as MDX files in `content/compendiums` dir

- **`books.ts`** - Book recommendations with personal thoughts

  - Each book has: `title`, `image`, and `thoughts`

- **`about-me.ts`** - Personal information for the about section
  - Each has: `image` & `text`

### Adding New Content

**New Compendium:**

1. Create MDX file in `content/compendiums/new-file.mdx`
2. `compendiums.ts` is auto-generated via pre-commit hook running `pnpm generate:compendiums` (`tsx scripts/generate-compendiums.ts`)

**New Book:**

1. Add book object to `books.ts` with title, image path, and thoughts
2. Add book cover image to `public/books/`

**Update About Me:**

1. Modify `aboutMeItems` array in `about-me.ts`
2. Add corresponding images to `public/about-me/`

### MDX Features

Compendiums use [MDX Remote](https://github.com/hashicorp/next-mdx-remote) with support for:

- Mathematical expressions via KaTeX
- GitHub Flavored Markdown (tables, strikethrough, etc.)
- Custom React component styling
- Code syntax highlighting
