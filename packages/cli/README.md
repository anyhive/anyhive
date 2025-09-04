# Anyhive CLI

The Anyhive command line interface helps you initialize projects and set up a local development environment.

Built with Node.js and `commander` for robust argument parsing, validation, and helpful usage text.

## Requirements

- Node.js 18+

## Installation

Install globally (recommended when published):

```bash
npm i -g anyhive
```

From this monorepo (for local development):

```bash
node packages/cli/bin/anyhive.js --help
```

## Global options

- `--env <sandbox|production>`: Select target environment for commands
- `--sandbox`: Alias of `--env sandbox`

Environment resolution priority:

1. CLI flags (`--env` or `--sandbox`)
2. Environment variable `ANYHIVE_MODE`
3. Default: `production`

## Commands

### init

Initialize an Anyhive project configuration.

```bash
anyhive init --workspace <id> --token <installToken> [--dir <path>] [--force] [--env sandbox|production]
```

Behavior:
- Creates `anyhive.config.json` in the target directory
- Respects `--env` to set the initial `mode` (e.g. `sandbox` or `production`)
- Errors if a config already exists unless `--force` is provided

### verify

Verify your installation (demo output).

```bash
anyhive verify [--env sandbox|production]
```

### whoami

Display the current user and environment (demo output).

```bash
anyhive whoami [--env sandbox|production]
```

### sandbox

Create or update a local `.env` with a sandbox publishable key for local testing.

```bash
anyhive sandbox [--dir <path>] [--key <publishableKey>] [--force] [--write-all]
```

Options:
- `--dir <path>`: Directory for the `.env` file (default: current directory)
- `--key <publishableKey>`: Provide a specific key instead of generating one
- `--force`: Overwrite existing `ANYHIVE_PUBLISHABLE_KEY` in `.env`
- `--write-all`: Also upsert the following variables:
  - `ANYHIVE_MODE=sandbox`
  - `ANYHIVE_API_BASE_URL=https://sandbox.api.anyhive.dev`
  - `ANYHIVE_WORKSPACE_ID=ws_sandbox_demo`

Notes:
- Without `--force`, an existing `ANYHIVE_PUBLISHABLE_KEY` will not be overwritten
- The command prints a short configuration summary for quick copying

## Examples

```bash
# Initialize a project in sandbox mode
anyhive init --workspace ws_123 --token it_456 --env sandbox

# Verify against sandbox
anyhive verify --env sandbox

# Create or update a local .env for sandbox testing
anyhive sandbox --dir . --write-all

# Provide your own sandbox key and force overwrite
anyhive sandbox --dir . --key pk_sandbox_custom --force
```

## Help

```bash
anyhive --help
anyhive <command> --help
```

## Exit codes

- `0`: Success
- Non-zero: An error occurred (missing required options, file conflicts, etc.)

## License

ISC


