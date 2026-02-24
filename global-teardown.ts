//npm install --save-dev @types/fs-extra
//add globalTeardown: require.resolve('./global-teardown'), in defineConfig in playwright.config.ts
import fs from 'fs-extra';

async function backup() {
  const testName = process.env.TEST_NAME || 'playwright-run';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  const safeTestName = testName.replace(/\s+/g, '-').toLowerCase();
  const backupDir = `backup/${safeTestName}-${timestamp}`;

  fs.ensureDirSync(backupDir);

  const paths = {
    results: 'allure-results',
    report: 'allure-report',
    playwright: 'test-results'
  };

  let hasData = false;

  for (const key in paths) {
    const path = paths[key as keyof typeof paths];

    console.log('Checking:', path);

    if (fs.existsSync(path)) {
      fs.copySync(path, `${backupDir}/${path}`);
      console.log(`✅ Copied ${path}`);
      hasData = true;
    } else {
      console.log(`❌ Not found: ${path}`);
    }
  }

  console.log(`📁 Backup folder: ${backupDir}`);

  if (!hasData) {
    console.log('⚠️ No data found to copy');
  }
}

// ✅ IMPORTANT: call function
backup();

export default backup;s