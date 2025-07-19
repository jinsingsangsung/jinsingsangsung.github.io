# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development**: `npm run dev` - Start Astro development server with cache clearing
- **Build**: `npm run build` - Build for production with cache clearing
- **Build (local)**: `npm run build-local` - Build locally with cache clearing
- **Preview**: `npm run preview` - Preview production build
- **Format**: `npm run format` - Format code with Prettier
- **Check**: `npm run check` - Run Astro checks
- **Cache management**: The project uses a sophisticated caching system with automatic cache clearing before builds

## Architecture Overview

This is **Webtrotion**, an Astro-based static site generator that integrates with Notion as a CMS. It's designed for creating blogs and full websites using Notion as the content management system.

### Core Architecture

- **Framework**: Astro v5 with Tailwind v4
- **Content Source**: Notion database via `@notionhq/client`
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages (configured for static hosting)

### Key Directories

- **`src/components/`**: Astro components organized by feature
  - `blog/`: Blog-specific components including hero, post previews, TOC
  - `layout/`: Header and footer components
  - `notion-blocks/`: Components for rendering different Notion block types
- **`src/integrations/`**: Custom Astro integrations for build optimization
- **`src/lib/`**: Core business logic including Notion API client
- **`src/pages/`**: File-based routing with dynamic pages for posts and collections
- **`src/utils/`**: Utility functions for dates, slugs, webmentions

### Configuration System

The project uses a dual configuration approach:
1. **`constants-config.json`**: Main configuration file containing:
   - Notion database ID and author info
   - Social links and tracking setup
   - Theme colors and typography
   - Feature toggles and display settings
2. **`src/constants.ts`**: Processes config JSON and environment variables

### Notion Integration

- **Database ID**: Configured in `constants-config.json`
- **API Secret**: Set via environment variable `NOTION_API_SECRET`
- **Block Rendering**: Custom components in `src/components/notion-blocks/`
- **Caching**: Aggressive caching system for API responses and HTML rendering

### Build System Features

- **Custom Integrations**: Multiple Astro integrations for:
  - Icon downloading and optimization
  - Entry and block caching
  - Public Notion asset copying
  - RSS content enhancement
  - CSS generation from theme constants
- **Cache Management**: Sophisticated caching in `./tmp/` directory
- **Static Search**: Uses Pagefind for client-side search

### Styling

- **CSS Framework**: Tailwind CSS v4
- **Theme System**: Configurable via `constants-config.json` with light/dark mode support
- **Fonts**: Google Fonts integration with configurable font families

### Key Features

- Notion block rendering with support for all major block types
- Social media embeds (Twitter, Bluesky, Instagram, etc.)
- Webmentions integration
- Comments via Giscus
- Related content and backlinks
- Popover previews for internal links
- RSS feeds with full content
- OpenGraph image generation
- SEO optimization

### Environment Variables

- `NOTION_API_SECRET`: Required for Notion API access
- `DATABASE_ID`: Can override the config file setting
- `CUSTOM_DOMAIN`: For custom domain deployment
- `BASE_PATH`: For subdirectory deployment
- `WEBMENTION_API_KEY`: For webmentions integration

### Important Notes

- No test framework is configured
- The build process includes extensive caching and optimization
- Configuration is centralized in `constants-config.json`
- The project is designed for static deployment on GitHub Pages