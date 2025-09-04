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

function getEnvFromInvocation(command, localOptions) {
  const globals = typeof command?.optsWithGlobals === 'function' ? command.optsWithGlobals() : {};
  // Priority: local --env/--sandbox > global --env/--sandbox > process.env > default
  const envFlag = localOptions?.env ?? globals.env;
  const sandboxFlag = (localOptions?.sandbox ?? globals.sandbox) ? 'sandbox' : undefined;
  const fromProcess = process.env.ANYHIVE_MODE;
  const resolved = (sandboxFlag || envFlag || fromProcess || 'production').toLowerCase();
  if (resolved !== 'sandbox' && resolved !== 'production') return 'production';
  return resolved;
}

function resolveEnvSettings(env) {
  if (env === 'sandbox') {
    return {
      mode: 'sandbox',
      apiBaseUrl: 'https://sandbox.api.anyhive.dev',
      workspaceId: 'ws_sandbox_demo'
    };
  }
  return {
    mode: 'production',
    apiBaseUrl: 'https://api.anyhive.app',
    workspaceId: undefined
  };
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

  if (options.writeAll) {
    const ensureEnvEntries = [
      ['ANYHIVE_MODE', 'sandbox'],
      ['ANYHIVE_API_BASE_URL', 'https://sandbox.api.anyhive.dev'],
      ['ANYHIVE_WORKSPACE_ID', 'ws_sandbox_demo']
    ];
    const text = fs.readFileSync(envPath, 'utf8');
    const lines = text.split(/\n/);
    for (const [k, v] of ensureEnvEntries) {
      const idx = lines.findIndex((l) => l.startsWith(`${k}=`));
      if (idx !== -1) {
        if (force) {
          lines[idx] = `${k}=${v}`;
        }
      } else {
        lines.push(`${k}=${v}`);
      }
    }
    fs.writeFileSync(envPath, ensureTrailingNewline(lines.join('\n')));
    console.log('✔ Wrote additional sandbox variables to .env');
  }
}

async function cmdInit(options, command) {
  const { workspace: workspaceId, token: installToken, force } = options;
  const dir = path.resolve(options.dir);
  const env = getEnvFromInvocation(command, options);
  const envSettings = resolveEnvSettings(env);

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
    mode: envSettings.mode,
    source: 'quickstart'
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✔ Wrote ${configPath}`);
  console.log(`✔ Initialization complete (${envSettings.mode})`);
}

async function cmdVerify(options, command) {
  const env = getEnvFromInvocation(command, options);
  const envSettings = resolveEnvSettings(env);
  // Demo verify - simulate delay
  process.stdout.write('Verifying installation')
  await new Promise((r) => setTimeout(r, 400))
  process.stdout.write('.')
  await new Promise((r) => setTimeout(r, 400))
  process.stdout.write('.')
  await new Promise((r) => setTimeout(r, 400))
  console.log(' done')
  console.log(`✔ Verified (${envSettings.mode})`)
}

async function cmdWhoami(options, command) {
  const env = getEnvFromInvocation(command, options);
  const envSettings = resolveEnvSettings(env);
  console.log('Demo User  <demo@anyhive.app>')
  console.log(`Workspace: demo-workspace (${envSettings.workspaceId || 'ws_demo_1'})`)
  console.log(`Environment: ${envSettings.mode} (${envSettings.apiBaseUrl})`)
}

async function main() {
  const program = new Command();

  program
    .name('anyhive')
    .description('Anyhive command line interface (demo)')
    .version('0.0.0-alpha.1');

  // Global options for environment selection
  program
    .option('--env <env>', 'Target environment: sandbox|production', process.env.ANYHIVE_MODE || 'production')
    .option('--sandbox', 'Alias of --env sandbox');

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
    .option('--write-all', 'Also write ANYHIVE_MODE, ANYHIVE_API_BASE_URL, ANYHIVE_WORKSPACE_ID')
    .action(cmdSandbox);

  // Example usage is automatically generated with --help
  program.addHelpText('after', `
Examples:
  $ anyhive init --workspace ws_123 --token it_456
  $ anyhive verify --env sandbox
  $ anyhive sandbox --dir . --write-all`);

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
