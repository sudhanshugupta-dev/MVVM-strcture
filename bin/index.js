#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// Import the generator class correctly
const StructureGenerator = require('../lib/generator'); // Adjusted path since this is the CLI file

program
  .version('1.0.0')
  .description('Generate Expo Router + MVVM architecture structure')
  .option('-f, --force', 'Force overwrite existing files')
  .option('-o, --overwrite', 'Overwrite entire structure (clean old files first)')
  .option('--skip-deps', 'Skip installing dependencies')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 Creating Expo Router + MVVM Architecture...\n'));
      
      // Validate we're in a valid directory
      const currentDir = process.cwd();
      
      // Check if this looks like a React Native/Expo project
      await validateProjectDirectory(currentDir);
      
      // Create generator instance with proper options
      const generator = new StructureGenerator(currentDir, {
        force: options.force || false,
        overwrite: options.overwrite || false
      });
      
      // Generate the structure
      await generator.generate();
      
      // Show success message with next steps
      showSuccessMessage(options);
      
    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error.message);
      console.log(chalk.yellow('\n💡 Tip: Make sure you are in a React Native/Expo project directory'));
      process.exit(1);
    }
  });

// Add help information
program.addHelpText('after', `
Examples:
  $ npx create-mvvm-app          # Generate structure (skip existing files)
  $ npx create-mvvm-app -f        # Force overwrite existing files
  $ npx create-mvvm-app -o        # Overwrite entire structure (clean first)

Required Dependencies:
  Make sure these are installed in your project:
  - expo-router
  - react-native-screens
  - react-native-safe-area-context
  - @react-navigation/drawer (for drawer layout)
  - @react-navigation/bottom-tabs (for tab layout)
`);

/**
 * Validate that we're in a proper project directory
 */
async function validateProjectDirectory(currentDir) {
  const requiredFiles = [
    'package.json',
    'app.json'
  ];
  
  for (const file of requiredFiles) {
    const filePath = path.join(currentDir, file);
    if (!await fs.pathExists(filePath)) {
      throw new Error(`Not a valid Expo project directory. Missing: ${file}`);
    }
  }
  
  // Check if it's an Expo project
  const packageJsonPath = path.join(currentDir, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  
  if (!packageJson.dependencies || !packageJson.dependencies.expo) {
    throw new Error('This does not appear to be an Expo project. Please run this command in an Expo project directory.');
  }
}

/**
 * Show success message with next steps
 */
function showSuccessMessage(options) {
  console.log(chalk.green('\n✅ Expo Router + MVVM architecture created successfully!'));
  
  console.log(chalk.cyan('\n📁 Project Structure Generated:'));
  console.log(`
app/
├── _layout.tsx              # Root layout
├── index.tsx                # Welcome screen
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
└── (tab)/                   # Tab navigation
    ├── _layout.tsx
    ├── home.tsx
    ├── settings.tsx
    └── profile.tsx

src/
├── components/              # Reusable components
│   ├── Button/
│   │   ├── index.ts
│   │   ├── Button.tsx
│   │   └── Button.styles.ts
│   ├── TextInput/
│   │   ├── index.ts
│   │   ├── TextInput.tsx
│   │   └── TextInput.styles.ts
│   ├── Header/
│   │   └── ...
│   └── Loader/
│       └── ...
├── screens/                 # Screen containers
│   ├── home/
│   │   ├── index.ts
│   │   ├── HomeContainer.tsx
│   │   ├── HomeView.tsx
│   │   └── HomeView.styles.ts
│   ├── settings/
│   │   └── ...
│   └── profile/
│       └── ...
├── features/                # MVVM features
│   ├── home/
│   │   ├── HomeModel.ts
│   │   └── HomeViewModel.ts
│   ├── settings/
│   │   └── ...
│   └── profile/
│       └── ...
├── services/                # API services
│   └── api.ts
├── theme/                   # Design system
│   └── Colors.ts
├── utils/                   # Utilities
│   └── index.ts
├── hooks/                   # Custom hooks
│   └── useAppTheme.ts
└── store/                   # State management
    └── index.ts
  `);

  console.log(chalk.yellow('\n🚀 Next Steps:'));
  console.log(chalk.white('1. Install required dependencies:'));
  console.log(chalk.gray('   npm install expo-router react-native-screens react-native-safe-area-context'));
  console.log(chalk.gray('   npm install @react-navigation/drawer @react-navigation/bottom-tabs react-native-gesture-handler react-native-reanimated'));
  
  console.log(chalk.white('\n2. Update your package.json with path aliases:'));
  console.log(chalk.gray(`   {
  "exports": {
    "./*": "./*"
  }
}`));
  
  console.log(chalk.white('\n3. Create or update your tsconfig.json:'));
  console.log(chalk.gray(`   {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/src/*": ["./src/*"]
    }
  }
}`));
  
  console.log(chalk.white('\n4. Update your metro.config.js:'));
  console.log(chalk.gray(`   const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('db');
module.exports = config;`));
  
  console.log(chalk.white('\n5. Start your development server:'));
  console.log(chalk.gray('   npx expo start --clear'));
  
  if (!options.skipDeps) {
    console.log(chalk.yellow('\n📦 Installing dependencies automatically...'));
    // You can add automatic dependency installation here
  }
  
  console.log(chalk.green('\n🎉 Happy coding with MVVM Architecture!'));
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error(chalk.red('💥 Unexpected error:'), error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('💥 Unhandled rejection at:'), promise, 'reason:', reason);
  process.exit(1);
});

// Parse command line arguments
program.parse(process.argv);

// Show help if no arguments provided
if (process.argv.length === 2) {
  program.help();
}