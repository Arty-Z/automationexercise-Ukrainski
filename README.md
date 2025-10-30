# Playwright TypeScript Test Automation

This project contains automated tests using Playwright with TypeScript.

## Prerequisites

- Node.js (v16 or higher)
- npm

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Generate tests with Codegen
npm run codegen

# Show test report
npm run report
```

## Project Structure

```
├── .github/workflows/    # CI/CD configuration
├── pages/               # Page Object Model classes
├── tests/              # Test files
│   └── acceptance-smoke-critical/
├── utils/              # Helper utilities
├── playwright.config.ts # Playwright configuration
└── tsconfig.json       # TypeScript configuration
```

## CI/CD

Tests automatically run on push via GitHub Actions. See `.github/workflows/ci.yml` for configuration.
