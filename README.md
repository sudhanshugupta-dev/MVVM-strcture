# create-mvvm-structure

A CLI tool to generate a scalable MVVM (Model-View-ViewModel) folder structure for React Native Expo projects using Expo Router.

---

## 📦 Folder Structure

After running this tool, your project will have the following structure:

```
app/
├── _layout.tsx              # Root layout for Expo Router
├── index.tsx                # Welcome/entry screen
├── (home)/                  # Home stack
│   └── index.tsx
├── (settings)/              # Settings stack  
│   └── index.tsx
├── (profile)/               # Profile stack
│   └── index.tsx
├── (drawer)/                # Drawer navigation
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── settings.tsx
│   └── profile.tsx
└── (tabs)/                  # Tab navigation
    ├── _layout.tsx
    ├── home.tsx
    ├── settings.tsx
    └── profile.tsx

src/
├── components/              # Reusable UI components
│   ├── Button/
│   ├── TextInput/
│   ├── Header/
│   ├── Loader/
│   └── Drawer/
├── screens/                 # Screen containers (MVVM "View" & "Container")
│   ├── home/
│   ├── settings/
│   └── profile/
├── features/                # MVVM "Model" and "ViewModel" logic
│   ├── home/
│   ├── settings/
│   └── profile/
├── services/                # API and network logic
│   └── api.ts
├── theme/                   # Design system (colors, etc.)
│   └── Colors.ts
├── utils/                   # Utility functions
│   └── index.ts
├── hooks/                   # Custom React hooks
│   └── useAppTheme.ts
└── store/                   # State management (placeholder)
    └── index.ts
```

---

## 📋 What Does This Tool Do?

- **Generates a ready-to-use folder structure** for Expo Router + MVVM pattern.
- **Creates boilerplate files** for navigation, screens, components, features, and utilities.
- **Configures your project**: updates `package.json`, creates `tsconfig.json`, and sets up `babel.config.js`.
- **Installs required dependencies** for navigation and Expo Router (unless `--skip-deps` is used).

---

## 📦 package.json Explained User Side

Your [`package.json`](package.json) is the heart of your project configuration. Here’s a breakdown:

### Key Fields

- **name**: Project name (`create-mvvm-structure`)
- **version**: Version of your CLI tool.
- **description**: Short description of the tool.
- **main**: Entry point for the CLI (`bin/index.js`).
- **bin**: CLI command names (`create-mvvm-structure`, `create-mvvm`).
- **scripts**: Useful npm scripts for testing and linking.
- **keywords**: For npm discoverability.
- **files**: Folders included when publishing the package (`bin/`, `lib/`, `templates/`).
- **license**: Project license.

### Third-Party Libraries Used

#### CLI & Utilities

- **[commander](https://www.npmjs.com/package/commander)**  
  For parsing CLI arguments and options.

- **[chalk](https://www.npmjs.com/package/chalk)**  
  For colored terminal output.

- **[fs-extra](https://www.npmjs.com/package/fs-extra)**  
  For file system operations (like `fs`, but with more features).

- **[inquirer](https://www.npmjs.com/package/inquirer)**  
  For interactive CLI prompts (not currently used, but included for future extensibility).

#### Expo/React Native Dependencies (added to generated projects)

- **expo-router**  
  File-based routing for Expo apps.

- **react-native-screens**  
  Native navigation performance improvements.

- **react-native-safe-area-context**  
  Handling safe area insets on iOS/Android.

- **@react-navigation/drawer**  
  Drawer navigation support.

- **@react-navigation/bottom-tabs**  
  Tab navigation support.

- **react-native-gesture-handler**  
  Gesture support for navigation.

- **react-native-reanimated**  
  Animations for navigation and UI.

- **@expo/vector-icons**  
  Icon library for Expo apps.

- **typescript**  
  TypeScript support for static typing.

---

## 🛠️ How to Use

1. **Install the CLI (locally or globally):**
   ```sh
   npx create-mvvm-structure
   # or
   npm install -g create-mvvm-structure
   ```

🛠️ Usage

 2  Run the CLI in your project directory:

  **Generate structure (default):**
    ```sh
   npx create-mvvm-structure
   ```
   
  **Force overwrite existing files overwrite existing code :**
    ```sh
        npx create-mvvm-structure --force
   ```

  **Clean old structure before generating**
     ```sh
         npx create-mvvm-structure --overwrite
   ```

# Skip installing dependencies
  npx create-mvvm-structure --skip-deps

3. **Run in your Expo project directory:**
   ```sh
   npx create-mvvm-structure
   # Options:
   #   -f, --force      Force overwrite existing files
   #   -o, --overwrite  Clean old structure before generating
   #   --skip-deps      Skip installing dependencies
   ```

4. **Start your Expo project:**
   ```sh
   npm start
   # or
   npx expo start
   ```

---

## 📚 Deep Dive: package.json Fields

- **dependencies**:  
  Lists all runtime dependencies your project needs.  
  The CLI ensures all navigation and Expo Router dependencies are present.

- **devDependencies**:  
  TypeScript is added for type safety.

- **scripts**:  
  - `test`: Runs local tests.
  - `test:clean`: Cleans and tests.
  - `test:cli`: Runs CLI in test project.
  - `test:link`: Links CLI for local development.

- **bin**:  
  Maps CLI commands to the entry script.

- **files**:  
  Specifies which folders are included when publishing to npm.

---

---

## 📦 Example: package.json

Below is the actual `package.json` used in this project:

```json
{
  "name": "create-mvvm-structure",
  "version": "1.0.0",
  "description": "CLI to scaffold MVVM folder structure for Expo Router projects",
  "main": "bin/index.js",
  "bin": {
    "create-mvvm-structure": "bin/index.js",
    "create-mvvm": "bin/index.js"
  },
  "scripts": {
    "test": "echo \"No tests yet\"",
    "test:clean": "rm -rf test-project && npm run test",
    "test:cli": "node bin/index.js",
    "test:link": "npm link"
  },
  "keywords": [
    "expo",
    "mvvm",
    "cli",
    "expo-router",
    "react-native"
  ],
  "files": [
    "bin/",
    "lib/",
    "templates/"
  ],
  "license": "ISC",
  "dependencies": {
    "chalk": "^5.3.0",
    "commander": "^11.1.0",
    "fs-extra": "^11.2.0",
    "inquirer": "^9.2.16"
  },
  "devDependencies": {
    "typescript": "^5.4.5"
  }
}
```

**Key points:**
- The `bin` field exposes two CLI commands: `create-mvvm-structure` and `create-mvvm`.
- The `dependencies` section lists all runtime libraries used by the CLI.
- The `devDependencies` section includes TypeScript for development.
- The `files` field ensures only relevant folders are published to npm.

---


## 📝 Notes

- The tool **auto-detects your package manager** (npm, yarn, pnpm, bun).
- If you use TypeScript, a basic `tsconfig.json` is generated.
- `babel.config.js` is updated to support Expo Router and Reanimated.
- The tool **sanitizes `app.json`** to avoid missing asset errors.

---

## 🤝 Contributing

Feel free to open issues or PRs for improvements!

---

## 📄 License

ISC
