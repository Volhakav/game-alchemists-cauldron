# Alchemist's Cauldron

**Alchemist's Cauldron** is a browser-based mini-game developed as part of **The Rolling Scopes School** qualifying stage.

Mix ingredients, match target ranges, and brew potions before time or lives run out!

---

## Game Goal & Features

- **Ingredient Management:** Use resources carefully from the shelf (each ingredient has a limited stock ranging from 2 to 15).
- **Cauldron Parameters:** Balance Temperature, Density, and Magic Power to match active recipe ranges.
- **Progressive Levels:**
  - **Level 1 (Basic):** Core gameplay loop, fixed rules, timer, lives, and leaderboard.
  - **Level 2 (Extended):** Difficulty selection (Easy, Medium, Hard) and auto-save / continue game.
  - **Level 3 (Full Game):** Drag & drop, tooltips, chemical reactions, "Pour Out", and keyboard shortcuts.
- **Top-10 Leaderboard:** Local storage-based score tracking.

---

## Tech Stack

- **React 18 + TypeScript** (strict typing, no `any`)
- **Vite** (module bundler / dev server)
- **SCSS** (responsive design from 375px to 1920px)
- **ESLint & Prettier** (code quality and formatting)

---

## Architecture

```
src/
  data/        # ingredients, recipes, difficulty, reactions, types
  logic/       # cauldron calculations, stock, time, keyboard
  state/       # GameStore (single source of truth)
  storage/     # localStorage save + leaderboard
  hooks/       # useGameStore (React subscription)
  components/  # React UI components
  styles/      # SCSS
```

- `GameStore` remains the single source of truth and is framework-agnostic.
- React components subscribe to the store via `useGameStore`.
- Business logic was preserved during the migration; only the rendering layer was rewritten.

---

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation & Running

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

---

## Scripts

- `npm run dev` — start dev server (port 3005)
- `npm run build` — type-check and build
- `npm run lint` — lint TypeScript/TSX
- `npm run format` — format sources