import { Command } from 'commander'
import { createConfiguration } from './create'
import { showConfigurationPath } from './path'
import { removeConfiguration } from './remove'
import { runConfiguration, runConfigurationByName } from './run'
import { showConfiguration } from './show'

export async function addConfigurationsCommands(program: Command) {
  const configurations = new Command('configurations')
  configurations.description('create and run SQL auth proxy configurations')

  configurations
    .command('create')
    .alias('edit')
    .description('create or edit Cloud SQL Auth Proxy configuration')
    .action(async () => {
      try {
        await createConfiguration()
      } catch (error) {
        console.error(error)
      }
    })

  configurations
    .command('show')
    .description('show Cloud SQL Auth Proxy configuration')
    .action(async () => {
      try {
        await showConfiguration()
      } catch (error) {
        console.error(error)
      }
    })

  configurations
    .command('remove')
    .alias('rm')
    .description('remove Cloud SQL Auth Proxy configuration')
    .action(async () => {
      try {
        await removeConfiguration()
      } catch (error) {
        console.error(error)
      }
    })

  configurations
    .command('run')
    .argument('[name]', 'configuration name, optional')
    .description('run Cloud SQL Auth Proxy configuration')
    .action(async (name?: string) => {
      try {
        if (name) {
          runConfigurationByName(name)
        } else {
          await runConfiguration()
        }
      } catch (error) {
        console.error(error)
      }
    })

  configurations
    .command('path')
    .description('show path to local configurations file')
    .action(() => {
      showConfigurationPath()
    })

  program.addCommand(configurations)
}
