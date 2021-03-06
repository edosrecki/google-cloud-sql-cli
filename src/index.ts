#!/usr/bin/env node

import { Command } from 'commander'
import { addConfigurationsCommands } from './commands/configurations'
import { notifyForUpdates } from './lib/updates'
import { version } from './lib/version'

async function main() {
  notifyForUpdates()

  const program = new Command()
  program.name('google-cloud-sql').version(version)

  addConfigurationsCommands(program)

  program.parse(process.argv)
}

main().catch((error) => {
  console.error(error)
})
