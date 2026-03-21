# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Mobile**: Expo (React Native) with expo-router

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── mobile/             # Expo React Native app (Palmer House Productions)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Route: `src/routes/projectRequests.ts` — `POST /api/project-requests` accepts project request submissions
- Route: `src/routes/auth.ts` — `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh` for user authentication
- Route: `src/routes/ai.ts` — `POST /api/ai/generate` (SSE streaming tool generation), `POST /api/ai/chat` (SSE streaming Pal chat), `GET /api/ai/history?userId=N` (tool result history)
- AI tool prompts: `src/lib/toolPrompts.ts` — 36 tool prompt configs with Pal personas, system prompts, user prompt templates, model/maxTokens
- Free tools (0 credits): teleprompter, about-page-script, faq-video-series, content-audit
- 2-credit tools: content-calendar, course-outline-builder, workshop-planner, onboarding-script-builder, process-doc-pdf, topic-authority-map, podcast-planner
- All other tools: 1 credit
- Credit deduction is atomic: `WHERE credits >= cost` guard on UPDATE
- Depends on: `@workspace/db`, `@workspace/api-zod`, `@workspace/integrations-openai-ai-server`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `artifacts/mobile` (`@workspace/mobile`)

Palmer House Productions — AI-powered content assistant mobile app for business owners. Explore video production services, build packages, submit project requests, and access AI-powered content tools.

- **Framework**: Expo SDK 54, expo-router 6 (file-based routing)
- **Design**: Clean, minimal aesthetic — starter.dev/GitHub-inspired patterns. Border-separated rows (1px divider), underline tab indicators, trimmed text, generous whitespace. Frosted glass tab bar, Inter font family. GitHub-style color palette (#1F2328 text, #656D76 secondary, rgba borders).
- **Auth System**: Welcome screen → Sign In / Register / Browse as Guest. Three tiers: Guest (3 credits), Registered (10/month), Member (50/month + portal).
- **Tabs (5)**: Home, Explore (Pals), Tools (AI), Package (Cart), More (About)
- **Auth Screens**: `welcome.tsx`, `auth/login.tsx`, `auth/register.tsx`
- **Detail Screens**: `pal/[id]` (Pal overview), `mission/[palId]/[missionId]` (mission configurator with pricing)
- **AI Tools**: 36 fully functional AI-powered tools via dynamic route `tools/[toolId].tsx` + shared `AIToolScreen` component. Tools organized by Pal category with color-coded section headers, SSE streaming output, copy/share/regenerate actions. 4 free tools (teleprompter, about-page-script, faq-video-series, content-audit). Tool definitions in `constants/tools.ts`.
- **Teleprompter**: `tools/teleprompter-live.tsx` — Real auto-scrolling teleprompter with paste/type script, adjustable speed (4 levels), font size control, mirror mode, play/pause/reset. Separate from the AI teleprompter script generator tool.
- **Client Portal**: `portal/index.tsx` — project tracking, draft review, delivered assets (placeholder structure, ready for HoneyBook integration)
- **Profile**: `profile.tsx` — account info, credits, sign out
- **Checkout flow**: Build tab → Checkout modal → Confirmation screen
- **Data**: All Pal categories (Reel, Spotlight, System, Evergreen), 20+ missions, pricing constants in `constants/data.ts`
- **Brand Colors**: Primary purple `#6B3FA0`, Reel orange `#E8720C`, System teal `#0A9B8F`, Evergreen sage `#5B8A2D`, Spotlight purple `#6B3FA0`. Divider: `#D0D7DE`, separator: `rgba(31,35,40,0.08)`, border: `rgba(31,35,40,0.15)`
- **API**: Submits project requests to `POST /api/project-requests`, auth via `POST /api/auth/register` and `POST /api/auth/login`
- **State**: React Context for cart (CartContext) and auth (AuthContext), AsyncStorage for session persistence
- **Pricing Constants**: Session=$450, Additional Video=$150, Evergreen 5/10/15min = $1050/$1650/$2250
- **Contact**: info@palmerhouseproductions.com, (253) 338-0673, Bellevue WA & Portland OR
- **Character Images**: 8 AI-generated character avatars in `assets/images/pals/` (ryder, raquel, kareem, kiana, silas, samira, cyrus, clara). Face-cropped 400x400 profile versions in `assets/images/pals/profiles/`. Standing poses in `assets/images/pals/standing/`. Headshots in `assets/images/pals/headshots/`. Brand logo in `assets/images/brand/logo.png`. All mapped via `constants/images.ts` (`PAL_IMAGES` for full-body, `PAL_PROFILES` for circle avatars, `PAL_STANDING` for hero views, `PAL_HEADSHOTS` for detail views, `BRAND_LOGO` for logo).
- **Onboarding Walkthrough**: `onboarding.tsx` — swipeable 6-slide tour introducing all 4 Pals and AI tools, accessible from Welcome screen "Take a Tour" link
- **Guest Walkthrough**: `guest-walkthrough.tsx` — 6-step conversational AI-style walkthrough for first-time guests (shown once, tracked via AsyncStorage). Accessible via "Browse as Guest" on welcome screen.
- **Key files**:
  - `constants/data.ts` — All Pals, missions, pricing constants
  - `constants/colors.ts` — Brand color palette with shadows
  - `constants/images.ts` — Character avatar image mapping (PAL_IMAGES, PAL_PROFILES, PAL_STANDING, PAL_HEADSHOTS, BRAND_LOGO)
  - `constants/tools.ts` — 36 AI tool definitions with fields, credit costs, Pal assignments + PAL_TOOL_CATEGORIES
  - `contexts/CartContext.tsx` — Cart state management
  - `contexts/AuthContext.tsx` — Auth state management (guest/registered/member) with updateCredits
  - `services/ai.ts` — AI service layer (SSE streaming for generate + chat)
  - `hooks/useAIGeneration.ts` — React hook for AI generation state management
  - `components/AIToolScreen.tsx` — Reusable AI tool screen with input form, streaming output, copy/share/regenerate
  - `lib/api.ts` — API URL helper

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/projectRequests.ts` — project_requests table (fullName, email, palCategory, missionId, packageDetails, estimatedTotal, etc.)
- `src/schema/users.ts` — users table (email, passwordHash, fullName, companyName, role, credits, avatarUrl)
- `src/schema/toolResults.ts` — tool_results table (userId, toolId, palId, inputs, output, creditsCost)
- `src/schema/conversations.ts` — conversations table (title)
- `src/schema/messages.ts` — messages table (conversationId, role, content)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`, `CreateProjectRequestBody`). Used by `api-server` for request validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
