const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

// Import your generator
const StructureGenerator = require('./lib/generator');

async function setupTestProject() {
  const testProjectPath = path.join(__dirname, 'test-expo-project');
  
  console.log(chalk.blue('🧪 Setting up test project...'));
  
  // Create test project directory
  await fs.ensureDir(testProjectPath);
  
  // Create minimal Expo project files
  const packageJson = {
    name: "test-expo-app",
    main: "expo-router/entry",
    dependencies: {
      "expo": "~49.0.0",
      "expo-router": "~2.0.0",
      "react": "18.2.0",
      "react-native": "0.72.0"
    }
  };
  
  const appJson = {
    expo: {
      name: "Test Expo App",
      slug: "test-expo-app"
    }
  };
  
  await fs.writeJson(path.join(testProjectPath, 'package.json'), packageJson);
  await fs.writeJson(path.join(testProjectPath, 'app.json'), appJson);
  
  console.log(chalk.green('✅ Test project setup complete'));
  return testProjectPath;
}

async function runTests() {
  try {
    console.log(chalk.blue('\n🚀 Starting Local Tests...\n'));
    
    // Setup test project
    const testProjectPath = await setupTestProject();
    
    // Test 1: Basic generation (skip existing)
    console.log(chalk.yellow('\n📋 Test 1: Basic generation (skip existing)'));
    const generator1 = new StructureGenerator(testProjectPath, { force: false });
    await generator1.generate();
    
    // Test 2: Force overwrite
    console.log(chalk.yellow('\n📋 Test 2: Force overwrite'));
    const generator2 = new StructureGenerator(testProjectPath, { force: true });
    await generator2.generate();
    
    // Test 3: Clean overwrite
    console.log(chalk.yellow('\n📋 Test 3: Clean overwrite'));
    const generator3 = new StructureGenerator(testProjectPath, { overwrite: true });
    await generator3.generate();
    
    // Verify generated structure
    await verifyStructure(testProjectPath);
    
    console.log(chalk.green('\n🎉 All tests passed!'));
    
  } catch (error) {
    console.error(chalk.red('❌ Test failed:'), error);
    process.exit(1);
  }
}

async function verifyStructure(projectPath) {
  console.log(chalk.blue('\n🔍 Verifying generated structure...'));
  
  const expectedFiles = [
    'app/_layout.tsx',
    'app/index.tsx',
    'app/(home)/index.tsx',
    'app/(settings)/index.tsx',
    'app/(profile)/index.tsx',
    'src/components/Button/index.ts',
    'src/components/Button/Button.tsx',
    'src/components/Button/Button.styles.ts',
    'src/screens/home/HomeContainer.tsx',
    'src/screens/home/HomeView.tsx',
    'src/features/home/HomeViewModel.ts'
  ];
  
  let allFilesExist = true;
  
  for (const file of expectedFiles) {
    const filePath = path.join(projectPath, file);
    const exists = await fs.pathExists(filePath);
    
    if (exists) {
      console.log(chalk.green('✅ ' + file));
      
      // Check file content
      const content = await fs.readFile(filePath, 'utf8');
      if (content.length === 0) {
        console.log(chalk.red('❌ Empty file: ' + file));
        allFilesExist = false;
      }
    } else {
      console.log(chalk.red('❌ Missing: ' + file));
      allFilesExist = false;
    }
  }
  
  if (!allFilesExist) {
    throw new Error('Structure verification failed');
  }
  
  console.log(chalk.green('✅ Structure verification passed!'));
}

// Run tests
runTests();