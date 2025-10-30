# Playwright TypeScript Test Automation

![Scheduled Tests](https://github.com/Arty-Z/automationexercise-Ukrainski/actions/workflows/scheduled-tests.yml/badge.svg)
![CI](https://github.com/Arty-Z/automationexercise-Ukrainski/actions/workflows/ci.yml/badge.svg)

Automated E2E tests for [automationexercise.com](http://automationexercise.com) using Playwright with TypeScript.

## 🎯 Test Coverage

### User Registration Flow
Complete end-to-end test covering:
- ✅ Homepage navigation and verification
- ✅ Signup/Login page interactions
- ✅ New user registration with random data
- ✅ Account information form completion
- ✅ Address details submission
- ✅ Account creation verification
- ✅ User login confirmation
- ✅ Account deletion flow

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/Arty-Z/automationexercise-Ukrainski.git
cd automationexercise-Ukrainski

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test registerUser.spec.ts

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Generate tests with Codegen
npm run codegen

# Show test report
npm run report
```

## 📁 Project Structure

```
├── .github/
│   └── workflows/           # GitHub Actions CI/CD
│       ├── ci.yml          # Basic CI workflow
│       ├── scheduled-tests.yml  # Scheduled + Pages deployment
│       └── README.md       # Workflow documentation
├── pages/                   # Page Object Model classes
│   ├── automationExerciseHome.page.ts
│   ├── signupLogin.page.ts
│   ├── signup.page.ts
│   ├── accountCreated.page.ts
│   └── accountDeleted.page.ts
├── tests/                   # Test specifications
│   └── acceptance-smoke-critical/
│       └── registerUser.spec.ts
├── utils/                   # Helper utilities
│   └── helper.ts           # Random data generators
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🔧 Configuration

### Base URL
The base URL is configured in `playwright.config.ts`:
```typescript
baseURL: 'http://automationexercise.com'
```

### Test Settings
- **Parallel execution**: Enabled
- **Retries**: 2 on CI, 0 locally
- **Video**: Recorded on failure
- **Screenshots**: Taken on failure
- **Trace**: Captured on first retry

## 🤖 CI/CD & Automation

### Continuous Integration (ci.yml)
- **Triggers**: Push and Pull Requests to main/master
- **Runs**: All Playwright tests
- **Artifacts**: Test results and reports (30 days)

### Scheduled Tests (scheduled-tests.yml)
- **Scheduled**: Daily at 2 AM CST (8 AM UTC)
- **Manual**: Run via GitHub Actions UI
- **Features**:
  - Multi-browser testing (Chromium, Firefox, WebKit)
  - Automatic report publishing to GitHub Pages
  - Test results artifacts
  - Detailed summaries with links

### 📊 Viewing Test Reports

**GitHub Pages:**
```
https://Arty-Z.github.io/automationexercise-Ukrainski/test-reports/<run-number>
```

**Artifacts:**
- Available in Actions → Workflow Run → Artifacts section
- Retained for 30 days

See [Workflows README](.github/workflows/README.md) for detailed setup instructions.

## 🏗️ Architecture

### Page Object Model (POM)
All page interactions are encapsulated in page classes:
- Clear separation of test logic and page structure
- Reusable locators and methods
- Easy maintenance and updates

### Test Data Generation
Random data is generated for each test run:
- Unique emails with timestamps
- Random names, addresses, and personal details
- Secure password generation
- Ensures test independence

### Example Test Data:
```typescript
Name: John
Email: testuser_1735484723456@example.com
Password: P@ssw0rd_aB3xY9
DOB: 18/5/1990
First Name: John_1735484723456
Company: AutoCo_kL9pQ2
Address: 4567 Main St Apt 12B
```

## 📝 Writing New Tests

1. **Create a page object** in `pages/`:
```typescript
import { Page, Locator } from '@playwright/test';

export class MyPage {
  readonly page: Page;
  readonly myElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myElement = page.locator('selector');
  }

  async myAction() {
    await this.myElement.click();
  }
}
```

2. **Create a test** in `tests/`:
```typescript
import { test, expect } from '@playwright/test';
import { MyPage } from '../../pages/my.page';

test('my test', async ({ page }) => {
  const myPage = new MyPage(page);
  await myPage.myAction();
  await expect(page).toHaveURL(/expected/);
});
```

## 🐛 Debugging

```bash
# Debug mode (Playwright Inspector)
npx playwright test --debug

# Debug specific test
npx playwright test registerUser.spec.ts --debug

# Show trace viewer
npx playwright show-trace trace.zip

# VS Code debugging
# Use the "Debug" button in the Testing sidebar
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Test Implementation Details](./TEST_IMPLEMENTATION_SUMMARY.md)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

ISC

## 👤 Author

**Arty-Z**
- GitHub: [@Arty-Z](https://github.com/Arty-Z)

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev) - Testing framework
- [automationexercise.com](http://automationexercise.com) - Test application
