#!/usr/bin/env node

// Minimal demo CLI for anyhive
// Commands: init, verify, whoami (demo behaviors)

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

function ensureTrailingNewline(str) {
  return str.endsWith('\n') ? str : str + '\n'
}

function generateSandboxKey() {
  // Simple dev-only key generator (non-cryptographic)
  const rand = () => Math.random().toString(36).slice(2, 10)
  return `pk_sandbox_${rand()}${rand()}`
}

async function cmdSandbox(options) {
  const dir = path.resolve(options.dir);
  const envPath = path.join(dir, '.env');
  const force = Boolean(options.force);
  const providedKey = typeof options.key === 'string' ? options.key : null;
  const publishableKey = providedKey || generateSandboxKey();
  const newEntry = `ANYHIVE_PUBLISHABLE_KEY=${publishableKey}`;

  let action;

  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, `${newEntry}\n`);
    action = 'created';
  } else {
    const text = fs.readFileSync(envPath, 'utf8');
    const lines = text.split(/\n/);
    const keyIndex = lines.findIndex((l) => l.startsWith('ANYHIVE_PUBLISHABLE_KEY='));

    if (keyIndex !== -1) {
      if (force) {
        lines[keyIndex] = newEntry;
        fs.writeFileSync(envPath, ensureTrailingNewline(lines.join('\n')));
        action = 'updated';
      } else {
        console.log('✔ .env already contains ANYHIVE_PUBLISHABLE_KEY (use --force to overwrite)');
        // The key was not updated, so we shouldn't print a new configuration.
        return;
      }
    } else {
      const next = ensureTrailingNewline(text) + `${newEntry}\n`;
      fs.writeFileSync(envPath, next);
      action = 'appended';
    }
  }

  // Print minimal sandbox info for local testing
  console.log(`✔ .env ${action} at ${envPath}`);
  console.log('\nSandbox configuration (copy as needed):');
  console.log('-------------------------------------');
  console.log(newEntry);
  console.log('ANYHIVE_MODE=sandbox');
  console.log('ANYHIVE_API_BASE_URL=https://sandbox.api.anyhive.dev')
  console.log('ANYHIVE_WORKSPACE_ID=ws_sandbox_demo')
  console.log('')
}

async function cmdInit(options) {
  const { workspace: workspaceId, token: installToken, force } = options;
  const dir = path.resolve(options.dir);

  // .requiredOption() 已經處理了必要參數檢查，這裡不再需要重複判斷。
  const configPath = path.join(dir, 'anyhive.config.json');
  if (fs.existsSync(configPath) && !force) {
    // 拋出錯誤，讓 main().catch() 統一處理，而不是直接結束行程。
    throw new Error(`${configPath} already exists. Use --force to overwrite.`);
  }

  const config = {
    workspaceId,
    apiKey: `pk_demo_${Math.random().toString(36).slice(2, 10)}`,
    installToken,
    createdAt: new Date().toISOString(),
    mode: 'demo',
    source: 'quickstart'
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✔ Wrote ${configPath}`);
  console.log('✔ Initialization complete (demo)');
}

async function cmdVerify() {
  // Demo verify - simulate delay
  process.stdout.write('Verifying installation')
  await new Promise((r) => setTimeout(r, 400))
  process.stdout.write('.')
  await new Promise((r) => setTimeout(r, 400))
  process.stdout.write('.')
  await new Promise((r) => setTimeout(r, 400))
  console.log(' done')
  console.log('✔ Verified (demo)')
}

async function cmdWhoami() {
  console.log('Demo User  <demo@anyhive.app>')
  console.log('Workspace: demo-workspace (ws_demo_1)')
}

async function main() {
  const program = new Command();

  program
    .name('anyhive')
    .description('Anyhive command line interface (demo)')
    .version('0.0.0-alpha.1');

  program
    .command('init')
    .description('Initialize an anyhive project (demo)')
    .requiredOption('--workspace <id>', 'Workspace ID')
    .requiredOption('--token <installToken>', 'Installation token')
    .option('--dir <path>', 'Directory to initialize in', process.cwd())
    .option('--force', 'Overwrite existing configuration')
    .action(cmdInit);

  program
    .command('verify')
    .description('Verify anyhive installation (demo)')
    .action(cmdVerify);

  program
    .command('whoami')
    .description('Display the current user (demo)')
    .action(cmdWhoami);

  program
    .command('sandbox')
    .description('Setup a sandbox environment in a .env file')
    .option('--dir <path>', 'Directory for the .env file', process.cwd())
    .option('--key <publishableKey>', 'Provide a specific sandbox key')
    .option('--force', 'Overwrite existing key')
    .action(cmdSandbox);

  // Example usage is automatically generated with --help
  program.addHelpText('after', `
Examples:
  $ anyhive init --workspace ws_123 --token it_456
  $ anyhive sandbox --dir .`);

  await program.parseAsync(process.argv);
}

main().catch((err) => {
  // 提供對使用者更友善的錯誤輸出
  if (err.code && err.code.startsWith('commander.')) {
    // Commander 自身的錯誤（例如：缺少必要選項）訊息已經很清楚
    console.error(err.message);
  } else {
    // 處理我們自訂的錯誤或其他例外情況
    console.error(`Error: ${err.message}`);
  }
  process.exit(1);
});
