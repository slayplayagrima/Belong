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

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifact: Belong (kindnest) — Phase 1 (Animal Adoption Only)

Pale-blue themed adoption platform. Phase 1 is **animal-adoption only**; child adoption is shown as a "Coming Soon via verified agencies" placeholder throughout.

- **Brand color**: `#5B9FE0` (used inline, not as theme var). Tints: `#EAF3FB`, `#DBEAFE`.
- **Routing** (wouter): `/`, `/role-select`, `/signup`, `/login`, `/profile/adopter`, `/dashboard` (logged-in adopter home), `/animals`, `/animals/:id`, `/my-requests`, `/ngo/register`, `/ngo/profile-setup`, `/ngo/dashboard`, `/ngo/add-animal`.
- **Layout**: fixed `h-20` navbar; pages use `pt-32` to clear it.
- **Animals data** (`src/data/animals.ts`): 12 mock animals. Schema: `{ id, name, category, species, age, ageBucket, gender, location: { city, state }, ngoId, status, image, tags, attributes }`. Helpers: `findAnimal(id)`, `LOCATIONS` (city list).
- **Adopter profile**: child-related preference fields removed (interestedInChild, childAgeGroup, openToSpecialNeeds, maritalStatus, incomeRange).
- **NGO profile**: `orgType` replaced by `animalsHandled: string[]` (multi-select) + `adoptionDifficulty: "easy"|"moderate"|"strict"`.
- **Placeholders only (no backend yet)**: animal-detail (request to adopt → toast), ngo-dashboard (empty state + add CTA), ngo-add-animal (form, save → toast + redirect), my-requests (empty state), dashboard (Near You / Based on Preferences / Recently Added sections + Coming Soon child card).
