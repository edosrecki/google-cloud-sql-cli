import chalk from 'chalk'
import { execConfiguration, getConfiguration } from '../../lib/configurations/index.js'
import { promptConfiguration } from './prompts/configuration.js'
import { promptConfirmation } from './prompts/confirmation.js'

export const runConfiguration = async () => {
  const configuration = await promptConfiguration()
  const confirmation = await promptConfirmation()

  if (confirmation) {
    execConfiguration(configuration)
  }
  else {
    console.log(chalk.red('You are excused.'))
  }
}

export const runConfigurationByName = (name: string) => {
  const configuration = getConfiguration(name)
  if (!configuration) {
    throw new Error(`Configuration '${name}' does not exist.`)
  }

  execConfiguration(configuration)
}
