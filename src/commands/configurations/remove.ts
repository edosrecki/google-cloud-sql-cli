import { green, red, bold } from 'chalk'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import { deleteConfiguration } from '../../lib/configurations'
import { ConfigurationChooseAnswers } from '../../lib/types'
import { configurationPrompt } from './prompts/configuration'
import { confirmationPrompt } from './prompts/confirmation'

export const removeConfiguration = async () => {
  inquirer.registerPrompt('autocomplete', autocomplete)

  const { configuration, confirmation } =
    await inquirer.prompt<ConfigurationChooseAnswers>([
      configurationPrompt,
      confirmationPrompt,
    ])

  if (confirmation) {
    deleteConfiguration(configuration.configurationName)

    console.log(
      green(`Deleted configuration '${bold(configuration.configurationName)}'.`)
    )
  } else {
    console.log(red('You are excused.'))
  }
}
