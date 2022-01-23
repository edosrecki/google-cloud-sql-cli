import { Command } from 'commander'
import { addConfigurationsCommands } from './commands/configurations'
import { version } from './lib/version'

async function main() {
  const program = new Command()
  program.name('google-cloud-sql').version(version)

  addConfigurationsCommands(program)

  program.parse(process.argv)
}

main().catch((error) => {
  console.error(error)
})
