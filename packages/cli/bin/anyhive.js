#!/usr/bin/env node

// Minimal demo CLI for anyhive
// Commands: init, verify, whoami (demo behaviors)

const fs = require('fs')
const path = require('path')

function printUsage() {
  console.log(`
anyhive - Anyhive command line interface (demo)

Usage:
  anyhive init --workspace <id> --token <installToken> [--dir <path>] [--force]
  anyhive verify
  anyhive whoami
  anyhive sandbox [--dir <path>] [--key <publishableKey>] [--force]

Examples:
  anyhive init --workspace ws_123 --token it_456
  anyhive sandbox --dir .
`)
}

function parseArgs(argv) {
  const args = {}
  const positional = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        args[key] = true
      } else {
        args[key] = next
        i++
      }
    } else {
      positional.push(a)
    }
  }
  return { args, positional }
}

function ensureTrailingNewline(str) {
  return str.endsWith('\n') ? str : str + '\n'
}

function generateSandboxKey() {
  // Simple dev-only key generator (non-cryptographic)
  const rand = () => Math.random().toString(36).slice(2, 10)
  return `pk_sandbox_${rand()}${rand()}`
}

async function cmdSandbox(args) {
  const dir = args.dir ? path.resolve(args.dir) : process.cwd()
  const envPath = path.join(dir, '.env')
  const force = Boolean(args.force)
  const providedKey = typeof args.key === 'string' ? args.key : null
  const publishableKey = providedKey || generateSandboxKey()

  let action = 'created'
  if (fs.existsSync(envPath)) {
    const text = fs.readFileSync(envPath, 'utf8')
    const lines = text.split(/\n/)
    const hasVar = lines.some((l) => l.startsWith('ANYHIVE_PUBLISHABLE_KEY='))
    if (hasVar) {
      if (force) {
        const newLines = lines.map((l) =>
          l.startsWith('ANYHIVE_PUBLISHABLE_KEY=')
            ? `ANYHIVE_PUBLISHABLE_KEY=${publishableKey}`
            : l
        )
        fs.writeFileSync(envPath, ensureTrailingNewline(newLines.join('\n')))
        action = 'updated'
      } else {
        console.log('✔ .env already contains ANYHIVE_PUBLISHABLE_KEY (use --force to overwrite)')
        action = 'skipped'
      }
    } else {
      const next = ensureTrailingNewline(text) + `ANYHIVE_PUBLISHABLE_KEY=${publishableKey}\n`
      fs.writeFileSync(envPath, next)
      action = 'appended'
    }
  } else {
    fs.writeFileSync(envPath, `ANYHIVE_PUBLISHABLE_KEY=${publishableKey}\n`)
    action = 'created'
  }

  // Print minimal sandbox info for local testing
  console.log(`✔ .env ${action} at ${envPath}`)
  console.log('\nSandbox configuration (copy as needed):')
  console.log('-------------------------------------')
  console.log(`ANYHIVE_PUBLISHABLE_KEY=${publishableKey}`)
  console.log('ANYHIVE_MODE=sandbox')
  console.log('ANYHIVE_API_BASE_URL=https://sandbox.api.anyhive.dev')
  console.log('ANYHIVE_WORKSPACE_ID=ws_sandbox_demo')
  console.log('')
}

async function cmdInit(args) {
  const workspaceId = args.workspace
  const installToken = args.token
  const dir = args.dir ? path.resolve(args.dir) : process.cwd()
  const force = Boolean(args.force)

  if (!workspaceId || !installToken) {
    console.error('Error: --workspace and --token are required for init')
    process.exit(1)
  }

  const configPath = path.join(dir, 'anyhive.config.json')
  if (fs.existsSync(configPath) && !force) {
    console.error(`Error: ${configPath} already exists. Use --force to overwrite.`)
    process.exit(1)
  }

  const config = {
    workspaceId,
    apiKey: `pk_demo_${Math.random().toString(36).slice(2, 10)}`,
    installToken,
    createdAt: new Date().toISOString(),
    mode: 'demo',
    source: 'quickstart'
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
  console.log(`✔ Wrote ${configPath}`)
  console.log('✔ Initialization complete (demo)')
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
  const argv = process.argv.slice(2)
  if (argv.length === 0) {
    printUsage()
    process.exit(0)
  }
  const command = argv[0]
  const { args, positional } = parseArgs(argv.slice(1))
  switch (command) {
    case 'init':
      await cmdInit(args)
      break
    case 'verify':
      await cmdVerify()
      break
    case 'whoami':
      await cmdWhoami()
      break
    case 'sandbox':
      await cmdSandbox(args)
      break
    case '--help':
    case '-h':
    default:
      if (command.startsWith('-')) {
        printUsage()
        process.exit(0)
      }
      console.error(`Unknown command: ${command}`)
      printUsage()
      process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})



