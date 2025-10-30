// Configuration helper - reads from .env file via dotenv in playwright.config.ts

export const DEFAULT_BASE_URL = 'http://automationexercise.com';
export const DEFAULT_TIMEOUT = 30000;

export function getBaseUrl(): string {
  return process.env.BASE_URL || DEFAULT_BASE_URL;
}

export function getTestEmail(): string {
  return process.env.TEST_EMAIL || '';
}

export function getTestPassword(): string {
  return process.env.TEST_PASSWORD || '';
}

export function getTestUsername(): string {
  return process.env.TEST_USERNAME || '';
}

export function getUsername(): string | undefined {
  return process.env.USERNAME;
}

export function getPassword(): string | undefined {
  return process.env.PASSWORD;
}

export function isCI(): boolean {
  return process.env.CI === 'true';
}

export function getConfig() {
  return {
    baseUrl: getBaseUrl(),
    testEmail: getTestEmail(),
    testPassword: getTestPassword(),
    testUsername: getTestUsername(),
    username: getUsername(),
    password: getPassword(),
    isCI: isCI(),
  };
}
