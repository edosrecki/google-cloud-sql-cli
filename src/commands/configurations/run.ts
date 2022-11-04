import chalk from 'chalk'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import { execConfiguration, getConfiguration } from '../../lib/configurations/index.js'
import { ConfigurationChooseAnswers } from '../../lib/types.js'
import { configurationPrompt } from './prompts/configuration.js'
import { confirmationPrompt } from './prompts/confirmation.js'

export const runConfiguration = async () => {
  inquirer.registerPrompt('autocomplete', autocomplete)

  const { configuration, confirmation } =
    await inquirer.prompt<ConfigurationChooseAnswers>([
      configurationPrompt,
      confirmationPrompt,
    ])

  if (confirmation) {
    execConfiguration(configuration)
  } else {
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
