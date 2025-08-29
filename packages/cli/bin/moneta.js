#!/usr/bin/env node

// Minimal demo CLI for moneta-cli
// Commands: init, verify, whoami (demo behaviors)

const fs = require('fs')
const path = require('path')

function printUsage() {
  console.log(`
moneta-cli - Moneta command line interface (demo)

Usage:
  moneta-cli init --workspace <id> --token <installToken> [--dir <path>] [--force]
  moneta-cli verify
  moneta-cli whoami

Examples:
  moneta-cli init --workspace ws_123 --token it_456
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

async function cmdInit(args) {
  const workspaceId = args.workspace
  const installToken = args.token
  const dir = args.dir ? path.resolve(args.dir) : process.cwd()
  const force = Boolean(args.force)

  if (!workspaceId || !installToken) {
    console.error('Error: --workspace and --token are required for init')
    process.exit(1)
  }

  const configPath = path.join(dir, 'moneta.config.json')
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
  console.log('Demo User  <demo@moneta.app>')
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



