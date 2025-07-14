# Personal Website

## Tech Stack:

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MDX](https://img.shields.io/badge/mdx-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [MCP Server](#mcp-server)
- [Development Guidelines](#development-guidelines)
- [Scripts](#scripts)
- [Adding Dependencies](#adding-dependencies)
- [Content Management](#content-management)
- [Deployment](#deployment)

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
- **MCP Server**: Available at [http://localhost:3000/api/mcp](http://localhost:3000/api/mcp) for AI clients

## MCP Server

This website includes a **Model Context Protocol (MCP)** server that provides structured access to content for AI clients. The server uses JSON-RPC over HTTP and implements the MCP specification with API key authentication.

#### Available Resources

- `compendiums://all` - Returns all technical compendiums with metadata
- `thoughts://all` - Returns all thoughts and blog posts with metadata
- `books://all` - Returns all book recommendations with metadata

#### Available Tools

- `search_content(query)` - Search across all content types and return full MDX content

#### Authentication

The MCP server requires API key authentication for all requests. Include the API key in the `X-API-Key` header or as a `Bearer` token in the `Authorization` header.

**Default API Key:** `password` (⚠️ **Change this in production!**)

### Usage

**Test with curl:**

```bash
# Initialize MCP connection
curl -X POST http://localhost:3002/api/mcp \
  -H "Content-Type: application/json" \
  -H "X-API-Key: password" \
  -d '{"jsonrpc": "2.0", "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "test-client", "version": "1.0.0"}}, "id": 1}'

# List available resources
curl -X POST http://localhost:3002/api/mcp \
  -H "Content-Type: application/json" \
  -H "X-API-Key: password" \
  -d '{"jsonrpc": "2.0", "method": "resources/list", "params": {}, "id": 2}'

# Read all compendiums metadata
curl -X POST http://localhost:3002/api/mcp \
  -H "Content-Type: application/json" \
  -H "X-API-Key: password" \
  -d '{"jsonrpc": "2.0", "method": "resources/read", "params": {"uri": "compendiums://all"}, "id": 3}'

# List available tools
curl -X POST http://localhost:3002/api/mcp \
  -H "Content-Type: application/json" \
  -H "X-API-Key: password" \
  -d '{"jsonrpc": "2.0", "method": "tools/list", "params": {}, "id": 4}'

# Search for content (returns full MDX)
curl -X POST http://localhost:3002/api/mcp \
  -H "Content-Type: application/json" \
  -H "X-API-Key: password" \
  -d '{"jsonrpc": "2.0", "method": "tools/call", "params": {"name": "search_content", "arguments": {"query": "rust"}}, "id": 5}'

# Alternative: Using Authorization header
curl -X POST http://localhost:3002/api/mcp \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer password" \
  -d '{"jsonrpc": "2.0", "method": "ping", "id": 1}'
```

**Connect with MCP clients:**

- [MCP Inspector](https://inspector.modelcontextprotocol.io/) - Web-based testing tool
- Claude Desktop with MCP configuration

```json
{
  "mcpServers": {
    "matsjfunke": {
      "url": "https://mcp.matsjfunke.com/mcp", // or http://localhost:3000/api/mcp
      "headers": {
        "X-API-Key": "password"
      }
    }
  }
}
```

- Any MCP-compatible AI client

**Security Configuration:**

For production deployments, set the API key via environment variable:

```bash
# Set in your deployment environment
export MCP_API_KEY="your-secure-api-key-here"
```

The server will use `MCP_API_KEY` environment variable if set, otherwise defaults to `"password"`.

### Implementation

The MCP server is implemented as a Next.js API route (`/src/app/api/mcp/route.ts`) using manual JSON-RPC handling for simplicity and reliability. This approach provides:

- ✅ **Framework compatibility** - Works perfectly with Next.js
- ✅ **Stateless operation** - Fits serverless deployment models
- ✅ **Simple debugging** - Clear, readable JSON-RPC implementation
- ✅ **High performance** - Direct HTTP handling without abstraction layers

### Architecture

**Resources** (3 collection resources):

- Browse content metadata for discovery
- `compendiums://all`, `thoughts://all`, `books://all`

**Tools** (1 search tool):

- `search_content(query)` - Returns full MDX content from matching items
- Searches across all content types (compendiums, thoughts, books, pages)
- Provides complete content, not just metadata

This hybrid approach gives AI clients the best of both worlds: efficient browsing AND full content access through search.

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

- **`thoughts.ts`** - Technical guides and references metadata

  - Each compendium has: `title`, `abstract`, `date`, `author`, and `slug`
  - Actual content stored as MDX files in `content/thoughts` dir

- **`books.ts`** - Book recommendations with personal thoughts

  - Each book has: `title`, `image`, and `thoughts`

- **`about-me.ts`** - Personal information for the about section
  - Each has: `image` & `text`

### Adding New Content

**New Compendium:**

1. Create MDX file in `content/compendiums/new-file.mdx`
2. `compendiums.ts` is auto-generated via pre-commit hook running `pnpm generate:compendiums` (`tsx scripts/generate-compendiums.ts`)

**New Thought:**

same as compendium:

1. Create MDX file in `content/thoughts/new-file.mdx`
2. `src/data/thoughts.ts` is auto-generated via pre-commit hook running `pnpm generate:thoughts` (`tsx scripts/generate-compendiums.ts`)

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
- Custom styling
- Code syntax highlighting

## Deployment

This website is automatically deployed to a VPS using GitHub Actions whenever changes are pushed to the `main` branch.

### Prerequisites

**Configure VPS:**

- Create a `non-root user` with sudo privileges [reference](https://matsjfunke.com/compendiums/hetzner)
- Use the `deploy-setup.sh` script to configure Docker, Firewall, Git and project structure (or do it manually)

**Configure these secrets in your GitHub repository settings:**

- `VPS_HOST` - Your server IP address or domain
- `VPS_USERNAME` - SSH username (typically `root`)
- `VPS_SSH_KEY` - Private SSH key for server access
