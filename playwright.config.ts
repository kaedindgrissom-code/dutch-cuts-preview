import { defineConfig, devices } from "@playwright/test";

const executablePath = process.env.PW_CHROMIUM || undefined;

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "retain-on-failure",
    launchOptions: executablePath ? { executablePath } : undefined,
  },
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "pnpm start -p 3000", url: "http://localhost:3000", reuseExistingServer: true, timeout: 60_000 },
  projects: [
    { name: "mobile", use: { ...devices["iPhone 14"], defaultBrowserType: "chromium" } },
    { name: "android", use: { ...devices["Pixel 7"], defaultBrowserType: "chromium" } },
    { name: "tablet", use: { ...devices["iPad (gen 7)"], defaultBrowserType: "chromium" } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "wide", use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } } },
  ],
});
