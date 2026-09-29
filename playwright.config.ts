import { defineConfig, devices } from '@playwright/test'
try { process.loadEnvFile('.env') } catch {}

export default defineConfig({
    testDir: './e2e',
    fullyParallel: false,          // auth tests share a DB, so keep them sequential for now
    retries: process.env.CI ? 2 : 0,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',     // records a replay when a test fails, handy for debugging
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
    webServer: {
        command: 'pnpm dev',         // also starts Mongo via docker compose
        url: 'http://localhost:3000',
        reuseExistingServer: true,   // if you already have the dev server running, it uses that
        timeout: 120_000,            // Next's first compile can be slow
    },
    })