# Security Advisories Dashboard

A React + TypeScript + Tailwind CSS application to view and search the 50 most recent security advisories.

- Overview page: Browse the latest advisories, filter by name and severity.
- Search page: Check if a specific package (and optional version) has any advisories.

# Atomic Design structure used in the application:

Atoms: Button, Dropdown, InputField, ListItem
Organisms: Header
Pages: OverviewPage, SearchPage
Helpers: fetchApi, useDebounce

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.
Open http://localhost:3000 to view it.
The page reloads on edits, and lint errors appear in the console.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production in the build folder.
Optimized and minified for best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test`

Launches the test runner in interactive watch mode.
