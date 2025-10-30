// Configuration helper - reads from .env file via dotenv in playwright.config.ts

export const DEFAULT_BASE_URL = 'http://automationexercise.com';
export const DEFAULT_TIMEOUT = 30000;

export function getBaseUrl(): string {
  return process.env.BASE_URL || DEFAULT_BASE_URL;
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
    username: getUsername(),
    password: getPassword(),
    isCI: isCI(),
  };
}
