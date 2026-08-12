/**
 * Vitest config.  Proposed location: vitest.config.ts (repo root)
 *
 * Install:  pnpm add -D vitest
 * Add to package.json "scripts":  "test": "vitest run"
 *
 * The alias mirrors tsconfig's "@/*" -> "./*" so tests can import "@/lib/steam".
 */

import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    // mirrors tsconfig "@/*" -> "./*"; import.meta.dirname needs Node >= 20.11
    alias: { "@": path.resolve(import.meta.dirname, "./") },
  },
  test: {
    environment: "node",
  },
});