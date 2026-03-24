# Playlist App

This repository contains automated UI tests for the Playlist App.

## Tech Stack
- **Testing Framework:** Playwright
- **Language:** JavaScript
- **Design Pattern:** Page Object Model (POM)

---

## Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 16 or higher) installed on your machine.

### 1. Install Dependencies
Clone the repository and install the required npm packages:
```bash
npm install
```

### 2. Install Playwright Browsers
Install the necessary browser binaries for Playwright:
```bash
npx playwright install --with-deps
```

### 3. Environment Setup (.env)
This project uses environment variables to manage the base URL. Since the `.env` file is not tracked in Git for security reasons, you need to create it locally.

Create a `.env` file in the root directory of the project and add the following line (replace the URL with the actual app URL):
```env
BASE_URL=https://<actual-playlist-app-url>
```

---

## Running the Tests

All tests can be executed using npm scripts defined in `package.json`.

**Run all tests in headless mode (Default):**
```bash
npm run test
```

**Run tests in UI (headed) mode (visible browser):**
```bash
npm run test:headed
```

**View the HTML Report:**
After running the tests, you can view the detailed HTML report (which includes traces if a test fails) by running:
```bash
npm run report
```

---

## Project Structure

The project is organized into separate folders for clear separation of concerns:

```text
├── constants/             # Test data (e.g., track names and durations)
├── pages/                 # Page Object Model classes (BasePage, PlaylistPage)
├── tests/                 # Test script files covering the core functionalities
├── utils/                 # Reusable utility functions (e.g., time converter)
├── TEST_CASES.md          # Detailed manual test steps and expected results
├── playwright.config.js   # Playwright configuration and project settings
└── package.json           # Dependencies and test scripts
```

---

## Test Coverage

The following core functionalities are covered by automated tests:

1. **Search Functionality:** Verifies that the search input correctly filters available tracks by full names and single characters (case-insensitive).
2. **Add Track Using "+" Button:** Ensures that clicking the "+" button successfully moves the selected track to the "Your Playlist" section.
3. **Verify Total Duration:** Adds multiple tracks, parses their UI durations, mathematically sums them in seconds, and validates that the calculated sum matches the total duration displayed in the app footer.
