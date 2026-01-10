import chalk from 'chalk'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import { deleteConfiguration } from '../../lib/configurations/index.js'
import { ConfigurationChooseAnswers } from '../../lib/types.js'
import { configurationPrompt } from './prompts/configuration.js'
import { confirmationPrompt } from './prompts/confirmation.js'

export const removeConfiguration = async () => {
  inquirer.registerPrompt('autocomplete', autocomplete)

  const { configuration, confirmation }
    = await inquirer.prompt<ConfigurationChooseAnswers>([
      configurationPrompt,
      confirmationPrompt,
    ])

  if (confirmation) {
    deleteConfiguration(configuration.configurationName)

    console.log(
      chalk.green(`Deleted configuration '${chalk.bold(configuration.configurationName)}'.`),
    )
  }
  else {
    console.log(chalk.red('You are excused.'))
  }
}
